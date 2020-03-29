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
                            <a href="college.html" class="select">邻伍课堂</a>
                        </li>
                        <li>
                            <a href="ContactUs.html">关于我们</a>
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
                    <div class="banner-title">邻伍课堂</div>
                    <div class="banner-keywords">Neighbouring class</div>
                </div>
                <div class="banner-right"><img src="@/assets/img/college/banner.png" /></div>
               
            </div>
        </div>

        <!--首页banner图结束-->
        <!-- 邻伍课堂内容开始 -->
        <div class="college">
            <div class="t-content">
                <div class="college-left">
                    <div class="college-search">
                        <input type="search" placeholder="根据资料名称关键词进行搜索" />
                    </div>
                    <!-- class="college-screen" -->
                    <div class="college-hotPush">
                        <ul id="accordion" class="accordion">
                            <li>
                                <div class="link">视频专区 <span class="fa-chevron-down"> <img src="@/assets/img/college/one.png"> </span></div>
                                <ul class="submenu box">
                                    <li>
                                        <input type="checkbox" value="id1" /><a>邻伍1</a>
                                    </li>
                                    <li>
                                        <input type="checkbox" value="id2" /><a>邻伍1</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <div class="link">操作指南 <span class="fa-chevron-down"> <img src="@/assets/img/college/one.png"> </span></div>
                                <ul class="submenu box">
                                    <li>
                                        <input type="checkbox" value="id3" /><a>邻伍1</a>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <div class="link">行业资讯 <span class="fa-chevron-down"> <img src="@/assets/img/college/one.png"> </span></div>
                                <ul class="submenu box">
                                    <li>
                                        <input type="checkbox" value="id2" /><a>邻伍1</a>
                                    </li>
                                    <li>
                                        <input type="checkbox" value="id4" /><a>邻伍15456212</a>
                                    </li>
                                </ul>
                            </li>

                        </ul>

                    </div>

                    <div class="college-hotPush accordion">
                        <div class="college-hotPush-title link">推荐课程</div>
                        <ul class="box ">
                            <li>
                                <input type="checkbox" value="id2" /><a>邻伍商家后台管理操作</a>
                            </li>
                            <li>
                                <input type="checkbox" value="id3" /><a>销售后台操作教学视频为主</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="college-right">
                    <ul>
                        <li id="id1">
                            <div class="college-right-title"><span>行业资讯</span>商模版操作—添加商品</div>
                            <div class="college-right-time">2018年10月30日</div>
                            <div class="college-right-content">********************************************************************************************************************************************************************************************************************************</div>
                            <div class="college-right-button">
                                <a href="javascript:;">观看视频</a>
                                <a href="javascript:;">下载资料</a>
                            </div>
                        </li>
                        <li id="id2">
                            <div class="college-right-title"><span>视频专区</span>商模版操作—添加商品</div>
                            <div class="college-right-time">2018年10月30日</div>
                            <div class="college-right-content">********************************************************************************************************************************************************************************************************************************</div>
                            <div class="college-right-button">
                                <a href="javascript:;">观看视频</a>
                                <a href="javascript:;">下载资料</a>
                            </div>
                        </li>
                        <li id="id3">
                            <div class="college-right-title"><span>操作指南</span>商模版操作—添加商品</div>
                            <div class="college-right-time">2018年10月30日</div>
                            <div class="college-right-content">********************************************************************************************************************************************************************************************************************************</div>
                            <div class="college-right-button">
                                <a href="javascript:;">观看视频</a>
                                <a href="javascript:;">下载资料</a>
                            </div>
                        </li>
                        <li id="id4">
                            <div class="college-right-title"><span>操作指南</span>商模版操作—添加商品</div>
                            <div class="college-right-time">2018年10月30日</div>
                            <div class="college-right-content">********************************************************************************************************************************************************************************************************************************</div>
                            <div class="college-right-button">
                                <a href="javascript:;">观看视频</a>
                                <a href="javascript:;">下载资料</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 邻伍课堂内容结束 -->
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
import "@/assets/css/college.css";
import "@/assets/js/nav.js"
export default {
  data() {
    return {
    };
  },
    mounted() {
        $(function() {
          var Accordion = function(el, multiple) {
            this.el = el || {};
            this.multiple = multiple || false;

            // Variables privadas
            var links = this.el.find(".link");
            // Evento
            links.on(
              "click",
              {
                el: this.el,
                multiple: this.multiple
              },
              this.dropdown
            );
          };

          Accordion.prototype.dropdown = function(e) {
             var $el = e.data.el;
             var $this = $(this);
             var $next = $this.next();

            $next.slideToggle();
            $this.parent().toggleClass("open");

            if (!e.data.multiple) {
              $el
                .find(".submenu")
                .not($next)
                .slideUp()
                .parent()
                .removeClass("open");
            }
          };
          var accordion = new Accordion($("#accordion"), false);
          $(".submenu li").click(function() {
            $(this)
              .addClass("current")
              .siblings("li")
              .removeClass("current");
          });

          
          $(".box :checkbox").change(function(event) {
            $("#" + this.value).toggle(this.checked);
            console.log(this.checked);
          });
        });
      }
};
</script>

<style scoped>
   
</style>

