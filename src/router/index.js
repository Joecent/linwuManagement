import Vue from 'vue'
import Router from 'vue-router'
import lazy from '@/utils/sdk/lazy'
// import * as store from '@/utils/sdk/store'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'index',
            component: lazy('index'),
            redirect: { path: 'index/product' },
            children: [{
                path: '/index/product',
                component: lazy('product'),
                meta: { name: '产品介绍' }
            }, {
                path: '/index/resource',
                component: lazy('resource'),
                meta: { name: '对接资源' }
            }, {
                path: '/index/contact',
                component: lazy('contact'),
                meta: { name: '代理加盟' }
            }]
        },
        {
            path: '/login',
            name: 'login',
            component: lazy('login/loginInfo'),
            children: [{
                    path: '',
                    name: 'login',
                    component: lazy('login/login')
                },
                {
                    path: 'reset',
                    name: 'resetPassword',
                    component: lazy('login/resetPassword')
                }, {
                    path: 'register',
                    name: 'register',
                    component: lazy('login/register')
                }
            ]
        },

        //  开通销售权限
        {
            path: '/logins',
            name: 'logins',
            component: lazy('login/loginInfo'),
            children: [{
                path: '',
                name: 'logins',
                component: lazy('logins/logins')
            }]
        },

        {
            path: '/manage/home',
            name: 'home',
            component: lazy('manage/home'),
            redirect: { path: 'home/order/order_data' },
            children: [
                {
                    path: '/home/user/member',
                    component: lazy('manage/user/member'),
                    meta: { name: '会员' }
                },
                {
                    path: '/home/shop/shopinfo',
                    component: lazy('manage/shop/shopinfo'),
                    meta: { name: '商家信息' }
                },
                {
                    path: '/home/goods/goods',
                    component: lazy('manage/goods/goods'),
                    meta: { name: '商品' }
                },
                {
                    path: '/home/goods/goods_edit',
                    component: lazy('manage/goods/goods_edit'),
                    meta: { name: '编辑商品' }
                },
                {
                    path: '/home/goods/goods_add',
                    component: lazy('manage/goods/goods_add'),
                    meta: { name: '增加商品' }
                },
                {
                    path: '/home/goods/goods_group',
                    component: lazy('manage/goods/goods_group')
                },
                {
                    path: '/home/goods/goods_off',
                    component: lazy('manage/goods/goods_off')
                },
                {
                    path: '/home/community',
                    component: lazy('manage/community'),
                    meta: { name: '社区' }
                },
                {
                    path: '/home/order/order_data',
                    component: lazy('manage/order/order_data')
                },

                {
                    path: '/home/order/order',
                    component: lazy('manage/order/order'),
                    redirect: { path: '/home/order/order/notpost' },
                    meta: { name: '订单' },
                    children: [

                        {
                            path: 'notpost',
                            component: lazy('manage/order/notpost')

                        },
                        {
                            path: 'notreceive',
                            component: lazy('manage/order/notreceive')

                        },

                        {
                            path: 'finish',
                            component: lazy('manage/order/finish')

                        },
                        {
                            path: 'refund',
                            component: lazy('manage/order/refund')

                        }
                    ]
                },
                {
                    path: '/home/spread',
                    component: lazy('manage/express')
                },
                {
                    path: '/home/marketing/coupon',
                    component: lazy('manage/marketing/coupon')
                },
                {
                    path: '/home/marketing/member',
                    component: lazy('manage/marketing/member')
                },
                {
                    path: '/home/marketing/cut',
                    component: lazy('manage/marketing/cut')
                },
                {
                    path: '/home/marketing/distribution',
                    component: lazy('manage/marketing/distribution')
                },
                {
                    path: '/home/marketing/gift',
                    component: lazy('manage/marketing/gift')
                },
                {
                    path: '/home/marketing/flash',
                    component: lazy('manage/marketing/flash')
                },
                {
                    path: '/home/marketing/reword',
                    component: lazy('manage/marketing/reword')
                }
            ]
        },
        {
            path: '/business/home',
            name: 'business',
            component: lazy('business/home'),
            redirect: { path: 'business/order/order_data' },
            children: [{
                    path: '/business/user/member',
                    component: lazy('business/user/member'),
                    meta: { name: '会员' }
                },
                {
                    path: '/business/distribution/member',
                    component: lazy('business/distribution/member')
                },
                {
                    path: '/business/distribution/withdrawal',
                    component: lazy('business/distribution/withdrawal')
                },
                {
                    path: '/business/distribution/configuration',
                    component: lazy('business/distribution/configuration')
                },
                {
                    path: '/business/group/member',
                    component: lazy('business/group/member')
                },
                {
                    path: '/business/group/details',
                    component: lazy('business/group/details')
                },
                {
                    path: '/business/group/configuration',
                    component: lazy('business/group/configuration')
                },
                {
                    path: '/business/group/earnings',
                    component: lazy('business/group/earnings')
                },
                {
                    path: '/business/group/DynamicData',
                    component: lazy('business/group/DynamicData')
                },
                {
                    path: '/business/group/partner',
                    component: lazy('business/group/partner')
                },
                {
                    path: '/business/group/partnerDetails',
                    component: lazy('business/group/partnerDetails')
                },
                {
                    path: '/business/management/gements',
                    component: lazy('business/management/gements')
                },
                {
                    path: '/business/management/salesguration',
                    component: lazy('business/management/salesguration')
                },
                {
                    path: '/business/management/pmanag',
                    component: lazy('business/management/pmanag')
                },
                {
                    path: '/business/management/sales_edit',
                    component: lazy('business/management/sales_edit')
                },
                {
                    path: '/business/management/Addsales',
                    component: lazy('business/management/Addsales')
                },
                {
                    path: '/business/management/Lookmore',
                    component: lazy('business/management/Lookmore')
                },

                //  销售中心
                {
                    path: '/business/Salescenter/learning',
                    component: lazy('business/Salescenter/learning')
                },
                {
                    path: '/business/Salescenter/payments',
                    component: lazy('business/Salescenter/payments')
                },
                {
                    path: '/business/Salescenter/presentation',
                    component: lazy('business/Salescenter/presentation')
                },
                {
                    path: '/business/Salescenter/salescenter',
                    component: lazy('business/Salescenter/salescenter')
                },
                {
                    path: '/business/Salescenter/stration',
                    component: lazy('business/Salescenter/stration')
                },
                {
                    path: '/business/Salescenter/examine',
                    component: lazy('business/Salescenter/examine')
                },
                {
                    path: '/business/Setmeal/Setmeal',
                    component: lazy('business/Setmeal/Setmeal')
                },

                {
                    path: '/business/personal/personal',
                    component: lazy('business/personal/personal')
                },

                {
                    path: '/business/shop/shopinfo',
                    component: lazy('business/shop/shopinfo'),
                    meta: { name: '商铺信息' }
                },
                {
                    path: '/business/shop/qrCode',
                    component: lazy('business/shop/qrCode'),
                    meta: { name: '二维码' }
                },
                {
                    path: '/business/shop/logistics',
                    component: lazy('business/shop/logistics'),
                    meta: { name: '物流设置' }
                },
                {
                    path: '/business/shop/modify',
                    component: lazy('business/shop/modify'),
                    meta: { name: '商铺装修' }
                },
                {
                    path: '/business/authorization/authorization',
                    component: lazy('business/authorization/authorization'),
                    meta: { name: '小程序授权' }
                },
                {
                    path: '/business/authorization/wechatPay',
                    component: lazy('business/authorization/wechatPay'),
                    meta: { name: '微信支付' }
                },
                {
                    path: '/business/authorization/release',
                    component: lazy('business/authorization/release'),
                    eta: { name: '发布管理' }
                },
                {
                    path: '/business/goods/goods',
                    component: lazy('business/goods/goods'),
                    meta: { name: '商品' }
                },
                {
                    path: '/business/goods/goods_add',
                    component: lazy('business/goods/goods_add'),
                    meta: { name: '添加商品' }
                },
                {
                    path: '/business/goods/goods_edit',
                    component: lazy('business/goods/goods_edit'),
                    meta: { name: '编辑商品' }
                },
                {
                    path: '/business/goods/goods_group',
                    component: lazy('business/goods/goods_group')
                },
                {
                    path: '/business/goods/goods_off',
                    component: lazy('business/goods/goods_off')
                },
                {
                    path: '/business/community',
                    component: lazy('business/community'),
                    meta: { name: '社区' }
                },
                {
                    path: '/business/order/order_data',
                    component: lazy('business/order/order_data')
                },
                {
                    path: '/business/order/order_list',
                    component: lazy('business/order/order_list')
                },
                {
                    path: '/business/order/statistics',
                    component: lazy('business/order/statistics')
                },
                // 物流订单
                {
                    path: '/business/order/online',
                    component: lazy('business/order/online/order'),
                    redirect: { path: '/business/order/online/notpost' },
                    meta: { name: '订单' },
                    children: [{
                            path: 'notpost',
                            component: lazy('business/order/online/notpost')

                        },
                        {
                            path: 'notreceive',
                            component: lazy('business/order/online/notreceive')

                        },

                        {
                            path: 'finish',
                            component: lazy('business/order/online/finish')

                        },
                        {
                            path: 'refund',
                            component: lazy('business/order/online/refund')

                        }
                    ]
                },
                // 堂吃订单
                {
                    path: '/business/order/restaurant',
                    component: lazy('business/order/restaurant/order'),
                    redirect: { path: '/business/order/restaurant/notpost' },
                    meta: { name: '订单' },
                    children: [{
                            path: 'notpost',
                            component: lazy('business/order/restaurant/notpost')

                        },
                        {
                            path: 'notreceive',
                            component: lazy('business/order/restaurant/notreceive')

                        },

                        {
                            path: 'finish',
                            component: lazy('business/order/restaurant/finish')

                        },
                        {
                            path: 'refund',
                            component: lazy('business/order/restaurant/refund')

                        }
                    ]
                },
                // 外卖订单
                {
                    path: '/business/order/send',
                    component: lazy('business/order/send/order'),
                    redirect: { path: '/business/order/send/notpost' },
                    meta: { name: '订单' },
                    children: [{
                            path: 'notpost',
                            component: lazy('business/order/send/notpost')

                        },
                        {
                            path: 'notreceive',
                            component: lazy('business/order/send/notreceive')

                        },

                        {
                            path: 'finish',
                            component: lazy('business/order/send/finish')

                        },
                        {
                            path: 'refund',
                            component: lazy('business/order/send/refund')

                        }
                    ]
                },
                // 服务订单
                {
                    path: '/business/order/service',
                    component: lazy('business/order/service/order'),
                    redirect: { path: '/business/order/service/notpost' },
                    meta: { name: '订单' },
                    children: [{
                            path: 'notpost',
                            component: lazy('business/order/service/notpost')

                        },
                        {
                            path: 'notreceive',
                            component: lazy('business/order/service/notreceive')

                        },

                        {
                            path: 'finish',
                            component: lazy('business/order/service/finish')

                        },
                        {
                            path: 'refund',
                            component: lazy('business/order/service/refund')

                        }
                    ]
                },
                // 服务类商品订单
                {
                    path: '/business/order/service_goods',
                    component: lazy('business/order/service_goods/order'),
                    redirect: { path: '/business/order/service_goods/notpost' },
                    meta: { name: '订单' },
                    children: [{
                            path: 'notpost',
                            component: lazy('business/order/service_goods/notpost')

                        },
                        {
                            path: 'notreceive',
                            component: lazy('business/order/service_goods/notreceive')

                        },

                        {
                            path: 'finish',
                            component: lazy('business/order/service_goods/finish')

                        },
                        {
                            path: 'refund',
                            component: lazy('business/order/service_goods/refund')

                        }
                    ]
                },
                // 票务订单
                {
                    path: '/business/order/ticket',
                    component: lazy('business/order/ticket/order'),
                    redirect: { path: '/business/order/ticket/notpost' },
                    meta: { name: '订单' },
                    children: [{
                            path: 'notpost',
                            component: lazy('business/order/ticket/notpost')

                        },
                        {
                            path: 'notreceive',
                            component: lazy('business/order/ticket/notreceive')

                        },

                        {
                            path: 'finish',
                            component: lazy('business/order/ticket/finish')

                        },
                        {
                            path: 'refund',
                            component: lazy('business/order/ticket/refund')

                        }
                    ]
                },
                {
                    path: '/business/marketing/coupon',
                    component: lazy('business/marketing/coupon')
                },
                {
                    path: '/business/marketing/member',
                    component: lazy('business/marketing/member')
                },
                {
                    path: '/business/marketing/cut',
                    component: lazy('business/marketing/cut')
                },
                {
                    path: '/business/marketing/distribution',
                    component: lazy('business/marketing/distribution')
                },
                {
                    path: '/business/marketing/gift',
                    component: lazy('business/marketing/gift')
                },
                {
                    path: '/business/marketing/flash',
                    component: lazy('business/marketing/flash')
                },
                {
                    path: '/business/marketing/reword',
                    component: lazy('business/marketing/reword')
                }
            ]
        },
        {
            path: '/agent',
            component: lazy('agent/home'),
            redirect: { path: '/agent/order/order_data' },
            children: [{
                    path: '/agent/order/order_data',
                    component: lazy('agent/order/order_data')
                },
                {
                    path: '/agent/order/order',
                    component: lazy('agent/order/order'),
                    redirect: { path: '/agent/order/notpost' },
                    meta: { name: '订单' },
                    children: [{
                            path: '/agent/order/finish',
                            component: lazy('agent/order/finish')
                        },
                        {
                            path: '/agent/order/notpost',
                            component: lazy('agent/order/notpost')
                        },
                        {
                            path: '/agent/order/notreceive',
                            component: lazy('agent/order/notreceive')
                        },
                        {
                            path: '/agent/order/refund',
                            component: lazy('agent/order/refund')
                        }
                    ]
                },
                {
                    path: '/agent/goods/goods',
                    component: lazy('agent/goods/goods')
                },
                {
                    path: '/agent/goods/goods_group',
                    component: lazy('agent/goods/goods_group')
                },
                {
                    path: '/agent/goods/goods_edit',
                    component: lazy('agent/goods/goods_edit')
                },
                {
                    path: '/agent/shop/shopinfo',
                    component: lazy('agent/shop/shopinfo')
                },
                {
                    path: '/agent/pay',
                    component: lazy('agent/pay')
                },
                {
                    path: '/agent/agentinfo',
                    component: lazy('agent/agentinfo')
                },
                {
                    path: '/agent/spread',
                    component: lazy('agent/spread')
                },
                {
                    path: '/agent/joininfo',
                    component: lazy('agent/joininfo')
                }
            ]
        },
        {
            path: '/unclewei/home',
            name: 'unclewei',
            component: lazy('unclewei/home'),
            redirect: { path: 'unclewei/order/order_data' },
            children: [
                {
                    path: '/unclewei/user/member',
                    component: lazy('unclewei/user/member'),
                    meta: { name: '会员' }
                },
                {
                    path: '/unclewei/user/memberSet',
                    component: lazy('unclewei/user/memberSet'),
                    meta: { name: '会员' }
                },
                {
                    path: '/unclewei/distribution/spring',
                    component: lazy('unclewei/distribution/spring')
                },
                {
                    path: '/unclewei/distribution/member',
                    component: lazy('unclewei/distribution/member')
                },
                {
                    path: '/unclewei/distribution/withdrawal',
                    component: lazy('unclewei/distribution/withdrawal')
                },
                {
                    path: '/unclewei/distribution/configuration',
                    component: lazy('unclewei/distribution/configuration')
                },
                {
                    path: '/unclewei/group/member',
                    component: lazy('unclewei/group/member')
                },
                {
                    path: '/unclewei/group/details',
                    component: lazy('unclewei/group/details')
                },
                {
                    path: '/unclewei/group/configuration',
                    component: lazy('unclewei/group/configuration')
                },
                {
                    path: '/unclewei/group/earnings',
                    component: lazy('unclewei/group/earnings')
                },
                {
                    path: '/unclewei/group/DynamicData',
                    component: lazy('unclewei/group/DynamicData')
                },
                {
                    path: '/unclewei/management/gements',
                    component: lazy('unclewei/management/gements')
                },
                {
                    path: '/unclewei/management/salesguration',
                    component: lazy('unclewei/management/salesguration')
                },
                {
                    path: '/unclewei/management/pmanag',
                    component: lazy('unclewei/management/pmanag')
                },
                {
                    path: '/unclewei/order/statistics',
                    component: lazy('unclewei/order/statistics')
                },
                {
                    path: '/unclewei/management/sales_edit',
                    component: lazy('unclewei/management/sales_edit')
                },
                {
                    path: '/unclewei/management/Addsales',
                    component: lazy('unclewei/management/Addsales')
                },
                {
                    path: '/unclewei/management/Lookmore',
                    component: lazy('unclewei/management/Lookmore')
                },
                {
                    path: '/unclewei/personal/personal',
                    component: lazy('unclewei/personal/personal')
                },
                {

                    path: '/unclewei/authorization/authorization',
                    component: lazy('unclewei/authorization/authorization'),
                    meta: { name: '小程序授权' }
                },
                {
                    path: '/unclewei/authorization/wechatPay',
                    component: lazy('unclewei/authorization/wechatPay'),
                    meta: { name: '微信支付' }
                },
                {
                    path: '/unclewei/authorization/release',
                    component: lazy('unclewei/authorization/release'),
                    eta: { name: '发布管理' }
                },
                {
                    path: '/unclewei/goods/goods',
                    component: lazy('unclewei/goods/goods'),
                    meta: { name: '商品' }
                },
                {
                    path: '/unclewei/goods/goods_add',
                    component: lazy('unclewei/goods/goods_add'),
                    meta: { name: '添加商品' }
                },
                // 堂吃订单
                {
                    path: '/unclewei/order/restaurant',
                    component: lazy('unclewei/order/restaurant/order'),
                    redirect: { path: '/unclewei/order/restaurant/notpost' },
                    meta: { name: '订单' },
                    children: [{
                            path: 'notpost',
                            component: lazy('unclewei/order/restaurant/notpost')

                        },
                        {
                            path: 'notreceive',
                            component: lazy('unclewei/order/restaurant/notreceive')

                        },

                        {
                            path: 'finish',
                            component: lazy('unclewei/order/restaurant/finish')

                        },
                        {
                            path: 'refund',
                            component: lazy('unclewei/order/restaurant/refund')

                        }
                    ]
                },
                // 外卖订单
                {
                    path: '/unclewei/order/send',
                    component: lazy('unclewei/order/send/order'),
                    redirect: { path: '/unclewei/order/send/notpost' },
                    meta: { name: '订单' },
                    children: [{
                            path: 'notpost',
                            component: lazy('unclewei/order/send/notpost')

                        },
                        {
                            path: 'notreceive',
                            component: lazy('unclewei/order/send/notreceive')

                        },

                        {
                            path: 'finish',
                            component: lazy('unclewei/order/send/finish')

                        },
                        {
                            path: 'refund',
                            component: lazy('unclewei/order/send/refund')

                        }
                    ]
                },
                //店铺设置
                {
                    path: '/unclewei/shop/shopinfo',
                    component: lazy('unclewei/shop/shopinfo'),
                    meta: { name: '商铺信息' }
                },
                {
                    path: '/unclewei/shop/qrCode',
                    component: lazy('unclewei/shop/qrCode'),
                    meta: { name: '二维码' }
                },
                {
                    path: '/unclewei/shop/logistics',
                    component: lazy('unclewei/shop/logistics'),
                    meta: { name: '物流设置' }
                },
                {
                    path: '/unclewei/shop/modify',
                    component: lazy('unclewei/shop/modify'),
                    meta: { name: '商铺装修' }
                },
                {
                    path: '/unclewei/goods/goods_edit',
                    component: lazy('unclewei/goods/goods_edit'),
                    meta: { name: '编辑商品' }
                },
                {
                    path: '/unclewei/goods/goods_group',
                    component: lazy('unclewei/goods/goods_group')
                },
                {
                    path: '/unclewei/goods/goods_off',
                    component: lazy('unclewei/goods/goods_off')
                },
                {
                    path: '/unclewei/order/order_data',
                    component: lazy('unclewei/order/order_data')
                },
                {
                    path: '/unclewei/order/order_list',
                    component: lazy('unclewei/order/order_list')
                },
                {
                    path: '/unclewei/marketing/coupon',
                    component: lazy('unclewei/marketing/coupon')
                },
                {
                    path: '/unclewei/marketing/member',
                    component: lazy('unclewei/marketing/member')
                },
                {
                    path: '/unclewei/marketing/memberSet',
                    component: lazy('unclewei/marketing/memberSet')
                },
                {
                    path: '/unclewei/marketing/cut',
                    component: lazy('unclewei/marketing/cut')
                },
                {
                    path: '/unclewei/marketing/distribution',
                    component: lazy('unclewei/marketing/distribution')
                },
                {
                    path: '/unclewei/marketing/gift',
                    component: lazy('unclewei/marketing/gift')
                },
                {
                    path: '/unclewei/marketing/flash',
                    component: lazy('unclewei/marketing/flash')
                },
                {
                    path: '/unclewei/marketing/reword',
                    component: lazy('unclewei/marketing/reword')
                }
            ]
        },
        {
            path: '/agent',
            component: lazy('agent/home'),
            redirect: { path: '/agent/order/order_data' },
            children: [{
                    path: '/agent/order/order_data',
                    component: lazy('agent/order/order_data')
                },
                {
                    path: '/agent/order/order',
                    component: lazy('agent/order/order'),
                    redirect: { path: '/agent/order/notpost' },
                    meta: { name: '订单' },
                    children: [{
                            path: '/agent/order/finish',
                            component: lazy('agent/order/finish')
                        },
                        {
                            path: '/agent/order/notpost',
                            component: lazy('agent/order/notpost')
                        },
                        {
                            path: '/agent/order/notreceive',
                            component: lazy('agent/order/notreceive')
                        },
                        {
                            path: '/agent/order/refund',
                            component: lazy('agent/order/refund')
                        }
                    ]
                },
                {
                    path: '/agent/goods/goods',
                    component: lazy('agent/goods/goods')
                },
                {
                    path: '/agent/goods/goods_group',
                    component: lazy('agent/goods/goods_group')
                },
                {
                    path: '/agent/goods/goods_edit',
                    component: lazy('agent/goods/goods_edit')
                },
                {
                    path: '/agent/shop/shopinfo',
                    component: lazy('agent/shop/shopinfo')
                },
                {
                    path: '/agent/pay',
                    component: lazy('agent/pay')
                },
                {
                    path: '/agent/agentinfo',
                    component: lazy('agent/agentinfo')
                },
                {
                    path: '/agent/spread',
                    component: lazy('agent/spread')
                },
                {
                    path: '/agent/joininfo',
                    component: lazy('agent/joininfo')
                }
            ]
        },
        {
            path: '/copartner',
            name: 'copartner',
            component: lazy('copartner')
        },
        {
            path: '/shopchoose',
            name: 'shopchoose',
            component: lazy('chooseshop')
        },
        {
            path: '*',
            name: 'error404',
            component: lazy('404')
        },

    ]
})

// router.beforeEach((to, from, next) => {
//   // NProgress.start();

//   console.log(to)
//   if (to.path === '/login') {
//     store.remove('user');
//   }
//   const user = store.get('user');
//   if (!user && to.path !== '/login' && to.path !== '/login/reset'&& to.path !== '/index/product') {
//     next({ path: '/login' });
//   } else {
//     next();
//   }
// });

export default router