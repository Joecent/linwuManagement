<template>
	<div class="cates_page">
		<div class="addcates" v-if="shop_id==7">
			<div  class="addcates_button" @click="showaddcate=true"><i class="el-icon-plus" style="margin-right:5px"></i>添加分类</div>
			<!--<div class="delete_all" @click="delete_all=true">批量删除</div>-->
		</div>
		<div class="lee-title1">分组列表</div>
		<div class="cates">
			<div class="cate" v-for="item in cates">
				<div class="cate_sort_name">
					<div class="sort">{{item.sort}}、</div>
					<div class="cate_img">
						<!-- <img :src='item.cate_img'  v-if='shop_type!=2'></img> -->
						<div class="cate_name" @click="show_cate(item.cate_id)">{{item.cate_name}}</div>
						<div class="goods_num">
						商品数：<span>{{item.goods_num}}</span>
						</div>
					</div>

				</div>

				<div class="editcates">
					<div v-if="shop_id==7" class="edit data_btn btn_success" @click="toeditcate(item.cate_id,item.cate_name,item.sort,item.cate_img,item.goods_type)">编 辑</div>
					<div v-if="shop_id==7" class="delete">
						<span v-if="item.cate_on=='0'" class="data_btn btn_info" @click="handlePutaway(item.cate_id)">上 架</span>
						<span v-else class="data_btn btn_danger" @click="handleShelves(item.cate_id)">下 架</span>
					</div>
					<!--<div class="delete" @click="todeletecate(item.cate_id)">删除</div>-->
				</div>
				<div class="delete_all_button" v-if="delete_all"></div>
			</div>
		</div>
		<!-- 添加分类 -->
	  	<el-dialog title="添加分类" :visible.sync="showaddcate" class="addcate_dialog" :modal-append-to-body='false'>
	  		<el-form :model="addedcate">
	  			<el-form-item label="分类名称"><el-input placeholder="请输入新增分类名称" class="inputaddcate" v-model="addedcate.name"></el-input></el-form-item>
	  			<el-form-item label="分类排序"><el-input placeholder="请输入排序" v-model="addedcate.sort" class="inputsort"></el-input></el-form-item>
          	<!-- <el-form-item label="是否快递" label-width="80px">
				<el-switch
					v-model="sendtype"
					active-text="是"
				  	inactive-text="否"
            style="margin-top:10px">
				</el-switch></el-form-item> -->
        <!-- <div>{{sendtype}}</div> -->
	  			<!-- <el-form-item v-if='shop_type!=2' label="上传图片">
		      	<el-upload
			  	class="avatar-uploader"
			  	action="https://www.linwushop.com/api/upload_img"
			  	list-type="picture-card"
					:file-list="add_image"
			  	:on-success="handleAvatarSuccess"
			  	:on-remove="remove_avatar"
			  	:before-upload="beforeAvatarUpload">
			  	<div v-if="logo_upload_success==false" class="add_picture">
			  		<i class="el-icon-plus avatar-uploader-icon"></i>
			  		<div class="add_picture_text">建议尺寸：100*100px</div>
			  	</div>
				</el-upload>
		    	</el-form-item> -->

	  		</el-form>
	  			<div class="options">
	  				<button class="cancle" @click="showaddcate=false">取消</button>
              		<button class="comfirm" @click="add_cate">确认</button>
              	</div>
	  	</el-dialog>
		<!-- 编辑分类 -->
	  	<el-dialog title="修改分类" :visible.sync="showeditcate" class="editcate_dialog" :modal-append-to-body='false'>
	  		<el-form :model="editcate">
	  			<el-form-item label="分类名称"><el-input placeholder="请输入新的分类名称" class="inputaddcate" v-model="editcate.name"></el-input></el-form-item>
	  			<el-form-item label="分类排序"><el-input placeholder="请输入新的排序" v-model="editcate.sort" class="inputsort"></el-input></el-form-item>
          	<!-- <el-form-item label="是否快递" label-width="80px">
				<el-switch
					v-model="sendtype"
					active-text="是"
				  	inactive-text="否"
            style="margin-top:10px">
				</el-switch></el-form-item> -->
				<!-- <el-form-item v-if='shop_type!=2' label="上传图片">
		      	<el-upload
			  	class="avatar-uploader"
			  	action="https://www.linwushop.com/api/upload_img"
			  	list-type="picture-card"
			  	:file-list="image_list"
			  	:on-success="edit_handleAvatarSuccess"
			  	:on-remove="remove_avatar"
			  	:before-upload="beforeAvatarUpload">
			  	<div v-if="logo_upload_success==false" class="add_picture">
			  		<i class="el-icon-plus avatar-uploader-icon"></i>
			  		<div class="add_picture_text">建议尺寸：100*100px</div>
			  	</div>
				</el-upload>
		    	</el-form-item> -->
	  		</el-form>
	  			<div class="options">
	  				<button class="cancle" @click="showeditcate=false">取消</button>
              		<button class="comfirm" @click="subedit">确认</button>
              	</div>
	  	</el-dialog>
	  	<!-- 删除分类 -->
	  	<el-dialog title="删除商品" class="remove" :visible.sync="is_delete" :modal-append-to-body='false'>
            <div class="message">删除该类别会影响该类别下商品展示，确定删除该类？</div>
            <div class="question">
              <button class="cancle" @click="is_delete=false">取消</button>
              <button class="comfirm" @click="deletecate()">确认</button>
            </div>
        </el-dialog>
	</div>
