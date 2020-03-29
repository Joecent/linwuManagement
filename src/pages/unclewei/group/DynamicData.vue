<template>
	<div class="DynamicData_page">
            <div class="row">
                <span>拼团单号：</span>
                <el-input v-model="sign" placeholder="请输入拼团单号"></el-input>
                <div class="data_btn btn_info btn" @click="handleSerch"> 搜 索 </div>
            </div>
            <div class="tabpane">
                <table style="width:100%" class="table">
                    <thead class="tabelheader">
                        <tr>
                            <th>封面</th>
                            <th>团长姓名</th>
                            <th>类型</th>
                            <th>价格</th>
                            <th>团长提成</th>
                            <th>开团人数</th>
                            <th>增加人数</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody class="tabelbody">
                        <tr v-if="data.user_id">
                            <td><span class="mobile">封面:</span><span class='value_right'><img :src="data.goods_img"></span></td>
                            <td><span class="mobile">团长姓名:</span><span class='value_right'>{{data.username}}</span></td>
                            <td><span class="mobile">类型:</span><span class='value_right'>{{data.send_type=='1'?'自取':data.send_type=='2'?'快递':'送货上门'}}</span></td>
                            <td><span class="mobile">价格:</span><span class='value_right'>￥{{data.group_price}}</span></td>
                            <td><span class="mobile">团长提成:</span><span class='value_right'>{{data.group_p_profit}}</span></td>
                            <td><span class="mobile">开团人数:</span><span class='value_right'>{{data.current_num}}/{{data.group_num}}</span></td>
                            <td><span class="mobile">增加人数:</span><span class='value_right data-input'><el-input class="data-input" value="1"  v-model="data.num"></el-input></span></td>
                            <td class="last_btn">
                                <div class="data_btn btn_success" @click="handledisable(data.user_id,data.username)">添 加</div>
                            </td>
                        </tr>
                       <div class="empty" id="box" v-if="!data.user_id">请输入拼团单号查询</div>
                    </tbody>
                </table>
                 <ul class="user_list" v-if="data.user_id">
                    <li v-for="(item,index) in data.group" :key='index'>
                        <div class="shopPhoto">头像：<img :src="item.photo"></div>
                        <div class="shopName">拼团姓名：<span>{{item.username}}</span></div>
                        <!--<div class="data_btn btn_danger">删 除</div>-->
                    </li>
                </ul>
          </div>
         
    </div>
</template>
<script type="text/javascript">
import '@/assets/css/distribution.css';
import * as store from '@/utils/sdk/store'
import {fictitiousGroup,
addFictitiousGroupUser} from '@/utils/api'

	export default{
		data(){
			return{
                sign:'',
                data:{
                        goods_img:'https://image.linwushop.com/2018/12/20-11:13:22-/b8945942a5c9bc70852439afd9778c85.jpeg',
                        username:'',
                        send_type:'3',
                        group_price:'',
                        user_id:false,
                        group_p_profit:'',
                        current_num:'',
                        num:'1',
                        group_num:'',
                        group:[
                            {photo:'',username:''}
                        ]
                    }
                
			}
		},
		methods:{
            handleSerch(){
                if(this.sign==''){
                    this.$message.error('团长号不能为空')
                }else{
                    fictitiousGroup({
                        shop_id: store.get("currentshopid"),
                        sign:this.sign,
                        status:'0'
                    }).then(res=>{
                        if(res.status=='1'){
                            this.data=res.data
                             console.log('1');
                        }
                    })
                }
                
            },
            handledisable(id,name){
                if(parseInt(this.data.num) + parseInt(this.data.current_num) > parseInt(this.data.group_num)){
                    console.log(this.data.num + this.data.current_num)
                    this.$message.error('新增人数大于拼团人数，请重新输入')
                }else if(parseInt(this.data.num) + parseInt(this.data.current_num) == parseInt(this.data.group_num)){
                    this.$message.success('已拼团成功')
                    addFictitiousGroupUser({
                        num:this.data.num,
                        sign:this.sign,
                    }).then(res=>{
                        if(res.status=='1'){
                            //this.handleSerch()
                            this.$router.go(-1)
                        }
                    })
                }else{
                    addFictitiousGroupUser({
                        num:this.data.num,
                        sign:this.sign,
                    }).then(res=>{
                        if(res.status=='1'){
                            //this.handleSerch()
                            this.$router.go(-1)
                        }
                    })
                }
               
            }
		},
		created(){
            this.sign = this.$route.query.sign
            this.handleSerch()
		}
	}
</script>
<style lang="stylus" scoped>
.DynamicData_page
	background-color #f9f9f9
	padding 20px 0px 0px 20px
	width 100%
	height 100%
	font-size 15px
.row{
    display:flex;
    align-items:center;
    margin-bottom:20px;
    padding-left:20px;
    .el-input{
        width:26%
    }
    .btn{
        margin-left:15px;
        height:40px;
        line-height:40px
    }
}
td{
    text-align:center;
}
.tabpane table tbody tr:hover{
    background:none;
}
.value_right img{
    height:50px;
    margin:0 auto;
}
.data-input{
    .el-input{
    width:80px;
    }
}
li{
    padding:15px 0;
    display:flex;
    align-items:center;
    justify-content:space-around;
    border-bottom:1px dashed #ccc
}
li:hover{
    background:#eee;
}
li>div{
   display:flex;
   align-items:center;
justify-content: flex-end;
}
.user_list img{
    width:40px;
    height:40px;
    border-radius:50%;
}
.user_list .shopPhoto{
    width :300px;
    text-align :left;
}
.user_list .shopName{
    width :500px;
    text-align :left;
}
@media(max-width:900px){
    .DynamicData_page{
        padding:50px 15px;
        font-size:14px;
    }
    .row .el-input{
        width:55%
    }
    .row .btn{
        height:32px;
        line-height:32px
    }
    .tabpane .table tr td{
        display:flex;
        align-items:center;
    }
    .value_right img{
        height:50px;
        margin:0;
    }
}
</style>
<style>
   .DynamicData_page .table .el-input__inner{
       text-align:center;
   }
</style>
