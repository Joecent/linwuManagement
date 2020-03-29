<template>
     <!-- 学习中心 -->
     <div>
         <div class="learning">
            <ul class="learning-ul">
                <li class="learning-list">
                    <img src="@/assets/images/joinbg.png" alt="">
                     <p>小程序开通流程</p>
                </li>
                  <li class="learning-list">
                    <img src="@/assets/images/joinbg.png" alt="">
                     <p>公众号申请流程</p>
                </li>
                  <li class="learning-list">
                    <img src="@/assets/images/joinbg.png" alt="">
                     <p>销售管理使用说明</p>
                </li>
                  <li class="learning-list">
                    <img src="@/assets/images/joinbg.png" alt="">
                     <p>小程序开通流程</p>
                </li>
                  <li class="learning-list">
                    <img src="@/assets/images/joinbg.png" alt="">
                     <p>小程序开通流程</p>
                </li>
                  <li class="learning-list">
                    <img src="@/assets/images/joinbg.png" alt="">
                     <p>销售管理使用说明</p>
                </li>
            </ul>
         </div>
     </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {};
  }
};
</script>

<style lang="stylus" scoped>
  
.learning-ul{
    display:flex;
    flex-wrap:wrap;
    margin-left: 30px;
    justify-content: space-evenly;
}
  .learning-list {
      max-width 340px;
      width:340px;
      text-align:center
  }

  .learning-list img{
      max-width:340px;
      width:340px;
      max-height 200px;
      margin-top:20px;
  }

  .learning-list p{
      border: 1px solid #bbb;
      margin: inherit;
      height 60px;
      line-height 60px;
      font-size:18px;
  }

  @media (max-width: 900px) {
    .learning-ul{
      margin-left:0;
      margin-bottom:30px;
    }
    .learning-list,.learning-list img{
      min-width:300px;
    }

    .learning{
      margin-bottom:50px;
      
    }
  }
</style>