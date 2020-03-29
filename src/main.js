// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'babel-polyfill' // es6 shim
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import K from 'vue-kindeditor'
import 'vue-kindeditor/static/kindeditor/kindeditor-all.js'
import 'vue-kindeditor/static/kindeditor/themes/default/default.css'
Vue.config.productionTip = false
Vue.prototype.trim=function(){
　　return this.replace(/(^\s*)|(\s*$)/g, "");
}
Vue.filter('dataFilter',function (value,msg) {
    if(value!=null){
      var value=new Date(parseInt(value))
        let year = value.getFullYear();
        let month = value.getMonth() + 1;
        let day = value.getDate();
        let hour = value.getHours();
        let minute = value.getMinutes();
  　　　　month<10?(month = "0" + month) : month;
  　　　　day<10?(day = "0" + day) : day;
  　　　　hour<10?(hour = "0" + hour) : hour;
  　　　　minute < 10 ? (minute = "0" + minute) : minute;
      var dataTime=''
        if(msg=='1'){
          return dataTime=year+"年"+month+"月"+day+"日"
        }
        if(msg=='2'){
          return dataTime=year+"-"+month+"-"+day+" "+hour+":"+minute
        }
    }
})
Vue.filter('toStr',function(value){
    if(Array.isArray(value)){
        return value.join('、')
    }else{
        if(value.indexOf('、')==-1){
            return value
        }else{
            var reg=/[\u4E00-\u9FA5]$/;
            if(reg.test(value)){
                return value
            }else{
                return value.slice(0,value.length-1)
            }
        }
    }
})
Vue.component('remote-script', {

    render: function (createElement) {
        var self = this;
        return createElement('script', {
            attrs: {
                type: 'text/javascript',
                src: this.src
            },
            on: {
                load: function (event) {
                    self.$emit('load', event);
                },
                error: function (event) {
                    self.$emit('error', event);
                },
                readystatechange: function (event) {
                    if (this.readyState == 'complete') {
                        self.$emit('load', event);
                    }
                }
            }
        });
    },

    props: {
        src: {
            type: String,
            required: true
        }
    }
});
/* eslint-disable no-new */
Vue.use(ElementUI)
Vue.use(K)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
