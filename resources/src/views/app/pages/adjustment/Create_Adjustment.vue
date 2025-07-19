<template>
  <div class="main-content">
    <breadcumb :page="$t('CreateAdjustment')" :folder="$t('ListAdjustments')" />

    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>

    <validation-observer ref="Create_adjustment" v-if="!isLoading">
      <b-form @submit.prevent="Submit_Adjustment">
        <b-row>
          <b-col lg="12" md="12" sm="12">
            <b-card>
              <b-row>
                <!-- Модальное окно сканера -->
                <b-modal hide-footer id="open_scan" size="md" title="Barcode Scanner">
                  <qrcode-scanner
                    :qrbox="250"
                    :fps="10"
                    style="width: 100%; height: calc(100vh - 56px);"
                    @result="onScan"
                  />
                </b-modal>

                <!-- Склад -->
                <b-col md="6" class="mb-3">
                  <validation-provider name="warehouse" :rules="{ required: true }">
                    <b-form-group
                      slot-scope="{ valid, errors }"
                      :label="$t('warehouse') + ' *'"
                    >
                      <v-select
                        :class="{ 'is-invalid': !!errors.length }"
                        :state="errors[0] ? false : (valid ? true : null)"
                        :disabled="details.length > 0"
                        @input="Selected_Warehouse"
                        v-model="adjustment.warehouse_id"
                        :reduce="label => label.value"
                        :placeholder="$t('Choose_Warehouse')"
                        :options="warehouses.map(w => ({ label: w.name, value: w.id }))"
                      />
                      <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Дата -->
                <b-col lg="6" md="6" sm="12">
                  <validation-provider name="date" :rules="{ required: true }" v-slot="validationContext">
                    <b-form-group :label="$t('date') + ' *'">
                      <b-form-input
                        :state="getValidationState(validationContext)"
                        type="date"
                        v-model="adjustment.date"
                      />
                      <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Поиск товара -->
                <b-col md="12" class="mb-5">
                  <h6>{{ $t('ProductName') }}</h6>
                  <div id="autocomplete" class="autocomplete">
                    <div class="input-with-icon">
                      <img src="/assets_setup/scan.png" alt="Scan" class="scan-icon" @click="showModal" />
                      <input
                        :placeholder="$t('Scan_Search_Product_by_Code_Name')"
                        @input="e => search_input = e.target.value"
                        @keyup="search(search_input)"
                        @focus="handleFocus"
                        @blur="handleBlur"
                        ref="product_autocomplete"
                        class="autocomplete-input"
                      />
                    </div>
                    <ul class="autocomplete-result-list" v-show="focused">
                      <li
                        class="autocomplete-result"
                        v-for="product_fil in product_filter"
                        :key="product_fil.code"
                        @mousedown="SearchProduct(product_fil)"
                      >
                        {{ getResultValue(product_fil) }}
                      </li>
                    </ul>
                  </div>
                </b-col>

                <!-- Таблица товаров -->
                <b-col md="12">
                  <div class="table-responsive">
                    <table class="table table-hover">
                      <thead class="bg-gray-300">
                        <tr>
                          <th>#</th>
                          <th>{{ $t('CodeProduct') }}</th>
                          <th>{{ $t('ProductName') }}</th>
                          <th>{{ $t('CurrentStock') }}</th>
                          <th>{{ $t('Qty') }}</th>
                          <th>{{ $t('type') }}</th>
                          <th class="text-center"><i class="fa fa-trash"></i></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-if="details.length <= 0">
                          <td colspan="7">{{ $t('NodataAvailable') }}</td>
                        </tr>
                        <tr v-for="detail in details" :key="detail.detail_id">
                          <td>{{ detail.detail_id }}</td>
                          <td>{{ detail.code }}</td>
                          <td>({{ detail.name }})</td>
                          <td><span class="badge badge-outline-warning">{{ detail.current }} {{ detail.unit }}</span></td>
                          <td>
                            <div class="quantity">
                              <b-input-group>
                                <b-input-group-prepend>
                                  <span class="btn btn-primary btn-sm" @click="decrement(detail ,detail.detail_id)">-</span>
                                </b-input-group-prepend>
                                <input
                                  class="form-control"
                                  @keyup="Verified_Qty(detail,detail.detail_id)"
                                  :min="0.00"
                                  :max="detail.current"
                                  v-model.number="detail.quantity"
                                >
                                <b-input-group-append>
                                  <span class="btn btn-primary btn-sm" @click="increment(detail ,detail.detail_id)">+</span>
                                </b-input-group-append>
                              </b-input-group>
                            </div>
                          </td>
                          <td>
                            <select
                              v-model="detail.type"
                              @change="Verified_Qty(detail, detail.detail_id)"
                              class="form-control"
                            >
                              <option value="add">{{ $t('Addition') }}</option>
                              <option value="sub">{{ $t('Subtraction') }}</option>
                            </select>
                          </td>
                          <td>
                            <a @click="Remove_Product(detail.detail_id)" class="btn btn-icon btn-sm" title="Delete">
                              <i class="i-Close-Window text-25 text-danger"></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </b-col>

                <!-- Заметки -->
                <b-col md="12">
                  <b-form-group :label="$t('Note')" class="mt-4">
                    <textarea
                      v-model="adjustment.notes"
                      rows="4"
                      class="form-control"
                      :placeholder="$t('Afewwords')"
                    ></textarea>
                  </b-form-group>
                </b-col>

                <!-- Кнопка отправки -->
                <b-col md="12">
                  <b-form-group>
                    <b-button variant="primary" :disabled="SubmitProcessing" @click="Submit_Adjustment">
                      <i class="i-Yes me-2 font-weight-bold"></i> {{ $t('submit') }}
                    </b-button>
                    <div v-once class="typo__p" v-if="SubmitProcessing">
                      <div class="spinner sm spinner-primary mt-3"></div>
                    </div>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>

    <!-- Панель прогресса ревизии -->
    <b-card class="fixed-bottom bg-light p-2 border-top shadow">
      <div class="d-flex justify-content-between">
        <div><strong>Ожидается:</strong> {{ expectedItems.length }}</div>
        <div><strong>Отсканировано:</strong> {{ details.length }}</div>
        <div><strong>Лишние:</strong> {{ extraItems.length }}</div>
      </div>
    </b-card>

    <!-- Последний отсканированный товар -->
    <b-card class="mt-3" v-if="currentScannedProduct">
      <h5>Последний товар</h5>
      <p><strong>Имя:</strong> {{ currentScannedProduct.name }}</p>
      <p><strong>Вес:</strong> {{ currentScannedProduct.weight }} г</p>
      <p><strong>Карат:</strong> {{ currentScannedProduct.carat }}</p>
      <b-link :href="`/products/edit/${currentScannedProduct.id}`" target="_blank">Открыть карточку товара</b-link>
    </b-card>
  </div>
