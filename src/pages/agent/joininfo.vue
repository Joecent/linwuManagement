<template>
	<div>
		<div class="join_page">
			<div class="join_header">
				本页面为加入邻伍商城成为合伙人的申请页面，以下信息非常重要，请保证所填信息真实无误！
			</div>
			<div class="join_body">
			<div>
				<el-form  :model="form" label-width="80px">
					<el-form-item label="姓名" >
						<el-input v-model="form.realname" size="medium" style="width:500px" placeholder="请输入真实姓名"></el-input>
					</el-form-item>
					<el-form-item label="性别">
					    <el-radio-group v-model="form.sex" style="margin-top:13px;">
						    <el-radio :label="1">男</el-radio>
						    <el-radio :label="0">女</el-radio>
					    </el-radio-group>
					</el-form-item>
					<el-form-item label="身份证号">
						<el-input v-model="form.id_number"size="medium"style="width:500px" placeholder="请输入本人身份证号"></el-input>
					</el-form-item>
					<el-form-item label="手机号" >
						<el-input v-model="form.phone"size="medium"style="width:500px" placeholder="请输入手机联系方式"></el-input>
					</el-form-item>
					<el-form-item label="紧急电话">
						<el-input v-model="form.urgent_phone"size="medium"style="width:500px" placeholder="请输入紧急联系电话，作为备用联系方式"></el-input>
					</el-form-item>
					<el-form-item label="电子邮箱">
						<el-input v-model="form.email"size="medium"style="width:500px" placeholder="请输入本人邮箱（选填）"></el-input>
					</el-form-item>
					<el-form-item label="区域类型">
					    <el-radio-group v-model="form.area_type" style="margin-top:13px;">
						    <el-radio :label="1">城市</el-radio>
						    <el-radio :label="0">乡镇</el-radio>
					    </el-radio-group>
					</el-form-item>
				  <el-form-item label="地址" >
				    <el-cascader
        				:options="options"
        				change-on-select
        				v-model="form.address"
        				expand-trigger="hover"
       					@change="handleChange"
       					size="medium"
       					placeholder="请选择所在地区" 
        				class="wd400">
    				</el-cascader>
				  </el-form-item>
				  <el-form-item label="详细地址">
				    <el-input type="textarea" v-model="form.detail_address"size="medium" style="width:500px"></el-input>
				  </el-form-item>
				  <el-form-item label="">
		      			<el-checkbox v-model="commite"></el-checkbox>
		      			<span class="agree">同意<span class="agreement" @click="show_agreement">《邻伍商城合伙人协议》</span></span>
		    	  </el-form-item>
				</el-form>
					<div class="buttons">
						<button class="cancle"  @click="back">返回</button>
						<el-button class="comfirm" @click="submit">下一步</el-button>
					</div>
				</div>
			</div>
		</div>
		<!-- 协议内容 -->
		<el-dialog title="邻伍商城合伙人协议" :visible.sync="agreement" width="50%">
			<div class="agreement_content">
本协议由同意并承诺遵守本协议规定使用邻伍商城系统的合法经营实体或合法个人（下称“合伙人”）、上海捷鲜网络科技有限公司（下称“邻伍商城”）共同缔结，具有合同效力。</p>
				一、协议内容及生效： </p>
				（一）本协议内容包括协议正文及所有邻伍商城已经发布的或将来可能发布的各类规则。所有规则为协议不可分割的一部分，与协议正文具有同等法律效力。 </p>
（二）合伙人在使用邻伍商城提供的各项服务的同时，承诺接受并遵守各项相关规则的规定。邻伍商城有权根据需要不时地制定、修改本协议或各类规则，如本协议有任何变更，邻伍商城将在网站上以公示形式通知合伙人。任何修订和新规则一经公示，合伙人在七日内如未以书面形式提出相关意见，则新规则即时生效，并成为本协议的一部分。登录或继续使用服务将表示合伙人接受经修订的协议。除另行明确声明外，任何使服务范围扩大或功能增强的新内容均受本协议约束。</p> 
（三）合伙人签署或在线接受本协议并不导致本协议立即生效，经过邻伍商城审核通过并向商户发出服务开通通知时，本协议即在合伙人和邻伍商城之间产生法律效力。 </p>
 二、证明文件提交： </p>
