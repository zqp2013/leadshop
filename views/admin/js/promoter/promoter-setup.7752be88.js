(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["promoter/promoter-setup"],{"30ad":function(e,t,l){e.exports=l.p+"img/mobile-user-center.9a73942a.png"},"41c8":function(e,t,l){"use strict";l.r(t);var a,o,n=l("4c02"),r=l.n(n),s=(l("5d63"),l("8a61"),l("e939"),l("30ad")),i=l.n(s),c=l("57f9"),d=l("0e28"),u=l("8236"),m={mixins:[u["a"]],components:{goodsSelect:c["a"]},data:function(){var e=this,t=/(^[\d]|^[1-9][\d]*)($|[\\.][\d]{0,2}$)/,l=/^[1-9]\d*$/;return{loading:!0,disabled:!0,form:{status:0,level_number:3,self_buy:1,center_show:1,need_check:1,need_apply:1,apply_content:[{name:"姓名"}],conditions:{type:1,buy_amount:"",buy_number:"",goods_list:[]},bind_way:1,bind_type:1,bind_days:"",use_agreement:0,agreement_title:"",agreement_content:""},rules:{become:[{required:!0,validator:function(a,o,n){var r=e.form.conditions.type;if(2===r){var s=e.form.conditions.buy_amount,i="请输入0~9999999的整数或小数";if(!t.test(s))return void n(i);e.$_.toSafeInteger(s)>9999999&&n(i),n()}else if(3===r){var c=e.form.conditions.buy_number,d="请输入1~9999999的整数";if(!l.test(c))return void n(d);e.$_.toSafeInteger(c)>9999999&&n(d)}n()}}],bind_days:[{required:!0,validator:function(t,a,o){l.test(a)?(e.$_.toSafeInteger(a)>3e4&&o("请输入0~30000的整数"),o()):o("请输入0~30000的整数")}}]}}},mounted:function(){var e=this;Object(d["n"])().then((function(t){e.form=t.content,e.loading=!1,e.disabled=!1})).catch((function(){e.disabled=!1,e.loading=!1}))},methods:{submit:function(){var e=this;this.$refs["form"].validate((function(t){if(!t)return!1;e.loading=!0,Object(d["I"])(e.form).then((function(){e.loading=!1,e.$message({type:"success",message:"保存成功"})})).catch((function(){e.loading=!1}))}))},routerManual:function(){this.$router.push({path:"/promoter/manual"})},routerLevel:function(){this.$router.push({path:"/promoter/level"})}},render:function(){var e=this,t=arguments[0],l=this,a=[{label:1,name:"无条件"},{label:2,name:"累计消费金额"},{label:3,name:"累计消费次数"},{label:4,name:"购买任意商品"},{label:5,name:"购买指定商品"}];return t("div",{class:"le-main"},[t("el-form",r()([{attrs:{"label-width":"193px"},ref:"form",directives:[{name:"loading",value:l.loading}]},{props:{model:l.form,rules:l.rules}}]),[t("div",{class:"le-card"},[t("div",{class:"le-card-head flex align-center"},[t("span",{class:"le-card-line"}),t("span",["基础信息"]),t("el-button",{attrs:{type:"text"},class:"le-manual",on:{click:l.routerManual}},["《分销商使用手册》"])]),t("div",{class:"le-card-body"},[t("el-form-item",{attrs:{label:"是否启用分销商"}},[t("el-radio-group",{model:{value:l.form.status,callback:function(t){e.$set(l.form,"status",t)}}},[t("el-radio",{attrs:{label:1}},["启用"]),t("el-radio",{attrs:{label:0}},["禁用"])])]),t("el-form-item",{attrs:{label:"分销商层级"}},[t("el-radio-group",{model:{value:l.form.level_number,callback:function(t){e.$set(l.form,"level_number",t)}}},[t("el-radio",{attrs:{label:1}},["一级分销"]),t("el-radio",{attrs:{label:2}},["二级分销"]),t("el-radio",{attrs:{label:3}},["三级分销"])]),t("div",{class:"le-prompt-text"},["前往",t("el-button",{attrs:{type:"text"},class:"le-prompt--button",on:{click:l.routerLevel}},["分销商等级"]),"设置佣金比例"])]),t("el-form-item",{attrs:{label:"分销自购"}},[t("el-radio-group",{model:{value:l.form.self_buy,callback:function(t){e.$set(l.form,"self_buy",t)}}},[t("el-radio",{attrs:{label:1}},["不允许"]),t("el-radio",{attrs:{label:2}},["自购返佣"]),t("el-radio",{attrs:{label:3}},["自购优惠"])]),t("div",{class:"le-prompt-text"},["选择自购优惠，则原本的佣金作为优惠金额减免，只需对剩下的金额付款"])]),t("el-form-item",{attrs:{label:"分销中心开放人群"}},[t("el-radio-group",{model:{value:l.form.center_show,callback:function(t){e.$set(l.form,"center_show",t)}}},[t("el-radio",{attrs:{label:1}},["仅开放给分销商"]),t("el-radio",{attrs:{label:2}},["向所有用户开放"])]),t("div",{class:"le-prompt-text"},["选择仅开放给分销商，则仅分销商的个人中心显示出分销中心入口",t("el-popover",{attrs:{placement:"right",trigger:"hover"},scopedSlots:{default:function(){return t("img",{attrs:{src:i.a,width:"225",height:"400",alt:""}})},reference:function(){return t("el-button",{attrs:{type:"text"},class:"le-prompt--button"},["查看示例"])}}})])])])]),t("div",{class:"le-card le-card-margin "},[t("div",{class:"le-card-head flex align-center"},[t("span",{class:"le-card-line"}),t("span",["分销商资格"])]),t("div",{class:"le-card-body"},[t("el-form-item",{attrs:{label:"成为分销商",prop:"become"}},[t("div",{class:"le-title"},["是否需要审核"]),t("el-radio-group",{model:{value:l.form.need_check,callback:function(t){e.$set(l.form,"need_check",t)}}},[t("el-radio",{attrs:{label:0}},["无需审核"]),t("el-radio",{attrs:{label:1}},["需审核"])]),t("div",{class:"le-title"},["是否需要填写申请信息"]),t("el-radio-group",{model:{value:l.form.need_apply,callback:function(t){e.$set(l.form,"need_apply",t)}}},[t("el-radio",{attrs:{label:0}},["无需填写"]),t("el-radio",{attrs:{label:1}},["需填写"])]),function(){if(1===l.form.need_apply)return[[t("el-table",{attrs:{data:l.form.apply_content,"header-row-class-name":"le-table-header","row-class-name":"le-table-row"},class:"le-info--table"},[t("el-table-column",{attrs:{label:"信息名称",width:"288"},scopedSlots:{default:function(l){var a=!1;return 0===l.$index&&(a=!0),t("el-input",{attrs:{placeholder:"请输入信息名称",disabled:a,maxlength:8,"show-word-limit":!0},model:{value:l.row.name,callback:function(t){e.$set(l.row,"name",t)}}})}}}),t("el-table-column",{attrs:{label:"操作"},scopedSlots:{default:function(e){if(0!==e.$index)return t("el-button",{attrs:{type:"text"},on:{click:function(){return l.form.apply_content.splice(e.$index,1)}}},["移除"])}}})])],[t("div",{class:"le-info--table_footer"},[function(){var e=!1;return l.form.apply_content.length>=5&&(e=!0),t("el-button",{attrs:{disabled:e,plain:!0},on:{click:function(){return l.form.apply_content.push({name:""})}}},["添加申请信息"])}(),t("span",{class:"le-prompt-text"},["最多添加5条申请信息"])])]]}(),t("div",{class:"le-title"},["满足的条件"]),t("el-radio-group",{model:{value:l.form.conditions.type,callback:function(t){e.$set(l.form.conditions,"type",t)}}},[a.map((function(e,l){return t("el-radio",{key:l,attrs:{label:e.label}},[e.name])}))]),function(){switch(l.form.conditions.type){case 2:return t("div",{class:"le-condition"},[t("span",{class:"le-title"},["累计消费金额"]),t("el-input",{class:"le-small--input",model:{value:l.form.conditions.buy_amount,callback:function(t){e.$set(l.form.conditions,"buy_amount",t)}}},[t("template",{slot:"append"},["元"])])]);case 3:return t("div",{class:"le-condition"},[t("span",{class:"le-title"},["累计消费次数"]),t("el-input",{class:"le-small--input",model:{value:l.form.conditions.buy_number,callback:function(t){e.$set(l.form.conditions,"buy_number",t)}}},[t("template",{slot:"append"},["次"])])]);case 5:return t("div",{class:"le-condition"},[t("el-button",{attrs:{plain:!0},on:{click:function(){l.$refs.goodsSelect.open()}}},["选择商品"]),t("goods-select",{ref:"goodsSelect",attrs:{type:"checkbox",limit:1e3,"is-tips":!1,"select-style":{backgroundColor:"#ffffff"}},model:{value:l.form.conditions.goods_list,callback:function(t){e.$set(l.form.conditions,"goods_list",t)}}}),t("el-table",{attrs:{"max-height":368,data:l.form.conditions.goods_list,"header-row-class-name":"le-table-header","row-class-name":"le-table-row"},class:"le-goods--table"},[t("el-table-column",{attrs:{label:"商品"},scopedSlots:{default:function(e){return t("div",{class:"flex"},[t("el-image",{class:"le-goods--image",attrs:{src:e.row.slideshow[0]}},[t("div",{slot:"error",class:"image-slot"},[t("i",{class:"el-icon-picture-outline"})])]),t("div",{class:"he-line-2 flex-sub le-goods--name"},[e.row.name])])}}}),t("el-table-column",{attrs:{label:"商品价格",width:"150px"},scopedSlots:{default:function(e){return"￥".concat(e.row.price)}}}),t("el-table-column",{attrs:{label:"操作",width:"90px"},scopedSlots:{default:function(e){return t("el-button",{attrs:{type:"text"},on:{click:function(){return l.form.conditions.goods_list.splice(e.$index,1)}}},["删除"])}}})])])}}()])])]),t("div",{class:"le-card le-card-margin "},[t("div",{class:"le-card-head flex align-center"},[t("span",{class:"le-card-line"}),t("span",["分销下线"])]),t("div",{class:"le-card-body"},[t("el-form-item",{attrs:{label:"成为下线条件"}},[t("el-radio-group",{model:{value:l.form.bind_way,callback:function(t){e.$set(l.form,"bind_way",t)}}},[t("el-radio",{attrs:{label:1}},["首次点击分享链接"]),t("el-radio",{attrs:{label:2}},["首次付款"])])]),t("el-form-item",{attrs:{label:"绑定关系模式"}},[t("el-radio-group",{model:{value:l.form.bind_type,callback:function(t){e.$set(l.form,"bind_type",t)}}},[t("el-radio",{attrs:{label:1}},["永久绑定模式"]),t("el-radio",{attrs:{label:2}},["保护期模式"])])]),function(){if(2===l.form.bind_type)return t("el-form-item",{attrs:{label:"保护期","label-width":"250px",prop:"bind_days"},class:"le-noleabel"},[t("el-input",{class:"le-small--input",model:{value:l.form.bind_days,callback:function(t){e.$set(l.form,"bind_days",t)}}},[t("template",{slot:"append"},["天"])]),t("span",{class:"le-title"},["之后解除关系"]),t("div",{style:"margin-top: 10px"},["去",t("el-button",{on:{click:function(){var e=l.$router.resolve({path:"/setup/index"});window.open(e.href,"_blank")}},style:"padding:0;font-size: 14px",attrs:{type:"text"}},["设置>基础设置"]),"，配置定时任务"])])}()])]),t("div",{class:"le-card le-card-margin "},[t("div",{class:"le-card-head flex align-center"},[t("span",{class:"le-card-line"}),t("span",["分销协议"])]),t("div",{class:"le-card-body"},[t("el-form-item",{attrs:{label:"是否启用协议"}},[t("el-radio-group",{model:{value:l.form.use_agreement,callback:function(t){e.$set(l.form,"use_agreement",t)}}},[t("el-radio",{attrs:{label:1}},["启用"]),t("el-radio",{attrs:{label:0}},["禁用"])]),t("div",{class:"le-prompt-text"},["启用后将显示在分销商招募令页面"])]),function(){if(1===l.form.use_agreement)return[[t("el-form-item",{attrs:{label:"协议标题"}},[t("el-input",{attrs:{maxlength:10,"show-word-limit":!0,placeholder:"请输入协议标题"},model:{value:l.form.agreement_title,callback:function(t){e.$set(l.form,"agreement_title",t)}}})])],[t("el-form-item",{attrs:{label:"协议内容"}},[t("el-input",{attrs:{type:"textarea",placeholder:"请输入协议内容",rows:"15"},model:{value:l.form.agreement_content,callback:function(t){e.$set(l.form,"agreement_content",t)}}})])]]}()])])]),t("div",{class:"le-cardpin"},[t("el-button",{attrs:{type:"primary",disabled:l.disabled,loading:l.loading&&!l.disabled},on:{click:l.submit}},["保存"])])])}},f=m,p=(l("da31"),l("cba8")),b=Object(p["a"])(f,a,o,!1,null,"374a5da6",null);t["default"]=b.exports},da31:function(e,t,l){"use strict";l("dc29")},dc29:function(e,t,l){}}]);