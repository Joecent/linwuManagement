<template>
  <div class="login">
      <div class="background">
        <img class="full-screen" src="@/assets/images/login.png">
      </div>
      <div class="front">
        <div class="center">
          <div class="title" @click="back">邻伍</div>
          <transition name="fade" mode="out-in">
          <router-view />
          </transition>
        </div>
      </div>
  </div>
</template>

<script>
import cWaves from '@/components/cWaves'
import * as store from '@/utils/sdk/store'
import { getSessionId } from '@/utils/api'

export default {
  name: 'login',
  components: {
    cWaves
  },
  data () {
    return {}
  },
  methods: {
    back(){
      console.log('skdjalf')
      this.$router.push('/index/product')
    }
  },
  // mounted () {
  //   // getSessionId({}).then((data) => {
  //   //   store.set('sessionId', data);
  //   //   // console.log(data)
  //   // });
  // }
}
</script>

<style lang="stylus" scoped>
.front
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  display table
.center
  vertical-align middle
  display table-cell 

.login {
  width: 100%;
  height:100%;
  position: relative;
}
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: rgba(255,255,255,0.6);
  border: 1px solid #eaeaea;
  .remember {
    margin: 0px 0px 35px 0px;
  }
}

.full-screen {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width 100%
  height 100%
}
.bg-purple-dark {
  background: #99a9bf;
}
.grid-content {
  border-radius: 4px;
  text-align: center;
  height: 36px;
  line-height: 36px;
}
.el-menu--horizontal .el-menu-item {
  float: right !important;
}
.el-menu{
  padding-right: 60px;
}
.title
  text-align center
  font-size 35px
  color #338CA9
  cursor pointer
</style>
