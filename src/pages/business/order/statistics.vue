<template>
  <div class="members_page">
    <div class="members">
      <div class="member" v-for="(item,index) in merchandise.data" :key="index">
        <div class="avatar_info">
          <div class="avatar">
            <img :src="item.goods_img">
          </div>
          <div class="info">
            <div class="name">
              商品：
              <span>{{item.name}}</span>
               <div class="datetime">数量：{{item.count}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="empty" v-if="this.merchandise.data.length==0">该列表为空</div>
          <div class="pages" v-if="merchandise.data.length!='0'">
            <el-pagination
              layout="prev, pager, next, jumper"
              :pager-count="5"
              :page-count="merchandise.pageCount"
              :page-size="merchandise.page"
              @current-change="handlePage3"
              :current-page.sync="merchandise.pno"
      ></el-pagination>-->
    </div>
  </div>
</template>
<script type="text/javascript">
import * as store from "@/utils/sdk/store";
import { totalOrderCount } from "@/utils/api";
export default {
  data() {
    return {
      merchandise: {
        data: [],
        pno: 1,
        page: 10,
        pageCount: 3
      },
    };
  },
  methods: {
    totalOrderCount() {
      totalOrderCount({
        shop_id: store.get("currentshopid")
      }).then(res => {

          this.merchandise.data = res.data.data;

        console.log(this.merchandise.data);
      });
    }
  },
  created() {
    this.totalOrderCount();
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
          height: 80px;
          width: 80px;
padding :20px 0;
        }
      }
    }

    .info {
      margin-left: 15px;
      width: 200px;

      .name {
        margin-bottom: 8px;
        display :flex;
        align-items :center;
      }

      .phone {
        margin: 5px 0;

        .el-icon-edit {
          color: #409EFF;
          cursor: pointer;
        }
      }

      .datetime {
        font-size: 16px;
margin-left :50px;
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
    height: 60px;
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
          height: 80px;
          width: 80px;
          padding :20px 0;
        }
      }
    }

    .info {
      margin-left: 15px;
      width: 800px;
 text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
 text-overflow: ellipsis;
 display: -webkit-box;
 -webkit-line-clamp: 2;
-webkit-box-orient: vertical;
align-content: center;
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
        font-size: 16px;
margin-left :50px;
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
