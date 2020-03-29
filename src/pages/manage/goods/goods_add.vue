<template>
	<div class="goods_edit">
		<div class="title">
			<div class="base_info" @click="show_first_step">编辑基本信息</div>
			<div v-bind:class="{'active_detail_info':second_step,'detail_info':!second_step}" @click="show_second_step">编辑商品详情</div>
		</div>
		<el-form :model="goodsinfo" >
		<div v-show="first_step" class="first_step_frame">
				<el-form-item label="商品名称"label-width="80px"><el-input class="goods_name_input" size="medium" placeholder="请输入商品名称"v-model="goodsinfo.name" style="width:50%"/></el-form-item>
				<el-form-item label="商品分类"label-width="80px">
					<el-select placeholder="请选择商品分类" style="width:20%" v-model="goodsinfo.cate" size="medium" @change="cate_change">
						<el-option v-for="item in cates":label ="item.cate_name" :value="item.cate_id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商品图片"label-width="80px">
					<el-upload 
					class="avatar-uploader"
			  		action="https://www.linwushop.com/upload_img"
			  		list-type="picture-card"
			  		:on-remove="handleRemove"
			  		:file-list="images_list"
			  		multiple
			       :on-success="uploadsuccess"
			      >
			       <i class="el-icon-plus avatar-uploader-icon"></i>
					<div class="upload_tips"> （上传图片的第一张将作为主图显示，推荐像素：600px*680px）</div>
					</el-upload>

				</el-form-item>
				<!-- <div class="price_input">
				<el-form-item label="商品售价"label-width="80px">
					<el-input class="input" size="medium" placeholder="请输入售价"v-model="goodsinfo.price">
 						<template slot="prepend">￥</template>
 					</el-input>
 				</el-form-item>
				<el-form-item label="划线价">
					<el-input class="input" size="medium"placeholder="请输入原价"v-model="goodsinfo.market_price">
					<template slot="prepend">￥</template>
					</el-input>
					</el-form-item>
				</div> -->
				<!-- <el-form-item label="商品库存"label-width="80px">
				<el-input class="score_input" size="medium" placeholder="请输入库存"v-model="goodsinfo.score"/>
				</el-form-item> -->
				<!-- <div class="score_info">
					<el-form-item label="真实库存" label-width="80px">
						<el-input size="medium" placeholder="请输入真实库存" v-model="goodsinfo.real_goods_score"/>
					</el-form-item>
					<el-form-item label="库存阈值" label-width="100px">
						<el-input size="medium" placeholder="请输入库存警戒值" v-model="goodsinfo.goods_score_expect"/>
					</el-form-item>
				</div> -->
				<el-form-item label="进货链接" label-width="80px">
					<el-input size="medium" placeholder="请输入进货链接" v-model="goodsinfo.link"style="width:70%"/>
				</el-form-item>
				<el-form-item label="商品编码" label-width="80px">
					<el-input size="medium" placeholder="请输入商品编码" v-model="goodsinfo.code"style="width:70%"/>
				</el-form-item>
				<div class="group_info_input">	
				<el-form-item label="开启团购"label-width="80px">
				<el-switch
					v-model="goodsinfo.is_group"
					active-text="是"
				  	inactive-text="否">
				</el-switch></el-form-item>
				<el-form-item v-if="this.goodsinfo.is_group"label="开团人数" label-width="80px"><el-input class="input" placeholder="开团人数要求" size="medium" v-model="goodsinfo.group_num" style="width:90%"/></el-form-item>
				<!-- <el-form-item v-if="this.goodsinfo.is_group"label="团购价格"label-width="100px">
				<el-input class="input" size="medium" placeholder="团购价格"v-model="goodsinfo.group_price">
					<template slot="prepend">￥</template>
				</el-input>
				</el-form-item> -->
				</div>
				<!-- <div class="profit">
				<el-form-item label="可获利润" label-width="80px">
					<el-input class="input" v-model="goodsinfo.single_p_profit" placeholder="单独购买商家可获利润" size="medium" style="width:100%"></el-input>
				</el-form-item>
				<el-form-item label="团购利润" label-width="80px">
					<el-input class="input" v-model="goodsinfo.group_p_profit" placeholder="团购商家可获利润" size="medium" style="width:100%"></el-input>
				</el-form-item>
				</div>
				<el-form-item label="商品进价" label-width="80px">
					<el-input class="input" v-model="goodsinfo.p_price" placeholder="请输入商品进价" size="medium" style="width:50%">
					</el-input>
				</el-form-item> -->
				<!-- <el-form-item v-if="this.goodsinfo.is_group"label="团购价格"label-width="80px">
				<el-input class="input" size="medium" placeholder="团购价格"v-model="goodsinfo.group_price">
					<template slot="prepend">￥</template>
				</el-input>
				</el-form-item> -->
				<!-- <el-form-item v-if="this.goodsinfo.is_group"label="最小开团人数"><el-input class="input" placeholder="开团人数要求" size="medium" v-model="goodsinfo.group_num"/></el-form-item>
				</div> -->
				<div>
          <el-form-item label="商品规格" label-width="80px">
            <div class="goods_spec">
            	<div>
            	<div class="add_spec_button" @click="to_show_spec">
            		编辑规格
            	</div>
            	</div>
              <div class="goods_spec_frame" v-for="(that,index) in use_specs">
                <div style="display:flex;margin-bottom:20px">
                  <div class="spec_name"><img v-if="index!=0" src="@/assets/images/cancel.png" @click="to_del_spec">规格名：
                  </div>
                  <el-select placeholder="选择规格项" v-model="that.name" size="middle" @change="add_input_value"
                             style="width:30%">
                    <el-option v-for="item in specs" :label="item.spec_name" :value="item.id"></el-option>
                  </el-select>
                </div>
                <div style="display:flex">
                  <div class="spec_name">规格值：</div>
                  <div class="input_values">
                    <div class="input_value" v-for="(items,indexs) in that.value">
                    	<div class="delete_value"><img v-if="indexs!=0" src="@/assets/images/cancel.png" @click="to_del_spec_value(index,indexs)"></div>
                      <el-select placeholder="选择规格值" v-model="items.value_item" size="middle"
                                 style="width:100%;margin-bottom:10px">
                        <el-option v-for="items in that.specs_item" :label="items.item" :value="items.id"></el-option>
                      </el-select>
                      <el-upload
                        v-if="index==0"
                        class="spec-uploader"
                        action="https://www.linwushop.com/upload_img"
                        list-type="picture-card"
                        :limit="1"
                        :on-remove="handleRemove_spec"
                        :file-list="items.img"
                        :on-success="uploadsuccess_spec"
                      >
                        <div style="width:100%" v-if="items.img==''" @click="change_index(index,indexs)" >
                        <img src="@/assets/images/photo.png"/>
                        </div>
                      </el-upload>
                    </div>
                     <div class="add_spec_value" @click.stop="add_spec_value(index)">增加规格值</div>
                  </div>

                </div>
              </div>
              <!--  <div v-show="use_specs.length<=1" class="create_spec" @click="to_create_spec">新规格项</div> -->
              <div class="add_spec_items_button" @click="createTableData">生成规格明细</div>
            </div>
          </el-form-item>
          <el-form-item v-if="this.use_specs[0].name" label="规格明细" label-width="80px">
            <div class="goods_spec">
              <div>
                <table class="spe_table">
                  <thead class="spec_table_head">
                  <tr class="spec_table_head">
                    <th class="table_head">{{spec_type_1}}</th>
                    <th class="table_head" v-show="spec_type_2">{{spec_type_2}}</th>
                    <th class="table_head">进价</th>
                    <th class="table_head">售价</th>
                    <th class="table_head" v-if="this.goodsinfo.is_group">团购价</th>
                    <th class="table_head">划线价</th>
                    <th class="table_head">库存</th>
                    <th class="table_head">库存阀值</th>
                    <th class="table_head_long">单独售出利润</th>
                    <th class="table_head_long">团购售出利润</th>
                  </tr>
                  </thead>
                  <tbody class="spec_table">
                  <tr v-for="tr in table_data.value">
                    <td class="table_value_title">{{tr.value_name}}</td>
                    <td class="table_value_title" v-if="tr.value_name_1">{{tr.value_name_1}}</td>
                    <td>
                      <el-input v-model="tr.purchase_price"></el-input>
                    </td>
                    <td>
                      <el-input v-model="tr.price"></el-input>
                    </td>
                    <td v-if="goodsinfo.is_group">
                      <el-input v-model="tr.member_price"></el-input>
                    </td>
                    <td>
                      <el-input v-model="tr.market_price"></el-input>
                    </td>
                    <td>
                      <el-input v-model="tr.sku"></el-input>
                    </td>
                    <td>
                      <el-input v-model="tr.stock_limit"></el-input>
                    </td>
                    <td>
                      <el-input v-model="tr.alone_profit"></el-input>
                    </td>
                    <td>
                      <el-input v-model="tr.team_profit"></el-input>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </el-form-item>
        </div>
        <!-- <div>{{attrs_sel}}</div> -->
        <!-- <el-form-item label="商品参数" label-width="80px" v-for="(items,index) in attrs_sel">
          <el-select v-model="items.attr_id" filterable placeholder="请选择参数">
            <el-option
              v-for="item in attrs"
              :key="item.attr_id"
              :label="item.attr_name"
              :value="item.attr_id">
            </el-option>
          </el-select>
          <el-input placeholder="请输入参数内容" v-model="items.attr_value" size="medium"
                    style="width:40%;margin-left:20px;margin-right:20px"/>
          <img v-if="index!=0" class="cancel_img" src="@/assets/images/cancel.png" @click="delete_attr(index)">
        </el-form-item> -->
        <!-- <el-form-item label="" label-width="80px">
          <div class="add_attr" @click="to_add_attr">增加参数项</div>
        </el-form-item> -->
		<el-form-item label="是否推荐"label-width="80px">
					<el-switch
						v-model="goodsinfo.recommend"
						active-text="是"
						inactive-text="否">
					</el-switch>
		</el-form-item>
		<el-form-item label="是否上架"label-width="80px">
			<el-switch
				v-model="goodsinfo.is_on_sale"
				active-text="是"
				inactive-text="否">
			</el-switch>
		</el-form-item>
		<!-- 编辑规格 -->
		<el-dialog title="编辑规格" :visible.sync="show_specs" width="50%">
			<div>
				<div class="spec_none" v-if="specs==''">此类别暂无规格选项，请添加！</div>
				 <div class="cate_spec" v-for="item in specs">
					<div class="cate_spec_table">
					<div class="cate_name">分类名称：{{item.cate_name}}</div>
					<div class="cate_spec_name">规格名称：{{item.spec_name}}</div>
					<div class="cate_spec_options">
						<div class="cate_spec_delete" @click="delete_cate_spec(item.id)">删除</div>
						<div class="cate_spec_edit" @click="edit_cate_spec(item.id,item.spec_name,item.item)">编辑</div>
					</div>
					</div>
					<div class="cate_spec_value"><span class="spec_value_title">规格值：</span><div class="cate_space_items"><div class="spec_value_item" v-for="items in item.item">{{items.item}}</div></div></div>
				</div>
				<div class="spec_add_form" v-if="add_spec_form">
					<div class="spec_input"><span class="add_spec_name_title">新规格名：</span><el-input class="new_spec_name_input" placeholder="请输入规格名" size="medium" v-model="new_spec_name"/></div>
					<div class="spec_value_input"><span class="add_spec_value_title">新规格值：</span><el-input class="new_spec_value_input" placeholder="请输入规格值，多个规格值用空格隔开" size="medium" v-model="new_spec_value"/></div>
				</div>
				<div class="add_spec" @click="to_add_spec" v-if="add_spec_form==false">添加</div>
				<div class="decide_edit_value" v-if="add_spec_form&&this.spec_id!=''">
				<div class="edit_spec" @click="edit_cate_spec_imform" >确认编辑</div>
				<div class="edit_spec_cancle" @click="edit_cate_spec_cancle" >取消编辑</div>
				</div>
				<div class="add_spec" @click="add_spec_imform" v-if="add_spec_form&&this.spec_id==''">确定</div> 
			</div>
		</el-dialog>
		</div>	
			<div v-if="second_step" class="second_step_frame">
				 <div class="reach_text">
   			 		<editor id="editor_id" height="700px" width="80%" 
   			 		class="reach_text_editor"
					uploadJson="https://up.qbox.me"
					:extraFileUploadParams="p_data"
   			 		filePostName='file'
   			 		:afterUpload="after_upload()"
   			 		:allowImageRemote="false"
					:resizeType='1'
   			 		:afterChange="afterChange()"
   			 		:content.sync="editorText"
            		:afterBlur="afterBlur"
            		pluginsPath="vue-kindeditor/static/kindeditor/plugins/"
            		:loadStyleMode="false"
            		:filterMode="false"
            		:items="items_show"
            		@on-content-change="onContentChange">
            		</editor>

 				</div> 
 				<!-- <textarea id="content2" name="content1" style="width:700px;height:350px;visibility:hidden;" >
				</textarea> -->
 			</div>
			</el-form>
			<div class="buttons">
				<button class="cancle" v-if="first_step" @click="cancel_goodsinfo">返回</button>
				<button class="comfirm"v-if="first_step" @click="show_second_step">下一步</button>
				<button class="cancle" v-if="second_step" @click="show_first_step">上一步</button>
				<button class="comfirm" v-if="second_step==true&&edit==false" @click="submitgoods">提交</button>
				<button class="comfirm" v-if="second_step==true&&edit==true" @click="submitedit">确认修改</button>
			</div>
	</div>
