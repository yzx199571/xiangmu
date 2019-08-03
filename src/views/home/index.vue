<template>
  <el-container class="wrapper">
    <el-aside :width="isCollapse?'64px':'200px'">
      <div class="log" :class="{minilogo:isCollapse}"></div>
      <!-- 导航菜单 -->
      //  <!-- 动画效果 -->
      <el-menu
        :collapse="isCollapse"
        :collapse-transition="false"
        default-active="2"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 顶部 -->
    <el-container>
      <el-header>
        <span class="el-icon-s-fold" @click="toggloMenu"></span>
        <span class="text">江苏传智播客教育科技有限公司</span>
        <el-dropdown class="dropdown">
          <span class="el-dropdown-link">
            <img src="../../assets/images/avatar.jpg" alt />
            用户名称
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
          <!-- 二级路由的出口 组建的显示位置 -->
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 控制展开收起
      isCollapse: false
    }
  },
  methods: {
    toggloMenu () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style scoped lang="less">
.wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background: #002033;
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .el-icon-s-fold {
      font-size: 24px;
      vertical-align: middle;
      margin-right: 10px;
    }
    .text {
      vertical-align: middle;
    }
    .dropdown {
      float: right;
      .el-dropdown-link {
        font-weight: bold;
        vertical-align: middle;
        img {
          width: 30px;
          height: 30px;
          vertical-align: middle;
        }
      }
    }
  }
}
.log {
  width: 100%;
  height: 60px;
  background: #002244 url(../../assets/images/logo_admin.png) no-repeat
    center/140px auto;
}
.minilogo {
  background-image: url(../../assets/images/logo_admin_01.png);
  background-size: 40px auto;
}
.el-menu {
  border-right: none;
}
</style>
