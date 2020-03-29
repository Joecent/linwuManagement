<template>
  <div class="div">
      <el-container class="body">
        <!-- menu start -->
        <!-- 启动router模式 -->
        <el-aside width="160px" >
          <div class="menu_first">
            <div class="avatar">
              <img src="@/assets/images/shop.png">
            </div>
            <el-menu
            :default-active="menus[0].name"
            unique-opened
            text-color="#ffffff"
            active-text-color="#323232"
            active-background-color="#777777"
            @select="show_second"
            >
                    <el-menu-item v-for="(item,index) in menus" :index="item.order">
                        {{item.name}}
                    </el-menu-item>
              
           </el-menu>
          </div>
          <div class="menu_second">
            <div class="title"><div class="title_name">{{menus[menu_order].name}}</div></div>
            <el-menu
               :default-active="path"
               router
              unique-opened
               text-color="#323232"
              active-text-color="red"
              class="second"
                >
               <el-menu-item v-for="item in menus[menu_order].children" :index="item.path">
                 {{item.name}}
              </el-menu-item>
            </el-menu>
          </div>
          <el-dropdown @command='login'>
            <span><div style="width:80px;height:50px;z-index:100;">{{sysUserName}}</div></span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command=1>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-aside>
        <!-- menu end -->
        <!-- main start -->
        <el-main >
         <div class="breadcrumb-container"><span class="comeon" v-if="ispay==0" @click="tojoin">您还没有成为邻伍合伙人，快来加入吧！</span></div>
          <div class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view />
            </transition>
          </div>
        </el-main>
        <!-- main end -->
      </el-container>
      <!-- body end -->

  </div>
</template>

<script>
import * as store from '@/utils/sdk/store'
import { avatarPath } from '@/utils/commonConfig'
import { editPassword,shop_info} from '@/utils/api'
const defaultSysAvatar = require('@/assets/images/user.png')
export default {
  name: 'home',
  data () {
    return {
      ispay:store.get('user').ispay,
      menu_order:0,
      issecond:true,
      avatarPath:'',
      collapsed: false,
      path_show:'',
      path:'',
      sysName: '邻伍商城',
      sysUserName: '邻伍商城',
      sysUserAvatar:'',
      sysAppName: '未确认',
      menus: [
        {
          children:[
          {
            name:'订单概况',
            path:'/agent/order/order_data'
          },
          {
            name:'所有订单',
            path:'/agent/order/order'
          }
          ],
          name: '订单',
          order:'0'
        },
        {
          children: [
            {
              name: '商品展示',
              path: '/agent/goods/goods'
            },
            {
              name:'商品分组',
              path:'/agent/goods/goods_group'
            }
          ],
          name: '商品',
          order:'1'
        },
        {
          children: [
            {
              name:'商家信息',
              path:'/agent/shopinfo'
            }
          ],
          name: '店铺',
          order:'2'
        },
        {
          children: [
            {
              name:'店铺推广',
              path:'/agent/spread'
            }
          ],
          name: '推广',
          order:'3'
        }

      ]
    }
  },
  methods: {
    tojoin(){
      this.$router.push('/agent/joininfo')
    },
    login(command) {
        console.log(command)
        if (command==1) {
          this.$router.push('/login')
        };
    },
    show_second(index){
        this.menu_order=index
        this.path_show=this.menus[index].children[0].path
        this.$router.push(this.path_show)
    },
   },
}
</script>

<style lang="stylus" scoped>
  @import '../../assets/css/_pub.styl'; 
.div{
  
  .body {
    height:100%;
    .el-aside {
       height:100%;
       width:80px;
       position:fixed;
       overflow:hidden;
       left:0;
       background-color:#777777;
      .avatar{
        height:50px;
        width:80px;
          img {
            width:50px;
            height:50px;
            border-radius:50%;
            margin:40px 15px;
            -moz-border-radius:50%;
            -webkit-border-radius:50%;
            background-color:#ffffff;
          }
      }
      .el-dropdown{
        height:50px;
        width:80px;
        position:fixed;
        bottom:0;
        left:0;
        color:#d8dada;
        line-height:50px;
        text-align:center;
        cursor:pointer;
        background-color:#777676;
        
      }
      .el-dropdown-menu__item{
        font-size:18px
      }
      .el-menu {
        height: auto;
        width: 81px;
        margin-top: 50px;
        text-align:center;
        background:#777777;
        .el-menu-item:hover {
          background-color: #E4E4E4;
          color:#323232!important;
        }
        .el-menu-item{
          padding:0!important;
          color:white!important;
          font-size:15px;
          height:55px;
          line-height:55px;
        }
        .el-menu-item.is-active{
          color:#323232!important;
          background-color:#E4E4E4!important;
        }
      }
      .menu_second{
        position:absolute;
        top:0px;
        right:0;
        width:80px;
        height:100%;
        background-color:#E4E4E4;
        .el-menu{
          margin-top:25px!important;
          background-color:#E4E4E4;
          .el-menu-item{
            background-color:#E4E4E4!important;
            color:#323232!important;
            font-size:14px!important;
          }
          .el-menu-item:hover{
            color:#409EFF!important;
          }
          .el-menu-item.is-active{
            color:#409EFF!important;
          }
        }
        .title {
          width: 100%;
          height: 36px;
          background-color:white;
          color:323232;
          .title_name{
            width:80px;
            font-size:15px;
            height:36px;
            line-height:36px;
            color:#323232;
            text-align:center;
          }
        }
      }
    }
    .el-main {
      height : 100%;
      padding:0 0 0 160px;
      .breadcrumb-container {
        margin-bottom: 10px;
        background-color:white;
        height:36px;
        .comeon{
          color:#ff6c34;
          line-height:36px;
          font-size:15px;
          margin-left:20px;
          cursor:pointer;
        }
        }
      .content-wrapper {
        background-color: #fff;
        height: calc(100% - 36px);
        overflow: hidden;
        margin-left:10px;
        width:96%;
      }
    }
  }

}
</style>
