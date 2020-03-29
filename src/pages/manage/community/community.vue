<template>
	<div style="background-color:#f9f9f9">
    <div class="shop_title">
      <div class="shop_info">
        <div class="shop_image"><img :src="image"></div>
        <div class="shop_name">{{name}}</div>
      </div>
        <el-row style="overflow:hidden">
            <el-col :span="8" align="center" style="padding-bottom:10px">
            <h2>{{newin}}</h2>
            <p>新增人数</p>
            </el-col>
            <el-col :span="8" align="center" style="padding-bottom:10px">
            <h2>{{weekin}}</h2>
            <p>本周增长人数</p>
            </el-col>
            <el-col :span="8" align="center" style="padding-bottom:10px">
            <h2>{{totalpeople}}</h2>
            <p>总用户数</p>
            </el-col>

        </el-row>
      </div>
        <div class="tips" v-if='new_message' @click='check_message'>
          <div class="message" >有新帖子啦！去瞧瞧吧</div>
        </div>
        <div  @click='show_info(item)'  v-for='item in forum' style="background-color:white" class="forum">
          <el-row :gutter="10">
            <el-col :span='2'>
                <div class="avatar">
                    <img :src="item.photo" >
                        <div class="name">
                            {{item.name}}
                        </div>
                        
                </div>
            </el-col>
          <el-col :span="14">
             <div class="grid-content">
                <div >
                   <div>{{item.content}}</div>
                  <div class="imglist">
                      <img v-for="items in item.forum_img" :src="items" >
                  </div>
                </div>

             </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
                <div class="options">
                     <div class="clicknum"><i class="el-icon-star-off"></i>{{item.click}}</div>
                     <div class="callback" @click="to_reply(item.id)">回复</div>
                     <div class=" best" @click='set_best(item.id,item.isbest)'>{{item.isbest==1?'取消精选':'精选'}}</div>
                     <div class="top_del">
                   <div class="top" @click='set_top(item.id,item.flag)'>{{item.flag==1?'取消置顶':'置顶'}}</div>
                    <div class="del" @click='to_remove(item_id)'>删除</div>
                    </div>
                </div>

            </div>
         </el-col>
        </el-row>
        <div class="time">
                    {{item.addtime}}
            </div>
        </div>
        <div class="block">
            <el-pagination
              @current-change="handleCurrentChange"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :page-count="pagecount"
              :pager-count="5"
              :current-page.sync="currentPage">
            </el-pagination>
        </div>
      <el-dialog title="删除帖子" class="remove" :visible.sync="is_remove">
            <div class="message">是否确定删除该帖 ？</div>
            <div class="question">
              <button class="remove_comfirm" @click="remove_forum()">确认</button>
              <button class="cancle" @click="is_remove=false">取消</button>
            </div>
      </el-dialog>
      <el-dialog title="设置精选" class="remove" :visible.sync="is_best_show">
            <div class="message" v-if="best==0">是否确定将该帖子设置为精选 ？</div>
            <div class="message" v-if="best==1">是否确定将该帖子取消精选 ？</div>
            <div class="question">
              <button class="remove_comfirm" @click="is_best_show=false">取消</button>
              <button class="cancle" @click="is_best">确认</button>
            </div>
      </el-dialog>
       <el-dialog title="置顶" class="remove" :visible.sync="is_top_show" width="30%">
            <div class="message" v-if="top==0">是否确定将该帖子设置为置顶 ？</div>
            <div class="message" v-if="top==1">是否确定将该帖子取消置顶 ？</div>
            <div class="question">
              <button class="remove_comfirm" @click="is_top_show=false">取消</button>
              <button class="cancle" @click="is_top">确认</button>
            </div>
      </el-dialog>
      <el-dialog title="回复帖子" class="reply" :visible.sync="is_to_reply" width="30%">
          <el-input placeholder="请输入回复内容" v-model="reply_content" type="textarea"></el-input>
           <div class="question">
              <button class="remove_comfirm" @click="is_to_reply=false">取消</button>
              <button class="cancle" @click="reply">确认</button>
            </div>
      </el-dialog>
     <!--  <div class="callback">
        <el-input placeholder="回复" class="callback_input"></el-input>
      </div> -->
    </div>

