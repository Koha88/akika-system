"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["store_purchase"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nprogress */ "./node_modules/nprogress/nprogress.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  metaInfo: {
    title: "Create Purchase"
  },
  data: function data() {
    return {
      focused: false,
      timer: null,
      search_input: '',
      product_filter: [],
      isLoading: true,
      SubmitProcessing: false,
      Submit_Processing_detail: false,
      warehouses: [],
      suppliers: [],
      products: [],
      details: [],
      units: [],
      detail: {
        quantity: "",
        discount: "",
        Unit_cost: "",
        discount_Method: "",
        tax_percent: "",
        tax_method: "",
        imei_number: ""
      },
      purchases: [],
      purchase: {
        id: "",
        date: new Date().toISOString().slice(0, 10),
        statut: "received",
        notes: "",
        supplier_id: "",
        warehouse_id: "",
        tax_rate: 0,
        TaxNet: 0,
        shipping: 0,
        discount: 0
      },
      total: 0,
      GrandTotal: 0,
      product: {
        id: "",
        code: "",
        stock: "",
        quantity: 1,
        discount: "",
        DiscountNet: "",
        discount_Method: "",
        name: "",
        unitPurchase: "",
        purchase_unit_id: "",
        fix_stock: "",
        fix_cost: "",
        Net_cost: "",
        Unit_cost: "",
        Total_cost: "",
        subtotal: "",
        product_id: "",
        detail_id: "",
        taxe: "",
        tax_percent: "",
        tax_method: "",
        product_variant_id: "",
        is_imei: "",
        imei_number: ""
      }
    };
  },
  computed: _objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapGetters)(["currentUserPermissions", "currentUser"])),
  methods: {
    showModal: function showModal() {
      this.$bvModal.show('open_scan');
    },
    onScan: function onScan(decodedText, decodedResult) {
      var code = decodedText;
      this.search_input = code;
      this.search();
      this.$bvModal.hide('open_scan');
    },
    //--- Submit Validate Create Purchase
    Submit_Purchase: function Submit_Purchase() {
      var _this = this;
      this.$refs.create_purchase.validate().then(function (success) {
        if (!success) {
          _this.makeToast("danger", _this.$t("Please_fill_the_form_correctly"), _this.$t("Failed"));
        } else {
          _this.Create_Purchase();
        }
      });
    },
    //---Submit Validation Update Detail
    submit_Update_Detail: function submit_Update_Detail() {
      var _this2 = this;
      this.$refs.Update_Detail_purchase.validate().then(function (success) {
        if (!success) {
          return;
        } else {
          _this2.Update_Detail();
        }
      });
    },
    //---Validate State Fields
    getValidationState: function getValidationState(_ref) {
      var dirty = _ref.dirty,
        validated = _ref.validated,
        _ref$valid = _ref.valid,
        valid = _ref$valid === void 0 ? null : _ref$valid;
      return dirty || validated ? valid : null;
    },
    //------ Toast
    makeToast: function makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },
    //---------------------- get_units ------------------------------\\
    get_units: function get_units(value) {
      var _this3 = this;
      axios.get("get_units?id=" + value).then(function (_ref2) {
        var data = _ref2.data;
        return _this3.units = data;
      });
    },
    //------ Show Modal Update Detail Product
    Modal_Updat_Detail: function Modal_Updat_Detail(detail) {
      var _this4 = this;
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().set(0.1);
      this.detail = {};
      this.detail.name = detail.name;
      this.get_units(detail.product_id);
      this.detail.detail_id = detail.detail_id;
      this.detail.purchase_unit_id = detail.purchase_unit_id;
      this.detail.Unit_cost = detail.Unit_cost;
      this.detail.tax_method = detail.tax_method;
      this.detail.fix_cost = detail.fix_cost;
      this.detail.fix_stock = detail.fix_stock;
      this.detail.stock = detail.stock;
      this.detail.discount_Method = detail.discount_Method;
      this.detail.discount = detail.discount;
      this.detail.quantity = detail.quantity;
      this.detail.tax_percent = detail.tax_percent;
      this.detail.is_imei = detail.is_imei;
      this.detail.imei_number = detail.imei_number;
      setTimeout(function () {
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        _this4.$bvModal.show("form_Update_Detail");
      }, 1000);
    },
    //------ Submit Update Detail Product
    Update_Detail: function Update_Detail() {
      var _this5 = this;
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().set(0.1);
      this.Submit_Processing_detail = true;
      for (var i = 0; i < this.details.length; i++) {
        if (this.details[i].detail_id === this.detail.detail_id) {
          // this.convert_unit();
          for (var k = 0; k < this.units.length; k++) {
            if (this.units[k].id == this.detail.purchase_unit_id) {
              if (this.units[k].operator == '/') {
                this.details[i].stock = this.detail.fix_stock * this.units[k].operator_value;
                this.details[i].unitPurchase = this.units[k].ShortName;
              } else {
                this.details[i].stock = this.detail.fix_stock / this.units[k].operator_value;
                this.details[i].unitPurchase = this.units[k].ShortName;
              }
            }
          }
          this.details[i].Unit_cost = this.detail.Unit_cost;
          this.details[i].tax_percent = this.detail.tax_percent;
          this.details[i].tax_method = this.detail.tax_method;
          this.details[i].discount_Method = this.detail.discount_Method;
          this.details[i].discount = this.detail.discount;
          this.details[i].purchase_unit_id = this.detail.purchase_unit_id;
          this.details[i].imei_number = this.detail.imei_number;
          if (this.details[i].discount_Method == "2") {
            //Fixed
            this.details[i].DiscountNet = this.details[i].discount;
          } else {
            //Percentage %
            this.details[i].DiscountNet = parseFloat(this.details[i].Unit_cost * this.details[i].discount / 100);
          }
          if (this.details[i].tax_method == "1") {
            //Exclusive
            this.details[i].Net_cost = parseFloat(this.details[i].Unit_cost - this.details[i].DiscountNet);
            this.details[i].taxe = parseFloat(this.details[i].tax_percent * (this.details[i].Unit_cost - this.details[i].DiscountNet) / 100);
          } else {
            //Inclusive
            this.details[i].taxe = parseFloat((this.details[i].Unit_cost - this.details[i].DiscountNet) * (this.details[i].tax_percent / 100));
            this.details[i].Net_cost = parseFloat(this.details[i].Unit_cost - this.details[i].taxe - this.details[i].DiscountNet);
          }
          this.$forceUpdate();
        }
      }
      this.Calcul_Total();
      setTimeout(function () {
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        _this5.Submit_Processing_detail = false;
        _this5.$bvModal.hide("form_Update_Detail");
      }, 1000);
    },
    handleFocus: function handleFocus() {
      this.focused = true;
    },
    handleBlur: function handleBlur() {
      this.focused = false;
    },
    // Search Products
    search: function search() {
      var _this6 = this;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      if (this.search_input.length < 2) {
        return this.product_filter = [];
      }
      if (this.purchase.warehouse_id != "" && this.purchase.warehouse_id != null) {
        this.timer = setTimeout(function () {
          var product_filter = _this6.products.filter(function (product) {
            return product.code === _this6.search_input || product.barcode.includes(_this6.search_input);
          });
          if (product_filter.length === 1) {
            _this6.SearchProduct(product_filter[0]);
          } else {
            _this6.product_filter = _this6.products.filter(function (product) {
              return product.name.toLowerCase().includes(_this6.search_input.toLowerCase()) || product.code.toLowerCase().includes(_this6.search_input.toLowerCase()) || product.barcode.toLowerCase().includes(_this6.search_input.toLowerCase());
            });

            // Check if product_filter is empty and show alert
            if (_this6.product_filter.length <= 0) {
              _this6.makeToast("warning", "Product Not Found", "Warning");
            }
          }
        }, 800);
      } else {
        this.makeToast("warning", this.$t("SelectWarehouse"), this.$t("Warning"));
      }
    },
    // get Result Value Search Products
    getResultValue: function getResultValue(result) {
      return result.code + " " + "(" + result.name + ")";
    },
    // Submit Search Products
    SearchProduct: function SearchProduct(result) {
      this.product = {};
      if (this.details.length > 0 && this.details.some(function (detail) {
        return detail.code === result.code;
      })) {
        this.makeToast("warning", this.$t("AlreadyAdd"), this.$t("Warning"));
      } else {
        this.product.code = result.code;
        this.product.quantity = 1;
        this.product.stock = result.qte_purchase;
        this.product.fix_stock = result.qte;
        this.product.product_variant_id = result.product_variant_id;
        this.Get_Product_Details(result.id, result.product_variant_id);
      }
      this.search_input = '';
      this.$refs.product_autocomplete.value = "";
      this.product_filter = [];
    },
    //---------------------- Event Select Warehouse ------------------------------\\
    Selected_Warehouse: function Selected_Warehouse(value) {
      this.search_input = '';
      this.product_filter = [];
      this.Get_Products_By_Warehouse(value);
    },
    //------------------------------------ Get Products By Warehouse -------------------------\\
    Get_Products_By_Warehouse: function Get_Products_By_Warehouse(id) {
      var _this7 = this;
      // Start the progress bar.
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().set(0.1);
      axios.get("get_Products_by_warehouse/" + id + "?stock=" + 0 + "&product_service=" + 0).then(function (response) {
        _this7.products = response.data;
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
      })["catch"](function (error) {});
    },
    //----------------------------------------- Add product -------------------------\\
    add_product: function add_product() {
      if (this.details.length > 0) {
        this.Last_Detail_id();
      } else if (this.details.length === 0) {
        this.product.detail_id = 1;
      }
      this.details.push(this.product);
      if (this.product.is_imei) {
        this.Modal_Updat_Detail(this.product);
      }
    },
    //-----------------------------------Verified QTY ------------------------------\\
    Verified_Qty: function Verified_Qty(detail, id) {
      for (var i = 0; i < this.details.length; i++) {
        if (this.details[i].detail_id == id) {
          if (isNaN(detail.quantity)) {
            this.details[i].quantity = 1;
          }
          this.Calcul_Total();
          this.$forceUpdate();
        }
      }
    },
    //-----------------------------------increment QTY ------------------------------\\
    increment: function increment(detail, id) {
      for (var i = 0; i < this.details.length; i++) {
        if (this.details[i].detail_id == id) {
          this.formatNumber(this.details[i].quantity++, 2);
        }
      }
      this.$forceUpdate();
      this.Calcul_Total();
    },
    //-----------------------------------decrement QTY ------------------------------\\
    decrement: function decrement(detail, id) {
      for (var i = 0; i < this.details.length; i++) {
        if (this.details[i].detail_id == id) {
          if (detail.quantity - 1 > 0) {
            this.formatNumber(this.details[i].quantity--, 2);
          }
        }
      }
      this.$forceUpdate();
      this.Calcul_Total();
    },
    //------------------------------Formetted Numbers -------------------------\\
    formatNumber: function formatNumber(number, dec) {
      var value = (typeof number === "string" ? number : number.toString()).split(".");
      if (dec <= 0) return value[0];
      var formated = value[1] || "";
      if (formated.length > dec) return "".concat(value[0], ".").concat(formated.substr(0, dec));
      while (formated.length < dec) formated += "0";
      return "".concat(value[0], ".").concat(formated);
    },
    //-----------------------------------------Calcul Total ------------------------------\\
    Calcul_Total: function Calcul_Total() {
      this.total = 0;
      for (var i = 0; i < this.details.length; i++) {
        var tax = this.details[i].taxe * this.details[i].quantity;
        this.details[i].subtotal = parseFloat(this.details[i].quantity * this.details[i].Net_cost + tax);
        this.total = parseFloat(this.total + this.details[i].subtotal);
      }
      var total_without_discount = parseFloat(this.total - this.purchase.discount);
      this.purchase.TaxNet = parseFloat(total_without_discount * this.purchase.tax_rate / 100);
      this.GrandTotal = parseFloat(total_without_discount + this.purchase.TaxNet + this.purchase.shipping);
      var grand_total = this.GrandTotal.toFixed(2);
      this.GrandTotal = parseFloat(grand_total);
    },
    //-----------------------------------Delete Detail Product ------------------------------\\
    delete_Product_Detail: function delete_Product_Detail(id) {
      for (var i = 0; i < this.details.length; i++) {
        if (id === this.details[i].detail_id) {
          this.details.splice(i, 1);
          this.Calcul_Total();
        }
      }
    },
    //---------- keyup OrderTax
    keyup_OrderTax: function keyup_OrderTax() {
      if (isNaN(this.purchase.tax_rate)) {
        this.purchase.tax_rate = 0;
      } else if (this.purchase.tax_rate == '') {
        this.purchase.tax_rate = 0;
        this.Calcul_Total();
      } else {
        this.Calcul_Total();
      }
    },
    //---------- keyup Discount
    keyup_Discount: function keyup_Discount() {
      if (isNaN(this.purchase.discount)) {
        this.purchase.discount = 0;
      } else if (this.purchase.discount == '') {
        this.purchase.discount = 0;
        this.Calcul_Total();
      } else {
        this.Calcul_Total();
      }
    },
    //---------- keyup Shipping
    keyup_Shipping: function keyup_Shipping() {
      if (isNaN(this.purchase.shipping)) {
        this.purchase.shipping = 0;
      } else if (this.purchase.shipping == '') {
        this.purchase.shipping = 0;
        this.Calcul_Total();
      } else {
        this.Calcul_Total();
      }
    },
    //-----------------------------------Verified Form Validation ------------------------------\\
    verifiedForm: function verifiedForm() {
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
    //--------------------------------- Create Purchase -------------------------\\
    Create_Purchase: function Create_Purchase() {
      var _this8 = this;
      if (this.verifiedForm()) {
        this.SubmitProcessing = true;
        // Start the progress bar.
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().set(0.1);
        axios.post("purchases", {
          date: this.purchase.date,
          supplier_id: this.purchase.supplier_id,
          warehouse_id: this.purchase.warehouse_id,
          statut: this.purchase.statut,
          notes: this.purchase.notes,
          tax_rate: this.purchase.tax_rate ? this.purchase.tax_rate : 0,
          TaxNet: this.purchase.TaxNet ? this.purchase.TaxNet : 0,
          discount: this.purchase.discount ? this.purchase.discount : 0,
          shipping: this.purchase.shipping ? this.purchase.shipping : 0,
          GrandTotal: this.GrandTotal,
          details: this.details
        }).then(function (response) {
          // Complete the animation of theprogress bar.
          nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
          _this8.makeToast("success", _this8.$t("Successfully_Created"), _this8.$t("Success"));
          _this8.SubmitProcessing = false;
          _this8.$router.push({
            name: "index_purchases"
          });
        })["catch"](function (error) {
          // Complete the animation of theprogress bar.
          nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
          _this8.makeToast("danger", _this8.$t("InvalidData"), _this8.$t("Failed"));
          _this8.SubmitProcessing = false;
        });
      }
    },
    //-------------------------------- Get Last Detail Id -------------------------\\
    Last_Detail_id: function Last_Detail_id() {
      this.product.detail_id = 0;
      var len = this.details.length;
      this.product.detail_id = this.details[len - 1].detail_id + 1;
    },
    //---------------------------------Get Product Details ------------------------\\
    Get_Product_Details: function Get_Product_Details(product_id, variant_id) {
      var _this9 = this;
      axios.get("/show_product_data/" + product_id + "/" + variant_id).then(function (response) {
        _this9.product.discount = 0;
        _this9.product.DiscountNet = 0;
        _this9.product.discount_Method = "2";
        _this9.product.product_id = response.data.id;
        _this9.product.name = response.data.name;
        _this9.product.Net_cost = response.data.Net_cost;
        _this9.product.Unit_cost = response.data.Unit_cost;
        _this9.product.taxe = response.data.tax_cost;
        _this9.product.tax_method = response.data.tax_method;
        _this9.product.tax_percent = response.data.tax_percent;
        _this9.product.unitPurchase = response.data.unitPurchase;
        _this9.product.fix_cost = response.data.fix_cost;
        _this9.product.purchase_unit_id = response.data.purchase_unit_id;
        _this9.product.is_imei = response.data.is_imei;
        _this9.product.imei_number = '';
        _this9.add_product();
        _this9.Calcul_Total();
      });
    },
    //---------------------------------------Get Elements Purchase ------------------------------\\
    GetElements: function GetElements() {
      var _this0 = this;
      axios.get("purchases/create").then(function (response) {
        _this0.suppliers = response.data.suppliers;
        _this0.warehouses = response.data.warehouses;
        _this0.isLoading = false;
      })["catch"](function (response) {
        setTimeout(function () {
          _this0.isLoading = false;
        }, 500);
      });
    }
  },
  //-----------------------------  Created function-------------------
  created: function created() {
    this.GetElements();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=template&id=3022e24c":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=template&id=3022e24c ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "main-content"
  }, [_c("breadcumb", {
    attrs: {
      page: _vm.$t("AddPurchase"),
      folder: _vm.$t("ListPurchases")
    }
  }), _vm._v(" "), _vm.isLoading ? _c("div", {
    staticClass: "loading_page spinner spinner-primary mr-3"
  }) : _vm._e(), _vm._v(" "), !_vm.isLoading ? _c("validation-observer", {
    ref: "create_purchase"
  }, [_c("b-form", {
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.Submit_Purchase.apply(null, arguments);
      }
    }
  }, [_c("b-row", [_c("b-col", {
    attrs: {
      lg: "12",
      md: "12",
      sm: "12"
    }
  }, [_c("b-card", [_c("b-row", [_c("b-modal", {
    attrs: {
      "hide-footer": "",
      id: "open_scan",
      size: "md",
      title: "Barcode Scanner"
    }
  }, [_c("qrcode-scanner", {
    staticStyle: {
      width: "100%",
      height: "calc(100vh - 56px)"
    },
    attrs: {
      qrbox: 250,
      fps: 10
    },
    on: {
      result: _vm.onScan
    }
  })], 1), _vm._v(" "), _c("b-col", {
    staticClass: "mb-3",
    attrs: {
      lg: "4",
      md: "4",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "date",
      rules: {
        required: true
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("date") + " " + "*"
          }
        }, [_c("b-form-input", {
          attrs: {
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "date-feedback",
            type: "date"
          },
          model: {
            value: _vm.purchase.date,
            callback: function callback($$v) {
              _vm.$set(_vm.purchase, "date", $$v);
            },
            expression: "purchase.date"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "date-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }], null, false, 218487845)
  })], 1), _vm._v(" "), _c("b-col", {
    staticClass: "mb-3",
    attrs: {
      lg: "4",
      md: "4",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Supplier",
      rules: {
        required: true
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(_ref) {
        var valid = _ref.valid,
          errors = _ref.errors;
        return _c("b-form-group", {
          attrs: {
            label: _vm.$t("Supplier") + " " + "*"
          }
        }, [_c("v-select", {
          "class": {
            "is-invalid": !!errors.length
          },
          attrs: {
            state: errors[0] ? false : valid ? true : null,
            reduce: function reduce(label) {
              return label.value;
            },
            placeholder: _vm.$t("Choose_Supplier"),
            options: _vm.suppliers.map(function (suppliers) {
              return {
                label: suppliers.name,
                value: suppliers.id
              };
            })
          },
          model: {
            value: _vm.purchase.supplier_id,
            callback: function callback($$v) {
              _vm.$set(_vm.purchase, "supplier_id", $$v);
            },
            expression: "purchase.supplier_id"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", [_vm._v(_vm._s(errors[0]))])], 1);
      }
    }], null, false, 700424982)
  })], 1), _vm._v(" "), _c("b-col", {
    staticClass: "mb-3",
    attrs: {
      lg: "4",
      md: "4",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "warehouse",
      rules: {
        required: true
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(_ref2) {
        var valid = _ref2.valid,
          errors = _ref2.errors;
        return _c("b-form-group", {
          attrs: {
            label: _vm.$t("warehouse") + " " + "*"
          }
        }, [_c("v-select", {
          "class": {
            "is-invalid": !!errors.length
          },
          attrs: {
            state: errors[0] ? false : valid ? true : null,
            disabled: _vm.details.length > 0,
            reduce: function reduce(label) {
              return label.value;
            },
            placeholder: _vm.$t("Choose_Warehouse"),
            options: _vm.warehouses.map(function (warehouses) {
              return {
                label: warehouses.name,
                value: warehouses.id
              };
            })
          },
          on: {
            input: _vm.Selected_Warehouse
          },
          model: {
            value: _vm.purchase.warehouse_id,
            callback: function callback($$v) {
              _vm.$set(_vm.purchase, "warehouse_id", $$v);
            },
            expression: "purchase.warehouse_id"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", [_vm._v(_vm._s(errors[0]))])], 1);
      }
    }], null, false, 923239089)
  })], 1), _vm._v(" "), _c("b-col", {
    staticClass: "mb-5",
    attrs: {
      md: "12"
    }
  }, [_c("h6", [_vm._v(_vm._s(_vm.$t("ProductName")))]), _vm._v(" "), _c("div", {
    staticClass: "autocomplete",
    attrs: {
      id: "autocomplete"
    }
  }, [_c("div", {
    staticClass: "input-with-icon"
  }, [_c("img", {
    staticClass: "scan-icon",
    attrs: {
      src: "/assets_setup/scan.png",
      alt: "Scan"
    },
    on: {
      click: _vm.showModal
    }
  }), _vm._v(" "), _c("input", {
    ref: "product_autocomplete",
    staticClass: "autocomplete-input",
    attrs: {
      placeholder: _vm.$t("Scan_Search_Product_by_Code_Name")
    },
    on: {
      input: function input(e) {
        return _vm.search_input = e.target.value;
      },
      keyup: function keyup($event) {
        return _vm.search(_vm.search_input);
      },
      focus: _vm.handleFocus,
      blur: _vm.handleBlur
    }
  })]), _vm._v(" "), _c("ul", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.focused,
      expression: "focused"
    }],
    staticClass: "autocomplete-result-list"
  }, _vm._l(_vm.product_filter, function (product_fil) {
    return _c("li", {
      staticClass: "autocomplete-result",
      on: {
        mousedown: function mousedown($event) {
          return _vm.SearchProduct(product_fil);
        }
      }
    }, [_vm._v(_vm._s(_vm.getResultValue(product_fil)))]);
  }), 0)])]), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "12"
    }
  }, [_c("h5", [_vm._v(_vm._s(_vm.$t("order_products")) + " *")]), _vm._v(" "), _c("div", {
    staticClass: "table-responsive"
  }, [_c("table", {
    staticClass: "table table-hover"
  }, [_c("thead", {
    staticClass: "bg-gray-300"
  }, [_c("tr", [_c("th", {
    attrs: {
      scope: "col"
    }
  }, [_vm._v("#")]), _vm._v(" "), _c("th", {
    attrs: {
      scope: "col"
    }
  }, [_vm._v(_vm._s(_vm.$t("ProductName")))]), _vm._v(" "), _c("th", {
    attrs: {
      scope: "col"
    }
  }, [_vm._v(_vm._s(_vm.$t("Net_Unit_Cost")))]), _vm._v(" "), _c("th", {
    attrs: {
      scope: "col"
    }
  }, [_vm._v(_vm._s(_vm.$t("Current_stock")))]), _vm._v(" "), _c("th", {
    attrs: {
      scope: "col"
    }
  }, [_vm._v(_vm._s(_vm.$t("Qty")))]), _vm._v(" "), _c("th", {
    attrs: {
      scope: "col"
    }
  }, [_vm._v(_vm._s(_vm.$t("Discount")))]), _vm._v(" "), _c("th", {
    attrs: {
      scope: "col"
    }
  }, [_vm._v(_vm._s(_vm.$t("Tax")))]), _vm._v(" "), _c("th", {
    attrs: {
      scope: "col"
    }
  }, [_vm._v(_vm._s(_vm.$t("SubTotal")))]), _vm._v(" "), _c("th", {
    staticClass: "text-center",
    attrs: {
      scope: "col"
    }
  }, [_c("i", {
    staticClass: "fa fa-trash"
  })])])]), _vm._v(" "), _c("tbody", [_vm.details.length <= 0 ? _c("tr", [_c("td", {
    attrs: {
      colspan: "9"
    }
  }, [_vm._v(_vm._s(_vm.$t("NodataAvailable")))])]) : _vm._e(), _vm._v(" "), _vm._l(_vm.details, function (detail) {
    return _c("tr", [_c("td", [_vm._v(_vm._s(detail.detail_id))]), _vm._v(" "), _c("td", [_c("span", [_vm._v(_vm._s(detail.code))]), _vm._v(" "), _c("br"), _vm._v(" "), _c("span", {
      staticClass: "badge badge-success"
    }, [_vm._v(_vm._s(detail.name))])]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.currentUser.currency) + " " + _vm._s(_vm.formatNumber(detail.Net_cost, 3)))]), _vm._v(" "), _c("td", [_c("span", {
      staticClass: "badge badge-outline-warning"
    }, [_vm._v(_vm._s(detail.stock) + " " + _vm._s(detail.unitPurchase))])]), _vm._v(" "), _c("td", [_c("div", {
      staticClass: "quantity"
    }, [_c("b-input-group", [_c("b-input-group-prepend", [_c("span", {
      staticClass: "btn btn-primary btn-sm",
      on: {
        click: function click($event) {
          return _vm.decrement(detail, detail.detail_id);
        }
      }
    }, [_vm._v("-")])]), _vm._v(" "), _c("input", {
      directives: [{
        name: "model",
        rawName: "v-model.number",
        value: detail.quantity,
        expression: "detail.quantity",
        modifiers: {
          number: true
        }
      }],
      staticClass: "form-control",
      attrs: {
        min: 0.0
      },
      domProps: {
        value: detail.quantity
      },
      on: {
        keyup: function keyup($event) {
          return _vm.Verified_Qty(detail, detail.detail_id);
        },
        input: function input($event) {
          if ($event.target.composing) return;
          _vm.$set(detail, "quantity", _vm._n($event.target.value));
        },
        blur: function blur($event) {
          return _vm.$forceUpdate();
        }
      }
    }), _vm._v(" "), _c("b-input-group-append", [_c("span", {
      staticClass: "btn btn-primary btn-sm",
      on: {
        click: function click($event) {
          return _vm.increment(detail, detail.detail_id);
        }
      }
    }, [_vm._v("+")])])], 1)], 1)]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.currentUser.currency) + " " + _vm._s(_vm.formatNumber(detail.DiscountNet * detail.quantity, 2)))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.currentUser.currency) + " " + _vm._s(_vm.formatNumber(detail.taxe * detail.quantity, 2)))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.currentUser.currency) + " " + _vm._s(detail.subtotal.toFixed(2)))]), _vm._v(" "), _c("td", [_vm.currentUserPermissions && _vm.currentUserPermissions.includes("edit_product_purchase") ? _c("i", {
      staticClass: "i-Edit text-25 text-success",
      on: {
        click: function click($event) {
          return _vm.Modal_Updat_Detail(detail);
        }
      }
    }) : _vm._e(), _vm._v(" "), _c("i", {
      staticClass: "i-Close-Window text-25 text-danger",
      on: {
        click: function click($event) {
          return _vm.delete_Product_Detail(detail.detail_id);
        }
      }
    })])]);
  })], 2)])])]), _vm._v(" "), _c("div", {
    staticClass: "offset-md-9 col-md-3 mt-4"
  }, [_c("table", {
    staticClass: "table table-striped table-sm"
  }, [_c("tbody", [_c("tr", [_c("td", {
    staticClass: "bold"
  }, [_vm._v(_vm._s(_vm.$t("OrderTax")))]), _vm._v(" "), _c("td", [_c("span", [_vm._v(_vm._s(_vm.currentUser.currency) + " " + _vm._s(_vm.purchase.TaxNet.toFixed(2)) + " (" + _vm._s(_vm.formatNumber(_vm.purchase.tax_rate, 2)) + " %)")])])]), _vm._v(" "), _c("tr", [_c("td", {
    staticClass: "bold"
  }, [_vm._v(_vm._s(_vm.$t("Discount")))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.currentUser.currency) + " " + _vm._s(_vm.purchase.discount.toFixed(2)))])]), _vm._v(" "), _c("tr", [_c("td", {
    staticClass: "bold"
  }, [_vm._v(_vm._s(_vm.$t("Shipping")))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.currentUser.currency) + " " + _vm._s(_vm.purchase.shipping.toFixed(2)))])]), _vm._v(" "), _c("tr", [_c("td", [_c("span", {
    staticClass: "font-weight-bold"
  }, [_vm._v(_vm._s(_vm.$t("Total")))])]), _vm._v(" "), _c("td", [_c("span", {
    staticClass: "font-weight-bold"
  }, [_vm._v(_vm._s(_vm.currentUser.currency) + " " + _vm._s(_vm.GrandTotal.toFixed(2)))])])])])])]), _vm._v(" "), _vm.currentUserPermissions && _vm.currentUserPermissions.includes("edit_tax_discount_shipping_purchase") ? _c("b-col", {
    staticClass: "mb-3",
    attrs: {
      lg: "4",
      md: "4",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Order Tax",
      rules: {
        regex: /^\d*\.?\d*$/
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("OrderTax")
          }
        }, [_c("b-input-group", {
          attrs: {
            append: "%"
          }
        }, [_c("b-form-input", {
          attrs: {
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "OrderTax-feedback",
            label: "Order Tax"
          },
          on: {
            keyup: function keyup($event) {
              return _vm.keyup_OrderTax();
            }
          },
          model: {
            value: _vm.purchase.tax_rate,
            callback: function callback($$v) {
              _vm.$set(_vm.purchase, "tax_rate", _vm._n($$v));
            },
            expression: "purchase.tax_rate"
          }
        })], 1), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "OrderTax-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }], null, false, 2647717874)
  })], 1) : _vm._e(), _vm._v(" "), _vm.currentUserPermissions && _vm.currentUserPermissions.includes("edit_tax_discount_shipping_purchase") ? _c("b-col", {
    staticClass: "mb-3",
    attrs: {
      lg: "4",
      md: "4",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Discount",
      rules: {
        regex: /^\d*\.?\d*$/
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("Discount")
          }
        }, [_c("b-input-group", {
          attrs: {
            append: _vm.currentUser.currency
          }
        }, [_c("b-form-input", {
          attrs: {
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "Discount-feedback",
            label: "Discount"
          },
          on: {
            keyup: function keyup($event) {
              return _vm.keyup_Discount();
            }
          },
          model: {
            value: _vm.purchase.discount,
            callback: function callback($$v) {
              _vm.$set(_vm.purchase, "discount", _vm._n($$v));
            },
            expression: "purchase.discount"
          }
        })], 1), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "Discount-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }], null, false, 98387733)
  })], 1) : _vm._e(), _vm._v(" "), _vm.currentUserPermissions && _vm.currentUserPermissions.includes("edit_tax_discount_shipping_purchase") ? _c("b-col", {
    staticClass: "mb-3",
    attrs: {
      lg: "4",
      md: "4",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Shipping",
      rules: {
        regex: /^\d*\.?\d*$/
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("Shipping")
          }
        }, [_c("b-input-group", {
          attrs: {
            append: _vm.currentUser.currency
          }
        }, [_c("b-form-input", {
          attrs: {
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "Shipping-feedback",
            label: "Shipping"
          },
          on: {
            keyup: function keyup($event) {
              return _vm.keyup_Shipping();
            }
          },
          model: {
            value: _vm.purchase.shipping,
            callback: function callback($$v) {
              _vm.$set(_vm.purchase, "shipping", _vm._n($$v));
            },
            expression: "purchase.shipping"
          }
        })], 1), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "Shipping-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }], null, false, 497113045)
  })], 1) : _vm._e(), _vm._v(" "), _c("b-col", {
    staticClass: "mb-3",
    attrs: {
      lg: "4",
      md: "4",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Status",
      rules: {
        required: true
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(_ref3) {
        var valid = _ref3.valid,
          errors = _ref3.errors;
        return _c("b-form-group", {
          attrs: {
            label: _vm.$t("Status") + " " + "*"
          }
        }, [_c("v-select", {
          "class": {
            "is-invalid": !!errors.length
          },
          attrs: {
            state: errors[0] ? false : valid ? true : null,
            reduce: function reduce(label) {
              return label.value;
            },
            placeholder: _vm.$t("Choose_Status"),
            options: [{
              label: "received",
              value: "received"
            }, {
              label: "pending",
              value: "pending"
            }, {
              label: "ordered",
              value: "ordered"
            }]
          },
          model: {
            value: _vm.purchase.statut,
            callback: function callback($$v) {
              _vm.$set(_vm.purchase, "statut", $$v);
            },
            expression: "purchase.statut"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", [_vm._v(_vm._s(errors[0]))])], 1);
      }
    }], null, false, 3503637598)
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "12"
    }
  }, [_c("b-form-group", {
    attrs: {
      label: _vm.$t("Note")
    }
  }, [_c("textarea", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.purchase.notes,
      expression: "purchase.notes"
    }],
    staticClass: "form-control",
    attrs: {
      rows: "4",
      placeholder: _vm.$t("Afewwords")
    },
    domProps: {
      value: _vm.purchase.notes
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.purchase, "notes", $event.target.value);
      }
    }
  })])], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "12"
    }
  }, [_c("b-form-group", [_c("b-button", {
    attrs: {
      variant: "primary",
      disabled: _vm.SubmitProcessing
    },
    on: {
      click: _vm.Submit_Purchase
    }
  }, [_c("i", {
    staticClass: "i-Yes me-2 font-weight-bold"
  }), _vm._v(" " + _vm._s(_vm.$t("submit")))]), _vm._v(" "), _vm.SubmitProcessing ? _vm._m(0) : _vm._e()], 1)], 1)], 1)], 1)], 1)], 1)], 1)], 1) : _vm._e(), _vm._v(" "), _c("validation-observer", {
    ref: "Update_Detail_purchase"
  }, [_c("b-modal", {
    attrs: {
      "hide-footer": "",
      size: "lg",
      id: "form_Update_Detail",
      title: _vm.detail.name
    }
  }, [_c("b-form", {
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.submit_Update_Detail.apply(null, arguments);
      }
    }
  }, [_c("b-row", [_c("b-col", {
    attrs: {
      lg: "6",
      md: "6",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Product Cost",
      rules: {
        required: true,
        regex: /^\d*\.?\d*$/
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("ProductCost") + " " + "*",
            id: "cost-input"
          }
        }, [_c("b-form-input", {
          attrs: {
            label: "Product Cost",
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "cost-feedback"
          },
          model: {
            value: _vm.detail.Unit_cost,
            callback: function callback($$v) {
              _vm.$set(_vm.detail, "Unit_cost", _vm._n($$v));
            },
            expression: "detail.Unit_cost"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "cost-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }])
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      lg: "6",
      md: "6",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Tax Method",
      rules: {
        required: true
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(_ref4) {
        var valid = _ref4.valid,
          errors = _ref4.errors;
        return _c("b-form-group", {
          attrs: {
            label: _vm.$t("TaxMethod") + " " + "*"
          }
        }, [_c("v-select", {
          "class": {
            "is-invalid": !!errors.length
          },
          attrs: {
            state: errors[0] ? false : valid ? true : null,
            reduce: function reduce(label) {
              return label.value;
            },
            placeholder: _vm.$t("Choose_Method"),
            options: [{
              label: "Exclusive",
              value: "1"
            }, {
              label: "Inclusive",
              value: "2"
            }]
          },
          model: {
            value: _vm.detail.tax_method,
            callback: function callback($$v) {
              _vm.$set(_vm.detail, "tax_method", $$v);
            },
            expression: "detail.tax_method"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", [_vm._v(_vm._s(errors[0]))])], 1);
      }
    }])
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      lg: "6",
      md: "6",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Order Tax",
      rules: {
        required: true,
        regex: /^\d*\.?\d*$/
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("OrderTax") + " " + "*"
          }
        }, [_c("b-input-group", {
          attrs: {
            append: "%"
          }
        }, [_c("b-form-input", {
          attrs: {
            label: "Order Tax",
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "OrderTax-feedback"
          },
          model: {
            value: _vm.detail.tax_percent,
            callback: function callback($$v) {
              _vm.$set(_vm.detail, "tax_percent", _vm._n($$v));
            },
            expression: "detail.tax_percent"
          }
        })], 1), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "OrderTax-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }])
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      lg: "6",
      md: "6",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Discount Method",
      rules: {
        required: true
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(_ref5) {
        var valid = _ref5.valid,
          errors = _ref5.errors;
        return _c("b-form-group", {
          attrs: {
            label: _vm.$t("Discount_Method") + " " + "*"
          }
        }, [_c("v-select", {
          "class": {
            "is-invalid": !!errors.length
          },
          attrs: {
            reduce: function reduce(label) {
              return label.value;
            },
            placeholder: _vm.$t("Choose_Method"),
            state: errors[0] ? false : valid ? true : null,
            options: [{
              label: "Percent %",
              value: "1"
            }, {
              label: "Fixed",
              value: "2"
            }]
          },
          model: {
            value: _vm.detail.discount_Method,
            callback: function callback($$v) {
              _vm.$set(_vm.detail, "discount_Method", $$v);
            },
            expression: "detail.discount_Method"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", [_vm._v(_vm._s(errors[0]))])], 1);
      }
    }])
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      lg: "6",
      md: "6",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Discount Rate",
      rules: {
        required: true,
        regex: /^\d*\.?\d*$/
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("Discount") + " " + "*"
          }
        }, [_c("b-form-input", {
          attrs: {
            label: "Discount",
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "Discount-feedback"
          },
          model: {
            value: _vm.detail.discount,
            callback: function callback($$v) {
              _vm.$set(_vm.detail, "discount", _vm._n($$v));
            },
            expression: "detail.discount"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "Discount-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }])
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      lg: "6",
      md: "6",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Unit Purchase",
      rules: {
        required: true
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(_ref6) {
        var valid = _ref6.valid,
          errors = _ref6.errors;
        return _c("b-form-group", {
          attrs: {
            label: _vm.$t("UnitPurchase") + " " + "*"
          }
        }, [_c("v-select", {
          "class": {
            "is-invalid": !!errors.length
          },
          attrs: {
            state: errors[0] ? false : valid ? true : null,
            placeholder: _vm.$t("Choose_Unit_Purchase"),
            reduce: function reduce(label) {
              return label.value;
            },
            options: _vm.units.map(function (units) {
              return {
                label: units.name,
                value: units.id
              };
            })
          },
          model: {
            value: _vm.detail.purchase_unit_id,
            callback: function callback($$v) {
              _vm.$set(_vm.detail, "purchase_unit_id", $$v);
            },
            expression: "detail.purchase_unit_id"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", [_vm._v(_vm._s(errors[0]))])], 1);
      }
    }])
  })], 1), _vm._v(" "), _c("b-col", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.detail.is_imei,
      expression: "detail.is_imei"
    }],
    attrs: {
      lg: "12",
      md: "12",
      sm: "12"
    }
  }, [_c("b-form-group", {
    attrs: {
      label: _vm.$t("Add_product_IMEI_Serial_number")
    }
  }, [_c("b-form-input", {
    attrs: {
      label: "Add_product_IMEI_Serial_number",
      placeholder: _vm.$t("Add_product_IMEI_Serial_number")
    },
    model: {
      value: _vm.detail.imei_number,
      callback: function callback($$v) {
        _vm.$set(_vm.detail, "imei_number", $$v);
      },
      expression: "detail.imei_number"
    }
  })], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "12"
    }
  }, [_c("b-form-group", [_c("b-button", {
    attrs: {
      variant: "primary",
      type: "submit",
      disabled: _vm.Submit_Processing_detail
    }
  }, [_vm._v(_vm._s(_vm.$t("submit")))]), _vm._v(" "), _vm.Submit_Processing_detail ? _vm._m(1) : _vm._e()], 1)], 1)], 1)], 1)], 1)], 1)], 1);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "typo__p"
  }, [_c("div", {
    staticClass: "spinner sm spinner-primary mt-3"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "typo__p"
  }, [_c("div", {
    staticClass: "spinner sm spinner-primary mt-3"
  })]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=style&index=0&id=3022e24c&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=style&index=0&id=3022e24c&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.input-with-icon {\n  display: flex;\n  align-items: center;\n}\n.scan-icon {\n  width: 50px; /* Adjust size as needed */\n  height: 50px;\n  margin-right: 8px; /* Adjust spacing as needed */\n  cursor: pointer;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=style&index=0&id=3022e24c&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=style&index=0&id=3022e24c&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_purchase_vue_vue_type_style_index_0_id_3022e24c_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./create_purchase.vue?vue&type=style&index=0&id=3022e24c&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=style&index=0&id=3022e24c&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_purchase_vue_vue_type_style_index_0_id_3022e24c_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_purchase_vue_vue_type_style_index_0_id_3022e24c_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/purchases/create_purchase.vue":
/*!*********************************************************************!*\
  !*** ./resources/src/views/app/pages/purchases/create_purchase.vue ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _create_purchase_vue_vue_type_template_id_3022e24c__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create_purchase.vue?vue&type=template&id=3022e24c */ "./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=template&id=3022e24c");
/* harmony import */ var _create_purchase_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create_purchase.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=script&lang=js");
/* harmony import */ var _create_purchase_vue_vue_type_style_index_0_id_3022e24c_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./create_purchase.vue?vue&type=style&index=0&id=3022e24c&lang=css */ "./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=style&index=0&id=3022e24c&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _create_purchase_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _create_purchase_vue_vue_type_template_id_3022e24c__WEBPACK_IMPORTED_MODULE_0__.render,
  _create_purchase_vue_vue_type_template_id_3022e24c__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/src/views/app/pages/purchases/create_purchase.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=script&lang=js":
/*!*********************************************************************************************!*\
  !*** ./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_create_purchase_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./create_purchase.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_create_purchase_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=style&index=0&id=3022e24c&lang=css":
/*!*****************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=style&index=0&id=3022e24c&lang=css ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_purchase_vue_vue_type_style_index_0_id_3022e24c_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./create_purchase.vue?vue&type=style&index=0&id=3022e24c&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=style&index=0&id=3022e24c&lang=css");


/***/ }),

/***/ "./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=template&id=3022e24c":
/*!***************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=template&id=3022e24c ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_purchase_vue_vue_type_template_id_3022e24c__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_purchase_vue_vue_type_template_id_3022e24c__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_purchase_vue_vue_type_template_id_3022e24c__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./create_purchase.vue?vue&type=template&id=3022e24c */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/purchases/create_purchase.vue?vue&type=template&id=3022e24c");


/***/ })

}]);