</template>

<script type="text/javascript">
import * as store from "@/utils/sdk/store";
import { sel_cate_shop, del_cate, add_cate, edit_cate,goodsGroups,upGoodsGroupStatus} from "@/utils/api";
export default {
  data() {
    return {
      sendtype:false,
      shop_type: store.get("shop_type"),
      showcates: false,
      cates: [],
      showaddcate: false,
      showeditcate: false,
      is_delete: false,
      cate_id: "",
      shop_id:store.get("currentshopid"),
      indexnum: "",
      delete_all: false,
      addedcate: {
        name: "",
        sort: "",
        cate_img: ""
      },
      editcate: {
        name: "",
        sort: "",
        id: "",
        cate_img: ""
      },
      logo_upload_success: false,
      image_list: [],
      add_image: []
    };
  },
  methods: {
		handlePutaway(id){//上架
				upGoodsGroupStatus({
						cate_id:id,
						shop_id: store.get("currentshopid"),
						status:'1'
				}).then(res=>{
						if(res.status=='1'){
								this.showcate();
								this.$message.success('上架成功')
						}
				})
		},
		handleShelves(id){//下架
				upGoodsGroupStatus({
						cate_id:id,
						shop_id: store.get("currentshopid"),
						status:'0'
				}).then(res=>{
						this.showcate();
						this.$message.success('下架成功')
				})
		},
    todeletecate(id) {
      this.cate_id = id;
      this.is_delete = true;
    },
    show_cate(id) {
      this.$router.push({
        path: "/business/goods/goods",
        query: { cate_id: id }
      });
    },
    showcate() {
      sel_cate_shop({ shop_id: store.get("currentshopid") }).then(res => {
        this.cates = res.data;
      });
    },
    deletecate() {
      del_cate({ cate_id: this.cate_id }).then(res => {
        if (res.error_code == 1003) {
          this.$message.error(res.msg);
        }
        if (res.error_code == 1000) {
          this.is_delete = false;
          this.showcate();
          this.$message("删除成功");
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.logo_upload_success = true;
      this.imageUrl = URL.createObjectURL(file.raw);
      this.addedcate.cate_img = res.data.img_url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/bmp";
      const isLt2M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG/BMP 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return isJPG && isLt2M;
    },
    remove_avatar() {
      this.logo_upload_success = false;
    },
    edit_handleAvatarSuccess(res, file) {
      this.logo_upload_success = true;
      //this.imageUrl = URL.createObjectURL(file.raw)
      this.image_list = [{ uid: "image", url: res.data.img_url }];
      this.editcate.cate_img = res.data.img_url;
    },
    toeditcate(id, name, sort, img,goods_type) {
      console.log(goods_type)
      this.editcate.name = name;
      this.editcate.sort = sort;
      this.editcate.id = id;
      this.image_list = [{ uid: "image", url: img }];
      this.editcate.cate_img = img;
      this.showeditcate = true;
      if(goods_type==1){
        this.sendtype=true
      }else{
        false
      }
;
    },
    subedit() {
         if(this.sendtype){
this.goods_type=1
      }else{
        this.goods_type=0
      }
      edit_cate({
        cate_name: this.editcate.name,
        sort: this.editcate.sort,
        cate_id: this.editcate.id,
        cate_img: this.editcate.cate_img,
        goods_type:this.goods_type,
      }).then(res => {
        if (res.error_code == 1003) {
          this.$message.error(res.msg);
        }
        if (res.error_code == 1000) {
          this.showeditcate = false;
          this.logo_upload_success = false;
          this.showcate();
          this.editcate.name = "";
          this.editcate.sort = "";
          this.$message("编辑成功");
          this.editcate.cate_img = "http://wx.qlogo.cn/mmopen/Q3auHgzwzM5AibNkMnzYBAPrJWSZNsbZ6sJxX6Sy2Set94j7d8pvg8TCSnpmKYOwJbvytkEPYAia4osr9ibaW50lWPwgeYbXJAVIn7TiaJt4ic60/0";
          this.image_list = [];
        }
      });
    },
    add_cate() {
      if(this.sendtype){
this.goods_type=1
      }else{
        this.goods_type=0
      }
      add_cate({
        shop_id: store.get("currentshopid"),
        cate_name: this.addedcate.name,
        sort: this.addedcate.sort,
        cate_img: this.addedcate.cate_img,
        goods_type:this.goods_type
      }).then(res => {
        if (res.error_code == 1003) {
          this.$message.error(res.msg);
        }
        if (res.error_code == 1000) {
          this.showaddcate = false;
          this.showcate();
          this.addedcate.name = "";
          this.addedcate.sort = "";
          this.$message("添加成功");
          this.addedcate.cate_img = "";
          this.add_image = [];
        }
      });
    }
  },
  created() {
    this.showcate();
  }
};
</script>
<style lang="stylus" scoped>
.cates_page {
	background-color: #f9f9f9;
}
.data_btn{
	display: inline-block;
	background-color:white;
	min-width:50px;
	height:30px;
	line-height:30px;
	font-size:14px;
	text-align:center;
	padding:0 5px;
	border-radius:4px;
	cursor:pointer;
}
.btn_success{
		border:1px solid #1cc09E;
		color:#1cc09E;
}
.btn_danger{
	border:1px solid #E51c23;
	color:#E51c23;
}
.btn_info{
	border:1px solid #409eff;
	color:#409eff
}
.addcates {
	background-color: white;
	padding: 5px 20px;
	display: flex;
	height: 40px;
	justify-content: space-between;

	.addcates_button {
		padding: 5px;
		cursor: pointer;
		color: #409EFF;
	}

	.delete_all {
		cursor: pointer;
		width: 200px;
		text-align: center;
		color: #aaaaaa;
		padding: 5px;
	}
}

.cates {
	margin-top: 10px;
	background-color: white;
	padding: 20px 20px;

	.cate {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px 0;
		border-bottom: 1px solid #ebedef;

		.cate_sort_name {
			width: 200px;
			line-height: 50px;
			display: flex;
			justify-content: flex-start;
		}

		.cate_img {
			width: 50px;
			height: 50px;
			margin: 0 20px;

			img {
				width: 50px;
				height: 50px;
			}
		}

		.goods_num {
			 width: 100px;
		}

		.editcates {
			 width: 200px;
			 display:flex;
			 justify-content: center;
			 align-items: center;
			.edit {
				cursor: pointer;
				margin-right: 10px;
			}

			.delete {
				color: #409EFF;
				cursor: pointer;
			}
		}
	}
}

.remove {
	// width: 50%;
	// margin-left: 25%;
	.question {
		margin-top: 20px;
		display: flex;
		justify-content: space-between;
		padding: 0 15%;
	}
}

.cancle {
	color: #C0C4CC;
	background-color: white;
	cursor: pointer;
	padding: 5px 20px;
	border-radius: 3px;
	border: 1px solid #C0C4CC;
}

.comfirm {
	color: white;
	background-color: #409EFF;
	cursor: pointer;
	padding: 5px 20px;
	border-radius: 3px;
	border: 1px solid #409EFF;
}

// .addcate_dialog {
// 	width: 50%;
// 	margin-left: 25%;
// }

// .editcate_dialog {
// 	width: 50%;
// 	margin-left: 25%;
// }

.options {
	display: flex;
	justify-content: space-between;
	padding: 0 20%;
}

.avatar-uploader {
	display: flex;
}

.add_picture {
	display: flex;
	font-size: 14px;

	.add_picture_text {
		width: 150px;
		line-height: 24px;
	}
}

.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 30px;
	height: 24px;
	line-height: 24px;
	text-align: center;
}
</style>
<style lang="stylus" scoped>
.cate_name{
	cursor: pointer;
	height:auto;
}

.cates_page {
	background-color: #f9f9f9;
}

.addcates {
	background-color: white;
	padding: 5px 20px;
	display: flex;
	height: 40px;
	justify-content: space-between;

	.addcates_button {
		padding: 5px;
		cursor: pointer;
		color: #409EFF;
	}

	.delete_all {
		cursor: pointer;
		width: 200px;
		text-align: center;
		color: #aaaaaa;
		padding: 5px;
	}
}

.cates {
	margin-top: 10px;
	background-color: white;
	padding: 20px 20px;

	.cate {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px 0;
		border-bottom: 1px solid #ebedef;

		.cate_sort_name {
			width: 80%;
			line-height: 50px;
			display: flex;
			justify-content: flex-start;
		}

		.cate_img {
			height: 50px;
			margin: 0 20px;
		width: 100%;
    display: flex;
    justify-content: space-between;
			img {
				width: 50px;
				height: 50px;
			}
		}

		.goods_num {
			width: 100px;
		}

		.editcates {
			width: 200px;

			.edit {
				cursor: pointer;
			}

			.delete {
				color: #409EFF;
				cursor: pointer;
			}
		}
	}
}

.remove {
	// width: 50%;
	// margin-left: 25%;
	.question {
		margin-top: 20px;
		display: flex;
		justify-content: space-between;
		padding: 0 15%;
	}
}

.cancle {
	color: #C0C4CC;
	background-color: white;
	cursor: pointer;
	padding: 5px 20px;
	border-radius: 3px;
	border: 1px solid #C0C4CC;
}

.comfirm {
	color: white;
	background-color: #409EFF;
	cursor: pointer;
	padding: 5px 20px;
	border-radius: 3px;
	border: 1px solid #409EFF;
}

// .addcate_dialog {
// 	width: 50%;
// 	margin-left: 25%;
// }

// .editcate_dialog {
// 	width: 50%;
// 	margin-left: 25%;
// }

.options {
	display: flex;
	justify-content: space-between;
	padding: 0 20%;
}

.avatar-uploader {
	display: flex;
}

.add_picture {
	display: flex;
	font-size: 14px;

	.add_picture_text {
		width: 150px;
		line-height: 24px;
	}

	.cate .cate_sort_name{
		width:auto;
	}
	.cates .cate .cate_img{

	}


}

.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 30px;
	height: 24px;
	line-height: 24px;
	text-align: center;
}


@media(max-width:900px ) {
.cates .cate{
	    display: block;
}

.cates .cate .cate_sort_name,{
	width:100%;

}

.cates .cate .goods_num{
text-align :right;
}

.cates .cate .cate_img{
    display: flex;
    width: 100%;
    justify-content: space-between;
		margin-right:0;
		height:auto;
}

.cates .cate .editcates{
	width:100%;
	display: flex;
	justify-content: space-around;
	margin-top:15px;
}

.cates .cate .editcates .delete{
	margin-top:0;
}

.cate_name{
	width: 100px;
	height: 50px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

}
</style>

