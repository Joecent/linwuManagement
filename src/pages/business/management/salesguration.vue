<template>
	<div class="">
		<div class="conter">
		  <div class="search">
          	<input placeholder="按销售等级搜索" v-model="searchString" />
	      	<img src="@/assets/images/search.png" @click="search_card()">
		  </div>
		  <div class="ments" @click="toeditgoodsinfo">添加等级</div>
		</div>
		
		<div class="member_page">
	   <div class="memberList tabpane">
				<table style="width:100%" class="table">
							<thead class="tabelheader"> 
								<tr>
									<th>等级名称</th>
									<th>人数</th>
									<th>一级销售提成</th>
									<th>二级销售提成</th>
									<th>三级销售提成</th>
									<th>商家购买折扣</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody class="tabelbody">
								<tr v-for="(item,index) in tableDatas" :key='index'>
							  	<td><span class="mobile">等级名称:</span><span class='value_right'>{{item.name}}</span></td>
									<td><span class="mobile">人数:</span><span class='value_right'>{{item.cash}}</span></td>
									<td><span class="mobile">一级销售提成:</span><span class='value_right tabe-price'>￥{{item.total}}</span></td>
									<td><span class="mobile">二级销售提成:</span><span class='value_right tabe-price'>￥{{item.count}}</span></td>
									<td><span class="mobile">三级销售提成:</span><span class='value_right tabe-price'>￥{{item.phone}}</span></td>
									<td><span class="mobile ">商家购买折扣:</span><span class='value_right tabe-price'>￥{{item.Qrcode}}</span></td>
									<td class="last_btn">
										<!-- <el-button size="small" type="success" @click="toeditgoodsinfo">编辑</el-button>
										<el-button size="small" type="danger" @click="deletePerson(index)">删除</el-button> -->
										 <div class="data_btn btn_success" @click="toeditgoodsinfo">编辑</div>
                     <div class="data_btn btn_danger" @click="deletePerson(index)">删除</div>
									</td>
								</tr>
								<div class="empty"  v-if="tableDatas.length==0">该列表为空</div>
							</tbody>
						</table>

							<div class="pages">
							 <el-pagination background layout="prev, pager, next" :total="50" @size-change="handleChange"></el-pagination>
						</div>
	      </div>
		  </div>
	</div>
</template>
<script type="text/javascript">
import "../../../assets/css/distribution.css";
export default {
  data() {
    return {
      activeName: "first", //当前选择的导航
      count: 10,
      index: "",
      DialogVisible: false,
			editVisible: false,
			searchString: "",

      tableData: [
        {
          id: "1",
          name: "销售人",
          cash: "100",
          total: "1000",
          count: "200",
          phone: "200",
          Qrcode: "50",
          refuse: ""
        },
        {
          id: "2",
          name: "销售人1",
          cash: "100",
          total: "1000",
          count: "200",
          phone: "200",
          Qrcode: "50",
          refuse: ""
        }
      ]
    };
  },
  methods: {
    toeditgoodsinfo(id, index) {
      //点击编辑
      this.$router.push({
        path: "/business/management/sales_edit"
      });
    },

    deletePerson: function(index) {
      //console.log(index)
      // 删一个数组元素
      this.tableData.splice(index, 1);
		},
		 handleChange(e) {
      console.log(e);
		},
  },

 computed:{
  // 搜索功能
   tableDatas:function(){
      var articles_array = this.tableData,
        searchString = this.searchString;
      if(!searchString){
        return articles_array;
      }
      searchString = searchString.trim().toLowerCase();
      articles_array = articles_array.filter(function(item){
        if(item.name.toLowerCase().indexOf(searchString) !== -1){
          return item;
        }
      })
      return articles_array;
   }
 }
};
</script>


<style lang="stylus" scoped>
.member_page{
		background-color:#f9f9f9;
		padding:20px;
		width:100%;
		height:100%;
		display:flex;
		justify-content:flex-start;
	}
	.memberList{
		width:100%;
	}

.conter {
	width: 100%;
	background: #293643;
	display: flex;
	justify-content: space-between;
	height: 50px;
	line-height: 50px;
}

.search {
	position: relative;
	max-width 225px;
}

.search input {
	background-color: #efeff4;
	line-height: 26px;
	font-size: 14px;
	padding-left: 15px;
	margin-left: 20px;
	padding-right: 30px;
}

.search img {
	width: 18px;
	height: 18px;
	position: absolute;
	top: 17px;
	right:0;
	cursor: pointer;
}

.ments {
	width: 100px;
	height: 36px;
	background: #1CC09E;
	text-align: center;
	line-height: 36px;
	color: #fff;
	margin: 6px 20px 6px 0;
	cursor: pointer;
	font-size:14px;
}

// .el-button--success {
// 	background-color: inherit;
// 	color: #1cc09e;
// 	border-color: #1cc09e;
// }


.el-button--danger {
	background-color: inherit;
	color: #f56c6c;
}

.genm {
	display: flex;
	align-items: center;
}

.gemn-title {
	flex: 1;
}

.el-select {
	flex: 4;
}



.tabelbody a {
	font-size: 14px;
	padding-left: 10px;
}

.tabe-price {
	color: #FB5652;
}

.pages {
	text-align: right;
	margin-top: 20px;
}

@media (max-width: 900px) {
  .ments{
    font-size:12px;
    margin:6px
  }
  .search input{
    margin-left:6px
  }
  .search img{
    right:10px
  }
}
</style>

<style>
@media (max-width: 900px) {
  .genm-contes .el-input__icon {
    line-height: 1;
  }
  .genm-contes .el-select {
    flex: 3;
  }
}
