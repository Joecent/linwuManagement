 <template>
	<div class="div">
		<el-container class="body">
			<!-- menu start -->
			<!-- 启动router模式 -->
			<el-aside width="160px">
				<div class="nav-buttom" :class="{'nav-buttoms':navsh}" @click="nav_style" >
					<span></span>
				</div>
				<div class="menu_first" :class="{'active':navsh}">
					<div class="avatar">
						<div class="avatar_img">
							<img src="../../assets/images/avatar.png">
						</div>
					</div>
					<el-menu :default-active="menus[0].name" unique-opened text-color="#ffffff" active-text-color="#323232" active-background-color="#777777" @select="show_second">
						<el-menu-item v-for="(item,index) in menus" :index="item.order"  @click="selectNav(index)">
							{{item.name}}
						</el-menu-item>
					</el-menu>
				</div>
				<div class="menu_second">
					<div class="title">
						<div class="title_name" >{{menus[isSelect].name}}</div>
					</div>
					<el-menu :default-active="menus[isSelect].path" router unique-opened text-color="#323232" active-text-color="red" class="second">
						<el-menu-item v-for="item in menus[isSelect].children" :index="item.path">
							{{item.name}}
						</el-menu-item>
					</el-menu>
				</div>
				<el-dropdown @command='login'>
					<span>切换<div>{{sysUserName}}</div></span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command=1>退出登录</el-dropdown-item>
						<el-dropdown-item command=2>更换店铺</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-aside>
			<!-- menu end -->
			<!-- main start -->
			<el-main>
				<!--<div class="breadcrumb-container">
                   <div class="breadcrumb">
					   <ul>
						   <li @click="Setmeal">
							   <img src="@/assets/images/tcsj.png" alt="">
							    <span>套餐升级</span>
						   </li>
						   <li>
							  <img src="@/assets/images/xttz.png" alt="">
							   <span>系统通知</span>
							   <div class="sign">
								 2
							   </div>
						   </li>
						   <li>
							 <img src="@/assets/images/bzwd.png" alt="">
							  <span>帮助文档</span>
						   </li>
					   </ul>
				   </div>
				</div>-->
				<div class="content-wrapper">
					<transition name="fade" mode="out-in">
						<router-view />
					</transition>
				</div>
			</el-main>
			<div class='glass' v-if='navsh'  @click="handlehade"></div>
			<!-- main end -->
		</el-container>
		<!-- body end -->
	</div>
</template>
<style>