（一）证明信息提交：商户欲入驻邻伍商城，必须向邻伍商城提交其在申请服务时应当提供的相关信息。 </p>
（二）证明信息变更的通知：协议期内，上述相关证明信息的任何变更商户都应及时通知邻伍商城，并补充提交变更后的证明信息。 </p>
（三）责任条款：邻伍承诺如其未及时通知或更新其证明信息自行承担全部责任，合伙人保证其向邻伍商城提供的全部证明信息真实、准确且不存在超过时效问题（即保证所有证明信息在整个合同履行期间都处于有效期内）。如因上述原因发生纠纷或被相关国家主管机关处罚，合伙人应当独立承担全部责任，如给邻伍商城造成损失的，商户同意赔偿其全部损失。</p>
 三、合伙人的声明与保证 ：</p>
（一）合伙人必须向邻伍商城提供真实、合法、准确、有效的注册资料，并保证其诸如电子邮件地址、联系电话、联系地址等内容的有效性及安全性，保证邻伍商城及其他用户可以通过上述联系方式与自己进行联系。同时，合伙人也有义务在相关资料实际变更时及时更新有关注册资料。 </p>
（二）其有合法的主体权利缔结本协议，使用邻伍商城相关服务。 </p>
（三）其发布于邻伍商城的所有信息真实、准确，符合相关法律法规及邻伍商城规则。 </p>
（四）其保证在使用服务进行交易的过程中遵守诚实信用的原则，不在推广交易过程中采取不正当竞争行为，不扰乱网上交易的正常秩序，不从事与网上交易无关的行为。 </p>
（五）其保证在使用服务时实施的所有行为均遵守国家法律、法规和邻伍商城的相关规则、规定以及各种社会公共利益及公共道德。如有违反导致任何法律后果的发生，商户应以自己的名义独立承担所有相应的法律责任； </p>
（六）其入驻邻伍商城后，同意支付499元保证金</p>
（七）其同意配合邻伍商城的宣传推广策略，自行在其所在区域内进行推广。</p>
（八）其同意邻伍商城的交易模式，售出商品后，在消费者确认收货的同时（消费者未确认收货则于15日内自动确认），由邻伍商城把订单的利润值打入商户的邻伍商城个人账户，合伙人可利用支付宝将销售额提取现金（50元起提）。</p>
（九）合伙人如需解除与邻伍商城的合作关系，则须将最后一个订单的货物发完，邻伍商城将于15个工作日内将商户交纳的保证金予以无息返还。</p>
  四、消费者保障 ：</p>
