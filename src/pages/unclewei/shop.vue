<template>
	<div>
		<div class="add">
			<el-button type="primary" icon="el-icon-plus"  @click="addshop = true">创建</el-button>
		</div>
		<div  class="shops">
			<div class="shop" v-for='item in shops'  @click='chooseShop(item)'>
				<img :src="item.photo">
				<h2>{{item.name}}</h2>
			</div>
		</div>
		<el-dialog title="创建店铺" :visible.sync="addshop">
		  <el-form :model="form">
		    <el-form-item label="店铺名称" :label-width="formLabelWidth">
		      <el-input v-model="form.name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="上传店铺logo" :label-width="formLabelWidth">
		      <el-upload
			  class="avatar-uploader"
			  action="https://www.huixianfeng.net/upload"
			  :show-file-list="true"
			  :on-success="handleAvatarSuccess"
			  :before-upload="beforeAvatarUpload">
			  <img v-if="imageUrl" :src="imageUrl" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		    </el-form-item>
		    <el-form-item label="上传背景图片" :label-width="formLabelWidth">
		      <el-upload
			  class="upload-demo"
			  drag
			  action="https://www.huixianfeng.net/upload"
			  :on-success='uploadsuccess'

			  multiple>
			  <i class="el-icon-upload"></i>
			  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
		    </el-form-item>

		    <el-form-item label="选择会员加入形式" :label-width="formLabelWidth">
		      <el-switch
				  v-model="form.member_type"
				  active-text="付费加入"
				  inactive-text="免费进入">
				</el-switch>
		    </el-form-item>

		    <el-form-item label="每年收费" :label-width="formLabelWidth" v-if='form.member_type'>
		      <el-input v-model="form.member_money" auto-complete="off" placeholder='请输入金额'></el-input>
		    </el-form-item>

		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="nextStep">下一步</el-button>
		  </div>
		</el-dialog>

		<el-dialog title="" :visible.sync="secondStep">
		  <el-form :model="form">
		    <el-form-item label="输入会员须知：" :label-width="formLabelWidth">
		      <el-input
				  type="textarea"
				  :autosize="{ minRows: 4, maxRows: 10}"
				  placeholder="请输入内容"
				  v-model="form.member_info">
				</el-input>
		    </el-form-item>

		    <el-form-item label="" :label-width="formLabelWidth">
		      <el-checkbox >同意《会先锋商家合作协议》</el-checkbox>
		    </el-form-item>

		    <el-form-item label="请输入推广码" :label-width="formLabelWidth">
		      <el-input v-model="form.plan_code" auto-complete="off" placeholder='请输入推广码'></el-input>
		    </el-form-item>

		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="secondStep = false">取 消</el-button>
		    <el-button type="primary" @click="complete">完成</el-button>
		  </div>
		</el-dialog>

	</div>
</template>
<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import { create_shop, show_shop} from '@/utils/api'
export default{
  data () {
    
    return {
      show: false,
      shops: [
        1, 2, 3
      ],
      addshop: false,
      secondStep: false,
      form: {
			    member_type: true,
			    member_money: '',
	            name: '',
	            photo: '',
	            plan_code: '',
	            member_info: ''
      },
        	formLabelWidth: '180px',
        	imageUrl: ''
    }
  },
 
  methods: {
    uploadsuccess (response, file, fileList) {
      console.log(response.data.pic)
      this.form.photo = response.data.pic
    },
    nextStep () {
      this.addshop = false
      this.secondStep = true
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.form.logo = res.data.pic
      console.log(res.data.pic, '=================')
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    complete () {
      	let params = Object.assign({}, this.form)
      	params.member_type = this.form.member_type ? 1 : 2
      	params.card_photo = this.form.photo
      	params.token = store.get('token')
      	console.log(store.get('token'))
      	create_shop({params}).then((res) => {
      		console.log(res, '===================')
      	})
    },
    show_shop () {
    	const baseUrl = 'https://www.huixianfeng.net/'
      	show_shop({token: store.get('token')}).then((res) => {
      		res.forEach(item => {
      			item.photo = baseUrl + item.photo
      			item.logo = baseUrl + item.photo
      			item.card_photo = baseUrl + item.card_photo
      			
      		})
      		this.shops = res
      		console.log(res[0].id)
      	})
    },
    chooseShop(item){
    	store.set('currentshopid',item.id)
    	this.$router.push({ path: '/home/community' })
    }

  },
  created () {
    this.show_shop()
  }
}
</script>

<style lang="stylus" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed black;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    background-color:red;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.add
	display flex
	justify-content flex-end
	padding-right 200px
.shops
	margin 50px 100px
	.shop
		display inline-block
		margin-right 130px
		margin-bottom 70px
		width: 199px;
		height: 262px;
		border-radius: 10px;
		over-flow hidden
		position relative
		img
			width 100%
			height 100%
			border-radius: 10px;
		h2
			position absolute
			bottom 0
			width: 200px;
			height: 74px;
			background-color: rgba(255, 255, 255, 0.9);
			opacity: 0.9;
			font-family: MicrosoftYaHeiLight;
			font-size: 22px;
			font-weight: normal;
			font-stretch: normal;
			line-height 74px
			text-align  center
			letter-spacing: 0px;
			color: #000d07;
</style>
