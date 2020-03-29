<?php
namespace App\Http\Controllers\Api;

use App\Model\AccountModel;
use DB;
use \Config;
use Symfony\Component\HttpFoundation\Session\Session;  
use Illuminate\Http\Request;
use App\Http\Controllers\Api\Controller;
use App\libs\Express;
use Cache;
use App\Model\PayModel;
use EasyWeChat\Foundation\Application;
class AccountController extends Controller
{
	/**
	 * 后台商家账户管理  收入明细
	 * @param   $admin_id
	 */
	public function accountLog(Request $request)
	{
		$session = new Session;
		$admin_id = $session->get('admin_id');
		if(empty($admin_id)){
			$this->returnMsg('1002','请先登录',[]);
		}
		//查询当前用户的收入明细
		$account = DB::table('account_log')->where(['admin_id'=>$admin_id])->get();
		$account = $this->asArraay($account);
		if(empty($account)){
			$this->returnMsg('1001','暂无收入明细',[]);
		}else{
			$this->returnMsg('1000','success',$account);
		}
	}
	/**
	 * 统计收入金额
	 */
	public function getMoney(Request $request)
	{
		$session = new Session;
		$admin_id = $session->get('admin_id');
		if(empty($admin_id)){
			$this->returnMsg('1002','请先登录',[]);
		}
		$shop_id = $request->input('shop_id');
		// 获取今天日期
        $today_start = strtotime(date('Y-m-d'));
        // 获取今天24：00的最后一秒
		$today_end   = $today_start + 86399;
		// 实例化金额模型
		$Account = new AccountModel();
		// 得到今天的交易金额
		$day_money = $Account->getAcount($shop_id, $today_start, $today_end);

		// 获取（今天-7）到今天的数据
        $before7day = strtotime('-7 day', $today_start);
        // 获取7天的交易金额
        $before7day_money = $Account->getAcount($shop_id, $before7day, $today_end);
        // 获取总的交易金额
        $account_money = $Account->getAcountTotal($shop_id);
		$this->returnMsg('1000','success',array('day_money' => $day_money, 'before7day_money' => $before7day_money, 'account_money' => $account_money));
	}
	/**
	 * 根据日期进行查询交易额
	 */
	public function timeTrade(Request $request)
	{
		$session = new Session;
		$admin_id = $session->get('admin_id');
		if(empty($admin_id)){
			$this->returnMsg('1002','请先登录',[]);
		}
		$shop_id = $request->input('shop_id');
		$date_start = strtotime($request->input('date_start'));
		$date_end = strtotime($request ->input('date_end'));
		// 实例化金额模型
		$Account = new AccountModel();
		$money = $Account->getAcount($shop_id, $date_start, $date_end);
		$this->returnMsg('1000','success',['money'=>$money]);
	}
	/**
	 * 本月收入
	 */
	public function monMoney(Request $request)
	{
		$session = new Session;
		$admin_id = $session->get('admin_id');
		if(empty($admin_id)){
			$this->returnMsg('1002','请先登录',[]);
		}
		//获取今天日期
		$week_start=mktime(0,0,0,date('m'),date('d')-date('w'+1),date('Y'));
		$week_end=mktime(23,59,59,date('m'),date('d')-date('w')+7,date('Y'));
		//统计今日收入金额
		$sql = "SELECT sum(money) as mon_money FROM hxf_account_log WHERE admin_id = :admin_id AND sign = '+' AND
		UNIX_TIMESTAMP(create_time) between :month_start AND :month_end";
		$mon_money = DB::select($sql,['admin_id'=>$admin_id,'month_start'=>$week_start,'month_end'=>$week_end]);
		if(empty($mon_money[0]->mon_money)){
			$mon_money[0]->mon_money=0;
		}
		$this->returnMsg('1000','success',$mon_money);
	}
	/**
	 * 查询余额
	 */
	public function money(Request $request)
	{
		$session = new Session;
		$admin_id = $session->get('admin_id');
		if(empty($admin_id)){
			$this->returnMsg('1002','请先登录',[]);
		}
		$money = DB::table('admin')->where(['id'=>$admin_id])->value('money');
		$this->returnMsg('1000','success',$money);
	}
	/**
	 * 商家支付宝提现
	 * @param   $phone  支付宝账号
	 * @param   $realname  真实姓名
	 * @param   $money  提现金额
	 */
	public function deposit(Request $request)
	{
		$session = new Session;
		$admin_id = $session->get('admin_id');
		if(empty($admin_id)){
			$this->returnMsg('1003','请先登录',[]);
		}
		$input = $request->all();
		//验证数据
		$this->validate($input,['phone'=>'required','realname'=>'required','money'=>'required']);
		$res1 = "/^1[3,4,5,7,8][0-9]{9}$/";
		$res2 = "/^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$/i";
		if(!preg_match($res1,$input['phone']) && !preg_match($res2,$input['phone'])){
			$this->returnMsg('1002','支付宝账号类型不正确',[]);
		}
		//查询余额
		$cash = DB::table('admin')->where(['id'=>$admin_id])->value('money');
		//判断提现金额
		if($input['money']>$cash){
			$this->returnMsg('1004','余额不足',[]);
		}
		//添加记录
		$arr = array(
			'phone' => $input['phone'],
			'realname' => $input['realname'],
			'money' => $input['money'],
			'admin_id' => $admin_id,
			'create_time' => date('Y-m-d H:i:s')
			);
		DB::table('deposit')->insert($arr);
		//修改余额
		DB::table('admin')->where(['id'=>$admin_id])->update(['money'=>$cash-$input['money']]);
		$this->returnMsg('1000','success',[]);
	}
}
