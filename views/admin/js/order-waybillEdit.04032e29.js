(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["order-waybillEdit"],{"1b9d":function(e,t,a){"use strict";a.d(t,"g",(function(){return c})),a.d(t,"b",(function(){return s})),a.d(t,"a",(function(){return u})),a.d(t,"e",(function(){return d})),a.d(t,"d",(function(){return f})),a.d(t,"c",(function(){return m})),a.d(t,"f",(function(){return p}));a("b1fa"),a("f5bd"),a("2e6f"),a("af21"),a("2769"),a("ecf1"),a("eb62");var n=a("430a"),r=(a("6afd"),a("2070"),["X-PAGINATION-TOTAL-COUNT","X-PAGINATION-PER-PAGE","X-PAGINATION-PAGE-COUNT","X-PAGINATION-CURRENT-PAGE"]);function i(e){Object.keys(e.headers).forEach((function(t){e.headers[t.toUpperCase()]=e.headers[t],delete e.headers[t]}));var t={current:1,pageCount:1,totalCount:1};r.forEach((function(t){Object.keys(e.headers).map((function(a){t===a&&(e.headers[a]=parseInt(e.headers[a]))}))})),t.current=e.headers["X-PAGINATION-CURRENT-PAGE"],t.pageCount=e.headers["X-PAGINATION-PAGE-COUNT"],t.totalCount=e.headers["X-PAGINATION-TOTAL-COUNT"],e.pagination=t}var o=n["default"].prototype.$heshop,l=n["default"].prototype.$message;function c(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return new Promise((function(t,a){o.waybill("get").page(e,5).then((function(e){i(e);var a=e.data,n=e.pagination;t({data:a,pagination:n})})).catch((function(e){a(e),l(e.data.message)}))}))}function s(e){return new Promise((function(t){o.waybill("delete",e).then((function(e){t(e)})).catch((function(e){l(e.data.message)}))}))}function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new Promise((function(t){o.waybill("post",e).then((function(e){t(e)})).catch((function(e){l(e.data.message)}))}))}function d(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new Promise((function(t){o.waybill("put",e).then((function(e){t(e)})).catch((function(e){l(e.data.message)}))}))}function f(){function e(t){for(var a=0;a<t.length;a++)t[a].label=t[a].name,t[a].value=t[a].name,t[a].list&&(t[a].children=t[a].list,e(t[a].children))}return new Promise((function(t){Promise.resolve().then(a.t.bind(null,"a5f9",3)).then((function(a){e(a.default),t(a.default)}))}))}function m(){return new Promise((function(e){o.search("post",{include:"setting"},{keyword:"expressjson"}).then((function(t){t=t.map((function(e){return{value:e.name,label:e.code,is_waybill:e.is_waybill}})),e(t)})).catch((function(e){l(e.data.message)}))}))}function p(e){return new Promise((function(t){o.waybill("get",e).then((function(e){t(e)})).catch((function(e){l(e.data.message)}))}))}},"276de":function(e,t,a){},a164:function(e,t,a){"use strict";a.r(t);var n,r,i=a("4c02"),o=a.n(i),l=(a("3f7e"),a("eb62"),a("f5bd"),a("1b9d")),c={name:"waybill-edit",data:function(){return{form:{mobile:"",name:"",address:"",code:"",area:[]},rules:{area:[{required:!0,message:"发货地区不能为空"}],name:[{required:!0,message:"姓名不能为空"}],mobile:[{required:!0,message:"联系方式不能为空"}],address:[{required:!0,message:"发货详细地址不能为空"}],code:[{required:!0,message:"快递公司不能为空"}]},district:[],companyList:[],loading:!1,disabled:!1}},methods:{routerBack:function(){this.$router.back(-1)},submit:function(){var e=this;this.$refs["form"].validate((function(t){if(t){e.loading=!0;var a=e.$_.cloneDeep(e.form);a.province=a.area[0],a.city=a.area[1],a.district=a.area[2],delete a.area,e.$route.query.id?Object(l["e"])(a).then((function(){e.routerBack(),e.loading=!1})):Object(l["a"])(a).then((function(){e.routerBack(),e.loading=!1}))}}))}},mounted:function(){var e=this;Object(l["d"])().then((function(t){e.district=t})),Object(l["c"])().then((function(t){console.log(t),e.companyList=t.filter((function(e){if(e.is_waybill)return e})),console.log(e.companyList)})),this.$route.query.id&&(this.loading=!0,this.disabled=!0,Object(l["f"])(this.$route.query.id).then((function(t){e.form=t,e.form.area=[t.province,t.city,t.district],e.loading=!1,e.disabled=!1})))},render:function(){var e=this,t=arguments[0],a=this;return t("div",{class:"le-main"},[t("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"},class:"he-link-text"},[t("el-breadcrumb-item",{class:"he-link"},[t("a",{on:{click:a.routerBack}},[" 电子面单"])]),t("el-breadcrumb-item",[function(){return a.$route.query.id?"编辑":"新增"}(),"电子面单"])]),t("el-form",o()([{attrs:{"label-width":"193px"},ref:"form",directives:[{name:"loading",value:a.loading}]},{props:{rules:a.rules,model:a.form}}]),[t("div",{class:"le-card"},[t("div",{class:"le-card--head flex align-center"},[t("span",{class:"le-sign"}),t("span",["快递公司"])]),t("el-form-item",{attrs:{label:"快递公司",prop:"code"}},[t("el-select",{attrs:{placeholder:"请选择快递公司"},model:{value:a.form.code,callback:function(t){e.$set(a.form,"code",t)}}},[a.companyList.map((function(e,a){return t("el-option",{key:a,attrs:{label:e.value,value:e.label}})}))])])]),t("div",{class:"le-card"},[t("div",{class:"le-card--head flex align-center"},[t("span",{class:"le-sign"}),t("span",["发货人信息"])]),t("el-form-item",{attrs:{label:"姓名",prop:"name"}},[t("el-input",{attrs:{placeholder:"请输入姓名"},model:{value:a.form.name,callback:function(t){e.$set(a.form,"name",t)}}})]),t("el-form-item",{attrs:{label:"联系方式",prop:"mobile"}},[t("el-input",{attrs:{placeholder:"请输入联系方式"},model:{value:a.form.mobile,callback:function(t){e.$set(a.form,"mobile",t)}}})]),t("el-form-item",{attrs:{label:"发货地区",prop:"area"}},[t("el-cascader",o()([{attrs:{options:a.district,placeholder:"请选择发货地区"}},{props:{expandTrigger:"hover"}},{model:{value:a.form.area,callback:function(t){e.$set(a.form,"area",t)}}}]))]),t("el-form-item",{attrs:{label:"发货详细地址",prop:"address"}},[t("el-input",{attrs:{placeholder:"请输入发货详细地址"},model:{value:a.form.address,callback:function(t){e.$set(a.form,"address",t)}}})])])]),t("div",{class:"le-cardpin"},[t("el-button",{attrs:{type:"primary",disabled:a.disabled,loading:a.loading&&!a.disabled},on:{click:a.submit}},["保存"])])])}},s=c,u=(a("a769"),a("4ac2")),d=Object(u["a"])(s,n,r,!1,null,"1be0c741",null);t["default"]=d.exports},a769:function(e,t,a){"use strict";a("276de")}}]);
//# sourceMappingURL=order-waybillEdit.04032e29.js.map