</style>
<script>
	import * as store from '@/utils/sdk/store'
	import { avatarPath } from '@/utils/commonConfig'
	import { editPassword, admin_shop_info } from '@/utils/api'
	const defaultSysAvatar = require('@/assets/images/user.png')
	export default {
		name: 'home',
		data() {
			return {
				shop_type:store.get('shop_type'),
				menu_order: 0,
				issecond: true,
				avatarPath: '',
				collapsed: false,
				path_show: '',
				path: '',
				sysName: '邻伍',
				sysUserName: '未登录',
				sysUserAvatar: '',
				sysAppName: '未确认',
				navsh:false,
				isSelect:0,
				shop_id: store.get('currentshopid'),
				menus: [{
						children: [{
								name: '订单概况',
								path: '/business/order/order_data'
							},
							{
								name: '所有订单',
								//path: '/business/order/online',
								path: '/business/order/order_list'
              				},
              				{
								name: '订单统计',
								//path: '/business/order/online',
								path: '/business/order/statistics'
							}
						],
						name: '订单',
						order: '0'
					},
					{
						children: [{
								name: '商品管理',
								path: '/business/goods/goods'
							},
							{
								name: '商品分组',
								path: '/business/goods/goods_group'
							},
							{
								name: '下架商品',
								path: '/business/goods/goods_off'
							}
						],
						name: '商品',
						order: '1'
					},
					// {
					// 	children: [{
					// 			name: '优惠券',
					// 			path: '/business/marketing/coupon'
					// 		},
					// 		{
					// 			name: '帮砍价',
					// 			path: '/business/marketing/cut'
					// 		},
					// 		// {
					// 		//   name:'会员制',
					// 		//    path:'/business/marketing/member'
					// 		// },
					// 		//  {
					// 		//   name:'帮送礼',
					// 		//   path:'/home/marketing/gift'
					// 		// },
					// 		//  {
					// 		//   name:'限时抢购',
					// 		//   path:'/home/marketing/flash'
					// 		// },
					// 		//  {
					// 		//   name:'抽奖',
					// 		//   path:'/home/marketing/reword'
					// 		// }
					// 	],
					// 	name: '促销',
					// 	order: '2'
					// },
					// {
					// 	children: [{
					// 		name: '店铺用户',
					// 		path: '/business/user/member'
					// 	}, ],
					// 	name: '用户',
					// 	order: '3'
					// },
					{
					children:[
//                         {
//                             name: '店铺设置',
//                             path: '/business/shop/modify'
//                         
//                         },
					//{
					//name:'配送设置',
					//path:'/business/shop/logistics'
					//},
                        {
                            name: '打印机',
                            path: '/business/shop/shopinfo'
                        },
						// {
						// 	name:'二维码',
						// 	path:'/business/shop/qrCode'
						// }
                        ],

						name: '店铺',
						order: '2'
					},
					// {
					// 	children:[{
					// 		name:'分销成员',
					// 		path:'/business/distribution/member'
					// 	},
					// 	{
					// 		name:'提现管理',
					// 		path:'/business/distribution/withdrawal'
					// 	},
					// 	{
					// 		name:'分销配置',
					// 		path:'/business/distribution/configuration'
					// 	}
					// 	],
					// 	name:'分销',
					// 	order:'5'
					// },
					// {
					// 	children:[{
					// 		name:'小程序授权',
					// 		path:'/business/authorization/authorization'
					// 	},
					// 	{
					// 		name:'微信支付',
					// 		path:'/business/authorization/wechatPay'
					// 	},
					// 	{
					// 		name:'发布管理',
					// 		path:'/business/authorization/release'
					// 	}
					// 	],
					// 	name:'授权',
					// 	order:'6'
					// },
                    //  {
					// 	children:[{
					// 		name:'全部销售',
					// 		path:'/business/management/gements'
					// 	},
					// 	{
					// 		name:'销售配置',
					// 		path:'/business/management/salesguration'
					// 	},
					// 	{
					// 		name:'提现管理',
					// 		path:'/business/management/pmanag'
					// 	}
					// 	],
					// 	name:'销售管理',
					// 	order:'7'
					// },
					// {
					// 	// Salescenter
					// 	children:[{
					// 		name:'销售首页',
					// 		path:'/business/Salescenter/salescenter'
					// 	},
					// 	{
					// 		name:'账户提现',
					// 		path:'/business/Salescenter/presentation'
					// 	},
					// 	{
					// 		name:'收支明细',
					// 		path:'/business/Salescenter/payments'
					// 	},
					// 	{
					// 		name:'学习中心',
					// 		path:'/business/Salescenter/learning'
					// 	},
					// 	{
					// 		name:'销售管理',
					// 		path:'/business/Salescenter/stration'
					// 	}
					// 	],
					// 	name:'销售中心',
					// 	order:'8'
					// },
// 					// {
// 					// 	children: [{
// 					// 		name: '购买套餐',
// 					// 		path: '/business/Setmeal/Setmeal'
// 					// 	}, ],
// 					// 	name: '购买套餐',
// 					// 	order: '9'
// 					// },
// 					{
//                         children: [{
//                             name: '个人管理',
//                             path: '/business/personal/personal'
//                         }, ],
//                         name: '账号管理',
//                         order: '9'
//                     }
						{
						
					},
				]
			}
		},
		// mounted () {
		// 	this.isSelect = sessionStorage.getItem('isSelect')
		// },
		methods: {
			nav_style:function(){
					this.navsh = !this.navsh;

			},
			handlehade(){
				this.navsh=false;
			},
			selectNav(name){
				var nav=document.querySelectorAll('.el-menu .el-menu-item')
                nav[this.isSelect].classList.remove('is-active')
                this.isSelect = name
                store.set('isSelect', name)//存储当前选中的导航栏下标
			},
			shop_menu(){
				if (store.get('currentshopid')==7) {
					this.menus[3]={
						children:[{
							name:'店主人员',
							path:'/business/group/member'
						},
						{
							name:'提成管理',
							path:'/business/group/earnings'
						},
						// {
						// 	name:'虚拟成团',
						// 	path:'/business/group/DynamicData'
						// },
						{
							name:'合伙人',
							path:'/business/group/partner'
						},
						// {
						// 	name:'团长配置',
						// 	path:'/business/group/configuration'
						// }
						],
						name:'团购',
						order:'3'
						}
					}else{
						this.menus[3]=''
					}
			},

             Setmeal(){
				 this.$router.push("/business/Setmeal/Setmeal")
			 },


			admin_shop_info() {
				admin_shop_info({
					shop_id: store.get('currentshopid')
				}).then((res) => {
					this.sysUserAvatar = res.data.logo
					this.sysUserName = res.data.name
				})
			},
			handleUpdate() {
				this.editFormVisible = true
			},

			login(command) {
				if(command == 1) {
					this.$router.push('/login')
				};
				if(command == 2) {
					this.$router.push('/shopchoose')
				};
			},

            logins(command) {
				if(command == 1) {
					this.$router.push('/logins')
				};
			},


			show_second(index) {
				this.menu_order = index
				this.path_show = this.menus[index].children[0].path
				this.$router.push(this.path_show)
			},
		},
		created() {
			this.admin_shop_info()
			this.shop_menu()
			this.isSelect=store.get('isSelect')?store.get('isSelect'):0
		},
		 mounted(){
            var nav=document.querySelectorAll('.el-menu .el-menu-item')
            nav[this.isSelect].classList.add('is-active')
        }
	}
