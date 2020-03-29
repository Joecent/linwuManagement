<template>
	<!-- 电商页面 -->
	<div class="goods_edit" v-if='shop_type==1'>
		<div class="title">
			<div class="base_info">编辑基本信息</div>
			<!--<div v-bind:class="{'active_detail_info':second_step,'detail_info':!second_step}" @click="show_second_step">编辑商品详情</div>-->
		</div>
		<el-form :model="goodsinfo" >
		<div v-show="first_step" class="first_step_frame">
				<el-form-item label="商品名称"label-width="80px"><el-input class="goods_name_input" size="medium" placeholder="请输入商品名称"v-model="goodsinfo.name" style="width:50%"/></el-form-item>
        <!-- <el-form-item label="商品别称"label-width="80px"><el-input class="goods_name_input" size="medium" placeholder="请输入商品别称"v-model="goodsinfo.elsename" style="width:50%"/></el-form-item> -->
				<el-form-item label="商品分类"label-width="80px">
					<el-select placeholder="请选择商品分类" style="width:50%" v-model="goodsinfo.cate" size="medium" @change="cate_change">
						<el-option v-for="item in cates":label ="item.cate_name" :value="item.cate_id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="首页图片" label-width="80px">
					<el-upload
					action="https://www.linwushop.com/api/upload_img"
					list-type="picture-card"
					:on-success="uploadfirst"
					:limit='1'
					:on-remove="remove_logo">
					<i class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="商品图片"label-width="80px">
					<el-upload
					class="avatar-uploader"
			  		action="https://www.linwushop.com/api/upload_img"
			  		list-type="picture-card"
			  		:on-remove="handleRemove"
			  		:file-list="images_list"
			  		multiple
			       :on-success="uploadsuccess"
			       >
			       <i class="el-icon-plus avatar-uploader-icon"></i>
					<div class="upload_tips"> （上传图片的第一张将作为主图显示，推荐大小750*770px；其余图片作为轮播图显示，推荐大小：750*770px）</div>
					</el-upload>
				</el-form-item>
        	<!-- <el-form-item v-if="shop_id=='144'" label="团长利润" label-width="80px">
					<el-input class="input" v-model="goodsinfo.group_p_profit" placeholder="团长可获利润" size="medium"></el-input>
				</el-form-item> -->
				 <div class="price_input" v-if="spec_show==false">
				 <el-form-item label="商品成本"label-width="80px">
					<el-input class="input" size="medium" placeholder="请输入成本价"v-model="goodsinfo.p_price">
 						<template slot="prepend">￥</template>
 					</el-input>
 				</el-form-item>
				<el-form-item label="建议售价"label-width="80px">
					<el-input class="input" size="medium" placeholder="请输入建议零售价"v-model="goodsinfo.price">
 						<template slot="prepend">￥</template>
 					</el-input>
 				</el-form-item>
				<el-form-item label="划线价">
					<el-input class="input" size="medium"placeholder="请输入划线价"v-model="goodsinfo.market_price">
					<template slot="prepend">￥</template>
					</el-input>
				</el-form-item>
				</div>
				<el-form-item label="商品库存"label-width="80px" v-if="spec_show==false">
				<el-input class="score_input" size="medium" placeholder="请输入库存"v-model="goodsinfo.score"/>
				</el-form-item>

				<!-- <div class="score_info">
					<el-form-item label="真实库存" label-width="80px">
						<el-input size="medium" placeholder="请输入真实库存" v-model="goodsinfo.real_goods_score"/>
					</el-form-item>
				</div> -->
				<!-- <el-form-item label="商品编码" label-width="80px">
					<el-input size="medium" placeholder="请输入商品编码（选填）" v-model="goodsinfo.code"style="width:70%"/>
				</el-form-item> -->
				<div class="group_info_input">
				<el-form-item label="开启团购" label-width="80px">
				<el-switch
					v-model="goodsinfo.is_group"
					active-text="是"
				  	inactive-text="否">
				</el-switch></el-form-item>
				<el-form-item v-if="this.goodsinfo.is_group" label="开团人数" label-width="80px"><el-input class="input" placeholder="开团人数要求" size="medium" v-model="goodsinfo.group_num" style="width:90%"/></el-form-item>
				<el-form-item v-if="this.goodsinfo.is_group&&spec_show==false"label="团购价格" label-width="100px">
				<el-input class="input" size="medium" placeholder="团购价格" v-model="goodsinfo.group_price">
					<template slot="prepend">￥</template>
				</el-input>
				</el-form-item>
				</div>
        <div class="profit">

				<el-form-item label="团购次数" label-width="85px">
						<el-input class="input" v-model="goodsinfo.goods_times" placeholder="请输入团购次数" size="medium" style="width:100%"></el-input>
				</el-form-item>
				</div>
        		 <div class="profit" v-if="shop_id=='226'&&goodsinfo.is_group">
				<!--<el-form-item label="可获利润" label-width="80px">
					<el-input class="input" v-model="goodsinfo.single_p_profit" placeholder="单独购买商家可获利润" size="medium" style="width:100%"></el-input>
				</el-form-item>-->
					<!--<el-form-item label="团购时间" label-width="90px">
						<el-input class="input" v-model="goodsinfo.group_time" placeholder="团购时间" size="medium" style="width:100%"></el-input>
					</el-form-item>-->
				<!-- <el-form-item label="单商品团长利润" label-width="112px">
					<el-input class="input" v-model="goodsinfo.group_p_profit" placeholder="团购商家可获利润" size="medium" style="width:100%"></el-input>
				</el-form-item> -->
				<!-- <el-form-item label="团购次数" label-width="85px">
						<el-input class="input" v-model="goodsinfo.goods_times" placeholder="请输入团购次数" size="medium" style="width:100%"></el-input>
				</el-form-item> -->
				</div>
				 <div class="profit" v-if="shop_id=='226'&&goodsinfo.is_group">
				<!--<el-form-item label="可获利润" label-width="80px">
					<el-input class="input" v-model="goodsinfo.single_p_profit" placeholder="单独购买商家可获利润" size="medium" style="width:100%"></el-input>
				</el-form-item>-->
					<!--<el-form-item label="团购时间" label-width="90px">
						<el-input class="input" v-model="goodsinfo.group_time" placeholder="团购时间" size="medium" style="width:100%"></el-input>
					</el-form-item>-->
				<el-form-item label="单商品团长利润" label-width="112px">
					<el-input class="input" v-model="goodsinfo.group_p_profit" placeholder="团购商家可获利润" size="medium" style="width:100%"></el-input>
				</el-form-item>
				<el-form-item label="团购次数" label-width="85px">
						<el-input class="input" v-model="goodsinfo.goods_times" placeholder="请输入团购次数" size="medium" style="width:100%"></el-input>
				</el-form-item>
				</div>
				<!--<el-form-item label="商品进价" label-width="80px">
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
		  <el-form-item label="" label-width="0px">
					<div class="add_spec_button" v-if="spec_show==false" @click="show_spec_add">增加规格</div>
					<div class="delete_spec_button" v-if="spec_show" @click="show_spec_add">删除规格</div>
				</el-form-item>
          <el-form-item label="商品规格" label-width="80px" v-if="spec_show">
            <div class="goods_spec">
            	<div>
            	<div class="add_spec_button" @click="to_show_spec">
            		编辑规格
            	</div>
            	<div class="spec_none_title" v-if="specs==''">此类别暂无规格选项，请点击编辑规格进行添加！</div>
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
                                 style="width:100%;margin-bottom:10px" @change="value_item_change">
                        <el-option v-for="items in that.specs_item" :label="items.item" :value="items.id"></el-option>
                      </el-select>
                      <el-upload
                        v-if="index==0"
                        class="spec-uploader"
                        action="https://www.linwushop.com/api/upload_img"
                        list-type="picture-card"
                        :limit="1"
                        :on-remove="handleRemove_spec"
                        :file-list="items.img"
                        :on-success="uploadsuccess_spec"
                      >
                        <div style="width:100%" @click="change_index(index,indexs)" >
                        	<i class="el-icon-plus"></i>
                        </div>
                      </el-upload>
                    </div>
                     <div class="add_spec_value" @click.stop="add_spec_value(index)">增加规格值</div>
                  </div>

                </div>
              </div>
               <!-- <div v-show="use_specs.length<=1" class="create_spec" @click="to_create_spec">新规格项</div> -->
              <!-- <div class="add_spec_items_button" @click="createTableData">生成规格明细</div> -->
            </div>
          </el-form-item>
          <el-form-item v-if="spec_show" label="规格明细" label-width="80px">
            <div class="goods_spec">
              <div>
                <table class="spe_table">
                  <thead class="spec_table_head">
                  <tr class="spec_table_head">
                    <th class="table_head">{{spec_type_1}}</th>
                    <th class="table_head" v-show="spec_type_2">{{spec_type_2}}</th>
                    <th class="table_head">售价</th>
                    <th class="table_head" v-if="goodsinfo.is_group">团购价</th>
                    <th class="table_head">划线价</th>
                    <th class="table_head">库存</th>
                  </tr>
                  </thead>
                  <tbody class="spec_table">
                  <tr v-for="tr in table_data.value">
                    <td class="table_value_title">{{tr.value_name}}</td>
                    <td class="table_value_title" v-if="tr.value_name_1">{{tr.value_name_1}}</td>
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
		<el-form-item label="是否推荐" label-width="80px">
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
		<el-form-item label="活动状态"label-width="80px">
			<el-switch
				v-model="goodsinfo.is_active"
				active-text="是"
				inactive-text="否">
			</el-switch>
		</el-form-item>
		<el-form-item label="配送方式" label-width="80px">
			<el-checkbox-group v-model="goodsinfo.group_send_type">
				 <el-checkbox label="2">快递</el-checkbox>
				 <el-checkbox label="1">自取</el-checkbox>
				 <el-checkbox label="3">送货上门</el-checkbox>
			</el-checkbox-group>
		</el-form-item>
		<el-form-item label="适用场景" label-width="80px">
			<el-checkbox-group v-model="goodsinfo.scenario" @change="handlechange">
				 <el-checkbox label="0">校园</el-checkbox>
				 <el-checkbox label="1">社区</el-checkbox>
				 <el-checkbox label="2">办公</el-checkbox>
				 <el-checkbox label="3">微信社群</el-checkbox>
			</el-checkbox-group>
		</el-form-item>
		<el-form-item label="选择团长" label-width="80px" v-if="goodsinfo.choose.length!=0">
			<el-checkbox-group v-model="goodsinfo.is_choose">
				 <el-checkbox v-for="(item,index) in goodsinfo.choose" :key='index' :label="item.user_id">{{item.username}}</el-checkbox>
			</el-checkbox-group>
		</el-form-item>
		<el-form-item class="radioList" label="开团配送方式" label-width="112px" v-if="goodsinfo.choose.length!=0">
				<el-radio-group v-model="goodsinfo.group_type">
				 <el-radio label="2">快递</el-radio>
				 <el-radio label="1">自取</el-radio>
				 <el-radio label="3">送货上门</el-radio>
			</el-radio-group>
		</el-form-item>
			<el-form-item class="radioList" label="开团时间" label-width="85px" v-if="goodsinfo.choose.length!=0">
				<el-radio-group v-model="goodsinfo.group_day">
				 <el-radio label="1">1天</el-radio>
				 <el-radio label="2">2天</el-radio>
				 <el-radio label="3">3天</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="图片详情" label-width="80px">

   <el-upload action="https://www.linwushop.com/api/upload_img"
		:on-success="handlePictureCar"
		:on-remove="RemovePicturer"
		multiple>
		<el-button size="small" type="primary">点击上传</el-button>
		<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,可多张上传</div>
	 </el-upload>
		</el-form-item>
		<div class="picture">
							<div  class="pictureCard" v-for="(item,index) in goodsinfo.goods_desc" :key="index">
									<img :src="item"></i>
							</div>
				</div>
		<!-- 编辑规格 -->
		<el-dialog title="编辑规格" :visible.sync="show_specs" width="50%" :modal-append-to-body='false'>
			<div>
				<div class="spec_none" v-if="specs==''">此类别暂无规格选项，请添加！</div>
				 <div class="cate_spec" v-for="item in specs">
					<div class="cate_spec_table">
					<div class="cate_name">分类名称：{{item.cate_name}}</div>
					<div class="cate_spec_name">规格名称：{{item.spec_name}}</div>
					</div>
					<div class="cate_spec_value"><span class="spec_value_title">规格值：</span><div class="cate_space_items"><div class="spec_value_item" v-for="items in item.item">{{items.item}}</div></div></div>
					<div class="cate_spec_options">
						<div class="cate_spec_delete" @click="delete_cate_spec(item.id)">删除</div>
						<div class="cate_spec_edit" @click="edit_cate_spec(item.id,item.spec_name,item.item)">编辑</div>
					</div>
				</div>
				<div class="spec_add_form" v-if="add_spec_form">
					<div class="spec_input"><span class="add_spec_name_title">新规格名：</span><el-input class="new_spec_name_input" placeholder="如：颜色" size="medium" v-model="new_spec_name"/></div>
					<div class="spec_value_input"><span class="add_spec_value_title">新规格值：</span><el-input class="new_spec_value_input" placeholder="多个规格值用空格隔开（如：白色 黑色）" size="medium" v-model="new_spec_value"/></div>
				</div>
				<!--<div class="add_spec" @click="to_add_spec" v-if="add_spec_form==false">添加</div>-->
				<el-button class="spec_add" type="primary" size="mini" @click="to_add_spec" v-if="add_spec_form==false">添加</el-button>
				<div class="decide_edit_value" v-if="add_spec_form&&this.spec_id!=''">
					<el-button type="primary" size="mini" @click="edit_cate_spec_imform">确认编辑</el-button>
				<!--<div class="edit_spec"  @click="edit_cate_spec_imform" >确认编辑</div>-->
				<!--<div class="edit_spec_cancle" @click="edit_cate_spec_cancle" >取消编辑</div>-->
				<el-button type="info" size="mini" @click="edit_cate_spec_cancle">取消编辑</el-button>
				</div>
				<div class="add_spec" @click="add_spec_imform" v-if="add_spec_form&&this.spec_id==''">确定</div>
			</div>
		</el-dialog>
		</div>
			<!--<div v-if="second_step" class="second_step_frame">
				 <div class="reach_text">
   			 		<!--<editor id="editor_id" height="700px" width="80%"
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
 				 <textarea id="content2" name="content1" style="width:700px;height:350px;visibility:hidden;" >
				</textarea>
 			</div>-->
			</el-form>
			<div class="buttons">
				<button class="cancle" @click="cancel_goodsinfo">返回</button>
				<!--<button class="comfirm"v-if="first_step" @click="show_second_step">下一步</button>
				<button class="cancle" v-if="second_step" @click="show_first_step">上一步</button>-->
				<button class="comfirm" @click="submitgoods">提交</button>
			</div>
	</div>
	<!-- 餐饮页面 -->
	<div class="goods_edit" v-else-if='shop_type==2'>
		<div class="title">
			<div class="base_info">编辑商品</div>
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
			  		action="https://www.linwushop.com/api/upload_img"
			  		list-type="picture-card"
			  		:on-remove="handleRemove"
			  		:file-list="images_list"
			  		multiple
			       :on-success="uploadsuccess"
			      >
			       <i class="el-icon-plus avatar-uploader-icon" v-if="goodsinfo.goods_img==''"></i>
					<div class="upload_tips" v-if="goodsinfo.goods_img==''"> （上传图片的第一张将作为主图显示，推荐像素：680px*680px）</div>
					</el-upload>

				</el-form-item>
				 <div class="price_input" v-if="spec_show==false">
				<el-form-item label="商品售价"label-width="80px">
					<el-input class="input" size="medium" placeholder="请输入售价"v-model="goodsinfo.price">
 						<template slot="prepend">￥</template>
 					</el-input>
 				</el-form-item>
				<el-form-item label="划线价">
					<el-input class="input" size="medium"placeholder="请输入划线价"v-model="goodsinfo.market_price">
					<template slot="prepend">￥</template>
					</el-input>
					</el-form-item>
				</div>
				 <el-form-item label="商品库存"label-width="80px" v-if="spec_show==false">
				<el-input class="score_input" size="medium" placeholder="请输入库存"v-model="goodsinfo.score"/>
				</el-form-item>
				 <!--<el-form-item v-if="this.goodsinfo.is_group"label="团购价格"label-width="80px">
				<el-input class="input" size="medium" placeholder="团购价格"v-model="goodsinfo.group_price">
					<template slot="prepend">￥</template>
				</el-input>
				</el-form-item>
				<el-form-item v-if="this.goodsinfo.is_group"label="最小开团人数"><el-input class="input" placeholder="开团人数要求" size="medium" v-model="goodsinfo.group_num"/></el-form-item>
				</div> -->
				<div>
				<el-form-item label="" label-width="0px">
					<div class="add_spec_button" v-if="spec_show==false" @click="show_spec_add">增加规格</div>
					<div class="delete_spec_button" v-if="spec_show" @click="show_spec_add">删除规格</div>
				</el-form-item>
          	<el-form-item v-if='spec_show' label="商品规格" label-width="80px">
            <div class="goods_spec">
            	<div>
            	<div class="add_spec_button" @click="to_show_spec">
            		编辑规格
            	</div>
            	<div class="spec_none_title" v-if="specs==''">此类别暂无规格选项，请点击编辑规格进行添加！</div>
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
                        action="https://www.linwushop.com/api/upload_img"
                        list-type="picture-card"
                        :limit="1"
                        :on-remove="handleRemove_spec"
                        :file-list="items.img"
                        :on-success="uploadsuccess_spec"
                      >
                        <div style="width:100%"  @click="change_index(index,indexs)" >
                        <i class="el-icon-plus"></i>
                        </div>
                      </el-upload>
                    </div>
                     <div class="add_spec_value" @click.stop="add_spec_value(index)">增加规格值</div>
                  </div>

                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item v-if="spec_show" label="规格明细" label-width="80px">
            <div class="goods_spec">
              <div>
                <table class="spe_table">
                  <thead class="spec_table_head">
                  <tr class="spec_table_head">
                    <th class="table_head">{{spec_type_1}}</th>
                    <th class="table_head" v-show="spec_type_2">{{spec_type_2}}</th>
                    <th class="table_head">售价</th>
                    <th class="table_head" v-if="this.goodsinfo.is_group">团购价</th>
                    <th class="table_head">划线价</th>
                    <th class="table_head">库存</th>
                  </tr>
                  </thead>
                  <tbody class="spec_table">
                  <tr v-for="tr in table_data.value">
                    <td class="table_value_title">{{tr.value_name}}</td>
                    <td class="table_value_title" v-if="tr.value_name_1">{{tr.value_name_1}}</td>
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
		<el-dialog title="编辑规格" :visible.sync="show_specs" width="50%" :modal-append-to-body='false'>
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
					<div class="spec_input"><span class="add_spec_name_title">新规格名：</span><el-input class="new_spec_name_input" placeholder="如：颜色" size="medium" v-model="new_spec_name"/></div>
					<div class="spec_value_input"><span class="add_spec_value_title">新规格值：</span><el-input class="new_spec_value_input" placeholder="多个规格值用空格隔开（如：白色 黑色）" size="medium" v-model="new_spec_value"/></div>
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
			</el-form>
			<div class="buttons">
				<button class="cancle"  @click="cancel_goodsinfo">返回</button>
				<button class="comfirm"  @click="submitgoods">提交</button>
			</div>
	</div>
	<!-- 服务页面 -->
	<div class="goods_edit" v-else-if='shop_type==3'>
		<div class="title">
			<div class="base_info">编辑基本信息</div>
			<!--<div v-bind:class="{'active_detail_info':second_step,'detail_info':!second_step}" @click="show_second_step">编辑商品详情</div>-->
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
			  		action="https://www.linwushop.com/api/upload_img"
			  		list-type="picture-card"
			  		:on-remove="handleRemove"
			  		:file-list="images_list"
			  		multiple
			       :on-success="uploadsuccess"
			       >
			       <i class="el-icon-plus avatar-uploader-icon"></i>
					<div class="upload_tips"> （上传图片的第一张将作为主图显示，推荐大小720*370px；其余图片作为轮播图显示，推荐大小：720*776px）</div>
					</el-upload>
				</el-form-item>
				 <div class="price_input" v-if="spec_show==false">
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
				</div>
				 <el-form-item label="商品库存"label-width="80px" v-if="spec_show==false">
				<el-input class="score_input" size="medium" placeholder="请输入库存"v-model="goodsinfo.score"/>
				</el-form-item>
				<!-- <div class="score_info">
					<el-form-item label="真实库存" label-width="80px">
						<el-input size="medium" placeholder="请输入真实库存" v-model="goodsinfo.real_goods_score"/>
					</el-form-item>
					<el-form-item label="库存阈值" label-width="100px">
						<el-input size="medium" placeholder="请输入库存警戒值" v-model="goodsinfo.goods_score_expect"/>
					</el-form-item>
				</div> -->
				<!-- <el-form-item label="商品编码" label-width="80px">
					<el-input size="medium" placeholder="请输入商品编码（选填）" v-model="goodsinfo.code"style="width:70%"/>
				</el-form-item> -->
				<div class="group_info_input">
				<el-form-item label="开启团购"label-width="80px">
				<el-switch
					v-model="goodsinfo.is_group"
					active-text="是"
				  	inactive-text="否">
				</el-switch></el-form-item>
				<el-form-item v-if="this.goodsinfo.is_group"label="开团人数" label-width="80px"><el-input class="input" placeholder="开团人数要求" size="medium" v-model="goodsinfo.group_num" style="width:90%"/></el-form-item>
				<el-form-item v-if="this.goodsinfo.is_group"label="团购价格"label-width="100px">
				<el-input class="input" size="medium" placeholder="团购价格" v-model="goodsinfo.group_price">
					<template slot="prepend">￥</template>
				</el-input>
				</el-form-item>
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
			<el-form-item label="" label-width="0px">
					<div class="add_spec_button" v-if="spec_show==false" @click="show_spec_add">增加规格</div>
					<div class="delete_spec_button" v-if="spec_show" @click="show_spec_add">删除规格</div>
			</el-form-item>
          <el-form-item label="商品规格" label-width="80px" v-if="spec_show">
            <div class="goods_spec" >
            	<div>
            	<div class="add_spec_button" @click="to_show_spec">
            		编辑规格
            	</div>
            	<div class="spec_none_title" v-if="specs==''">此类别暂无规格选项，请点击编辑规格进行添加！</div>
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
                                 style="width:100%;margin-bottom:10px" @change="value_item_change">
                        <el-option v-for="items in that.specs_item" :label="items.item" :value="items.id"></el-option>
                      </el-select>
                      <el-upload
                        v-if="index==0"
                        class="spec-uploader"
                        action="https://www.linwushop.com/api/upload_img"
                        list-type="picture-card"
                        :limit="1"
                        :on-remove="handleRemove_spec"
                        :file-list="items.img"
                        :on-success="uploadsuccess_spec"
                      >
                        <div style="width:100%"  @click="change_index(index,indexs)" >
                        <i class="el-icon-plus"></i>
                        </div>
                      </el-upload>
                    </div>
                     <div class="add_spec_value" @click.stop="add_spec_value(index)">增加规格值</div>
                  </div>

                </div>
              </div>
               <!-- <div v-show="use_specs.length<=1" class="create_spec" @click="to_create_spec">新规格项</div> -->
              <!-- <div class="add_spec_items_button" @click="createTableData">生成规格明细</div> -->
            </div>
          </el-form-item>
          <el-form-item v-if="spec_show" label="规格明细" label-width="80px">
            <div class="goods_spec">
              <div>
                <table class="spe_table">
                  <thead class="spec_table_head">
                  <tr class="spec_table_head">
                    <th class="table_head">{{spec_type_1}}</th>
                    <th class="table_head" v-show="spec_type_2">{{spec_type_2}}</th>
                    <th class="table_head">售价</th>
                    <th class="table_head" v-if="this.goodsinfo.is_group">团购价</th>
                    <th class="table_head">划线价</th>
                    <th class="table_head">库存</th>
                  </tr>
                  </thead>
                  <tbody class="spec_table">
                  <tr v-for="tr in table_data.value">
                    <td class="table_value_title">{{tr.value_name}}</td>
                    <td class="table_value_title" v-if="tr.value_name_1">{{tr.value_name_1}}</td>
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
		<el-dialog title="编辑规格" :visible.sync="show_specs" width="50%" :modal-append-to-body='false'>
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
					<div class="spec_input"><span class="add_spec_name_title">新规格名：</span><el-input class="new_spec_name_input" placeholder="如：颜色" size="medium" v-model="new_spec_name"/></div>
					<div class="spec_value_input"><span class="add_spec_value_title">新规格值：</span><el-input class="new_spec_value_input" placeholder="多个规格值用空格隔开（如：白色 黑色）" size="medium" v-model="new_spec_value"/></div>
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
			<!--<div v-if="second_step" class="second_step_frame">
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

 				</div> -->
 				<!-- <textarea id="content2" name="content1" style="width:700px;height:350px;visibility:hidden;" >
				</textarea>
 			</div> -->
			</el-form>
			<div class="buttons">
				<button class="cancle" @click="cancel_goodsinfo">返回</button>
				<!--<button class="comfirm"v-if="first_step" @click="show_second_step">下一步</button>
				<button class="cancle" v-if="second_step" @click="show_first_step">上一步</button>-->
				<button class="comfirm"  @click="submitgoods">提交</button>
			</div>
	</div>
 	<!-- 票务页面 -->
 	<div class="goods_edit" v-else-if='shop_type==4'>
		<div class="title">
			<div class="base_info" >编辑基本信息</div>
			<!--<div v-bind:class="{'active_detail_info':second_step,'detail_info':!second_step}" @click="show_second_step">编辑商品详情</div>-->
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
			  		action="https://www.linwushop.com/api/upload_img"
			  		list-type="picture-card"
			  		:on-remove="handleRemove"
			  		:file-list="images_list"
			  		multiple
			       :on-success="uploadsuccess"
			       >
			       <i class="el-icon-plus avatar-uploader-icon"></i>
					<div class="upload_tips"> （上传图片的第一张将作为主图显示，推荐大小720*370px；其余图片作为轮播图显示，推荐大小：720*776px）</div>
					</el-upload>
				</el-form-item>
				<div class="price_input" v-if="spec_show==false" >
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
				</div>
				<el-form-item label="商品库存"label-width="80px" v-if="spec_show==false">
				<el-input class="score_input" size="medium" placeholder="请输入库存"v-model="goodsinfo.score"/>
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
		  <el-form-item label="" label-width="0px">
					<div class="add_spec_button" v-if="spec_show==false" @click="show_spec_add">增加规格</div>
					<div class="delete_spec_button" v-if="spec_show" @click="show_spec_add">删除规格</div>
		  </el-form-item>
          <el-form-item label="商品规格" label-width="80px" v-if="spec_show">
            <div class="goods_spec">
            	<div>
            	<div class="add_spec_button" @click="to_show_spec">
            		编辑规格
            	</div>
            	<div class="spec_none_title" v-if="specs==''">此类别暂无规格选项，请点击编辑规格进行添加！</div>
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
                                 style="width:100%;margin-bottom:10px" @change="value_item_change">
                        <el-option v-for="items in that.specs_item" :label="items.item" :value="items.id"></el-option>
                      </el-select>
                      <el-upload
                        v-if="index==0"
                        class="spec-uploader"
                        action="https://www.linwushop.com/api/upload_img"
                        list-type="picture-card"
                        :limit="1"
                        :on-remove="handleRemove_spec"
                        :file-list="items.img"
                        :on-success="uploadsuccess_spec"
                      >
                        <div style="width:100%"  @click="change_index(index,indexs)" >
                        <i class="el-icon-plus"></i>
                        </div>
                      </el-upload>
                    </div>
                     <div class="add_spec_value" @click.stop="add_spec_value(index)">增加规格值</div>
                  </div>

                </div>
              </div>
               <!-- <div v-show="use_specs.length<=1" class="create_spec" @click="to_create_spec">新规格项</div> -->
              <!-- <div class="add_spec_items_button" @click="createTableData">生成规格明细</div> -->
            </div>
          </el-form-item>
          <el-form-item v-if="spec_show" label="规格明细" label-width="80px">
            <div class="goods_spec">
              <div>
                <table class="spe_table">
                  <thead class="spec_table_head">
                  <tr class="spec_table_head">
                    <th class="table_head">{{spec_type_1}}</th>
                    <th class="table_head" v-show="spec_type_2">{{spec_type_2}}</th>
                    <th class="table_head">售价</th>
                    <th class="table_head" v-if="this.goodsinfo.is_group">团购价</th>
                    <th class="table_head">划线价</th>
                    <th class="table_head">库存</th>
                  </tr>
                  </thead>
                  <tbody class="spec_table">
                  <tr v-for="tr in table_data.value">
                    <td class="table_value_title">{{tr.value_name}}</td>
                    <td class="table_value_title" v-if="tr.value_name_1">{{tr.value_name_1}}</td>
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
		<el-dialog title="编辑规格" :visible.sync="show_specs" width="50%" :modal-append-to-body='false'>
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
					<div class="spec_input"><span class="add_spec_name_title">新规格名：</span><el-input class="new_spec_name_input" placeholder="如：颜色" size="medium" v-model="new_spec_name"/></div>
					<div class="spec_value_input"><span class="add_spec_value_title">新规格值：</span><el-input class="new_spec_value_input" placeholder="多个规格值用空格隔开（如：白色 黑色）" size="medium" v-model="new_spec_value"/></div>
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
			<!--<div v-if="second_step" class="second_step_frame">
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
 				 <textarea id="content2" name="content1" style="width:700px;height:350px;visibility:hidden;" >
				</textarea>
 			</div>-->
			</el-form>
			<div class="buttons">
				<button class="cancle" @click="cancel_goodsinfo">返回</button>
				<!--<button class="comfirm"v-if="first_step" @click="show_second_step">下一步</button>-->
				<!--<button class="cancle" v-if="second_step" @click="show_first_step">上一步</button>-->
				<button class="comfirm" @click="submitgoods">提交</button>
			</div>
	</div>