</template>
<script type="text/javascript">
import * as store from '@/utils/sdk/store'
import { new_people,week_people,show_forum,sumpeople,show_info,is_best,is_top,remove_forum,shop_info,admin_reply} from '@/utils/api'
export default{
  data(){
    return{
      newin:1,
      weekin:1,
      totalpeople:1,
      forum:[],
      name:'',
      image:'',
      is_remove:false,
      remove_id:'',
      new_message:true,
      currentPage:1,
      pagecount:1,
      is_best_show:false,
      is_top_show:false,
      best:'',
      top:'',
      is_to_reply:false,
      reply_id:'',
      reply_content:''
    }
  },
  methods:{
    to_reply(id){
      this.is_to_reply=true
      this.reply_id=id
    },
    reply(){
      admin_reply({shop_id:store.get('currentshopid'),content:this.reply_content,forum_id:this.reply_id}).then((res)=>{
        if (res.error_code==1000) {
          this.$message.success('回复成功')
          this.is_to_reply=false
          this.show_forum()
        };
      })
    },
    handleCurrentChange(){
        this.show_forum()
    },
    check_message(){
        this.new_message=false
        this.currentPage=1
        this.show_forum()
    },
    to_remove(id){
        this.is_remove=true
        this.remove_id=id
    },
    shop_info(){
      shop_info({shop_id:store.get('currentshopid')}).then((res)=>{
        this.image=res.data.logo
        this.name=res.data.name
      })
    },
    new_people(){
      new_people({shop_id:store.get('currentshopid')}).then((res)=>{
        this.newin = res.data.new_people
        console.log(res)
      })
    },
    week_people(){
      week_people({shop_id:store.get('currentshopid')}).then((res)=>{
        this.weekin = res.data.weeek_people
      })
    },
    sumpeople(){
      sumpeople({shop_id:store.get('currentshopid')}).then((res)=>{
        this.totalpeople = res.data.sum
      })
    },
    show_forum(){
      show_forum({shop_id:store.get('currentshopid'),token:store.get('token'),page:this.currentPage}).then((res)=>{
        if(res.error_code==404){
          this.$message.error('请勿重复登录账号')
        }else if(res.error_code==1000){
         this.forum = res.data.forum
         this.pagecount = res.data.totalPage
        }
      })
    },
    new_forum(){
      new_forum({shop_id:store.get('currentshopid')}).then((res)=>{
        if (res.error_code==1000) {
          console.log('1111')
        };
      })
    },
    is_top(){
      is_top({token:store.get('token'),shop_id:store.get('currentshopid'),forum_id:this.forum_id,flag:this.top==1?0:1}).then((res)=>{
        if(res.error_code==1000){
         this.show_forum() 
         this.is_top_show=false
         this.$message.success('操作成功')        
       }else if (res.error_code==1002) {
         this.$message.error('最多设置三条帖子为置顶')
       };
      })
    },
    is_best(){
      is_best({token:store.get('token'),forum_id:this.forum_id,isbest:this.best==1?0:1}).then((res)=>{
        if (res.error_code==1000) {
          this.show_forum()
          this.is_best_show = false
          this.$message.success('操作成功')
        };
      })
    },
    set_top(id,top){
        this.is_top_show=true
        this.forum_id=id
        this.top=top
    },
    set_best(id,best){
        this.is_best_show=true
        this.forum_id = id
        this.best = best
    },
    show_info(item){
      console.log(item.id)
      show_info({token:store.get('token'),forum_id:item.id})
    },
    remove_forum(){
      remove_forum({token:store.get('token'),forum_id:this.remove_id}).then((res)=>{
        if (res.error_code==1000) {
          this.show_forum()
          this.is_remove=false
        }else {
          this.$message.error('未知错误')
        };
        
      })
    }
  },
  created(){
    this.new_people()
    this.week_people()
    this.sumpeople()
    this.show_forum()
    this.shop_info()
  }

}
</script>

<style lang="stylus" scoped>
.el-col 
    padding 30px 0px
    
.el-pagination
  text-align right
.block
  background-color white
  padding 20px 30px
  font-size 18px
.shop_title
  margin-bottom 20px
  background-color white
.shop_info
  padding-top 20px
  display flex
  justify flex-start
  height 72px
  margin-bottom 30px
  .shop_image
    margin-left 50px
    img
      width 72px
      height 72px
      border-radius 50%
  .shop_name
    margin-left 20px
    line-height 72px
    font-size 18px
    font-weight bold
.tips
  background-color #9ED0F0
  height 30px
  .message  
    width 100%
    text-align center
    font-size 15px
    color #f9f9f9
    line-height 30px
    cursor pointer
.forum
    border-bottom 1px solid #ebedef
.imglist
    display flex
    margin-top 30px
    img
        height 100px
        width 100px
        margin-right 20px
.avatar
    display flex
    flex-direction column
    align-items center
    img
        height 60px
        width 60px
        border-radius 50%
.name
    width 100%
    height 50px
    padding-top 20px
    font-size 13px
    text-align center
    line-height 20px
    overflow hidden
    white-space nowrap
    text-overflow ellipsis

.reply
  .question
    margin-top 20px
    display flex
    justify-content space-between
    padding 0 15%
  .remove_comfirm
    color #c0c4cc
    background-color white
    cursor pointer
    padding 5px 20px
    border-radius 3px
    border 1px solid #c0c4cc
.options
    margin-top 30px
    display flex
    justify-content flex-end
    margin-right 30px
    font-size 15px
    .clicknum
      margin-top 3px
      .el-icon-star-off:before
          margin-right 5px
    .best
      cursor pointer
      color #409EFF
      margin-left 20px
    .top_del
      margin-left 20px
      text-align right
      .top
        cursor pointer
        color #409EFF
      .del 
        margin-top 10px
        cursor pointer
        color #C0C4CC
    .callback
      margin-left 20px
      color #409EFF
      cursor pointer
.remove
  .question
    margin-top 20px
    display flex
    justify-content space-between
    padding 0 15%
  .remove_comfirm
    color #c0c4cc
    background-color white
    cursor pointer
    padding 5px 20px
    border-radius 3px
    border 1px solid #c0c4cc
.cancle
  color white
  background-color #409EFF
  cursor pointer
  padding 5px 20px
  border-radius 3px
.time
  font-size 12px
  color #aaaaaa
  margin 0 0 10px 20px
.el-col-2
  padding 60px 5px 0
.el-col-8
  padding-top 10px
  padding-left 20px !important
  padding-right 20px !important
</style>