</template>
<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import '@/utils/jquery'
import {formatNumber} from '@/utils/formatNumber'
import {sel_cate,
		goods_add,
		goods_edit,
		add_spec,
		add_attr,
		attr_list,
		update_attr,
		del_attr,
		spec_list,
		update_spec,
		del_spec,
		goods_pro_add,
		search_spec,
		search_attr,
		getToken,
		get_goods
		} from '@/utils/api'
	export default{
		data(){
			return{
				items_show:["undo", "redo", "|",
 "justifyleft", "justifycenter", "justifyright", "justifyfull", "insertorderedlist", "insertunorderedlist", "subscript", "superscript", "|", "/", "formatblock", "fontname", "fontsize", "|", "forecolor", "hilitecolor", "bold", "italic", "underline", "strikethrough",  "|", "table", "hr","image"],
 				p_data:{},
				goodsinfo:{
					name:'',
					cate:'',
					goods_img:[],
					price:'',
					market_price:'',
					score:'',
					is_group:true,
					group_price:'',
					group_num:'',
					goods_desc:'',
					recommend:false,
					single_p_profit:'',
					group_p_profit:'',
					p_price:'',
					real_goods_score:'',
					goods_score_expect:'',
					link:'',
					is_on_sale:0,
					code:''
				},
				first_step:true,
				second_step:false,
				edit:false,
				cates:[],
				images_list:[],
				editorText:'',
				editgoods_id:'',
				toggle_specs:0,
				attrs_sel:[{
					label_name:'商品参数',
					attr_value:'',
					attr_name:''
				}],
				cate_id:'',
				attrs:[],
				token:'',
				specs:[],
				spec_index:0,
				spec_value_index:0,
				use_specs: [{name: '', value: []}],
				table_data: {},
				show_specs:false,
				cate_specs:'',
				add_spec_form:false,
				new_spec_name:'',
				new_spec_value:'',
				spec_id:''
			}
		},
		methods:{
			after_upload(file){
			},
			get_token(){
				getToken({type:3}).then((res)=>{
			 		this.p_data={token:res.token1}
			 	});
			},
			show_cates(){
				sel_cate({shop_id:store.get('currentshopid')}).then((res)=>{
					if (res.error_code==1000) {
						this.cates=res.data
					};
				})
			},
			to_show_spec(){
				if (this.cate_id=='') {
					this.$message.error('请先选择分类')
				}else{
					this.show_specs=true
				}
			},
			show_second_step(){
				this.first_step=false
				this.second_step=true
			},
			show_first_step(){
				this.first_step=true
				this.second_step=false
			},
			handleRemove(file){
				if (file.response) {
					for (var i = this.goodsinfo.goods_img .length - 1; i >= 0; i--) {
					if (file.response.data.img_url==this.goodsinfo.goods_img[i]) {
						this.goodsinfo.goods_img.splice(i,1)
					}
				}
				}else{
				for (var i = this.goodsinfo.goods_img .length - 1; i >= 0; i--) {
					if (file.url==this.goodsinfo.goods_img[i]) {
						this.goodsinfo.goods_img.splice(i,1)
					}
				}
			}
			},
			uploadsuccess(res){
				if (res.error_code==1000) {
					this.goodsinfo.goods_img.push(res.data.img_url)
				}else{
					this.$message.error(res.msg)
				}
			},
			uploadsuccess_spec(res,file){
				if (res.error_code==1000) {
					this.use_specs[this.spec_index].value[this.spec_value_index].img.push(res.data.img_url)
				}else{
					this.$message.error('上传失败')
				}
			},
			change_index(index,indexs){
				this.spec_index=index
				this.spec_value_index=indexs
			},
			handleRemove_spec(file){
				 for (var i = this.use_specs.length - 1; i >= 0; i--) {
				 	for (var a = this.use_specs[i].value.length - 1; a >= 0; a--) {
				 		if (this.use_specs[i].value[a].img[0]==file.response.data.img_url) {
				 			this.use_specs[i].value.splice(a,1)
				 		};
				 	};
				 };
			},
			cancel_goodsinfo(){
				this.$router.push('/home/goods/goods')
			},
	  show_specs_method(){
	  	search_spec({cate_id: this.cate_id, shop_id: store.get('currentshopid')}).then((res) => {
          if (res.error_code == 1000) {
            this.specs = res.data
          } else if (res.error_code == 1002) {
            this.specs = []
          } else {
            this.$message.error('参数错误')
          }
        })
	  },
	//分类切换调用
      cate_change(id) {
        this.cate_id = id
        this.attrs_sel = []
        this.show_specs_method()
        // if(this.cate_id) {
        //   this.search_attr_get(id)
        // }
      },
      to_add_attr() {
        this.attrs_sel.push({attr_id: '', attr_value: ''})
      },
      delete_attr(id) {
        this.attrs_sel.splice(id, 1)
      },
      //判断与上一次输入是否相同，相同不让添加
      del_sep(index) {
        let flag = false
        if (this.toggle_specs === 0) {
          let item = this.use_specs[0].value[index].value_item
          for (let i = 0; i < this.use_specs[0].value.length - 1; i++) {
            if (this.use_specs[0].value[i].value_item === item && item) {
              flag = true
            }
          }
          if (item == '' || flag) {
            this.use_specs[0].value.splice(index, 1)
          }
        }
        if (this.toggle_specs === 1) {
          let item = this.use_specs[1].value[index].value_item
          for (let i = 0; i < this.use_specs[1].value.length - 1; i++) {
            if (this.use_specs[1].value[i].value_item === item && item) {
              flag = true
            }
          }
          if (item == '' || flag) {
            this.use_specs[1].value.splice(index, 1)
          }
        }
      },

      //创建表格数据
      createTableData() {
        if (this.toggle_specs === 0) {
          let obj= JSON.parse(JSON.stringify(this.use_specs[0]))
          this.setValueName(obj)
          this.table_data = obj
        }
        if (this.toggle_specs === 1) {
          let obj = JSON.parse(JSON.stringify({}))
          obj.name = this.use_specs[0].name + '_' + this.use_specs[1].name
          obj.value = []
          obj.specs_item=[]
          this.use_specs[0].specs_item.forEach(item=>{
            obj.specs_item.push(item)
          })
          this.use_specs[1].specs_item.forEach(item1=>{
            obj.specs_item.push(item1)
          })
          for (let i = 0; i < this.use_specs[0].value.length; i++) {
            for (let j = 0; j < this.use_specs[1].value.length; j++) {
              let obj_item = {}
              obj_item.value_item = this.use_specs[0].value[i].value_item
              obj_item.value_item_1 = this.use_specs[1].value[j].value_item
              obj_item['img']=this.use_specs[0].value[i].img
              obj.value.push(obj_item)
            }
          }
          this.setValueName(obj)
          this.table_data = obj
        }
      },
      setValueName(obj){
        for (let i=0;i<obj.specs_item.length;i++){
          for (let j=0;j<obj.value.length;j++){
            if (obj.value[j].value_item==obj.specs_item[i].id){
              obj.value[j].value_name=obj.specs_item[i].item
            }
            if (obj.value[j].value_item_1&&obj.value[j].value_item_1==obj.specs_item[i].id){
              obj.value[j].value_name_1=obj.specs_item[i].item
            }
          }
        }
      },
      // 选择规格项调用
      add_input_value(id) {
        if (this.toggle_specs === 0) {
          this.use_specs=[]
          this.use_specs.push({name:id,specs_item:[],value:[]}).ite
          this.specs.forEach(item=>{
            if (id==item.id) {
              this.use_specs[0].specs_item=item.item
            }
          })
        }
        if (this.toggle_specs === 1) {
          if (this.use_specs[1].name === this.use_specs[0].name) {
            this.to_del_spec()
          }
          if (this.use_specs.length==2){
            this.use_specs[1].name=id
          }
          this.specs.forEach(item=>{
            if (id==item.id) {
              this.use_specs[1].specs_item=item.item
            }
          })
        }
      },
      to_create_spec() {
        this.toggle_specs = 1
        let obj = {name: '', value: []}
        //this.use_specs.push(JSON.parse(JSON.stringify(obj)))
        this.use_specs.push(obj)
        this.use_specs[1].value.forEach(function (item) {
          item.value.push(JSON.parse(JSON.stringify(obj)))
        })
      },
      to_del_spec() {
        this.toggle_specs = 0
        this.use_specs.splice(1, 1)
      },
      to_add_spec(){
      	this.new_spec_value=''
      	this.new_spec_name=''
      	this.add_spec_form=true
      },
      delete_cate_spec(id){
      	del_spec({spec_id:id}).then((res)=>{
      		if (res.error_code==1000) {
      			this.$message.success('删除成功')
      			this.show_specs_method()
      		};
      	})
      },
      edit_cate_spec(id,name,item){
      	this.spec_id=id
      	this.add_spec_form=true
      	this.new_spec_name=name
      	this.new_spec_value=item[0].item
      	if (item.length>1) {
      	for (var i = 1;i<item.length;i++) {
      		this.new_spec_value+=" "+item[i].item
      	};
      	};
      },
      edit_cate_spec_imform(){
      	update_spec({
      		spec_name:this.new_spec_name,
      		item:this.new_spec_value,
      		sort:1,
      		cate_id:this.cate_id,
      		spec_id:this.spec_id
      	}).then((res)=>{
      		if (res.error_code==1000) {
      			this.$message.success('修改成功')
      			this.show_specs_method()
      			this.spec_id=''
      			this.add_spec_form=false
      		}else{
      			this.$message.error('修改失败')
      		}
      	})
      },
      edit_cate_spec_cancle(){
      	this.add_spec_form=false
      	this.spec_id=''
      },
      add_spec_imform(){
      	add_spec({
      		spec_name:this.new_spec_name,
      		item:this.new_spec_value,
      		shop_id:store.get('currentshopid'),
      		cate_id:this.cate_id,
      		sort:1
      	}).then((res)=>{
      		if (res.error_code==1000) {
      			this.$message.success('添加成功')
      			this.add_spec_form=false
      			this.show_specs_method()
      		}else{
      			this.$message.error('添加失败')
      		}
      	})
      },
      to_del_spec_value(index,indexs){
      	this.use_specs[index].value.splice(indexs,1)
      },
      add_spec_value(index) {
        if (index == 0) {
          this.use_specs[index].value.push({value_item:'',img:[]})
        }
        if (index == 1) {
          this.use_specs[index].value.push({value_item: ''})
        }
      },
      afterChange() {
        this.goodsinfo.goods_desc = this.editorText
      },
      afterBlur() {
      },
      onContentChange() {
      },
      //提交商品
      submitgoods() {
        const params = {
          goods_name: this.goodsinfo.name,
          goods_img:[],
          attrs: [],
          item: [],
          group_num: this.goodsinfo.group_num,
          goods_source: this.goodsinfo.link,
          is_on_sale: this.goodsinfo.is_on_sale?1:0,
          is_commend: this.goodsinfo.recommend?1:0,
          is_on_spec:1,
          goods_desc: this.goodsinfo.goods_desc,
          is_group: this.goodsinfo.is_group?1:0,
          cate_id: this.goodsinfo.cate,
          shop_id: store.get('currentshopid'),
          qrcode:this.goodsinfo.code
        }
        //数据拼装
        this.goodsinfo.goods_img.forEach((item) => {
          params['goods_img'].push(item)
        })
        this.table_data.value.forEach((val) => {
          let objItem = JSON.parse(JSON.stringify({}))
          objItem['spec_name'] = this.table_data.name
          objItem['p_price'] = val.purchase_price
          objItem['goods_price'] = val.price
          objItem['group_price'] = val.member_price
          objItem['market_price'] = val.market_price
          objItem['goods_score'] = val.sku
          objItem['goods_score_expect'] = val.stock_limit
          objItem['single_p_profit'] = val.alone_profit
          objItem['group_p_profit'] = val.team_profit
          objItem['item_images']={id:val.value_item,img:val.img[0]}

            let name1 = ''
            this.specs.forEach((val) => {
              if (val.id ==  this.use_specs[0].name) {
                name1 = val.spec_name
              }
            })
            objItem['key_name']=''+name1+':'+val.value_name

          if (this.toggle_specs === 1) {
            let name2 = ''
            this.specs.forEach((val) => {
              if (val.id ==  this.use_specs[1].name) {
                name2 = val.spec_name
              }
            })
            objItem['key_name']+=' '+name2+':'+val.value_name_1
          }
          params['item'].push(objItem)
        })
        this.attrs_sel.forEach((val) => {
          let itemObj=JSON.parse(JSON.stringify({}))
          itemObj['attr_'+val.attr_id]=val.attr_value
          params.attrs.push(itemObj)
        })

        goods_pro_add(params).then((res) => {
        	if (res.error_code==1000) {
        		this.$message.success('真厉害，添加成功！')
        		this.$router.push('/home/goods/goods')
        	}else {
        		this.$message.error('对不起，您失败了T_T')
        	}
        })
         
      },
      //搜索属性
      search_attr_get(id){
        search_attr({cate_id:id,page:1,shop_id:store.get('currentshopid')}).then((res)=>{
          if (res.error_code == 1000) {
            this.attrs=res.data
          } 
          // else {
          //   this.$message.error(res.msg)
          // }
        })
      	},
	},
	created(){
		this.get_token()
		this.show_cates()
		},
		 computed: {
      spec_type_1: function () {
        let name1 = ''
        this.specs.forEach((val) => {
          if (val.id == this.use_specs[0].name) {
            name1 = val.spec_name
          }
        })
        return name1
      },
      spec_type_2: function () {
        let name2 = ''
        this.specs.forEach((val) => {
          if (this.use_specs[1]) {
            if (val.id == this.use_specs[1].name) {
              name2 = val.spec_name
            }
          }
        })
        return name2
      }
    }

	}