</script>
<style lang="stylus" scoped>
	@import '../../assets/css/_pub.styl';
	.div {
		.body {
			height: 100%;
			.el-aside {
				height: 100%;
				width: 80px;
				position: fixed;
				overflow: hidden;
				left: 0;
				background-color: #777777;
				.avatar {
					height: 50px;
					width: 80px;
					.avatar_img {
						height: 50px;
						width: 50px;
						margin: 40px 15px;
						border-radius: 50%;
						-moz-border-radius: 50%;
						-webkit-border-radius: 50%;
						display: flex;
						justify-content: center;
						align-items: center;
						img {
							width: 30px;
							height: 30px;
						}
					}
				}
				.el-dropdown {
					height: 50px;
					width: 80px;
					position: fixed;
					bottom: 0;
					left: 0;
					color: #d8dada;
					line-height: 50px;
					text-align: center;
					cursor: pointer;
					background-color: #777676;
				}
				.el-dropdown-menu__item {
					font-size: 18px
				}
				.el-menu {
					height: auto;
					width: 81px;
					margin-top: 50px;
					text-align: center;
					background: #777777;
					.el-menu-item:hover {
						background-color: #e4e4e4;
						color: #323232!important;
					}
					.el-menu-item {
						padding: 0!important;
						color: white!important;
						font-size: 15px;
						height:50px;
						line-height:50px;
					}
					.el-menu-item.is-active {
						color: #323232!important;
						background-color: #e4e4e4!important;
					}
				}
				.menu_second {
					position: absolute;
					top: 0px;
					right: 0;
					width: 80px;
					height: 100%;
					background-color: #E4E4E4;
					.el-menu {
						margin-top: 25px!important;
						background-color: #E4E4E4;
						.el-menu-item {
							background-color: #E4E4E4!important;
							color: #323232!important;
							font-size: 14px!important;
						}
						.el-menu-item:hover {
							color: #409EFF!important;
						}
						.el-menu-item.is-active {
							color: #409EFF!important;
						}
					}
					.title {
						width: 100%;
						height: 36px;
						background-color: white;
						color: 323232;
						.title_name {
							width: 80px;
							height: 36px;
							line-height: 36px;
							color: #323232;
							text-align: center;
							color:#409eff
						}
					}
				}
			}
			.el-main {
				height: 100%;
				padding: 0 0 0 160px;
				.breadcrumb-container {
					margin-bottom: 10px;
					background-color:#f9f9f9;
					height: 36px;
					width:96%;
					line-height:36px;

				}
				.content-wrapper {
					background-color: #f9f9f9;
					height: calc(100% - 36px);
					overflow: hidden;
					margin-left: 10px;
					width: 96%;
				}
			}
		}
	}
	.div .body .el-aside .el-menu .el-menu-item.is-actives{
		background: #0089E1 !important;
	}


    // 头部样式

	.breadcrumb ul{
		display:flex;
		justify-content:flex-end
	}

	.breadcrumb ul li{
		padding-right:20px;
		font-size:14px;
		position :relative;
		cursor:pointer
	}

   .breadcrumb ul li img{
      display: inline-block;
	  width:20px;
	  height:20px;
   }

   .sign{
	   width 15px;
	   height 15px;
	   border 1px solid #E51C23;
	   border-radius :50%;
	   line-height:15px;
	   text-align :center;
	   position :absolute;
	   top:3px;
	   right:5px;
	   background:#fff
   }


