"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["store_adjustment"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/adjustment/Create_Adjustment.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/adjustment/Create_Adjustment.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nprogress */ "./node_modules/nprogress/nprogress.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_0__);
var _methods;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  metaInfo: {
    title: "Create Adjustment"
  },
  data: function data() {
    return {
      focused: false,
      timer: null,
      search_input: '',
      product_filter: [],
      isLoading: true,
      SubmitProcessing: false,
      warehouses: [],
      products: [],
      details: [],
      expectedItems: [],
      // Список всех товаров, подлежащих ревизии
      scannedItems: [],
      // Отсканированные товары
      extraItems: [],
      // Лишние товары (не входят в список)
      currentScannedProduct: null,
      // Последний отсканированный товар
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
  mounted: function mounted() {
    // Пока просто захардкоженный список для ревизии
    this.expectedItems = [{
      id: 1,
      name: "Кольцо",
      barcode: "000123",
      weight: 5.2,
      carat: "0.5"
    }, {
      id: 2,
      name: "Серьги",
      barcode: "000124",
      weight: 3.1,
      carat: "0.3"
    }
    // и т.д.
    ];
  },
  methods: (_methods = {
    handleFocus: function handleFocus() {
      this.focused = true;
    },
    handleBlur: function handleBlur() {
      this.focused = false;
    },
    showModal: function showModal() {
      this.$bvModal.show('open_scan');
    },
    // При сканировании QR/Barcode
    onScan: function onScan(decodedText) {
      this.handleScan(decodedText); // <- теперь вызываем корректный метод
      this.$bvModal.hide('open_scan');
    },
    // Обработка логики ревизии
    handleScan: function handleScan(barcode) {
      var product = this.expectedItems.find(function (p) {
        return p.barcode === barcode;
      });
      if (!product) {
        if (!this.extraItems.find(function (p) {
          return p.barcode === barcode;
        })) {
          this.extraItems.push({
            barcode: barcode
          });
          this.playSound('error');
          this.makeToast("danger", "Товар не числится в списке ревизии", "Ошибка");
        }
        return;
      }
      var alreadyScanned = this.details.find(function (p) {
        return p.code === product.code;
      });
      if (alreadyScanned) {
        this.playSound('error');
        this.makeToast("warning", "Этот товар уже просканирован", "Повтор");
        return;
      }
      this.SearchProduct(product);
      this.currentScannedProduct = product;
      this.playSound('success');
    },
    playSound: function playSound(type) {
      var audio = new Audio("/sounds/".concat(type === 'error' ? 'scan_error.mp3' : 'scan_success.mp3'));
      audio.play();
    },
    // Всплывающее сообщение
    makeToast: function makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },
    // Search Products
    search: function search() {
      var _this = this;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      if (this.search_input.length < 2) {
        return this.product_filter = [];
      }
      if (this.adjustment.warehouse_id != "" && this.adjustment.warehouse_id != null) {
        this.timer = setTimeout(function () {
          var product_filter = _this.products.filter(function (product) {
            return product.code === _this.search_input || product.barcode.includes(_this.search_input);
          });
          if (product_filter.length === 1) {
            _this.SearchProduct(product_filter[0]);
          } else {
            _this.product_filter = _this.products.filter(function (product) {
              return product.name.toLowerCase().includes(_this.search_input.toLowerCase()) || product.code.toLowerCase().includes(_this.search_input.toLowerCase()) || product.barcode.toLowerCase().includes(_this.search_input.toLowerCase());
            });
            if (_this.product_filter.length <= 0) {
              _this.makeToast("warning", "Product Not Found", "Warning");
            }
          }
        }, 800);
      } else {
        this.makeToast("warning", this.$t("SelectWarehouse"), this.$t("Warning"));
      }
    },
    SearchProduct: function SearchProduct(result) {
      this.product = {};
      if (this.details.length > 0 && this.details.some(function (detail) {
        return detail.code === result.code;
      })) {
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
    getResultValue: function getResultValue(result) {
      return result.code + " " + "(" + result.name + ")";
    },
    Submit_Adjustment: function Submit_Adjustment() {
      var _this2 = this;
      this.$refs.Create_adjustment.validate().then(function (success) {
        if (!success) {
          _this2.makeToast("danger", _this2.$t("Please_fill_the_form_correctly"), _this2.$t("Failed"));
        } else {
          _this2.Create_Adjustment();
        }
      });
    },
    getValidationState: function getValidationState(_ref) {
      var dirty = _ref.dirty,
        validated = _ref.validated,
        _ref$valid = _ref.valid,
        valid = _ref$valid === void 0 ? null : _ref$valid;
      return dirty || validated ? valid : null;
    }
  }, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_methods, "makeToast", function makeToast(variant, msg, title) {
    this.$root.$bvToast.toast(msg, {
      title: title,
      variant: variant,
      solid: true
    });
  }), "Selected_Warehouse", function Selected_Warehouse(value) {
    this.search_input = '';
    this.product_filter = [];
    this.Get_Products_By_Warehouse(value);
  }), "Get_Products_By_Warehouse", function Get_Products_By_Warehouse(id) {
    var _this3 = this;
    nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
    nprogress__WEBPACK_IMPORTED_MODULE_0___default().set(0.1);
    axios.get("get_Products_by_warehouse/" + id + "?stock=0&product_service=0&product_combo=1").then(function (response) {
      _this3.products = response.data;
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
      _this3.expectedItems = _this3.products.map(function (p) {
        return _objectSpread(_objectSpread({}, p), {}, {
          barcode: p.barcode
        });
      });
    })["catch"](function (error) {});
  }), "add_product", function add_product() {
    if (this.details.length > 0) {
      this.detail_order_id();
    } else if (this.details.length === 0) {
      this.product.detail_id = 1;
    }
    this.details.push(this.product);
  }), "Verified_Qty", function Verified_Qty(detail, id) {
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
  }), "increment", function increment(detail, id) {
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
  }), "decrement", function decrement(detail, id) {
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
  }), "formatNumber", function formatNumber(number, dec) {
    var value = (typeof number === "string" ? number : number.toString()).split(".");
    if (dec <= 0) return value[0];
    var formated = value[1] || "";
    if (formated.length > dec) return "".concat(value[0], ".").concat(formated.substr(0, dec));
    while (formated.length < dec) formated += "0";
    return "".concat(value[0], ".").concat(formated);
  }), "Remove_Product", function Remove_Product(id) {
    for (var i = 0; i < this.details.length; i++) {
      if (id === this.details[i].detail_id) {
        this.details.splice(i, 1);
      }
    }
  }), "verifiedForm", function verifiedForm() {
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
  }), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_methods, "Create_Adjustment", function Create_Adjustment() {
    var _this4 = this;
    if (this.verifiedForm()) {
      this.SubmitProcessing = true;
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().set(0.1);
      axios.post("adjustments", {
        warehouse_id: this.adjustment.warehouse_id,
        date: this.adjustment.date,
        notes: this.adjustment.notes,
        details: this.details
      }).then(function () {
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        _this4.SubmitProcessing = false;
        _this4.$router.push({
          name: "index_adjustment"
        });
        _this4.makeToast("success", _this4.$t("Successfully_Created"), _this4.$t("Success"));
      })["catch"](function (error) {
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        if (error.errors && error.errors.details.length) {
          _this4.makeToast("danger", error.errors.details[0], _this4.$t("Failed"));
        } else {
          _this4.makeToast("danger", _this4.$t("InvalidData"), _this4.$t("Failed"));
        }
        _this4.SubmitProcessing = false;
      });
    }
  }), "detail_order_id", function detail_order_id() {
    this.product.detail_id = 0;
    var len = this.details.length;
    this.product.detail_id = this.details[len - 1].detail_id + 1;
  }), "Get_Product_Details", function Get_Product_Details(product_id, variant_id) {
    var _this5 = this;
    axios.get("/show_product_data/" + product_id + "/" + variant_id).then(function (response) {
      _this5.product.product_id = response.data.id;
      _this5.product.name = response.data.name;
      _this5.product.type = "add";
      _this5.product.unit = response.data.unit;
      _this5.add_product();
    });
  }), "Get_Elements", function Get_Elements() {
    var _this6 = this;
    axios.get("adjustments/create").then(function (response) {
      _this6.warehouses = response.data.warehouses;
      _this6.isLoading = false;
    })["catch"](function () {
      setTimeout(function () {
        _this6.isLoading = false;
      }, 500);
    });
  }), "handleScan", function handleScan(barcode) {
    var product = this.expectedItems.find(function (p) {
      return p.barcode === barcode;
    });
    if (!product) {
      if (!this.extraItems.find(function (p) {
        return p.barcode === barcode;
      })) {
        this.extraItems.push({
          barcode: barcode
        });
        this.playSound('error');
        this.makeToast("danger", "Товар не числится в списке ревизии", "Ошибка");
      }
      return;
    }
    var alreadyScanned = this.details.find(function (p) {
      return p.code === product.code;
    });
    if (alreadyScanned) {
      this.playSound('error');
      this.makeToast("warning", "Этот товар уже просканирован", "Повтор");
      return;
    }
    this.SearchProduct(product);
    this.currentScannedProduct = product;
    this.playSound('success');
  }), "playSound", function playSound(type) {
    var audio = new Audio("/sounds/".concat(type === 'error' ? 'scan_error.mp3' : 'scan_success.mp3'));
    audio.play();
  })),
  //----------------------------- Created function-------------------\\
  created: function created() {
    this.Get_Elements();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/adjustment/Create_Adjustment.vue?vue&type=template&id=456f1ecb":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/adjustment/Create_Adjustment.vue?vue&type=template&id=456f1ecb ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************/
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
      page: _vm.$t("CreateAdjustment"),
      folder: _vm.$t("ListAdjustments")
    }
  }), _vm._v(" "), _vm.isLoading ? _c("div", {
    staticClass: "loading_page spinner spinner-primary mr-3"
  }) : _vm._e(), _vm._v(" "), !_vm.isLoading ? _c("validation-observer", {
    ref: "Create_adjustment"
  }, [_c("b-form", {
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.Submit_Adjustment.apply(null, arguments);
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
      md: "6"
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
      fn: function fn(_ref) {
        var valid = _ref.valid,
          errors = _ref.errors;
        return _c("b-form-group", {
          attrs: {
            label: _vm.$t("warehouse") + " *"
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
            options: _vm.warehouses.map(function (w) {
              return {
                label: w.name,
                value: w.id
              };
            })
          },
          on: {
            input: _vm.Selected_Warehouse
          },
          model: {
            value: _vm.adjustment.warehouse_id,
            callback: function callback($$v) {
              _vm.$set(_vm.adjustment, "warehouse_id", $$v);
            },
            expression: "adjustment.warehouse_id"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", [_vm._v(_vm._s(errors[0]))])], 1);
      }
    }], null, false, 508530815)
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      lg: "6",
      md: "6",
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
            label: _vm.$t("date") + " *"
          }
        }, [_c("b-form-input", {
          attrs: {
            state: _vm.getValidationState(validationContext),
            type: "date"
          },
          model: {
            value: _vm.adjustment.date,
            callback: function callback($$v) {
              _vm.$set(_vm.adjustment, "date", $$v);
            },
            expression: "adjustment.date"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }], null, false, 3431026169)
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
      key: product_fil.code,
      staticClass: "autocomplete-result",
      on: {
        mousedown: function mousedown($event) {
          return _vm.SearchProduct(product_fil);
        }
      }
    }, [_vm._v("\n                      " + _vm._s(_vm.getResultValue(product_fil)) + "\n                    ")]);
  }), 0)])]), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "12"
    }
  }, [_c("div", {
    staticClass: "table-responsive"
  }, [_c("table", {
    staticClass: "table table-hover"
  }, [_c("thead", {
    staticClass: "bg-gray-300"
  }, [_c("tr", [_c("th", [_vm._v("#")]), _vm._v(" "), _c("th", [_vm._v(_vm._s(_vm.$t("CodeProduct")))]), _vm._v(" "), _c("th", [_vm._v(_vm._s(_vm.$t("ProductName")))]), _vm._v(" "), _c("th", [_vm._v(_vm._s(_vm.$t("CurrentStock")))]), _vm._v(" "), _c("th", [_vm._v(_vm._s(_vm.$t("Qty")))]), _vm._v(" "), _c("th", [_vm._v(_vm._s(_vm.$t("type")))]), _vm._v(" "), _c("th", {
    staticClass: "text-center"
  }, [_c("i", {
    staticClass: "fa fa-trash"
  })])])]), _vm._v(" "), _c("tbody", [_vm.details.length <= 0 ? _c("tr", [_c("td", {
    attrs: {
      colspan: "7"
    }
  }, [_vm._v(_vm._s(_vm.$t("NodataAvailable")))])]) : _vm._e(), _vm._v(" "), _vm._l(_vm.details, function (detail) {
    return _c("tr", {
      key: detail.detail_id
    }, [_c("td", [_vm._v(_vm._s(detail.detail_id))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(detail.code))]), _vm._v(" "), _c("td", [_vm._v("(" + _vm._s(detail.name) + ")")]), _vm._v(" "), _c("td", [_c("span", {
      staticClass: "badge badge-outline-warning"
    }, [_vm._v(_vm._s(detail.current) + " " + _vm._s(detail.unit))])]), _vm._v(" "), _c("td", [_c("div", {
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
        min: 0.0,
        max: detail.current
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
    }, [_vm._v("+")])])], 1)], 1)]), _vm._v(" "), _c("td", [_c("select", {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: detail.type,
        expression: "detail.type"
      }],
      staticClass: "form-control",
      on: {
        change: [function ($event) {
          var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
            return o.selected;
          }).map(function (o) {
            var val = "_value" in o ? o._value : o.value;
            return val;
          });
          _vm.$set(detail, "type", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
        }, function ($event) {
          return _vm.Verified_Qty(detail, detail.detail_id);
        }]
      }
    }, [_c("option", {
      attrs: {
        value: "add"
      }
    }, [_vm._v(_vm._s(_vm.$t("Addition")))]), _vm._v(" "), _c("option", {
      attrs: {
        value: "sub"
      }
    }, [_vm._v(_vm._s(_vm.$t("Subtraction")))])])]), _vm._v(" "), _c("td", [_c("a", {
      staticClass: "btn btn-icon btn-sm",
      attrs: {
        title: "Delete"
      },
      on: {
        click: function click($event) {
          return _vm.Remove_Product(detail.detail_id);
        }
      }
    }, [_c("i", {
      staticClass: "i-Close-Window text-25 text-danger"
    })])])]);
  })], 2)])])]), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "12"
    }
  }, [_c("b-form-group", {
    staticClass: "mt-4",
    attrs: {
      label: _vm.$t("Note")
    }
  }, [_c("textarea", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.adjustment.notes,
      expression: "adjustment.notes"
    }],
    staticClass: "form-control",
    attrs: {
      rows: "4",
      placeholder: _vm.$t("Afewwords")
    },
    domProps: {
      value: _vm.adjustment.notes
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.adjustment, "notes", $event.target.value);
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
      click: _vm.Submit_Adjustment
    }
  }, [_c("i", {
    staticClass: "i-Yes me-2 font-weight-bold"
  }), _vm._v(" " + _vm._s(_vm.$t("submit")) + "\n                  ")]), _vm._v(" "), _vm.SubmitProcessing ? _vm._m(0) : _vm._e()], 1)], 1)], 1)], 1)], 1)], 1)], 1)], 1) : _vm._e(), _vm._v(" "), _c("b-card", {
    staticClass: "fixed-bottom bg-light p-2 border-top shadow"
  }, [_c("div", {
    staticClass: "d-flex justify-content-between"
  }, [_c("div", [_c("strong", [_vm._v("Ожидается:")]), _vm._v(" " + _vm._s(_vm.expectedItems.length))]), _vm._v(" "), _c("div", [_c("strong", [_vm._v("Отсканировано:")]), _vm._v(" " + _vm._s(_vm.details.length))]), _vm._v(" "), _c("div", [_c("strong", [_vm._v("Лишние:")]), _vm._v(" " + _vm._s(_vm.extraItems.length))])])]), _vm._v(" "), _vm.currentScannedProduct ? _c("b-card", {
    staticClass: "mt-3"
  }, [_c("h5", [_vm._v("Последний товар")]), _vm._v(" "), _c("p", [_c("strong", [_vm._v("Имя:")]), _vm._v(" " + _vm._s(_vm.currentScannedProduct.name))]), _vm._v(" "), _c("p", [_c("strong", [_vm._v("Вес:")]), _vm._v(" " + _vm._s(_vm.currentScannedProduct.weight) + " г")]), _vm._v(" "), _c("p", [_c("strong", [_vm._v("Карат:")]), _vm._v(" " + _vm._s(_vm.currentScannedProduct.carat))]), _vm._v(" "), _c("b-link", {
    attrs: {
      href: "/products/edit/".concat(_vm.currentScannedProduct.id),
      target: "_blank"
    }
  }, [_vm._v("Открыть карточку товара")])], 1) : _vm._e()], 1);
};
var staticRenderFns = [function () {
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

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/adjustment/Create_Adjustment.vue?vue&type=style&index=0&id=456f1ecb&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/adjustment/Create_Adjustment.vue?vue&type=style&index=0&id=456f1ecb&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/adjustment/Create_Adjustment.vue?vue&type=style&index=0&id=456f1ecb&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/adjustment/Create_Adjustment.vue?vue&type=style&index=0&id=456f1ecb&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_Adjustment_vue_vue_type_style_index_0_id_456f1ecb_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Create_Adjustment.vue?vue&type=style&index=0&id=456f1ecb&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/adjustment/Create_Adjustment.vue?vue&type=style&index=0&id=456f1ecb&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_Adjustment_vue_vue_type_style_index_0_id_456f1ecb_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_Adjustment_vue_vue_type_style_index_0_id_456f1ecb_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/adjustment/Create_Adjustment.vue":
/*!************************************************************************!*\
  !*** ./resources/src/views/app/pages/adjustment/Create_Adjustment.vue ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Create_Adjustment_vue_vue_type_template_id_456f1ecb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Create_Adjustment.vue?vue&type=template&id=456f1ecb */ "./resources/src/views/app/pages/adjustment/Create_Adjustment.vue?vue&type=template&id=456f1ecb");
/* harmony import */ var _Create_Adjustment_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Create_Adjustment.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/adjustment/Create_Adjustment.vue?vue&type=script&lang=js");
/* harmony import */ var _Create_Adjustment_vue_vue_type_style_index_0_id_456f1ecb_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Create_Adjustment.vue?vue&type=style&index=0&id=456f1ecb&lang=css */ "./resources/src/views/app/pages/adjustment/Create_Adjustment.vue?vue&type=style&index=0&id=456f1ecb&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Create_Adjustment_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Create_Adjustment_vue_vue_type_template_id_456f1ecb__WEBPACK_IMPORTED_MODULE_0__.render,
  _Create_Adjustment_vue_vue_type_template_id_456f1ecb__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/src/views/app/pages/adjustment/Create_Adjustment.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/adjustment/Create_Adjustment.vue?vue&type=script&lang=js":
/*!************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/adjustment/Create_Adjustment.vue?vue&type=script&lang=js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_Adjustment_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Create_Adjustment.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/adjustment/Create_Adjustment.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_Adjustment_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/adjustment/Create_Adjustment.vue?vue&type=style&index=0&id=456f1ecb&lang=css":
/*!********************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/adjustment/Create_Adjustment.vue?vue&type=style&index=0&id=456f1ecb&lang=css ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_Adjustment_vue_vue_type_style_index_0_id_456f1ecb_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Create_Adjustment.vue?vue&type=style&index=0&id=456f1ecb&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/adjustment/Create_Adjustment.vue?vue&type=style&index=0&id=456f1ecb&lang=css");


/***/ }),

/***/ "./resources/src/views/app/pages/adjustment/Create_Adjustment.vue?vue&type=template&id=456f1ecb":
/*!******************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/adjustment/Create_Adjustment.vue?vue&type=template&id=456f1ecb ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_Adjustment_vue_vue_type_template_id_456f1ecb__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_Adjustment_vue_vue_type_template_id_456f1ecb__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_Adjustment_vue_vue_type_template_id_456f1ecb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Create_Adjustment.vue?vue&type=template&id=456f1ecb */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/adjustment/Create_Adjustment.vue?vue&type=template&id=456f1ecb");


/***/ })

}]);