</script>
<style lang="stylus" scoped>
.score_info
	display flex
.goods_edit
	padding 20px
.title
	display flex
	justify-content space-between
	margin-bottom 30px
	text-align center
	height 40px
	line-height 40px
	font-size 18px
	.base_info
		width 50%
		cursor pointer
		background-color #409eff
		color white
	.detail_info
		width 50%
		cursor pointer
	.active_detail_info
		width 50%
		cursor pointer
		color white
		background-color #409eff
.first_step_frame
	width 80%
	padding 0 20px
.upload_tips
	font-size 12px
	color #8c939d
.price_input
	display flex
	.input.el-input
		width 80%!important
.score_input.el-input
	width 30%!important
.el-switch
	width 180px
	margin-top 10px
.reach_text
	width 80%
	float right
.reach_text_editor
	display flex
	justify-content center
.buttons
	position fixed
	bottom 0
	left 170px
	width calc(100% - 170px)
	text-align center
	background-color #f8f0af
	height 40px
	line-height 40px
	.cancle
		margin-right 20px
		background-color white
		color #323232
		cursor pointer
		padding 5px 10px
		border-radius 4px
	.comfirm
		margin-left 20px
		background-color #409eff
		color white
		cursor pointer
		padding 5px 10px
		border-radius 3px