</style>
<style lang="stylus" scoped>
	.el-aside{

	}

	.el-popper[x-placement^=bottom]{
	position: absolute;
    top: 30px;
    right: 5px;
    transform-origin: center top 0px;
    z-index: 2001;
	}

	.lee-title1 {
		display: none;
	}

	@media(max-width:900px ) {
		.glass{
			position:absolute;
			width:100%;
			height:100%;
			background: #777;
    		opacity: 0.5;
			z-index:1;
		}
		.nav-buttom{
				width: 25px;
				height: 20px;
				position: fixed;
				top: 7px;
				left: 20px;
				z-index: 4;
				cursor: pointer;
			}

			.div .body .el-aside .active{
				display: block;
				position: fixed;
			}

			.nav-buttom:before,
			.nav-buttom:after{
				content: "";
				position: absolute;
				width: 100%;
				position: absolute;
				left: 0;
				height: 1px;
				background: #FFFFFF;
				transition: all 1s;
				-webkit-transition: all 1s;
				-moz-transition: all 1s;
				-ms-transition: all 1s;
			}

			.nav-buttom:before{
				top: 0;
			}

			.nav-buttom:after{
				bottom:0;
			}

			.nav-buttom span{
				position: absolute;
				display: block;
				width: 100%;
				height: 1px;
				margin-top: 9.5px;
				background: #FFFFFF;
				z-index: 2;
			}

			.nav-buttoms span{
				display: none;
			}

			.nav-buttoms:before{
				transform: rotateZ(45deg);
				top: 9.5px;
			}

			.nav-buttoms:after{
				transform: rotateZ(-45deg);
				bottom: 9.5px;
			}

		.div .body .el-aside .menu_second .title{
			text-align: center;
		}
		.div .body .el-aside .menu_second .title .title_name{
			width: 100%;
			color: #FFFFFF;
		}

		.div .body .el-aside{
			position: static;
			float: left;
			width: 0 !important;
		}

		.div .body .el-aside .menu_second .title{
			background: none;
		}

		.div .body .el-aside .menu_second{
			position: fixed;
			width: 100%;
			height: auto;
			z-index: 3;
			background: #777;
			color: #FFFFFF;
			font-weight: bold;
		}

		.div .body .el-aside .menu_second .el-menu{
			width: 100%;
			text-align: center;
			margin-top: 0 !important;
			position: fixed;
			bottom: 0;
			background: #777;
			color: #FFFFFF;
		}

		.div .body .el-aside .menu_second .el-menu .el-menu-item{
			background: #777 !important;
			color: #FFFFFF !important;
		}

		.div .body .el-aside .menu_second .el-menu .el-menu-item{
			display: inline-block;
			width:90px;
			text-align: center;
			height: 35px;
			line-height: 35px;
		}

		.menu_first{
			position: absolute;
			top: 36px;
			display: none;
			z-index: 3;
		}

		.div .body .el-aside .avatar .avatar_img{
			margin: 0;
			width: auto;
			background: #e1e1e1;
			border-radius: 0;
		}

		.div .body .el-aside .el-menu{
			margin-top: 0;
		}

		.div .body .el-aside .el-dropdown{
			position: fixed;
			top: 0 !important;
			left: 80%;
			background: none;
			z-index: 3;
			color: #409eff;
			line-height: 36px;
			height: 36px;
		}

		.div .body .el-main{
			padding:30px 0 0;
			width: 100%;
		}

		.div .body .el-main .content-wrapper{
			width: 100%;
			box-sizing: border-box;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			margin-left: 0;
			margin-bottom: 30px;
		}

		.shop_info .shop_image{
			margin-left: 35px !important;
		}

		.data_form{
			display: block !important;
		}

		.order_statu{
			width: 100%;
		}

		.data_form .money_num{
			width: 100% !important;
		}

		.data_form .order_statu,.goodsimg{
			width: 100% !important;
		}
.div .body .el-aside .el-dropdown div{
	display: none;
}


.lee-title1 {
			display: block;
			color: #1a1a1a;
			border-left: 3px solid #777;
			height: 18px;
			line-height: 18px;
			text-align: left;
			margin: 10px 20px;
			padding-left: 8px;
			font-size: 14px;
			position: relative;
		}

		.lee-title1:before {
			content: "";
			position: absolute;
			height: 18px;
			width: 1px;
			background: #777;
			left: 2px;
			top: 0;
		}

	}
</style>
