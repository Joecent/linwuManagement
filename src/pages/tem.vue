<template>

</template>
<script type="text/javascript">
export default{

}
</script>

<style lang="stylus" scoped>
 .container {
   .header {
    line-height: 60px;
    background: #eef1f6;
    color:#fff;
    overflow: hidden;

    .logo {
      height: 100%;
      font-size: 22px;
      padding-left:18px;
      border-color: rgba(238,241,146,0.3);
      border-right-width: 1px;
    }
    .logo-width{
      width:230px;
    }
    .logo-collapse-width{
      width:60px;
      margin-right:200px
    }

    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;

      .userinfo-inner {
        cursor: pointer;
        color:#fff;

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin: 8px 0px 10px 10px;
          float: right;
          border:2px solid white;
        }
      }
    }
  }
  } 


  
 .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border:1px dashed gray;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
 
</style>