</template>
<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import '@/utils/jquery'
import {formatNumber} from '@/utils/formatNumber'
import {sel_cate_all,
		goods_add,
		add_spec,
		add_attr,
		attr_list,
		update_attr,
		del_attr,
		spec_list,
		update_spec,
		del_spec,
		getGroupAll,
		goods_pro_add,
		search_spec,
		search_attr,
		getToken,
		get_goods
		} from '@/utils/api'
	export default{
		data(){
			return{
				isTrue:true,//由规格控制是否可以提交
				is_on_true:true,
				shop_type:store.get('shop_type'),
				shop_id:store.get('currentshopid'),
				spec_show:false,
				items_show:'',
 				p_data:{},
				goodsinfo:{
					name:'',
					group_send_type:['1','2','3'],
					scenario:[],//选择场景
					goods_times:'',
					admin_id:'',
					choose:[],//所有团长
					is_choose:[],
					group_day:'',//开团天数
					group_type:'',//开团配送方式
					cate:'',
					firstimageUrl:'',//主图
					goods_img:[],
					price:'',
					is_active:false,
					market_price:'',
					score:'',
					is_group:false,
					group_price:'',
					group_num:'2',
					goods_desc:[],//详情图片字段
					recommend:false,
					single_p_profit:'1',
					group_p_profit:'',
					p_price:'',
					real_goods_score:'1',
					goods_score_expect:'1',
					is_on_sale:0,
					code:'',
				},
				first_step:true,
				second_step:false,
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
				spec_id:'',
				single_goodsinfo:true,
				spec_show:false
			}
		},
		methods:{
			uploadfirst(file){//主图上传
				console.log(file)
					this.goodsinfo.firstimageUrl=file.data.img_url
			},
			handlechange(e){
			console.log(e)
					if(e.length!=0){
						getGroupAll({
							shop_id:store.get('currentshopid'),
							type:Array.from(e)
					}).then(res=>{
							if(res.status=='1'){
									this.goodsinfo.choose=res.data
							}
					})
					}else{
						this.goodsinfo.choose=''
					}
			},
			remove_logo(file){//主图删除4
					this.goodsinfo.firstimageUrl=''
			},
			handlePictureCar(file){
				this.goodsinfo.goods_desc.push(file.data.img_url)
				console.log(this.goodsinfo.goods_desc)
			},
			RemovePictureCar(file){
				console.log(file)
			},
			RemovePicturer(file){

				for(let i=0;i<this.goodsinfo.goods_desc.length;i++){
						if(this.goodsinfo.goods_desc[i]==file.response.data.img_url){
								this.goodsinfo.goods_desc.splice(i,1)
						}
				}
				console.log(this.goodsinfo.goods_desc)
			},
			after_upload(file){
			},
			get_token(){
				getToken({type:3}).then((res)=>{
			 		this.p_data={token:res.token1}
			 	});
			},
			show_cates(){
        sel_cate_all({
          // shop_id:store.get('currentshopid'),
          // goods_type : '1'
        }).then((res)=>{
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
			// show_second_step(){
			// 		if(this.isTrue){
			// 			this.first_step=true
			// 			this.second_step=false
			// 		}
			// },
			// show_first_step(){
			// 	this.first_step=true
			// 	this.second_step=false
			// },
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
					console.log(file)
					this.use_specs[this.spec_index].value[this.spec_value_index].img.push({url:res.data.img_url,uid:'spec_image'+this.spec_value_index})
					this.createTableData()
				}else{
					this.$message.error('上传失败')
				}
			},
			change_index(index,indexs){
				this.spec_index=index
				this.spec_value_index=indexs
			},
			handleRemove_spec(file){
				 for (var i=this.use_specs.length-1;i>= 0;i--) {
				 	for (var a = this.use_specs[i].value.length - 1; a >= 0; a--) {
				 		//if (this.use_specs[i].value[a].img[0]==file.response.data.img_url) {
				 			if (this.use_specs[i].value[a].img[0].url==file.url) {//如果数组后面没有选择图片。img[0].url就是未定义,报错
							     this.use_specs[i].value.splice(a,1)
							     this.table_data.value.splice(a,1)
				 		};
				 	};
				 };
			},
			cancel_goodsinfo(){
				this.$router.push('/business/goods/goods')
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
	  //是否显示规格编辑
	  show_spec_add(){
	  	this.spec_show=!this.spec_show
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
          this.use_specs.push({name:id,specs_item:[],value:[{value_item:'',img:[]}]}).ite
          this.specs.forEach(item=>{
            if (id==item.id) {
              this.use_specs[0].specs_item=item.item
            }
          })
          this.createTableData()
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
      value_item_change(e){
				 for(let i=0;i<this.table_data.value.length;i++){
					 if(this.table_data.value[i].value_item!==e){
						 //if(this.true){//如果之前的isTrue为false,就让isTrue为false
										this.isTrue=true
								//}else{
										//this.isTrue=false
								//}
						}else{
								this.isTrue=false//如果有相同的选项，就让isTrue为false
								this.table_data.value[i].value_item=''
								this.$message.error("不能选择相同的选项")
						}
				 }
				this.createTableData()
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
				console.log(this.use_specs)
				console.log(this.table_data.value)
      	this.use_specs[index].value.splice(indexs,1)
				this.table_data.value.splice(indexs,1)
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
				if(this.isTrue){
					var flag=true
					if (this.goodsinfo.name=='') {
						this.$message.error('请输入商品名称')
					}else if(this.goodsinfo.firstimageUrl==''){
							this.$message.error('首页图片不能为空')
					}else if(this.shop_id=='226'&&this.goodsinfo.firstimageUrl==''){
							this.$message.error('首页图片不能为空')
					}else if (this.goodsinfo.cate=='') {
						this.$message.error('请选择商品分类')
					}else if (this.goodsinfo.goods_img=='') {
						this.$message.error('请上传商品图片')
					}else if (this.spec_show==false&&this.goodsinfo.price=='') {
						this.$message.error('请输入商品售价')
					}else if (this.spec_show==false&&this.goodsinfo.market_price=='') {
						this.$message.error('请输入商品划线价')
					}else if (this.spec_show==false&&this.goodsinfo.score=='') {
						this.$message.error('请输入商品库存')
					}else if (this.goodsinfo.is_group==true&&this.goodsinfo.group_num=='') {
						this.$message.error('请输入开团人数')
					}else if (this.goodsinfo.is_group&&this.spec_show==false&&this.goodsinfo.group_price=='') {
						this.$message.error('请输入团购价格')
					}else{
						flag=false
          }

					if(this.goodsinfo.is_group==true){
						 if(this.goodsinfo.scenario.length=='0'){
								this.$message.error('请选择场景')
							}else if(this.goodsinfo.is_choose.length=='0'){
								this.$message.error('请选择团长')
							}else if(this.goodsinfo.group_day==''){
								this.$message.error('请选择的时间')
							}else if(this.goodsinfo.group_type==''){
								this.$message.error('请选择开团配送方式')
							}else{
								flag=false
							}
					}
					if (flag==false) {
					const params = {
						goods_name: this.goodsinfo.name,
						goods_img:[],
						attrs: [],
						goods_times:this.goodsinfo.goods_times,
						is_active:this.goodsinfo.is_active?'1':'0',
						group_send_type:this.goodsinfo.group_send_type.toString(),
						group_profit:'0',
						item: [],
						is_group: this.goodsinfo.is_group?1:0,
						group_num: this.goodsinfo.group_num<2?'2':this.goodsinfo.group_num,
						group_price:this.goodsinfo.group_price,
						is_on_sale: this.goodsinfo.is_on_sale?1:0,
						is_commend: this.goodsinfo.recommend?1:0,
						goods_desc: this.goodsinfo.goods_desc.join(','),
						cate_id: this.goodsinfo.cate,
						shop_id: store.get('currentshopid'),
					}
					
						params.user_id=this.goodsinfo.is_choose
						params.type=this.goodsinfo.scenario
						params.day=this.goodsinfo.group_day
						params.group_type=this.goodsinfo.group_type
					
					//数据拼装
					this.goodsinfo.goods_img.forEach((item) => {
						params['goods_img'].push(item)
					})
						params['goods_img'].unshift(this.goodsinfo.firstimageUrl)
					
					if (this.spec_show==true) {
						params['is_on_spec'] = 1
						this.table_data.value.forEach((val) => {
							console.log(val)
						let objItem = JSON.parse(JSON.stringify({}))
						objItem['spec_name'] = this.table_data.name
						objItem['p_price'] = '0'
						objItem['goods_price'] = val.price
						objItem['group_price'] = val.member_price
						objItem['market_price'] = val.market_price
						objItem['goods_score'] = val.sku
						// objItem['goods_score_expect'] = val.stock_limit?'1':val.stock_limit
						// objItem['single_p_profit'] = val.alone_profit?'1':val.lone_profit
						// objItem['group_p_profit'] = val.team_profit?'1':val.team_profit
						objItem['goods_score_expect'] = '0'
						objItem['single_p_profit'] = '0'
						objItem['group_p_profit'] = '0'
						objItem['spec_item'] = val.value_item
						if(val.img.length==0){
								this.$message.error('请选择规格图片')
						}else{
								objItem['item_images']={id:val.value_item,img:val.img[0].url}
						}
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
					}else if (this.spec_show==false) {

						params['is_on_spec'] = 0
						let objItem={
							spec_name:'无规格',
							p_price:this.goodsinfo.p_price,
							goods_price:this.goodsinfo.price,
							group_price:this.goodsinfo.group_price,
							market_price:this.goodsinfo.market_price,
							goods_score:this.goodsinfo.score,
							goods_score_expect:'0',
							single_p_profit:'0',
							group_p_profit:'0',
							item_images:{id:18,img:'0'},
							key_name:"常规:常规",
              spec_item:18,
              profit:[0,0,0,0,0]
						}
						params['item'].push(objItem)
					};
					this.attrs_sel.forEach((val) => {
						let itemObj=JSON.parse(JSON.stringify({}))
						itemObj['attr_'+val.attr_id]=val.attr_value
						params.attrs.push(itemObj)
					})
							for(var i=0;i<this.use_specs[0].value.length;i++){
									if(this.use_specs[0].value[i].value_item==''){
											console.log('规格值不能为空')
											this.is_on_true=false
									}
							}
									if(this.is_on_true){
												goods_pro_add(params).then((res) => {
														console.log(params)
														if (res.error_code==1000) {
															this.$message.success('添加成功！')
															this.$router.push('/business/goods/goods')
														}else {
															this.$message.error('对不起，添加失败，请查看规格图片及信息是否填写完整！')
															this.$router.push('/business/goods/goods_add')
														}
											})
									}else{
										this.$message.error("规格值不能为空")
									}

						};
					}else{
							this.$message.error("规格值不能有相同的")
					}
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
	padding 20px 20px 80px 20px
.title
	display flex
	justify-content space-between
	margin-bottom 30px
	text-align center
	height 40px
	line-height 40px
	font-size 18px
	.base_info
		width 100%
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
	color #aaaaaa
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
.delete_spec_button
	border 1px solid #ff8661
	background-color white
	color #ff8661
	width 80px
	height 30px
	text-align center
	padding 0 8px
	border-radius 4px
	cursor pointer
	margin 5px 0 10px 0
	line-height 30px
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
.spec_none_title
	color #AAAAAA
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
	width 60%
.cate_spec_name
	width 30%
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
	margin 20px 0
	display flex
.spec_input
	display flex
	align-items center
.spec_value_input
	display flex
	align-items center
	margin-left 15px
	flex 1
.add_spec_imform
	cursor pointer
	border 1px solid #609eff
.add_spec_name_title
	width 70px
.add_spec_value_title
	width 22%
	text-align right
.new_spec_name_input
	width 120px
.new_spec_value_input
	width 78%
.spec_add
	margin-top 20px
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
	justify-content flex-end
	display flex
	margin-top 10px
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
	min-width 120px
	height 24px
	line-height 24px
	justify-content flex-end
.cate_spec_delete
	margin-right 10px
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
	padding 0 5px
	border-bottom none
.table_head_long
	width 100px
.table_value_title
	width 100px
	text-align center
</style>
<style lang="stylus" scoped>
.picture{
		padding-left:80px;
}
	.pictureCard{
			width:400px;
			border:none;
	}
	.pictureCard>img{
		width:100%;
		border:none;
	}
	.lee-style1{
		width: 50%;
	}

	.lee-style3{
		width: 100%;
	}

	.lee-style5{

		display:flex;
		margin-bottom:20px
	}

	.lee-style7{

		display:flex;

	}

	.lee-style6{
		width: 30%;
	}

	.el-dialog{
		width: 800px !important;
	}

	.add_spec_name_title{
		width: 100px;
	}

	.add_spec_value_title{
		width: 100px;
	}

	.el-dialog__header{
		text-align: center;
	}

	.spec_none{
		text-align: left;
	}

	.el-select-dropdown__wrap,
	.el-scrollbar__wrap{
		max-height: none;
	}

	@media(max-width:900px ) {

	.spec_value_input{
		    margin-left: 0;
	}

	.add_spec_value_title{
			text-align:left;
			padding-top:5px;
	}
.picture{
		padding-left:0;
}

	.el-form-item__content{
		margin-left: 0 !important;
		width: 100%;
		float: none;
		display: block;
	}
	.el-input--medium{
		width: 100% !important;
	}

	.el-select{
		width: 100% !important;
	}

	.el-dialog{
		width: 90% !important;
	}

	.cate_spec_options{
		text-align: right;
		float: none;
		display: block;
	}

	.cate_spec_delete,
	.cate_spec_edit{
		display: inline-block;
	}

	.cate_spec{
		position: relative;
	}

	.cate_spec_value{
		position:initial;
	}

	.cate_spec_options{
		margin-top: 15px;
	}

	.buttons{
		width: 100%;
		left: 0;
	}

	.title{
		display: block;
		margin-bottom: 10px;
	}
	.title .base_info,
	.title .detail_info{
		display: inline-block;
		width: 100%;
	}
	.goods_edit{
		padding: 0;
		padding-top: 30px;
	}
	.first_step_frame{
		width: 100%;
		padding-bottom: 50px;
	}

	.lee-style4{
		width: 100%;
	}

	.score_input.el-input{
		width: 100% !important;
	}

	.el-form-item{
		width: 100%;
	}

	.el-form-item__label{
		width: 100%;
		float: none;
		line-height: 24px;
		height: 24px;
		padding-bottom: 10px;
	}
	.price_input{
		display: block;
	}
	.el-upload--picture-card{
		display: block;
		height: auto;
	}

	.div .body .el-main .breadcrumb-container{
		margin-bottom: 0;
	}

	.title .base_info, .title .detail_info{
		height: 30px;
		font-size: 14px;
		line-height: 30px;
	}

	.goods_edit{
		padding-top: 10px;
	}

	.first_step_frame{
		padding: 0 10px;
	}
	.el-form-item{
		margin-bottom: 10px;
	}

	.goods_spec{
		width: 100%;
	}

	.avatar-uploader-icon{
		width: 100%;
		text-align: center;
	}

	.upload_tips{
		display: block;
	}

	.spec_name{
		display: block;
		width: 80px;
		margin-right: 0;
	}

	.group_info_input .el-form-item__content{
		width: 150px;
	}

	table.spe_table{
		font-size: 12px;
		color: #555555;
		font-weight: inherit;
	}

	table.spe_table th,
	table.spe_table td,
	table.spe_table .el-input__inner{
		height: 20px;
		line-height: 20px;
		border-radius: 0;
	}

	.table_value_title{
		width: 80px;
		overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
	}

	.buttons{
		position: static;
	}

	.el-switch{
		width: 100%;
	}

	.title .active_detail_info{
		width: 49%;
		font-size: 14px;
		height: 30px;
		text-align: center;
		display: inline-block;
		line-height: 30px;
	}
	.reach_text{
		float: none;
		width: 100%;
	}

	.ke-container{
		width: 100% !important;
	}

	.ke-edit{
		height: 300px !important;
	}

	.goods_spec_frame{
		padding: 10px;
	}

	.el-select>.el-input{
		display: block;
	}
	.lee-style6{
		display: block;
		width: 100%;
	}
	.lee-style5,.lee-style7{
		display: block;
	}

	.input_values{
		width: 100%;
	}

	.input_value{
		width: 100%;
		margin-right: 0;
	}

	}

	@media(max-width:780px ) {

		.spec_add_form{
			display: block;
		}

		.spec_input,
		.spec_value_input,
		.cate_spec_table{
			width: 100%;
			display: block;
		}

		.add_spec_name_title,
		.new_spec_name_input,
		.add_spec_value_title,
		.new_spec_value_input{
			display: block;
			width: 100%;
			margin-bottom: 6px;
		}
		.profit{
				display:inline-block;
				width:100%;
				.el-form-item{
					display:flex;
					width:100%;
					.el-form-item__label{
						min-width:120px !important;
					}
					.el-form-item__content{
						width:85% !important;
					}
				}
			}
		.cate_name{
			width: 60%;
			display: inline-block;
			padding-bottom: 6px;
		}
		.cate_spec_name{
			width: 38%;
			display: inline-block;
			padding-bottom: 6px;
		}

	}

	@media(max-width:500px ){
		.pictureCard{
			width:100%
		}
	}
</style>
<style>
	.goods_edit	.el-upload{
				justify-content:center
		}
	.radioList .el-form-item__content{
		    margin-left: 20px;
    		margin-top: 14px;
	}
</style>