</template>


<script>
import NProgress from "nprogress";

export default {
  metaInfo: {
    title: "Create Adjustment"
  },
  data() {
    return {
      focused: false,
      timer:null,
      search_input:'',
      product_filter:[],
      isLoading: true,
      SubmitProcessing:false,
      warehouses: [],
      products: [],
      details: [],
      expectedItems: [],        // Список всех товаров, подлежащих ревизии
      scannedItems: [],         // Отсканированные товары
      extraItems: [],           // Лишние товары (не входят в список)
      currentScannedProduct: null, // Последний отсканированный товар
      adjustment: {
        id: "",
        notes: "",
        warehouse_id: "",
        date: new Date().toISOString().slice(0, 10)
      },
      product: {
        id: "",
        code: "",
        current: "",
        quantity: 1,
        name: "",
        product_id: "",
        detail_id: "",
        product_variant_id: "",
        unit: ""
      },
      symbol: ""
    };
  },
    mounted() {
    // Пока просто захардкоженный список для ревизии
    this.expectedItems = [
      { id: 1, name: "Кольцо", barcode: "000123", weight: 5.2, carat: "0.5" },
      { id: 2, name: "Серьги", barcode: "000124", weight: 3.1, carat: "0.3" },
      // и т.д.
    ];
  },
  

methods: {
  handleFocus() {
    this.focused = true;
  },

  handleBlur() {
    this.focused = false;
  },

  showModal() {
    this.$bvModal.show('open_scan');
  },

  // При сканировании QR/Barcode
  onScan(decodedText) {
    this.handleScan(decodedText); // <- теперь вызываем корректный метод
    this.$bvModal.hide('open_scan');
  },

  // Обработка логики ревизии
  handleScan(barcode) {
  const product = this.expectedItems.find(p => p.barcode === barcode);

  if (!product) {
    if (!this.extraItems.find(p => p.barcode === barcode)) {
      this.extraItems.push({ barcode });
      this.playSound('error');
      this.makeToast("danger", "Товар не числится в списке ревизии", "Ошибка");
    }
    return;
  }

  const alreadyScanned = this.details.find(p => p.code === product.code);
  if (alreadyScanned) {
    this.playSound('error');
    this.makeToast("warning", "Этот товар уже просканирован", "Повтор");
    return;
  }

  this.SearchProduct(product);
  this.currentScannedProduct = product;
  this.playSound('success');
},

playSound(type) {
  const audio = new Audio(`/sounds/${type === 'error' ? 'scan_error.mp3' : 'scan_success.mp3'}`);
  audio.play();
},

  // Всплывающее сообщение
  makeToast(variant, msg, title) {
    this.$root.$bvToast.toast(msg, {
      title: title,
      variant: variant,
      solid: true
    });
  },

  // Search Products
  search() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    if (this.search_input.length < 2) {
      return this.product_filter = [];
    }

    if (this.adjustment.warehouse_id != "" && this.adjustment.warehouse_id != null) {
      this.timer = setTimeout(() => {
        const product_filter = this.products.filter(product =>
          product.code === this.search_input || product.barcode.includes(this.search_input)
        );

        if (product_filter.length === 1) {
          this.SearchProduct(product_filter[0]);
        } else {
          this.product_filter = this.products.filter(product => {
            return (
              product.name.toLowerCase().includes(this.search_input.toLowerCase()) ||
              product.code.toLowerCase().includes(this.search_input.toLowerCase()) ||
              product.barcode.toLowerCase().includes(this.search_input.toLowerCase())
            );
          });

          if (this.product_filter.length <= 0) {
            this.makeToast("warning", "Product Not Found", "Warning");
          }
        }
      }, 800);
    } else {
      this.makeToast("warning", this.$t("SelectWarehouse"), this.$t("Warning"));
    }
  },

  SearchProduct(result) {
    this.product = {};
    if (
      this.details.length > 0 &&
      this.details.some(detail => detail.code === result.code)
    ) {
      this.makeToast("warning", this.$t("AlreadyAdd"), this.$t("Warning"));
    } else {
      this.product.code = result.code;
      this.product.current = result.qte;
      this.product.quantity = result.qte < 1 ? result.qte : 1;
      this.product.product_variant_id = result.product_variant_id;
      this.Get_Product_Details(result.id, result.product_variant_id);
    }
    this.search_input = '';
    this.$refs.product_autocomplete.value = "";
    this.product_filter = [];
  },

  getResultValue(result) {
    return result.code + " " + "(" + result.name + ")";
  },

  Submit_Adjustment() {
    this.$refs.Create_adjustment.validate().then(success => {
      if (!success) {
        this.makeToast("danger", this.$t("Please_fill_the_form_correctly"), this.$t("Failed"));
      } else {
        this.Create_Adjustment();
      }
    });
  },

  getValidationState({ dirty, validated, valid = null }) {
    return dirty || validated ? valid : null;
  },

  makeToast(variant, msg, title) {
    this.$root.$bvToast.toast(msg, {
      title: title,
      variant: variant,
      solid: true
    });
  },

  Selected_Warehouse(value) {
    this.search_input = '';
    this.product_filter = [];
    this.Get_Products_By_Warehouse(value);
  },

  Get_Products_By_Warehouse(id) {
    NProgress.start();
    NProgress.set(0.1);
    axios
      .get("get_Products_by_warehouse/" + id + "?stock=0&product_service=0&product_combo=1")
      .then(response => {
        this.products = response.data;
        NProgress.done();
        this.expectedItems = this.products.map(p => ({
          ...p,
          barcode: p.barcode,
        }));
      })
      .catch(error => { });
  },

  add_product() {
    if (this.details.length > 0) {
      this.detail_order_id();
    } else if (this.details.length === 0) {
      this.product.detail_id = 1;
    }
    this.details.push(this.product);
  },

  Verified_Qty(detail, id) {
    for (var i = 0; i < this.details.length; i++) {
      if (this.details[i].detail_id === id) {
        if (isNaN(detail.quantity)) {
          this.details[i].quantity = detail.current;
        }

        if (detail.type == "sub" && detail.quantity > detail.current) {
          this.makeToast("warning", this.$t("LowStock"), this.$t("Warning"));
          this.details[i].quantity = detail.current;
        } else {
          this.details[i].quantity = detail.quantity;
        }
      }
    }
    this.$forceUpdate();
  },

  increment(detail, id) {
    for (var i = 0; i < this.details.length; i++) {
      if (this.details[i].detail_id == id) {
        if (detail.type == "sub") {
          if (detail.quantity + 1 > detail.current) {
            this.makeToast("warning", this.$t("LowStock"), this.$t("Warning"));
          } else {
            this.formatNumber(this.details[i].quantity++, 2);
          }
        } else {
          this.formatNumber(this.details[i].quantity++, 2);
        }
      }
    }
    this.$forceUpdate();
  },

  decrement(detail, id) {
    for (var i = 0; i < this.details.length; i++) {
      if (this.details[i].detail_id == id) {
        if (detail.quantity - 1 > 0) {
          if (detail.type == "sub" && detail.quantity - 1 > detail.current) {
            this.makeToast("warning", this.$t("LowStock"), this.$t("Warning"));
          } else {
            this.formatNumber(this.details[i].quantity--, 2);
          }
        }
      }
    }
    this.$forceUpdate();
  },

  formatNumber(number, dec) {
    const value = (typeof number === "string" ? number : number.toString()).split(".");
    if (dec <= 0) return value[0];
    let formated = value[1] || "";
    if (formated.length > dec) return `${value[0]}.${formated.substr(0, dec)}`;
    while (formated.length < dec) formated += "0";
    return `${value[0]}.${formated}`;
  },

  Remove_Product(id) {
    for (var i = 0; i < this.details.length; i++) {
      if (id === this.details[i].detail_id) {
        this.details.splice(i, 1);
      }
    }
  },

  verifiedForm() {
    if (this.details.length <= 0) {
      this.makeToast("warning", this.$t("AddProductToList"), this.$t("Warning"));
      return false;
    } else {
      var count = 0;
      for (var i = 0; i < this.details.length; i++) {
        if (this.details[i].quantity == "" || this.details[i].quantity === 0) {
          count += 1;
        }
      }

      if (count > 0) {
        this.makeToast("warning", this.$t("AddQuantity"), this.$t("Warning"));
        return false;
      } else {
        return true;
      }
    }
  },

  Create_Adjustment() {
    if (this.verifiedForm()) {
      this.SubmitProcessing = true;
      NProgress.start();
      NProgress.set(0.1);
      axios.post("adjustments", {
        warehouse_id: this.adjustment.warehouse_id,
        date: this.adjustment.date,
        notes: this.adjustment.notes,
        details: this.details
      }).then(() => {
        NProgress.done();
        this.SubmitProcessing = false;
        this.$router.push({ name: "index_adjustment" });
        this.makeToast("success", this.$t("Successfully_Created"), this.$t("Success"));
      }).catch(error => {
        NProgress.done();
        if (error.errors && error.errors.details.length) {
          this.makeToast("danger", error.errors.details[0], this.$t("Failed"));
        } else {
          this.makeToast("danger", this.$t("InvalidData"), this.$t("Failed"));
        }
        this.SubmitProcessing = false;
      });
    }
  },

  detail_order_id() {
    this.product.detail_id = 0;
    var len = this.details.length;
    this.product.detail_id = this.details[len - 1].detail_id + 1;
  },

  Get_Product_Details(product_id, variant_id) {
    axios.get("/show_product_data/" + product_id + "/" + variant_id).then(response => {
      this.product.product_id = response.data.id;
      this.product.name = response.data.name;
      this.product.type = "add";
      this.product.unit = response.data.unit;
      this.add_product();
    });
  },

  Get_Elements() {
    axios.get("adjustments/create")
      .then(response => {
        this.warehouses = response.data.warehouses;
        this.isLoading = false;
      })
      .catch(() => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      });
  },

  // === РЕВИЗИЯ ===
  handleScan(barcode) {
    const product = this.expectedItems.find(p => p.barcode === barcode);
    if (!product) {
      if (!this.extraItems.find(p => p.barcode === barcode)) {
        this.extraItems.push({ barcode });
        this.playSound('error');
        this.makeToast("danger", "Товар не числится в списке ревизии", "Ошибка");
      }
      return;
    }

    const alreadyScanned = this.details.find(p => p.code === product.code);
    if (alreadyScanned) {
      this.playSound('error');
      this.makeToast("warning", "Этот товар уже просканирован", "Повтор");
      return;
    }

    this.SearchProduct(product);
    this.currentScannedProduct = product;
    this.playSound('success');
  },

  playSound(type) {
    const audio = new Audio(`/sounds/${type === 'error' ? 'scan_error.mp3' : 'scan_success.mp3'}`);
    audio.play();
  },
},


  //----------------------------- Created function-------------------\\

  created() {
    this.Get_Elements();
  }
};
</script>

<style>

  .input-with-icon {
    display: flex;
    align-items: center;
  }

  .scan-icon {
    width: 50px; /* Adjust size as needed */
    height: 50px;
    margin-right: 8px; /* Adjust spacing as needed */
    cursor: pointer;
  }
</style>