.avatar-uploader-icon
	font-size 28px
	color #8c939d
	line-height 40px
.add_attr
	color #409eff
	cursor pointer
	margin-right 20px
.create_attr
	color #409eff
	cursor pointer
.question
	margin-top 20px
	display flex 
	justify-content space-between
	padding 0 15%
.cancle
	color #C0C4CC
	background-color white
	cursor pointer
	padding 5px 20px 
	border-radius 3px
	border 1px solid #C0C4CC
.comfirm
	color white
	background-color #409EFF
	cursor pointer
	padding 5px 20px
	border-radius 3px
	border 1px solid #409EFF
.group_info_input
	display flex
.cancel_img
	width 16px
	height 16px
	margin-top 12px
	cursor pointer
.create_spec
	margin-bottom 20px
	cursor pointer 
	color #409EFF
	font-size 14px
	width 100px
.add_spec_value
	cursor pointer
	color #409EFF
	font-size 14px
.spec_name
	margin-right 20px
	color #aaaaaa
	width 60px
	display flex
	position relative
	img
		width 15px
		height 15px
		position absolute
		top 5px
		left -20px
		cursor pointer
.input_values
	display flex
	flex-wrap wrap
	width 90%
.input_value
	width 120px
	margin-right 20px
	position relative
	.delete_value
		position absolute
		z-index 100
		left -5px
		top -5px
		img
			width 15px
			height 15px
	img
		width 20px
		height 20px
		cursor pointer
		margin-bottom 10px
