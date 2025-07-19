<template>
  <div class="main-content">
    <breadcumb :page="$t('AddProduct')" :folder="$t('Products')"/>
    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>

    <validation-observer ref="Create_Product" v-if="!isLoading">
      <b-form @submit.prevent="Submit_Product" enctype="multipart/form-data">
        <b-row>
          <b-col md="8" class="mb-2">
            <b-card class="mt-3">
              <b-row>

                <b-modal hide-footer id="open_scan" size="md" title="Barcode Scanner">
                  <qrcode-scanner
                    :qrbox="250" 
                    :fps="10" 
                    style="width: 100%; height: calc(100vh - 56px);"
                    @result="onScan"
                  />
                </b-modal>

                <!-- Название товара -->
<b-col md="6" class="mb-2">
  <validation-provider
    name="Name"
    :rules="{ required: true, min: 3, max: 55 }"
    v-slot="validationContext"
  >
    <b-form-group :label="$t('Name_product') + ' *'">
      <b-form-input
        v-model="product.name"
        :state="getValidationState(validationContext)"
        aria-describedby="Name-feedback"
        :placeholder="$t('Enter_Name_Product')"
        class="form-control"
      />
      <b-form-invalid-feedback id="Name-feedback">
        {{ validationContext.errors[0] }}
      </b-form-invalid-feedback>
    </b-form-group>
  </validation-provider>
