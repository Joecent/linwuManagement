<template>
	<section class="chart-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="打印机" name="first">
        <!-- <div class="balance">
            <div class="printer"><span>购买打印机</span><img :src="img"></div>
        </div> -->
        <div class="l-container-open">
				<div class="l-container-left">是否开启打印：</div>
				<el-switch class="l-container-right" v-model="is_open" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
		</div>
        <div v-if="is_open">
        <div class="l-container-printer">
				<div class="l-container-left">选择打印机：</div>
				<el-radio class="l-container-right" v-model="printer" label="1">易联云</el-radio>
		</div>
         <div class="l-container-box">
				<div class="l-container-left">终端号：</div>
				<el-input class="l-container-right" :disabled="is_disabled" v-model="terminal"></el-input>
		</div>
         <div class="l-container-box">
				<div class="l-container-left">密钥：</div>
				<el-input class="l-container-right" :disabled="is_disabled" v-model="secret_key"></el-input>
		</div>
        </div>
        <div class="l-container-btn">
				<el-button  class="l-btn-left" type="primary" @click="handleSubmit">保 存</el-button>
                <div  class="data_btn btn_success" v-if="is_disabled"  @click="is_disabled=!is_disabled">编 辑</div>
                <el-button class='scan' @click="sys_click()">扫一扫</el-button>					
		</div>
        
      </el-tab-pane>
   </el-tabs>
  </section>
</template>
<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import {get_plat_info,access_print,get_print_config} from '@/utils/api'
import wx from 'weixin-js-sdk'
import img from '@/assets/images/code.jpg'
export default{
    data(){
        return{
          activeName:'first',
          is_open:true,
          is_disabled:'',
          printer:'1',
          img:img,
          secret_key:'',
          terminal:''
        }
      },      
    methods:{
        handleSubmit(){
                if(this.secret_key==''){
                    this.$message.error('密钥不能为空')
                }else if(this.terminal==''){
                    this.$message.error('终端号不能为空')
                }else{
                    access_print({
                        is_print:this.is_open?'1':'0',
                        machine_code:this.terminal,
                        msign:this.secret_key,
                        shop_id:store.get('currentshopid')
                    }).then(res=>{
                            if(res.status=='1'){
                                window.open(res.url)
                                //this.$message.success('提交成功')
                            }else if(res.status=='0'){
                                this.$message.error('添加失败,或打印机已存在')
                            }
                    })
                    
                }
            
        },
        sys_click(){
            get_plat_info({url:location.href}).then(res=>{
                if(res.error_code=='1000'){
                        wx.config({
                            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: res.data.appid, // 必填，公众号的唯一标识
                            timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                            nonceStr: res.data.noncestr, // 必填，生成签名的随机串
                            signature: res.data.signature,// 必填，签名
                            jsApiList: ['checkJsApi','scanQRCode'] // 必填，需要使用的JS接口列表
                        })
                         wx.error(res=>{
                            this.$message.error('出错了'+res.errMsg)
                        })
                        wx.ready(function(){
                            wx.checkJsApi({
                                jsApiList:['scanQRCode'],
                            })
                        })
                         wx.scanQRCode({
                            needResult:1,// 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                            scanType:["qrCode","barCode"],// 可以指定扫二维码还是一维码，默认二者都有
                            success:function(res){// 当needResult 为 1 时，扫码返回的结果
                                alert(res)
                                var result = res.resultStr.split(',')[1]
                                //window.location.href='https://www.linwushop.com/business/shop/shop/shopinfo?number='+result//因为我这边是扫描后有个链接，然后跳转到该页面
                                alert(result)
                            }
                        })
                }
            })
        }
    },
    created(){
        get_print_config({
            shop_id:store.get('currentshopid') 
        }).then(res=>{
            if(res.status=='1'){
                if(res.data!=null){
                    this.terminal=res.data.machine_code
                    this.secret_key=res.data.msign
                    this.is_disabled=true
                }else{
                    this.is_disabled=false
                }
                this.is_open=res.is_print.is_print=='1'?true:false
            }
        })
    }
}
</script>
<style lang="stylus" scoped>
  .chart-container{
      padding-top:30px;
      padding-left:20px;
      font-size:15px;
  }
  .scan{
      display:none;
  }
  .l-container-open{
      display:flex
      margin-bottom:5px;
      .l-container-left{
         min-width:110px; 
      }
      .l-container-right{
           margin-left:10px;
       }
  }
  .l-container-printer{
       margin-top:20px;
       display:flex;
       align-items:center;
       .l-container-left{
           padding-bottom: 5px;
           min-width:110px;
       }
       .l-container-right{
           margin-left:10px;
       }
  }
  .l-container-box{
      display:flex;
      align-items:center;
	  margin:15px 0;
      .l-container-left{
          min-width:110px;
      }
      .l-container-right{
          width:30%;
          .l-input{
            width:190px;
          }
      }
  }
  .data_btn{
      margin-left:10px;
  }
  .balance{
    padding:20px;
    background:#f5f7fa;
    border:1px solid #bbb;
    border-radius:4px;
    margin:15px 0;
    text-align:right;
    cursor:pointer;
    .printer{
      position:relative;
      display:inline-block;
      padding:5px 10px;
      border:1px solid #409eff;
      color:#409eff;
      margin-right:10px;
      img{
        position:absolute;
        top:31px;left:0;
        width:96px;height:0;
        transition: .5s linear;
        z-index:10;
      }
    }
    .printer:hover img{
        height:96px;
    }
}
	@media(max-width:900px) {
    .chart-container{
        padding-top:20px;
        padding:20px;
        font-size:14px
    }
    .scan{
        display:inline-block
    }
    .l-container-box{
      display:block;
	  margin:15px 0;
      .l-container-left{
          min-width:80px;
      }
      .l-container-right{
          width:75%;
          .l-input{
            width:220px;
          }
      }
  }
}
</style>
