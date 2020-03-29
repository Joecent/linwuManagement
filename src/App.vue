<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: "App"
};
</script>

<style>
@import "./assets/css/style.styl";
@import "./assets/css/position.styl";
/*按钮的样式*/
.data_btn {
  display: inline-block;
  background-color: white;
  min-width: 50px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  text-align: center;
  padding: 0 5px;
  border-radius: 4px;
  cursor: pointer;
}
.btn_success {
  border: 1px solid #1cc09e;
  color: #1cc09e;
}
.btn_danger {
  border: 1px solid #e51c23;
  color: #e51c23;
}
.btn_info {
  border: 1px solid #409eff;
  color: #409eff;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  overflow: auto;
  color: #323232;
  background: #f9f9f9;
  -webkit-overflow-scrolling: touch;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.el-input-group__prepend {
  padding: 0 3px !important;
}
.el-submenu [class^="fa"] {
  vertical-align: baseline;
  margin-right: 0px;
}
.el-upload-dragger {
  /* width: 200px;*/
  height: 100px;
}
.el-upload {
  display: flex;
  align-items: center;
}
.el-upload-list--picture-card .el-upload-list__item {
  width: 120px;
  height: 123px;
}
.el-upload--picture-card {
  width: auto;
  height: 40px;
  border: none;
  line-height: 40px;
  background-color: white;
}
.el-dropdown-menu__item:hover {
  background-color: white !important;
  color: #409eff !important;
}
.el-menu-item [class^="fa"] {
  vertical-align: baseline;
  margin-right: 0px;
}
.el-dialog__footer {
  padding: 0 20px 20px;
}
.el-dialog__body {
  padding: 10px 20px 20px;
}
.el-dialog {
  width: 50%;
  background-color: white;
  margin-top: 70px !important;
}
.el-form-item__content {
  display: flex;
}

.toolbar {
  background: #f2f2f2;
  padding: 10px;
  height: 60px;
  //border:1px solid #dfe6ec;
  margin: 10px 0px;
  .el-form-item {
    margin-bottom: 10px;
  }
}
.el-input__inner {
  width: 100%;
}

.el-dialog {
  width: 900px;
}

.el-radio {
  float: left;
}

.type_choose {
  display: block;
}
.lee-title1 {
  display: none;
}

@media (max-width: 1200px) {
  .el-upload--picture-card {
    height: auto;
  }
}

@media (max-width: 900px) {
  .el-upload--picture-card {
    display: block;
  }

  .lee-title1 {
    display: block;
    color: #1a1a1a;
    border-left: 3px solid #ff8661;
    height: 18px;
    line-height: 18px;
    text-align: left;
    margin-bottom: 10px;
    padding-left: 8px;
    font-size: 14px;
    position: relative;
    margin-left: 20px;
    margin-top: 10px;
  }

  .div .body .el-main .breadcrumb-container {
    margin-bottom: 0 !important;
  }

  .lee-title1:before {
    content: "";
    position: absolute;
    height: 18px;
    width: 1px;
    background: #ff8661;
    left: 2px;
    top: 0;
  }

  .choosepage,
  .choosepage .title,
  .choosepage .choose {
    width: 100%;
    padding: 0 50px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
  }

  .shops {
    text-align: center;
    display: block;
    flex-wrap: initial;
    border-top: 2px solid #ff8661;
  }

  .shops .shop {
    display: inline-block;
    float: none;
    vertical-align: top;
  }

  .build_image {
    margin: 0 auto;
  }

  .choosepage .title {
    margin-top: 0;
    border-bottom: 2px solid #ff8661;
  }

  .choosepage .title .outname {
    padding-top: 15px;
  }

  .add {
    background: #ff8661;
    margin: 15px auto;
    width: 90%;
    height: 40px;
  }

  .add .add_button {
    background: none;
    border: none;
    width: 100%;
  }
  .el-form-item__content {
    float: none;
    width: 100%;
    margin-left: 0 !important;
  }
}

@media (max-width: 760px) {
  .choosepage,
  .choosepage .title,
  .choosepage .choose {
    padding: 0;
  }

  .shops .shop {
    width: 47%;
    margin-right: 4%;
    height: auto;
    margin-bottom: 15px;
    vertical-align: top;
  }

  .shops .shop .shop_info,
  .build_image,
  .shops .shop .shop_info h2 {
    width: 100%;
  }

  .shops .shop:nth-child(odd) {
    margin-right: 0;
  }

  .shops .shop .shop_info h2 {
    opacity: 1;
    background: rgba(255, 255, 255, 0.9);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
  }

  .lee-map {
    font-size: 12px;
    margin-top: 5px;
    color: #c0c4cc;
  }

  .lee-map a {
    color: #409eff;
  }

  .avatar-uploader,
  .add_picture {
    display: block;
    width: 100%;
  }

  .el-upload__tip {
    color: #c0c4cc;
  }

  .add_picture .add_picture_text {
    color: #409eff;
  }

  .el-upload-dragger .el-upload__text {
    padding-top: 30px;
  }

  .shops {
    width: 100%;
    padding: 15px 5%;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
  }

  .el-radio {
    float: left;
    margin-bottom: 5px;
  }

  .type_choose {
    display: block;
  }

  .el-dialog {
    width: 90% !important;
  }

  .el-upload-dragger {
    width: 100%;
  }

  .choosepage .title {
    padding: 0 20px;
  }

  .el-input {
    width: 100%;
    height: 30px;
    line-height: 30px;
  }

  .el-form-item {
    margin-bottom: 10px;
  }

  .el-input__inner {
    height: 30px;
    line-height: 30px;
  }

  .el-form-item__label {
    width: 100%;
    text-align: left;
    font-size: 14px;
    line-height: 25px;
    height: 25px;
    float: none;
  }

  .el-form-item__content {
    line-height: inherit;
    height: auto;
  }

  .el-dialog__header {
    text-align: center;
  }

  .el-form-item__content {
    display: block;
    width: 100%;
  }

  .shop_photo img {
    width: 100%;
    height: auto;
  }

  .el-upload-list--picture-card {
    display: block;
    width: 100%;
  }

  .el-upload-list--picture-card .el-upload-list__item {
    width: 100%;
    height: auto;
  }
}

@import "../../../assets/css/chooseshop.css";
</style>