</b-col>
                 <!-- -Product Image -->
                <b-col md="6" class="mb-2">
                <validation-provider name="Image" ref="Image" rules="mimes:image/*">
                  <b-form-group slot-scope="{validate, valid, errors }" label="Product Image">
                    <input
                      :state="errors[0] ? false : (valid ? true : null)"
                      :class="{'is-invalid': !!errors.length}"
                      @change="onFileSelected"
                      label="Choose Image"
                      type="file"
                    >
                    <b-form-invalid-feedback id="Image-feedback">{{ errors[0] }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>

                <!-- Barcode Symbology  -->
<!-- Проба золота -->
<b-col md="6" class="mb-2">
  <validation-provider name="Проба золота" rules="required">
    <b-form-group
      slot-scope="{ validate, valid, errors }"
      label="Проба золота *"
    >
      <!-- Радиокнопки для выбора одной пробы -->
      <b-form-radio-group
        v-model="product.gold_purity"
        :state="errors[0] ? false : (valid ? true : null)"
        :class="{ 'is-invalid': !!errors.length }"
        @change="validate"
      >
        <b-form-radio value="585">585</b-form-radio>
        <b-form-radio value="750">750</b-form-radio>
        <b-form-radio value="other">Другое</b-form-radio>
      </b-form-radio-group>

      <!-- Ввод “другое значение” -->
      <b-form-input
        v-if="product.gold_purity === 'other'"
        v-model="product.custom_gold_purity"
        placeholder="Укажите пробу, например: 916"
        class="mt-2"
      />

      <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
    </b-form-group>
  </validation-provider>
</b-col>


                <!-- Code Product"-->
                <b-col md="6" class="mb-2">
                  <validation-provider name="Code Product" :rules="{ required: true}">
                    
                    <b-form-group
                      slot-scope="{ valid, errors }"
                      :label="$t('CodeProduct') + ' ' + '*'"
                    >
                      <div class="input-group">
                        <!-- Input group prepend -->
                        <div class="input-group-prepend">
                          <img src="/assets_setup/scan.png" alt="Scan" class="scan-icon" @click="showModal">
                        </div>
                        <b-form-input
                          :class="{'is-invalid': !!errors.length}"
                          :state="errors[0] ? false : (valid ? true : null)"
                          aria-describedby="CodeProduct-feedback"
                          type="text"
                          v-model="product.code"
                        ></b-form-input>
                        <div class="input-group-append">
                          <span class="input-group-text">
                            <a @click="generateNumber()">
                              <i class="i-Bar-Code cursor-pointer"></i>
                            </a>
                          </span>
                        </div>
                        <b-form-invalid-feedback id="CodeProduct-feedback">{{ errors[0] }}</b-form-invalid-feedback>
                      </div>
                      <span>{{$t('Scan_your_barcode_and_select_the_correct_symbology_below')}}</span>
                      <b-alert
                        show
                        variant="danger"
                        class="error mt-1"
                        v-if="code_exist !=''"
                      >{{code_exist}}</b-alert>
                    </b-form-group>
                  </validation-provider>
                </b-col>

<!-- Условия и динамические поля -->
<b-col md="6" class="mb-2">
  <b-form-group label="Характеристики вставки">
    <!-- С бриллиантом -->
    <b-form-checkbox v-model="product.has_diamond" size="sm" class="mb-1">
      💎 С бриллиантом
    </b-form-checkbox>

    <!-- Есть камни -->
    <b-form-checkbox v-model="product.has_stone" size="sm" class="mb-2">
      🪨 Есть камни
    </b-form-checkbox>

    <!-- Поле: карат -->
    <validation-provider v-if="product.has_diamond" name="Карат бриллианта">
      <b-form-group slot-scope="{ validate, valid, errors }" label="Карат бриллианта">
        <input
          v-model="product.diamond_carat"
          type="number"
          step="0.001"
          placeholder="0.25"
          :state="errors[0] ? false : (valid ? true : null)"
          :class="{ 'is-invalid': !!errors.length }"
          @input="validate"
          class="form-control"
        />
        <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
      </b-form-group>
    </validation-provider>

    <!-- Тип камня (появляется только при has_stone) -->
<validation-provider v-if="product.has_stone" name="Тип камня">
  <b-form-group
    slot-scope="{ validate, valid, errors }"
    label="Тип камня (GEM)"
  >
    <!-- Группа чекбоксов -->
    <b-form-checkbox-group
      v-model="product.stone_type"
      :state="errors[0] ? false : (valid ? true : null)"
      :class="{ 'is-invalid': !!errors.length }"
      @change="validate"
    >
      <b-form-checkbox value="d1">💎 D1</b-form-checkbox>
      <b-form-checkbox value="d2">💎 D2</b-form-checkbox>
      <b-form-checkbox value="d3">💎 D3</b-form-checkbox>
      <b-form-checkbox value="other">✏️ Другое</b-form-checkbox>
    </b-form-checkbox-group>

    <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>

    <!-- Поле для ручного ввода типа, если выбрано "Другое" -->
    <b-form-input
      v-if="product.stone_type && product.stone_type.includes('other')"
      v-model="product.custom_stone_type"
      placeholder="Укажите тип камня"
      class="mt-2"
    />
  </b-form-group>
</validation-provider>


  </b-form-group>
</b-col>
                <!-- Category -->
                <b-col md="6" class="mb-2">
                  <validation-provider name="category" :rules="{ required: true}">
                    <b-form-group
                      slot-scope="{ valid, errors }"
                      :label="$t('Categorie') + ' ' + '*'"
                    >
                      <v-select
                        :class="{'is-invalid': !!errors.length}"
                        :state="errors[0] ? false : (valid ? true : null)"
                        :reduce="label => label.value"
                        :placeholder="$t('Choose_Category')"
                        v-model="product.category_id"
                        :options="categories.map(categories => ({label: categories.name, value: categories.id}))"
                      />
                      <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Brand  -->
                <b-col md="6" class="mb-2">
                  <b-form-group :label="$t('Brand')">
                    <v-select
                      :placeholder="$t('Choose_Brand')"
                      :reduce="label => label.value"
                      v-model="product.brand_id"
                      :options="brands.map(brands => ({label: brands.name, value: brands.id}))"
                    />
                  </b-form-group>
                </b-col>

                
                
<!-- Вес изделия -->
<b-col lg="6" md="6" sm="12" class="mb-2">
  <validation-provider name="Вес изделия" :rules="{ required: true }" v-slot="{ valid, errors }">
    <b-form-group label="Вес изделия (грамм) *">
      <b-input-group>
        <b-form-input
          v-model.number="product.weight"
          type="number"
          step="0.001"
          min="0"
          :state="errors[0] ? false : (valid ? true : null)"
          :class="{ 'is-invalid': !!errors.length }"
        />
        <b-input-group-append>
          <b-button variant="primary" @click="getWeightFromScale">
            Получить
          </b-button>
        </b-input-group-append>
      </b-input-group>
      <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
    </b-form-group>
  </validation-provider>
</b-col>



<!-- Цена золота за грамм -->
<b-col lg="6" md="6" sm="12" class="mb-2">
  <validation-provider name="Цена золота за грамм" :rules="{ required: true }" v-slot="{ valid, errors }">
    <b-form-group label="Цена золота за грамм *">
      <b-form-input
        v-model.number="product.gold_price_per_gram"
        type="number"
        step="0.01"
        min="0"
        :state="errors[0] ? false : (valid ? true : null)"
        :class="{'is-invalid': !!errors.length}"
      />
      <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
    </b-form-group>
  </validation-provider>
</b-col>

<!-- Процент наценки -->
<b-col lg="6" md="6" sm="12" class="mb-2">
  <validation-provider name="Процент наценки" :rules="{ required: true }" v-slot="{ valid, errors }">
    <b-form-group label="Процент наценки (%) *">
      <b-form-input
        v-model.number="product.margin_percent"
        type="number"
        step="0.1"
        min="0"
        :state="errors[0] ? false : (valid ? true : null)"
        :class="{'is-invalid': !!errors.length}"
      />
      <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
    </b-form-group>
  </validation-provider>
</b-col>

<!-- Себестоимость (cost) -->
<b-col lg="6" md="6" sm="12" class="mb-2">
  <b-form-group label="Себестоимость">
    <b-form-input :value="formatNumber(product.cost, 2)" readonly />
  </b-form-group>
</b-col>

<!-- Цена продажи (price) -->
<b-col lg="6" md="6" sm="12" class="mb-2">
  <b-form-group label="Цена продажи">
    <b-form-input :value="formatNumber(product.price, 2)" readonly />
  </b-form-group>
</b-col>
 <!-- Остатки по складам -->
<b-col
  lg="6"
  md="6"
  sm="12"
  class="mb-2"
  v-for="wh in warehouses"
  :key="wh.id"
>
  <b-form-group :label="wh.name">
    <b-form-input
      type="number"
      min="0"
      placeholder="0"
      v-model.number="product.warehouses[wh.id].qte"
    />
  </b-form-group>
</b-col>



                <b-col md="12" class="mb-2">
                  <b-form-group :label="$t('Description')">
                    <textarea
                      rows="4"
                      class="form-control"
                      :placeholder="$t('Afewwords')"
                      v-model="product.note"
                    ></textarea>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-card>

            <b-card class="mt-3" v-if="product.type == 'is_combo'">
              <b-row>

                <div class="col-md-12 mb-5 mt-3">
                    <div id="autocomplete" class="autocomplete">
                        <input  :placeholder="$t('Scan_Search_Product_by_Code_Name')"
                        @input='e => search_input = e.target.value' @keyup="search(search_input)" @focus="handleFocus"
                        @blur="handleBlur" ref="product_autocomplete" class="autocomplete-input" />
                        <ul class="autocomplete-result-list" v-show="focused">
                        <li class="autocomplete-result" v-for="product_fil in product_filter"
                            @mousedown="SearchProduct(product_fil)">{{getResultValue(product_fil)}}</li>
                        </ul>
                    </div>
                </div>

                <div class="table-responsive">
                    <table class="table table-hover table-sm">
                        <thead class="bg-gray-300">
                            <tr>
                                <th scope="col">Product Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col" class="text-right">Cost</th>
                                <th scope="col" class="text-right">SubTotal</th>
                                <th scope="col" class="text-right"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="materiels.length <=0">
                                <td colspan="4">No data Available</td>
                            </tr>
                            <tr v-for="materiel in materiels">
                                <td>
                                  <span class="badge badge-success">{{materiel.name}}</span>
                                  <br>
                                  <span>{{materiel.code}}</span>
                                </td>

                                <td>
                                    <div class="input-group">
                                        <input class="form-control" v-model.number="materiel.quantity"  style=" width: 30px; ">
                                        <div class="input-group-append">
                                            <span class="input-group-text">{{materiel.unit_name}}</span>
                                        </div>
                                    </div>
                                </td>

                                <td class="text-right">{{currentUser.currency}} {{materiel.cost}}</td>
                                <td class="text-right">{{currentUser.currency}} {{formatNumber(materiel.cost * materiel.quantity, 2)}}</td>

                                <td class="text-right">
                                  
                                    <a
                                      style="color: #ffff;"
                                      @click="delete_materiel(materiel.product_id)"
                                      class="btn btn-sm btn-danger"
                                      title="Delete"
                                    >
                                      <i class="i-Close-Window"></i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="offset-md-9 col-md-3 mt-4">
                  <table class="table table-striped table-sm">
                    <tbody>
                      <tr>
                        <td>Total Cost</td>
                        <td>
                          <span>{{currentUser.currency}} {{ formatNumber(totalCost, 2) }}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </b-row>
            </b-card>

            <b-card class="mt-3">
              <b-row>
                

                <!-- Unit Product -->
<b-col md="6" class="mb-2" v-if="product.type != 'is_service'">
  <validation-provider name="Unit Product" :rules="{ required: true}">
    <b-form-group
      slot-scope="{ valid, errors }"
      :label="$t('UnitProduct') + ' ' + '*'"
    >
      <v-select
        :class="{'is-invalid': !!errors.length}"
        :state="errors[0] ? false : (valid ? true : null)"
        v-model="product.unit_id"
        class="required"
        required
        @input="Selected_Unit"
        :placeholder="$t('Choose_Unit_Product')"
        :reduce="label => label.value"
        :options="units.map(units => ({label: units.name, value: units.id}))"
      />
      <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
    </b-form-group>
  </validation-provider>
</b-col>


<!-- Product_Has_Imei_Serial_number -->
                <b-col md="12 mb-2">
                  <ValidationProvider rules vid="product" v-slot="x">
                    <div class="form-check">
                      <label class="checkbox checkbox-outline-primary">
                        <input type="checkbox" v-model="product.is_imei">
                        <h5>{{$t('Product_Has_Imei_Serial_number')}}</h5>
                        <span class="checkmark"></span>
                      </label>
                    </div>
                  </ValidationProvider>
                </b-col>


                <!-- This_Product_Not_For_Selling -->
                <b-col md="12 mb-2">
                  <ValidationProvider rules vid="product" v-slot="x">
                    <div class="form-check">
                      <label class="checkbox checkbox-outline-primary">
                        <input type="checkbox" v-model="product.not_selling">
                        <h5>{{$t('This_Product_Not_For_Selling')}}</h5>
                        <span class="checkmark"></span>
                      </label>
                    </div>
                  </ValidationProvider>
                </b-col>

             

                <div class="col-md-12 mb-3 mt-3" v-if="product.type == 'is_variant'">
                  <div class="d-flex">
                    <input
                      style="height: 40px;"
                      placeholder="Enter the Variant"
                      type="text"
                      name="variant"
                      v-model="tag"
                      class="form-control"
                    >
                    <a
                      style="color: #ffff;margin-left: 10px;"
                      @click="add_variant(tag)"
                      class="ms-3 btn btn-md btn-primary"
                    >{{$t('Add')}}</a>
                  </div>
                </div>

                <div class="col-md-12 mb-2" v-if="product.type == 'is_variant'">
                  <div class="table-responsive">
                    <table class="table table-hover table-sm">
                      <thead class="bg-gray-300">
                        <tr>
                          <th scope="col">{{$t('Variant_code')}}</th>
                          <th scope="col">{{$t('Variant_Name')}}</th>
                          <th scope="col">{{$t('Variant_cost')}}</th>
                          <th scope="col">{{$t('Variant_price')}}</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-if="variants.length <=0">
                          <td colspan="3">{{$t('NodataAvailable')}}</td>
                        </tr>
                        <tr v-for="variant in variants">
                          <td>
                            <input required class="form-control" v-model="variant.code">
                          </td>
                          <td>
                            <input required  class="form-control" v-model="variant.text">
                          </td>
                          <td>
                            <input required class="form-control" v-model="variant.cost">
                          </td>
                          <td>
                            <input required class="form-control" v-model="variant.price">
                          </td>
                          <td>
                            <a
                              style="color: #ffff;"
                              @click="delete_variant(variant.var_id)"
                              class="btn btn-sm btn-danger"
                              title="Delete"
                            >
                              <i class="i-Close-Window"></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </b-row>
            </b-card>




           
            <b-card class="mt-3" v-if="product.type != 'is_combo'">
              <b-row>
                
              </b-row>
            </b-card>
          </b-col>

          <b-col md="12" class="mt-3">
            <b-button variant="primary" type="submit" :disabled="SubmitProcessing"><i class="i-Yes me-2 font-weight-bold"></i> {{$t('submit')}}</b-button>
            <div v-once class="typo__p" v-if="SubmitProcessing">
              <div class="spinner sm spinner-primary mt-3"></div>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </div>
</template>


<script>
import VueTagsInput from "@johmun/vue-tags-input";
import NProgress from "nprogress";
import { mapActions, mapGetters } from "vuex";

export default {
  metaInfo: {
    title: "Create Product"
  },
  data() {
    return {
      focused: false,
      timer:null,
      search_input:'',
      product_filter:[],
      warehouses: [],   
      tag: "",
      len: 8,
      change: false,
      isLoading: true,
      SubmitProcessing: false,
      data: new FormData(),
      categories: [],
      units: [],
      units_sub: [],
      brands: [],
      roles: {},
      variants: [],
      materiels: [],
      products_ing: [],
      product: {
      warehouses: {},
      type: "is_single",
      name: "",
      code: "",
      Type_barcode: "CODE128",
      gold_purity: null,
      diamond_carat: null,
      stone_type: null,
      has_stone: false,
      has_diamond: false,
      gold_purity: [],
      custom_gold_purity: '',

      cost: "",
      price: "",
      brand_id: "",
      category_id: "",
      TaxNet: "0",


      tax_method: "1",
      unit_id: "",
      unit_sale_id: "",
      unit_purchase_id: "",
      stock_alert: "0",
      image: "",
      note: "",
      is_variant: false,
      is_imei: false,
      not_selling: false,
      warranty_period: null,
      warranty_unit: 'months',
      warranty_terms: '',
      has_guarantee: false,
      guarantee_period: null,
      guarantee_unit: 'months',
      },
      code_exist: ""
    };
  },
 
watch: {
  'product.weight': 'calculatePrice',
  'product.gold_price_per_gram': 'calculatePrice',
  'product.margin_percent': 'calculatePrice',
  'product.category_id': async function (newCategoryId) {
    if (newCategoryId) {
      const code = await this.generateProductCode(newCategoryId);
      if (code) {
        this.product.code = code;
      }
    }
    stoneOptions: [
  { label: 'Emerald (Изумруд)', value: 'emerald' },
  { label: 'Sapphire (Сапфир)', value: 'sapphire' },
  { label: 'Ruby (Рубин)', value: 'ruby' },
  { label: 'Topaz (Топаз)', value: 'topaz' },
  { label: 'Amethyst (Аметист)', value: 'amethyst' },
  { label: 'Diamond (Бриллиант)', value: 'diamond' },
  { label: 'Other', value: 'other' },
]
  }
  
},



  
  

  computed: {
    ...mapGetters(["currentUserPermissions","currentUser"]),
    totalCost() {
      return this.materiels.reduce((total, materiel) => {
        return total + (materiel.cost * materiel.quantity);
      }, 0);
    }
    
    },


  methods: {

     //------------------------------Formetted Numbers -------------------------\\
     formatNumber(number, dec) {
      const value = (typeof number === "string"
        ? number
        : number.toString()
      ).split(".");
      if (dec <= 0) return value[0];
      let formated = value[1] || "";
      if (formated.length > dec)
        return `${value[0]}.${formated.substr(0, dec)}`;
      while (formated.length < dec) formated += "0";
      return `${value[0]}.${formated}`;
      
    },
    calculatePrice() {
      const weight = parseFloat(this.product.weight) || 0;
      const gold = parseFloat(this.product.gold_price_per_gram) || 0;
      const margin = parseFloat(this.product.margin_percent) || 0;

      const cost = weight * gold;
      const price = cost + (cost * margin / 100);

      this.product.cost = cost;
      this.product.price = price;
  


  },
  
async getWeightFromScale() {
    try {
      const response = await axios.get('http://localhost:3000/getWeight');
      const weight = parseFloat(response.data.weight);
      if (!isNaN(weight)) {
        this.product.weight = weight;
        this.calculatePrice(); // если есть пересчёт
      } else {
        this.$bvToast.toast('Ошибка: неверный ответ от весов', { variant: 'danger' });
      }
    } catch (error) {
      this.$bvToast.toast('Не удалось получить вес с весов', { variant: 'danger' });
      console.error(error);
    }
  },
    
      //---------------------- Event Selected_product_type------------------------------\\
      Selected_Type_Product(value) {

        this.products_ing = [];
        if(value == 'is_combo'){
            this.get_products_materiels();
        }
      },


  //---------------------- get_products_materiels------------------------------\\
  get_products_materiels(value) {
  axios
    .get("get_products_materiels")
    .then(({ data }) => (this.products_ing = data));
    },

   // Search Products
   search(){
    if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
    }
    if (this.search_input.length < 1) {
        return this.product_filter= [];
    }
        this.timer = setTimeout(() => {
        const product_filter = this.products_ing.filter(ingredient => ingredient.code === this.search_input);
            if(product_filter.length === 1){
                this.SearchProduct(product_filter[0])
            }else{
                this.product_filter=  this.products_ing.filter(ingredient => {
                return (
                    ingredient.name.toLowerCase().includes(this.search_input.toLowerCase()) ||
                    ingredient.code.toLowerCase().includes(this.search_input.toLowerCase())
                    );
                });
            }
        }, 800);

    },
        calculatePrices() {
      if (this.weight && this.gold_price_per_gram) {
        this.cost_price = this.weight * this.gold_price_per_gram;
        this.final_price = this.cost_price * (1 + this.margin_percent / 100);
      } else {
        this.cost_price = 0;
        this.final_price = 0;
      }
    },
    


    // get Result Value Search Products
    getResultValue(result) {
      return result.code + " " + "(" + result.name + ")";
    },

    handleFocus() {
    this.focused = true

  },
  
generateProductCode(category_id) {
  return axios.get(`/generate_product_code/${category_id}`)
    .then(response => {
      return response.data.code;
    })
    .catch(error => {
      console.error("Ошибка генерации кода:", error);
      return null;
    });
},

    

  handleBlur() {
    this.focused = false
  },

    //------------------------------ Event Upload Image -------------------------------\\
    async onFileSelected(e) {
      const { valid } = await this.$refs.Image.validate(e);

      if (valid) {
        this.product.image = e.target.files[0];
      } else {
        this.product.image = "";
      }
    },



  // Submit Search Products
  SearchProduct(result) {
      if (
          this.materiels.length > 0 &&
          this.materiels.some(detail => detail.code === result.code)
      ) {
          toastr.error('Product_Already_added');
          
      } else {

          var materiel_tag = {
              product_id:result.product_id,
              name:result.name,
              code:result.code,
              unit_name:result.unit_name,
              cost:result.cost,
              quantity:1,
          }
          this.materiels.push(materiel_tag);
          
      }
      this.search_input= '';
      this.$refs.product_autocomplete.value = "";
      this.product_filter = [];
    },


      //-----------------------------------Delete variant------------------------------\\
      delete_materiel(product_id) {

        for (var i = 0; i < this.materiels.length; i++) {
            if (product_id === this.materiels[i].product_id) {
            this.materiels.splice(i, 1);
            }
        }
      },


    showModal() {
      this.$bvModal.show('open_scan');
      
    },

    onScan (decodedText, decodedResult) {
      const code = decodedText;
      this.product.code = code;
      this.$bvModal.hide('open_scan');
    },


     //------ Generate code
     generateNumber() {
      this.code_exist = "";
      this.product.code = Math.floor(
        Math.pow(10, 7) +
          Math.random() *
            (Math.pow(10, 8) - Math.pow(10, 7) - 1)
      );
    },


    //------------- Submit Validation Create Product
    Submit_Product() {
      this.$refs.Create_Product.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            this.$t("Please_fill_the_form_correctly"),
            this.$t("Failed")
          );
        } else {

            if (this.product.type == 'is_variant' && this.variants.length <= 0) {
              this.makeToast("danger", "The variants array is required.", this.$t("Failed"));
            }else{
              this.Create_Product();
            }

        }
      });
    },

    

    add_variant(tag) {
      if (
        this.variants.length > 0 &&
        this.variants.some(variant => variant.text === tag)
      ) {
        this.makeToast(
          "warning",
          this.$t("VariantDuplicate"),
          this.$t("Warning")
        );
      } else {
          if(this.tag != ''){
            var variant_tag = {
              var_id: this.variants.length + 1, // generate unique ID
              text: tag
            };
            this.variants.push(variant_tag);
            this.tag = "";
          }else{

            this.makeToast(
              "warning",
              "Please Enter the Variant",
              this.$t("Warning")
            );
            
          }
      }
    },
    //-----------------------------------Delete variant------------------------------\\
    delete_variant(var_id) {
      
      for (var i = 0; i < this.variants.length; i++) {
        if (var_id === this.variants[i].var_id) {
          this.variants.splice(i, 1);
        }
      }
    },

    //------ Toast
    makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },

    //------ Validation State
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },


    //-------------- Product Get Elements
    GetElements() {
      axios
        .get("products/create")
        .then(response => {
          this.categories = response.data.categories;
          this.brands = response.data.brands;
          this.units = response.data.units;
          this.warehouses = response.data.warehouses;

            // 2) initialize product.warehouses so each key exists reactively
            response.data.warehouses.forEach(wh => {
              // each wh has { id, name, qte, manage_stock }
              this.$set(this.product.warehouses, wh.id, {
                qte:          wh.qte,
              })
            })

          this.isLoading = false;
        })
        .catch(response => {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
          this.makeToast("danger", this.$t("InvalidData"), this.$t("Failed"));
        });
    },

    //---------------------- Get Sub Units with Unit id ------------------------------\\
    Get_Units_SubBase(value) {
      axios
        .get("get_sub_units_by_base?id=" + value)
        .then(({ data }) => (this.units_sub = data));
    },

    //---------------------- Event Select Unit Product ------------------------------\\
    Selected_Unit(value) {
  this.units_sub = [];
  this.product.unit_sale_id = value;
  this.product.unit_purchase_id = value;
  this.Get_Units_SubBase(value);
    },

    //------------------------------ Create new Product ------------------------------\\
      async Create_Product() {

      // Start the progress bar.
      
      NProgress.start();
      NProgress.set(0.1);
      var self = this;
      self.SubmitProcessing = true;

      if (self.product.type == 'is_variant' && self.variants.length > 0) {
          self.product.is_variant = true;
      }else{
        self.product.is_variant = false;
      }

       // append array variants
       if (self.materiels.length && self.product.type == 'is_combo') {
        self.data.append("materiels", JSON.stringify(self.materiels));
      }

          // Пересчитать актуальные значения
        this.calculatePrice(); // чтобы product.cost_price и product.final_price были обновлены
        const newCode = await this.generateProductCode(this.product.category_id);
if (newCode) {
  this.product.code = newCode;
}
        self.data = new FormData(); // ПЕРЕСОЗДАЙ FormData


Object.entries(self.product).forEach(([key, value]) => {
  self.data.append(key, value);
});
 
      // append objet product
      Object.entries(self.product).forEach(([key, value]) => {
          self.data.append(key, value);
      });


      // append array variants
      if (self.variants.length) {
        self.data.append("variants", JSON.stringify(self.variants));
      }

      if (Object.keys(self.product.warehouses).length && self.product.type == 'is_single') {
        self.data.append(
          "warehouses",
          JSON.stringify(self.product.warehouses)
        );
      }

   
      // Send Data with axios
      axios
        .post("products", self.data)
        .then(response => {
          // Complete the animation of theprogress bar.
          NProgress.done();
          self.SubmitProcessing = false;
          this.makeToast(
            "success",
            this.$t("Successfully_Created"),
            this.$t("Success")
          );
        })
        .catch(error => {
          // Complete the animation of theprogress bar.
          NProgress.done();
          self.SubmitProcessing = false;
          if (error.errors.code && error.errors.code.length > 0) {
            self.code_exist = error.errors.code[0];
            this.makeToast("danger", error.errors.code[0], this.$t("Failed"));
          }else if(error.errors.variants && error.errors.variants.length > 0){
            this.makeToast("danger", error.errors.variants[0], this.$t("Failed"));
          }else{
            this.makeToast("danger", this.$t("InvalidData"), this.$t("Failed"));
          }

        });
        
    }
  }, //end Methods

  //-----------------------------Created function-------------------

  created: function() {
    this.GetElements();

  }
};
</script>

<style>
  .scan-icon {
    width: 43px;
    height: 34px;
    margin-right: 8px; /* Adjust spacing as needed */
    cursor: pointer;
  }
</style>