消费者保障，只指合伙人根据本协议约定的条款和条件及邻伍商城网站其他公示规则的规定，通过邻伍商城产生订单时，应履行在收到由邻伍商城寄出的商品后，在48小时之内将商品送达消费者义务。邻伍商城将在网站不时公示新增的消费者保障义务或对原消费者保障义务内容进行修订。如您对新增或修订的消费者保障义务持有异议，您应当终止本协议，如继续使用邻伍商城服务，则意味着接受邻伍商城的新增或修订内容。 </p>
（一）消费者保障责任及处理 </p>
1、合伙人明确了解并同意合伙人是消费者保障的责任主体。当发生本协议前述商户应当履行消费者保障义务情形时，合伙人应保证买家的消费者权益。对于买家因前述问题提出的要求，合伙人应积极处理。 </p>
2、合伙人同意当邻伍商城受理买家提出的消费者保障维权和赔付申请时，合伙人应积极配合，主动联系消费者并解答消费者提出的问题，如消费者在收到商品后坚持申请退款，合伙人有义务取得退款的商品，并将商品寄回邻伍商城（邻伍商城承担运费成本）。</p>
五、邻伍商城的权利和义务：</p>
（一）邻伍商城有义务在现有技术上维护整个微商城网上交易平台的正常运行，并努力提升和改进技术，使合伙人网上交易活动得以顺利进行；</p>
（二）邻伍商城有义务提供平台上所有商品，及时处理平台上订单，并将商品及时送到合伙人或买家手中。</p>
（二）对合伙人在注册使用服务中所遇到的与交易或注册有关的问题及反映的情况，邻伍商城应及时作出回复； </p>
（三）邻伍商城有权对合伙人的运营数据及交易行为进行查阅，发现运营数据或交易行为中存在任何问题或怀疑，均有权向合伙人发出询问或要求改正的通知，或者直接对合伙人采取限制性措施等处理； </p>
六、协议的终止： </p>
（一）自然终止：本协议到期终止或商户因任何原因终止，则本协议终止。 </p>
（二）通知解除：协议任何一方均可以提前十五（15）天书面通知的方式终止本协议。 如合伙人通过在线点击“确认退出”按钮申请终止本协议，则系统会立即使合伙人进入“监管”状态，十五天（15）后店铺正式进入退出流程，合伙人在退出流程后三十天（30）天方可处理交易纠纷以及与邻伍商城之间的账务、发票等结算事宜。 </p>
（三）合伙人商城单方解除权： </p>
如合伙人违反邻伍商城的任何规则或本协议中的任何承诺或保证，包括但不限于本协议项下的任何约定，邻伍商城都有权立刻终止本协议，且按有关规则对合伙人进行处罚。</p>
（四）合伙人在超过九十（90）天的时间内未以邻伍商城服务账户及密码登录的，邻伍商城有权终止本协议。 </p>
（五）如非因邻伍商城的原因，合伙人未能按本协议及附件之规定，按期全额支付有关服务费用和活动费用，且在邻伍商城规定的时限内仍未支付，邻伍商城有权部分或全部中止或终止本协议。 </p>
（六）本协议规定的其他协议终止条件发生或实现，导致本协议终止。</p>
七、协议期限： </p>
本协议在符合本协议第一条款约定的条件时即告生效，本协议有效期一年。双方另有约定的除外。 </p>
八、保密条款： </p>
（一）本协议所称商业秘密包括但不限于本协议、任何补充协议所述内容以及在合作过程中涉及的其他秘密信息。任何一方未经商业秘密提供方同意，均不得将该信息向任何第三方披露、传播、编辑或展示。协议方承诺，本协议终止后仍承担此条款下的保密义务，保密期将另行持续三年。 </p>
（二）因对方书面同意以及国家行政、司法强制行为而披露商业秘密的，披露方不承担责任；该商业秘密已为公众所知悉的，披露方不承担责任。</p>
 九、有限责任： </p>
（一）服务将按“现状”和按“可得到”的状态提供。邻伍商城在此明确声明对服务不作任何明示或暗示的保证，包括但不限于对服务的可适用性，没有错误或疏漏，持续性，准确性，可靠性，适用于某一特定用途之类的保证，声明或承诺。邻伍商城对服务所涉的技术和信息的有效性，准确性，正确性，可靠性，质量，稳定，完整和及时性均不作承诺和保证。 </p>
（二）不论在何种情况下，邻伍商城均不对由于Internet连接故障，电脑，通讯或其他系统的故障，电力故障，罢工，劳动争议，暴乱，起义，骚乱，生产力或生产资料不足，火灾，洪水，风暴，爆炸，不可抗力，战争，政府行为，国际、国内法院的命令或第三方的不作为而造成的不能服务或延迟服务承担责任。 </p>
十、违约责任：  </p>
（一）合伙人同意赔偿由于使用服务或违反本协议而给邻伍商城造成的任何损失（包括但不限于由此产生的全额的诉讼费用和律师费）。</p>
（二）除本协议及邻伍商城规则另有约定之外，如一方发生违约行为，守约方可以书面通知方式要求违约方在指定的时限内停止违约行为，并就违约行为造成的损失进行索赔，如违约方未能按时停止违约行为，则守约方有权立即终止本协议。  </p>
十一、争议解决及其他： </p>
（一）本协议之解释与适用，以及与本协议有关的争议，均应依照中华人民共和国法律予以处理，并以上海市闵行区人民法院为第一审管辖法院。 </p>
（二）如本协议的任何条款被视作无效或无法执行，则上述条款可被分离，其余部份则仍具有法律效力。 </p>
（三）邻伍商城于合伙人过失或违约时放弃本协议规定的权利的，不得视为邻伍商城对合伙人的其他或以后同类之过失或违约行为放弃要求赔偿的权利。</p>

			</div>
		</el-dialog>
		</div>

