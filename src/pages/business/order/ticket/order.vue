<template>
   <div class="order_page">
    <el-menu 
    :default-active="activeIndex" 
    mode="horizontal" 
    router
    text-color="#303133"
    background-color="#ffffff"
    active-text-color="#0db8f1"
    >
      <el-menu-item :index="item.path" v-for="item in menu">{{item.name}}</el-menu-item>
     
    </el-menu>

    <div class="orderInfo">
            <transition name="fade" mode="out-in">
              <router-view />
            </transition>
    </div>
  </div>

</template>

<script type="text/javascript">
	import * as store from '@/utils/sdk/store' 
  export default{
            data(){
                  return{
                        activeIndex:'/business/order/order/notpost',
                        menu:[
                          {
                          path:'/business/order/ticket/notpost',
                          name:'待出票'
                        },
                        {
                          path:'/business/order/ticket/notreceive',
                          name:'已出票'
                        },
                        {
                          path:'/business/order/ticket/finish',
                          name:'已完成'
                        },
                        {
                          path:'/business/order/ticket/refund',
                          name:'退款'
                        },
                        ],
                        shop_type:store.get('shop_type')
                  }
            },
            methods:{
             
  },
  created(){

  }
}
</script>

<style lang="stylus" scoped>
.order_page
  background-color #f9f9f9
.el-row{
      padding-top:20px;
}
.el-menu
      margin-top 10px
      padding-left 30px
      width 100%
      .el-menu-item
            height 40px
            width 55px
            margin 0 10px
            padding 0 0
            text-align center
            line-height 40px
            font-size 15px
            color #323232
            border none
      .el-menu-item:hover
          color #409eff!important
          background-color white!important
      .el-menu-item.is-active
            color #409eff!important
            border-bottom 1.5px solid #409eff!important
            background-color white!important
            

.orderInfo{
      margin-top:20px;
      height:auto
}

	
	
</style>