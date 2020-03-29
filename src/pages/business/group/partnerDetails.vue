<template>
  <div class="members_page">
    <div class="members">
      <div class="member" style="  height:200px">
        <div class="avatar_info">
          <div class="name">本月：￥{{partner.current_account}}</div>
        </div>
        <div class="bonus">总收入：
          <span>收入：￥{{partner.total_account}}</span>
        </div>
      </div>

      <div class="member" v-for="(item,index) in partnership" :key="index">
        <div class="avatar_info">
          <div class="avatar">
            <img :src="item.photo">
          </div>
          <div class="info">
            <div class="name">{{item.name}}</div>
            <div class="datetime">社群名称：{{item.group_name}}</div>
          </div>
        </div>
        <div class="bonus">
          今日交易：
          <span>￥{{item.day}}</span>
        </div>
        <div class="bonus">
          历史总额：
          <span>￥{{item.total_money}}</span>
        </div>
      </div>
      <!-- <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :page-count="pagecount"
          :pager-count="5"
          :current-page.sync="currentPage"
        ></el-pagination>
      </div>-->
    </div>
  </div>
</template>
<script type="text/javascript">
import * as store from "@/utils/sdk/store";
import { wxGroupFriend } from "@/utils/api";
export default {
  data() {
    return {
      partner: [],
      partnership: []
    };
  },
  methods: {
    wxGroupFriend(user_id) {
      wxGroupFriend({
        user_id: user_id,
        shop_id: store.get("currentshopid")
      }).then(res => {
        if (res.status) {
          this.partnership = res.user;
          this.partner = res.group_friends;
        }
      });
    }
  },
  created() {
    this.wxGroupFriend(this.$route.query.user_id);
  }
};
</script>

<style lang="stylus" scoped>
.block {
  background: #f9f9f9;
  padding: 20px 30px 0;
  font-size: 18px;
}

.el-pagination {
  text-align: right;
}

.members_page {
  background-color: #f9f9f9;
  padding-top: 30px;
  padding-left: 20px;
  font-size: 15px;
}

.members {
  padding: 0 20px 20px 20px;
  margin-top: 15px;
  background-color: #f9f9f9;

  .member {
    height: 120px;
    display: flex;
    font-size: 15px;
    color: #323232;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ededed;

    .avatar_info {
      display: flex;
      align-items: center;

      .avatar {
        img {
          height: 60px;
          width: 60px;
          border-radius: 50%;
        }
      }
    }

    .info {
      margin-left: 15px;
      width: 200px;

      .name {
        margin-bottom: 8px;
      }

      .phone {
        margin: 5px 0;

        .el-icon-edit {
          color: #409EFF;
          cursor: pointer;
        }
      }

      .datetime {
        font-size: 12px;
        color: #AAAAAA;
      }
    }

    .balance {
      display: flex;
      align-items: center;
      margin-left: 70px;
    }

    .charge {
      margin-right: 15px;

      .remove {
        color: #C0C4CC;
        cursor: pointer;
      }
    }

    .bonus {
      margin-left: 70px;
    }
  }
}
</style>
<style type="text/css"  lang="stylus" scoped>
.block {
  background: #f9f9f9;
  padding: 20px 30px 0;
  font-size: 18px;
}

.el-pagination {
  text-align: right;
}

.members_page {
  background-color: #f9f9f9;
  padding-top: 30px;
  padding-left: 20px;
  font-size: 15px;
}

.members {
  padding: 0 20px 20px 20px;
  margin-top: 15px;
  background-color: #f9f9f9;

  .member {
    height: 120px;
    display: flex;
    font-size: 15px;
    color: #323232;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ededed;

    .avatar_info {
      display: flex;
      align-items: center;

      .avatar {
        img {
          height: 60px;
          width: 60px;
          border-radius: 50%;
        }
      }
    }

    .info {
      margin-left: 15px;
      width: 200px;

      .name {
        margin-bottom: 8px;
      }

      .phone {
        margin: 5px 0;

        .el-icon-edit {
          color: #409EFF;
          cursor: pointer;
        }
      }

      .datetime {
        font-size: 12px;
        color: #AAAAAA;
      }
    }

    .balance {
      display: flex;
      align-items: center;
      margin-left: 70px;
    }

    .charge {
      margin-right: 15px;

      .remove {
        color: #C0C4CC;
        cursor: pointer;
      }
    }

    .bonus {
      margin-left: 70px;
    }
  }
}
</style>