.specs
	margin-bottom 5px
.goods_spec
	width 90%
.goods_spec_frame
	border 1px solid #e1e1e1
	padding 20px 30px
	margin-bottom 15px
.profit
	display flex
.add_spec_button
	border 1px solid #609eff
	background-color white
	color #609eff
	width 80px
	height 30px
	text-align center
	padding 0 8px
	border-radius 4px
	cursor pointer
	margin 5px 0 10px 0
	line-height 30px
.add_spec_items_button
	border 1px solid #609eff
	background-color white
	color #609eff
	width 120px
	height 30px
	text-align center
	padding 0 8px
	border-radius 4px
	cursor pointer
	margin 5px 0 10px 0
	line-height 30px
.cate_spec
	border-bottom 1px solid #e1e1e1
	padding 10px 0
.cate_name
	width 300px
.cate_spec_name
	flex 1
.cate_spec_table
	display flex
	justify-content space-between
	width 95%
.cate_spec_value
	display flex
.spec_value_title
	width 60px
.cate_space_items
	display flex
	flex-wrap wrap
	flex 1
.spec_value_item
	margin-left 10px
.spec_none
	text-align center
.spec_add_form
	margin-top 20px
	display flex
	justify-content space-between
.spec_input
	display flex
	align-items center
.spec_value_input
	display flex
	align-items center
