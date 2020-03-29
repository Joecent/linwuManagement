<template>
	<div class="logistics_page">
		<div>
		<div v-if='shop_type!==21'>
			<div>选择配送方式</div>
			<div class="info">
				<el-radio v-model="send_type" label="1">商家自己配送</el-radio>
				<!--<el-radio v-model="send_type" label="2">美团配送</el-radio>-->
				<el-radio v-model="send_type" label="3">达达配送</el-radio>
				<el-radio v-model="send_type" label="4">快递</el-radio>
				<!--<el-radio v-model="send_type" label="5">到店自取</el-radio>-->
			</div>
		</div>
		<div v-if="send_type=='4'"><br>
			<div class="info">选择快递公司</div>
			<el-select v-model="sendinfo.express" placeholder="请选择快递" @change="handleSelected">
						<!--<el-option label="顺丰" value="顺丰"></el-option>-->
						<el-option label="申通" value="申通"></el-option>
						<el-option label="圆通" value="圆通"></el-option>
						<el-option label="中通" value="中通"></el-option>
						<el-option label="韵达" value="韵达"></el-option>
						<el-option label="天天" value="天天"></el-option>
						<el-option label="百世汇通" value="百世汇通"></el-option>
						<el-option label="京东快递" value="京东快递"></el-option>
						<el-option label="EMS" value="EMS"></el-option>
						<el-option label="德邦" value="德邦"></el-option>
						<el-option label="全峰" value="全峰"></el-option>
						<el-option label="中铁快运" value="中铁快运"></el-option>
						<el-option label="如风达" value="如风达"></el-option>
						<el-option label="宅急送" value="宅急送"></el-option>
						<el-option label="其它" value="其它"></el-option>
					</el-select>
			</div>
	<br>
		<div class="btn"><el-button type="primary" size='small' @click="handleClick">确定</el-button></div>
	</div>
	</div>
</template>
<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import { get_citycode_list,post_set,post_get} from '@/utils/api'
	export default{
		data(){
			return{
				shop_type:store.get('shop_type'),
				send_type:'5',
				post_type:'',//其他快递方式
				sendinfo:{
					express:'',
					number:''
				}
			}
		},
		created(){
			post_get({
				shop_id:store.get('currentshopid')
			}).then((res)=>{
				this.send_type=res.data.send_type+''
				this.sendinfo.express=res.data.post_type
			})
		},
		methods: {			
			 handleSelected(e){
				this.post_type=e			 
			 },
			 handleClick(){
				 //shop_id: store.get('currentshopid')
				 if(this.send_type=='4'&&this.post_type==''){
						this.$message.error('请选择快递公司')
				 }else if(this.send_type=='4'&&this.post_type!=''){
					 	post_set({
							 shop_id:store.get('currentshopid'),
							 send_type:this.send_type,
							 post_type:this.post_type
						 }).then((res)=>{
							 if(res.error_code=='1000'){
								 this.$message.success('更新成功')
							 }else{
								 this.$message.error('更新失败')
							 }
						 })
				 }else{
					 post_set({
							 shop_id:store.get('currentshopid'),
							 send_type:this.send_type
						 }).then((res)=>{
							if(res.error_code=='1000'){
								 this.$message.success('更新成功')
							 }else{
								 this.$message.error('更新失败')
							 }
							 this.sendinfo.express=''
						 })
				 }
			 }
 		}
	}
</script>
<style lang="stylus" scoped>
.logistics_page
	padding-top 30px
	padding-left 60px
	.info
		margin 15px 0 20px
		height auto
	.btn
		margin 15px 0 20px 20px
		display block
		height auto
@media(max-width:900px) {
		.logistics_page{
			padding-top:30px;
			padding-left:15px;
		}
		.btn{
			margin-left:10px;
		}
	}
</style>