</template>
<script type="text/javascript">
import areafrom from '@/utils/area'
import {join_register} from '@/utils/api'
import * as store from'@/utils/sdk/store'
export default {
	data() {
	  return {
	    form: {
	      realname: '',
	      sex: 1,
	      id_number: '',
	      phone: store.get('user').phone,
	      urgent_phone: '',
	      email: '',
	      area_type: '',
	      address: [],
	      address_p:[],
	      detail_address: '',
	    },
	      options: areajson,
	      commite:0,
	      agreement:false
	  }
	},
	methods: {
	  submit() {
	  	var flag=true
	  	if (this.form.realname=='') {
	  		this.$message.error('请输入真实姓名')
	  	}else if (this.form.id_number=='') {
	  		this.$message.error('请输入本人身份证号')
	  	}else if (this.form.urgent_phone=='') {
	  		this.$message.error('请输入紧急联系电话，作为备用联系方式')
	  	}else if (this.form.address=='') {
	  		this.$message.error('请选择地区')
	  	}else if (this.form.detail_address=='') {
	  		this.$message.error('请输入详细地址')
	  	}else if (this.commite==0) {
	  		this.$message.error('请查看并且确认合伙人协议')
	  	}else {
	  		flag=false
	  	};
	  	if (flag==false) {
	  	 for (var i = areajson.length - 1; i >= 0; i--) {
	  	 	if(this.form.address[0]==areajson[i].value){
	  	 		var province=areajson[i].label
	  	 		for (var p = areajson[i].children.length - 1; p >= 0; p--) {
	  	 			if(this.form.address[1]==areajson[i].children[p].value){
	   				var city=areajson[i].children[p].label
	  	 			}
	  	 			for (var k = areajson[i].children[p].children.length - 1; k >= 0; k--) {
	  	 				if(this.form.address[2]==areajson[i].children[p].children[k].value){
	  	 					var county=areajson[i].children[p].children[k].label
	  	 				}
	   			};
	  	 		};
	  	 	}
	  	 };
	     join_register({
	    	id:store.get('user').id,
	     	realname:this.form.realname,
	     	id_number:this.form.id_number,
	     	sex:this.form.sex,
	     	urgent_phone:this.form.urgent_phone,
	     	email:this.form.email,
	     	area_type:this.form.area_type,
	    	address:[province,city,county],
	     	detail_address:this.form.detail_address
	     }).then(res=>{
	    	if (res.error_code==1000) {
	     		this.$router.push('/agent/pay')
	     	}else{
	    		this.$message.error(res.msg)
	     	 }
	     })
	     };
	  },
	  handleChange(label){
	  	//console.log(label)
	  },
	  back(){

	  },
	  show_agreement(){
	  	this.agreement=true
	  }
	   }
	
}

</script>

<style lang="stylus" scoped>
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
.join_header
	padding 30px 50px
	color #ff6c34
.join_body
	padding 30px 50px
	display flex
	justify-content center
.buttons
	padding 40px 100px
	text-align center
.cancle
		margin-right 20px
		background-color white
		color #aaaaaa
		cursor pointer
		border 1px solid #aaaaaa
		padding 5px 15px
		border-radius 4px
.comfirm
		margin-left 80px
		background-color #409eff
		border 1px solid #409eff
		color white
		cursor pointer
		padding 5px 10px
		border-radius 3px
.agreement
	color #609EFF
	cursor pointer
.agree
	margin-left 20px
.agreement_content
	height 500px
	overflow scroll
</style>
