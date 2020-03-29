<template>
    <div class="wrapper">
        <!--公用头部开始-->
        <!-- <div class="t-header">
            <div class="t-content">
                <div class="t-logo">
                    <a><img src="img/common/logo.png" /></a>
                </div>
                <div class="t-nav">
                    <div class="dianji">
                        <img src="img/home/icons.png" alt="">
                    </div>
                    <ul>
                        <li>
                            <a href="index.html">主页</a>
                        </li>
                        <li>
                            <a href="Product.html">产品中心</a>
                        </li>
                        <li>
                            <a href="cooperation.html">渠道合作</a>
                        </li>
                        <li>
                            <a href="college.html">邻伍课堂</a>
                        </li>
                        <li>
                            <a href="ContactUs.html" class="select">关于我们</a>
                        </li>
                    </ul>
                </div>
                <div class="t-nav-search_signIn">
                    <ul>
                        <li>
                            <a href="javascript:;"><img src="img/common/search.png" /></a>
                        </li>
                        <li>
                            <a href="javascript:;"><img src="img/common/signIn.png" /></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div> -->
        <!--公用头部结束-->
        <!--首页banner图开始-->
        <div class="banner">
            <div class="t-content">
                <div class="banner-left banner-lefts">
                    <div class="banner-title">关于我们</div>
                    <div class="banner-keywords">Product Center</div>
                    <!-- <div class="banner-button">
							<a href="javascript:;">立刻加入</a>
						</div> -->
                </div>
                <div class="banner-right"><img src="@/assets/img/about/banner.png" /></div>
                <div class="t-page-nav">
                    <ul>
                        <li>
                            <a href="javascript:;">关于我们</a>
                        </li>
                        <li>
                            <a href="javascript:;">发展历史</a>
                        </li>
                        <li>
                            <a href="javascript:;">反馈留言</a>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
        <!--首页banner图结束-->
        <div class="t-content news">
            <div class="about-con">
                <div class="about-img">
                    <img src="@/assets/img/about/about.png" alt="">
                </div>
                <div class="about-rg">
                    <p class="about-p">上海邻伍信息科技有限公司，核心技术团队来自上海交通大学，具有丰富的互联网平台经验。我们秉承“持续创新，传递价值”的理念，为商家提供小程序解决方案。目前邻伍一共有5个产品线小程序，
                        多行业模块，涵盖全行业小程序解决方案。</p>
                    <p class="about-p1">SaaS服务:</p>
                    <p class="about-p1">针对各行业的不同商家，研究用户不同的使用需求和消费场景，推出5大产品线小程序，满足全行业的不同需求;涵盖电商，零售，餐饮，美业，教育，服务的多个行业的标准化系统，支持轻量级的定制服务；
                        拥有砍价，团购，优惠券，好友分享等社交营销工具，帮助商家轻松获客；支持物流追踪，优惠券核销，订单核销，导航到店等功能；
                        永久维护，持续更新，平均每2周更新一个新功能。做生意，用邻伍小程序。
                    </p>
                </div>
            </div>
        </div>

        <!-- 发展历史开始 -->
        <div class="development tools">
            <div class="t-hone-title">发展历史</div>
            <div class="development-img">
                <img src="@/assets/img/about/deve_img.png" alt="" class="deve">
                <img src="@/assets/img/about/deve_img1.png" alt="" class="deve1">
            </div>
        </div>

        <!-- 发展历史结束 -->
        <!-- 提交开始 -->
        <div class="Agent case">
            <div class="Agent-title">
                <p>我们非常荣幸收到您对我们平台的反馈与建议，我们会仔细查看，并进行改进</p>
            </div>

            <div class="lianximy">
                <form action="">
                    <div class="contact_1">
                        <label class="gjla">您的姓名：</label>
                        <div class="contact_txt">
                            <input type="text" name="name" id="name" value="" placeholder="请输入您的姓名" />
                        </div>
                    </div>

                    <div class="Electronics">
                        <div class="contact_1">
                            <label class="gjla">您的手机号：</label>
                            <div class="contact_txt contact_txt1">
                                <input type="text" name='tel' id="tel" value="" placeholder="请输入您的手机号" />
                            </div>
                        </div>

                        <div class="contact_1">
                            <label class="gjla">您的邮箱：</label>
                            <div class="contact_txt contact_txt1">
                                <input type="text" name='email' id="email" value="" placeholder="请输入您的邮箱" />
                            </div>
                        </div>
                    </div>

                    <div class="contact_1">
                        <label class="gjla">您的行业：</label>
                        <div class="contact_txt">
                            <input type="text" name='industry ' id="industry " value="" placeholder="请输入您的行业" />
                        </div>
                    </div>

                    <div class="contact_1">
                        <label class="gjla">您的信息：</label>
                        <div class="contact_txt">
                            <input type="text" name='mation ' id="mation " value="" placeholder="请输入您的信息" />
                        </div>
                    </div>

                    <!-- <div class="contact_1">
						<label class="gjla5">详细说明：</label>
						<div class="textarea">
							<textarea rows="6" name='beizhu' id="beizhu" cols=""></textarea>
						</div>
					</div> -->

                    <div class="sub">
                        <input type="submit" id="sub" name="submit" class="submit1" value="提交">
                    </div>

                </form>
            </div>

        </div>
        <!-- 提交结束 -->

        <!--公用底部开始-->
		<div class="t-footer">
			<div class="t-introduce">
				<div class="t-content">
					<ul>
						<li>
							<div class="phone">
								<div class="phone-icon"><img src="@/assets/img/common/phone.png" /></div>
								<div class="t-introduce-title">总部咨询电话11：</div>
								<div class="t-introduce-title">13601624592</div>
							</div>
						</li>
						<li>
							<div class="contact">
								<div class="t-introduce-title">联系方式：</div>
								<div class="t-introduce-content">QQ：975878313</div>
								<div class="t-introduce-content">邮箱：Zhongyu.Li@WechatTi.com</div>
								<div class="t-introduce-content">工作时间：周一到周日8:00-23:00</div>
								<div class="t-introduce-content">公司地址：上海市闵行区沪闵路383号尚源B111</div>
							</div>
						</li>
						<li>
							<div class="qr-code">
								<div class="t-introduce-title">微信公众号：</div>
								<div class="t-introduce-img"><img src="@/assets/img/common/qr-code.png" /></div>
							</div>
						</li>
						<li>
							<div class="qr-code">
								<div class="t-introduce-title">扫码加入产品讨论：</div>
								<div class="t-introduce-img"><img src="@/assets/img/common/qr-code.png" /></div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="t-copyright">
				<div class="t-content">
					Copycight @ 2011-2018www.linwushopcom. All Rights Reserved 上海邻伍信息科技有限公司 Icloud.com 版权所有 沪ICP备14044897号-9<br />沪公网安备31000302004314号
				</div>
			</div>
		</div>
		<!--公用底部结束-->
    </div>

</template>

<script type="text/javascript">
import "@/utils/jquery-2.1.1.min.js";
import "@/assets/css/index1.css";
import "@/assets/css/common/common.css";
import "@/assets/css/common/css3.css";
import "@/assets/css/common/Initialization.css";
import "@/assets/css/about.css";
import "@/assets/js/nav.js"
export default{
  data () {
    return {
     
    }
  },
  mounted(){
    
  }
}
</script>



