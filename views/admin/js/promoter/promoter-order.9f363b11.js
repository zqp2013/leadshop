(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["promoter/promoter-order"],{9463:function(e,t,r){"use strict";r.r(t);var a,l,s=r("4c02"),o=r.n(s),n=(r("5122"),r("61d9"),r("877e"),r("e939"),r("2e9c"),r("5d63"),r("8236")),i=r("0e28"),c={search_key:"order_sn",search:"",source:"",status:null,orderTime:[],page:1},d={mixins:[n["a"]],data:function(){return{form:this.$_.cloneDeep(c),list:[],pagination:{pageCount:1}}},methods:{filter:function(){this.replaceQuery(),this.promoterOrderList()},empty:function(){this.emptyStatus(),this.form=this.$_.cloneDeep(c),this.promoterOrderList()},switchPage:function(e){this.form.page=e,this.replaceQuery(),this.promoterOrderList()},promoterOrderList:function(){var e,t=this,r=JSON.parse(JSON.stringify(this.form));(null===(e=r.orderTime)||void 0===e?void 0:e.length)>0?(r.time_start=r.orderTime[0]+"",r.time_start=r.time_start.slice(0,r.time_start.length-3),r.time_end=r.orderTime[1]+"",r.time_end=r.time_end.slice(0,r.time_end.length-3)):(r.time_start=null,r.time_end=null),delete r.orderTime,Object(i["z"])(this.form.page,{keyword:r}).then((function(e){var r=e.data,a=e.pagination;t.list=r,t.pagination=a}))}},mounted:function(){this.form=this.getQuery(),this.promoterOrderList()},render:function(){var e=this,t=arguments[0],r=this,a=[{label:"订单号",value:"order_sn"},{label:"商品名称",value:"goods_name"},{label:"买家昵称",value:"buyer_nickname"},{label:"买家手机号",value:"buyer_mobile"},{label:"收货人姓名",value:"consignee_name"},{label:"收货人手机号",value:"consignee_mobile"},{label:"商品货号",value:"goods_sn"}],l=[{label:"全部",value:""},{label:"微信小程序",value:"weapp"},{label:"公众号",value:"wechat"}],s=[{label:"全部",value:null},{label:"待结算",value:"0"},{label:"已结算",value:"1"}];return t("div",{class:"le-main"},[t("el-form",{class:"le-card",attrs:{"label-width":"112px",inline:!0}},[t("el-form-item",{attrs:{label:"订单搜索"},class:"le-order--search"},[t("el-input",o()([{attrs:{placeholder:"请输入内容"}},{nativeOn:{keyup:function(e){"Enter"===e.key&&r.promoterOrderList()}}},{attrs:{clearable:!0},on:{clear:function(){r.promoterOrderList()}},model:{value:r.form.search,callback:function(t){e.$set(r.form,"search",t)}}}]),[t("el-select",{slot:"prepend",attrs:{placeholder:"请选择"},model:{value:r.form.search_key,callback:function(t){e.$set(r.form,"search_key",t)}}},[a.map((function(e,r){return t("el-option",{key:r,attrs:{label:e.label,value:e.value}})}))])])]),t("el-form-item",{attrs:{label:"订单来源"}},[t("el-select",{attrs:{placeholder:"请选择"},model:{value:r.form.source,callback:function(t){e.$set(r.form,"source",t)}}},[l.map((function(e,r){return t("el-option",{key:r,attrs:{label:e.label,value:e.value}})}))])]),t("el-form-item",{attrs:{label:"佣金状态"}},[t("el-select",{attrs:{placeholder:"请选择"},model:{value:r.form.status,callback:function(t){e.$set(r.form,"status",t)}}},[s.map((function(e,r){return t("el-option",{key:r,attrs:{label:e.label,value:e.value}})}))])]),t("el-form-item",{attrs:{label:"下单时间"}},[t("el-date-picker",{attrs:{size:"small",type:"datetimerange","value-format":"timestamp","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:r.form.orderTime,callback:function(t){e.$set(r.form,"orderTime",t)}}})]),t("div",{class:"le-button"},[t("el-button",{attrs:{type:"primary"},on:{click:r.filter}},["筛选"]),t("el-button",{on:{click:r.empty}},["清空"])])]),t("div",{class:"le-card"},[t("div",{class:"le-table--wrapper"},[t("table",{class:"le-table"},[t("thead",{class:"le-table--head"},[t("tr",[t("td",["商品描述"]),t("td",["单价/数量"]),t("td",["买家/收货人"]),t("td",["商品实付金额"]),t("td",["商品利润"]),t("td",["佣金状态"]),t("td",["佣金金额"])])]),t("tbody",{class:"le-table--body"},[function(){return r.list.length>0?r.list.map((function(r){return[[t("tr",{class:"le-body--empty"},[t("td",{attrs:{colSpan:"7"}})])],[t("tr",{class:"le-order--head"},[t("td",{attrs:{colSpan:"7"}},[t("span",{class:"le-order--time"},[e.$moment(new Date(1e3*r.created_time)).format("Y-MM-DD HH:mm:ss")]),t("span",{class:"le-order--text"},["订单号："]),t("span",{class:"le-order--number"},[r.order_sn]),function(){if("weapp"===r.order.source){var e="小程序",a="le-icon-xiaochengxu";return[[t("span",{class:"le-icon le-platform--icon "+a})],[t("span",{class:"le-order--text"},[e])]]}if("wechat"===r.order.source){var l="公众号",s="le-icon-wehcat";return[[t("span",{class:"le-icon le-platform--icon "+s})],[t("span",{class:"le-order--text"},[l])]]}}()])])],[t("tr",{class:"le-order--info"},[t("td",{class:"flex"},[t("el-image",{class:"le-order--image",attrs:{src:r.orderGoods.goods_image}}),t("div",{class:"le-order--content flex-sub"},[t("div",{class:"flex "},[t("div",{class:"le-goods--name"},[r.orderGoods.goods_name])]),t("div",{class:"le-goods--attr"},[r.orderGoods.goods_param])])]),t("td",[t("div",{class:"le-goods--number"},["¥",r.orderGoods.goods_price,t("br"),"X",r.orderGoods.goods_number])]),t("td",{class:"le-contact-person"},[t("div",{class:"le-buyer"},[r.user.nickname]),t("div",{class:"le-receiver"},[r.buyer.name,t("br"),r.buyer.mobile])]),t("td",{class:"le-amount-paid"},["¥",r.total_amount]),t("td",{class:"le-amount-paid"},["¥",r.profits_amount]),t("td",{class:"le-order--status"},[function(){var e="",a="";return 1===r.status?(e="success",a="已结算"):0===r.status?(e="warning",a="待结算"):-1===r.status&&(a="已失效"),t("el-tag",{attrs:{effect:"plain",size:"medium",type:e}},[a])}()]),t("td",{class:"le-level"},[t("div",["一级佣金：￥",r.commission.first.commission,"    分销员：",r.commission.first.user]),function(){if(r.commission.second)return t("div",["二级佣金：￥",r.commission.second.commission,"    分销员：",r.commission.second.user])}(),function(){if(r.commission.third)return t("div",["三级佣金：￥",r.commission.third.commission,"    分销员：",r.commission.third.user])}()])])]]})):t("tr",{class:"le-empty"},[t("td",{attrs:{colSpan:"7"}},["暂无数据"])])}()])])]),t("div",{class:"flex le-pagination justify-end"},[t("el-pagination",{attrs:{background:!0,"current-page":r.form.page,layout:"prev, pager, next, jumper","page-count":r.pagination.pageCount},on:{"current-change":r.switchPage}})])])])}},m=d,u=(r("c606"),r("cba8")),p=Object(u["a"])(m,a,l,!1,null,"2c10f987",null);t["default"]=p.exports},c606:function(e,t,r){"use strict";r("e197")},e197:function(e,t,r){}}]);