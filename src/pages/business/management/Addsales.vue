<template>
    <div class="add-con">
          <!-- 添加销售 -->
         <div class="sales_title">
           <a><img src="@/assets/images/back.png" alt="" @click="back"></a>
           <span>添加销售</span>
         </div> 
          <div class="addsale">
            <div class="addsales-con">
                <div class="genm">
                  <div class="gemn-title">销售等级人</div>
                   <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
                       </el-option>
                     </el-select>
                </div>
           </div>
         </div>
          <div class="download">
            <div class="download-title">来源资料</div>
             <div class="download-con">
                <p>开通二维码</p>
                <img src="@/assets/images/wechat.jpg">
                <div class="downs">
                    <p><img src="@/assets/images/downsimg.png" alt="">
                     下载</p>
                </div>
             </div>
             <div class="download-bt">
                 <div class="download-bts">
                   <p>开通销售权限链接 <a>www.baidu.com</a></p>
                   <div class="btn">复制链接</div>
                 </div>
             </div>
         </div>
    </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "销售人"
        },
        {
          value: "选项2",
          label: "初级销售"
        },
        {
          value: "选项3",
          label: "中级销售"
        },
        {
          value: "选项4",
          label: "高级销售"
        }
      ],
      value: ""
    };
  },

  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    }
  }
};
</script>


<style lang="stylus" scoped>
.sales_title {
    display: flex;
    width: 100%;
    background: #293643;
    height: 50px;
    line-height: 50px;
    align-items: center;
}

.sales_title a img {
    width: 12px;
    display: block;
    cursor: pointer;
}

.sales_title span, .sales_title a {
    padding-left: 20px;
    color: #fff;
}

.addsale {
    border-bottom: 1px solid #bbbbbb;
}

.addsales-con {
   max-width: 400px;
    margin: 50px auto 100px;
}

.genm {
    display: flex;
    justify-content: space-betweenc;
    align-items: center;
}

.gemn-title {
    margin-right: 30px;
    font-size: 16px;
}

.download-con {
    text-align: center;
}

.download-con img {
    width: 173px;
    height: 173px;
    margin: 0 auto;
}

.download-title {
    margin: 10px 0;
    font-size: 14px;
    padding-left: 10px;
    border-left: 2px solid #2589FF;
    position:relative;
    height 20px;
    line-height 20px;
}

.download-title:before{
   content:"";
   width:1px;
    height 20px;
   background:#2589FF;
   position:absolute;
   left:2px;
   top:0
}


.downs img {
    width: 24px;
    height: 24px;
    display: inline-block;
}

.download-bt {
    text-align: center;
}

.download-bts {
    max-width: 400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content:space-between
}

.download-bts p{
    font-size :16px;
}

.download-bts a {
    color: #1CC09E;
}

.btn {
    width: 66px;
    height: 25px;
    border: 1px solid #bbb;
    border-radius: 4px;
    font-size: 12px;
    line-height: 25px;
    margin-left: 20px;
    text-align:center
}

 @media(max-width:900px ) {
 .addsales-con{
     margin: 50px auto
  }

  .addsale{
      padding :0 20px
  }
  .genm{
      display:flex;
      justify-content:space-between
  }
  .gemn-title {
      margin-right:0px;
      font-size:12px
  }
  .download-bt{
      text-align:inherit
  }
  .download-bts{
      display:flex;
      justify-content:space-between
  }
  .btn{
      margin-left:0
  }
 }
</style>

<style>

 @media(max-width:900px ) {
  .download{
      padding:0 15px;
  }
  
  .genm .el-input__icon{
      line-height:1px
  }
}  
</style>