.add_spec_imform
	cursor pointer
	border 1px solid #609eff
.add_spec_name_title
	width 70px
.add_spec_value_title
	width 70px
.new_spec_name_input
	width 120px
.new_spec_value_input
	width 350px
.add_spec
	cursor pointer 
	border 1px solid #609eff
	border-radius 5px
	padding 0 10px
	width 60px
	text-align center
	color #609eff
	margin-top 20px
.decide_edit_value
	display flex
.edit_spec
	cursor pointer
	border 1px solid #609eff
	padding 0 10px
	border-radius 5px
	width 90px
	text-align center
	color #609eff
	margin-top 20px
	margin-right 30px
.edit_spec_cancle
	cursor pointer
	border 1px solid #e1e1e1
	padding 0 10px
	border-radius 5px
	width 90px
	text-align center
	color #e1e1e1
	margin-top 20px
.cate_spec_options
	display flex
.cate_spec_delete
	margin-right 20px
	border 1px solid #e1e1e1
	color #e1e1e1
	padding 0 10px
	border-radius 5px
	cursor pointer
.cate_spec_edit
	border 1px solid #409EFF
	color #409EFF
	padding 0 10px
	border-radius 5px
	cursor pointer
.table_head
	width 80px
.table_head_long
	width 100px
.table_value_title
	width 100px
	text-align center
</style>