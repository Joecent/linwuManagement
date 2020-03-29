<template>
	<div>
		<div class="banfun">
			<div class="banner">
        <dev class="banner_left">
            <div class="left_content">
              <div class="l_c_on"><span id="l_c_on_ido">邻伍 </span><span id="l_c_on_idt">社交电商平台</span></div>
              <div class="l_c_tw"><span id="l_c_tw_id">小程序＋货源一体化平台</span></div>
              <div class="l_c_th"><span id="l_c_th_id">释放商家的价值   &nbsp;&nbsp;&nbsp;&nbsp; 连接每一位顾客</span></div>
              <div class="l_c_fo">
                <img src="../assets/images/content_left.png">
                <span id="l_c_fo_id">
                <div style="color:red; " @click="tojoin"><span style="cursor: pointer;">立即加入</span></div>
                </span>
              </div>
            </div>
        </dev>
        <dev class="banner_right">
          <img src="../assets/images/content_right.png">
        </dev>
    </div>
			<div class="function">
        <div class="function_title">邻伍电商平台的主要功能是什么？</div>
        <div class="function_images">
            <div class="contents_left contents-content">
              <div class="images_box"><img src="@/assets/images/function_left_small.png"></div> 
            </div>
            <div class="contents_middle contents-content">
              <div class="images_box"><img src="@/assets/images/function_middle_big.png"></div>          
            </div>
            <div class="contents_right contents-content">
              <div class="images_box"><img src="@/assets/images/function_right_small.png"></div>
            </div>
        </div>
    </div>
		</div>
		<div class="advan">
    
    <div class="advan_title">邻伍电商平台的特色是什么？</div>
    <div class="advan_left">
      <img src="../assets/images/advan_left.png">
      <div id="advan_left_top">
        <span>挖掘社交红利</span>
      </div>
      <div id="advan_left_bottom">
        <span>提升商品销量<br />扩大品牌认知度</span>
      </div>  
    </div>
    <div class="advan_right">
      <img src="../assets/images/advan_right.png">
      <div id="advan_right_top">
        <span>高度数据化</span>
      </div>
      <div id="advan_right_bottom">
        <span>直观方便地展示订单<br />的全方位动态数据</span>
      </div>
     
    </div>
  </div>
		<div class="advan_flow">
			<div class="advantages">
      <div class="plat_advan">邻伍电商平台有什么优势？</div>
      <div class="advan2-content"><img src="../assets/images/advan2.png"></div>
      
      <div class="text1">
        <span>一体化&nbsp;&nbsp;数据化&nbsp;&nbsp;轻便化</span>
      </div>
      <div class="text3"><span>更亲民的服务，&nbsp;更满意的商品</span></div>
      <div class="text2">
        <span>轻松增长订单，&nbsp;获得更多好评！</span>
      </div>
      
    </div>
			<div class="flow">
      <div class="flow_title">如何成为邻伍电商平台的商户？</div>
      
      <div class="flow-content">
      <img id="flow_left" src="../assets/images/flow_left.png">
        <div class="flow_left_text">
          <span class="flow_left_span">注册/登录</span>通过网址<a href="https://www.linwushop.com">https://www.linwushop.com</a>进入商家后天系统首页，注册帐号进入邻伍电商平台商家后台管理系统
        </div>
      </div>
      <div class="flow-content">
        <img id="flow_middle" src="../assets/images/flow_middle.png">
        <div class="flow_middle_text">
          <span class="flow_middle_span">填写个人信息</span>进入商家后台管理系统后，在个人版块完善个人信息
        </div>
      </div>
      <div class="flow-content">
        <img id="flow_right" src="../assets/images/flow_right.png">
        <div class="flow_right_text">
          <span class="flow_right_span">合作方式</span>完善个人信息后，点击“下一步”，交付押金
        </div>
      </div>
    </div>
		</div>
		<div class="contact">
			<div class="bg"></div>
			<div class="contact_text">
				<div class="contact_ways">
					<div class="address">公司地址：上海市闵行区沪闵路383号尚源A3</div>
					<div class="telephone">联系方式：
						<div>13601624592（移动电话/微信）
							<div class="qq">QQ：975878313</div>
						</div>
					</div>
					<div class="time">周一到周日 8：00 ~ 23：00</div>
				</div>
				<div class="open_flat">
					<div>微信公众号</div>
					<div><img src="../assets/images/wechat.jpg"></div>
				</div>
				<div class="discuss">
					<div>扫码加入产品讨论</div>
					<div class="discuss_img"><img src="../assets/images/leader.png"></div>
				</div>
			</div>
		</div>
    <div class="record">
      <a style="color:#666666" href="http://beian.miit.gov.cn">沪ICP备17004554号-3</a>
    </div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {

			}

		},
		methods: {
			tojoin() {
				this.$router.push('/login')
			}
		}
	}
</script>
<style lang="stylus" scoped>
	@import '../assets/css/product.styl';
</style>

<style type="text/css" lang="stylus" scoped>
	@import '../assets/css/index.css';
	
</style>