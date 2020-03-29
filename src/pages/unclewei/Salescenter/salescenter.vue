<template>
   <!-- 销售首页 -->
     <div class="sale">      
            <p class="title">认证</p>     
            <div class="salecent">
                <div class="salecent-con">
                    <div class="salecent-title">
                    <p class="salecent-name">小何</p>
                    <p class="salecent-rz">
                        <img src="@/assets/images/rz.png" alt="">
                        已认证成功</p>
                    </div>
                    <div class="salecent-list">
                        <img src="@/assets/images/price.png" alt="">
                        <p>总金额：￥100.00</p>
                        <p class="salecent-mx">提现</p>
                        <p class="salecent-mx">查看明细</p>
                    </div>
                    <div class="salecent-list">
                        <img src="@/assets/images/xs.png" alt="">
                        <p>子销售：10人</p>
                        <p class="salecent-mx">查看明细</p>
                    </div>
                    <div class="salecent-list">
                        <img src="@/assets/images/dp.png" alt="">
                        <p>店铺数：100家</p>
                    </div>
                </div>
            </div> 
            <hr class="hrs">
            <p class="title">开通店铺</p> 
            <div class="salecent-bt-cocn">
                <div class="salecent-bt">
                    <div class="salecent-bts">
                    <div class="salecent-bt-list">
                    <img src="@/assets/images/login.png" alt="">
                    <p>店铺名称</p>
                    </div>
                    <div class="salecent-bx">
                        <p>基础版</p>
                    </div>
                    </div>
                </div>
                <div class="salecent-bt">
                    <div class="salecent-bts">
                    <div class="salecent-bt-list">
                    <img src="@/assets/images/login.png" alt="">
                    <p>店铺名称</p>
                    </div>
                    <div class="salecent-bx">
                        <p>基础版</p>
                    </div>
                    </div>
                </div>
                <div class="salecent-bt">
                    <div class="salecent-bts">
                    <div class="salecent-bt-list">
                    <img src="@/assets/images/login.png" alt="">
                    <p>店铺名称</p>
                    </div>
                    <div class="salecent-bx">
                        <p>基础版</p>
                    </div>
                    </div>
                </div>
                <div class="salecent-bt">
                    <div class="salecent-bts">
                    <div class="salecent-bt-list">
                    <img src="@/assets/images/login.png" alt="">
                    <p>店铺名称</p>
                    </div>
                    <div class="salecent-bx">
                        <p>基础版</p>
                    </div>
                    </div>
                </div>
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

.title{
    width:100%;
    height:25px;
    line-height:25px;
    font-size:14px;
    border-left:3px solid #2589ff;
    padding-left:15px;
    position:relative
}

.title::before{
    content :"";
    height :25px;
    width 1px;
    background #2589ff;
    position absolute;
    left 3px;
    top 0
}

.salecent{
    margin:30px 0;
}

.salecent-con{
   max-width:480px;
   min-height:240px;
   border:1px solid #bbbbbb;
 //    margin:0 auto;
   border-radius:10px;
   margin-left:20px;
   overflow hidden
}

.salecent-title{
  width:100%;
  height:68px;
  line-height:68px;
  background:#2589FF;
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:0 25px;
}

.salecent-title p{
    margin:inherit;
    color:#fff
}
.salecent-name{
     font-size:16px;
}
.salecent-rz{
    font-size:14px;
}
.salecent-rz img{
    display:inline-block;
    width:24px;
    height:24px;
}

.salecent-list{
    display:flex;
    font-size:14px;
    align-items:center;
    padding:0 25px;
}

.salecent-list p{
    padding-left:10px;
}
.salecent-list img{
    width:24px;
    height:24px;
}
.salecent-mx{
    color: #2589ff;
    cursor:pointer
}

.salecent-bt{
    margin-left 50px;
}
.salecent-bt:nth-child(1){
  margin-left 20px
}


.salecent-bt-cocn{
     display:flex;
    // justify-content: space-evenly;
    margin-top:50px;
    flex-wrap:wrap;
}

.salecent-bt-list{
    max-width:140px;
    max-height:168px;
    border:1px solid #bbbbbb;
   
}
.salecent-bt-list img{
     max-width:140px;
    max-height :120px;
}
.salecent-bt-list p{
    max-width:140px;
    max-height :48px;
    text-align:center;
    line-height:48px;
    font-size:14px;
    margin:inherit;
}

.salecent-bts{
   position:relative;
    max-width:140px;
}

.salecent-bx{
    position absolute;
    top: -20px;
    right: -20px;
    border:1px solid #bbbbbb;
    border-radius:50%;
    font-size:12px;
    width:42px;
    height:42px;
    text-align:center;
    background:#fff;
}

@media (max-width: 900px) {
   .sale{
       padding:20px;
   }

   .salecent{
       margin:0
   }

   .salecent-list{
       font-size:12px;
   }
   .salecent-con{
       min-height:200px;
       margin-left:0
   }
   .salecent-bt-cocn{
       margin-top:0;
      justify-content: space-around;
      margin-bottom:50px;
   }
   .salecent-bt{
       margin-top:30px;
       margin-left:0
   }
   .salecent-bt:nth-child(1){
      margin-left:0
   }

   .hrs{
       margin :20px 0
   }

}

</style> 



<style>

</style>



