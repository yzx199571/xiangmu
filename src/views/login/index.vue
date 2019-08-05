<template>
  <div class="container">
    <el-card class="mycard">
      <img src="../../assets/images/logo_index.png" alt />
      <el-form :model="loginForm" :rules="loginRules" status-icon ref="loginForm">
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            style="width:238px;margin-right:10px"
            placeholder="请输入验证码"
            v-model="loginForm.code"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意协议条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login(loginForm)">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
// import { async } from 'q'
export default {
  // 表单数据规则
  data () {
    const checkMobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value))callback(Error('手机号码格式不正确'))
      callback()
    }
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      //   表单校验规则
      loginRules: {
        mobile: [
          { required: 'true', message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, message: '请输入11位手机号', trigger: 'blur' }
        ],
        code: [
          { required: 'true', message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login (loginForm) {
      // 对整个表单进行校验
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
          //   .then(res => {
          //     // res是响应对象  包括响应体
          //     // console.log(res.data)
          //     store.setUser(res.data.data) // 收集用户信息 储存信息
          //     this.$router.push('/')
          //     console.log(res)
          //   }).catch(() => {
          //     // 错误提示
          //     this.$message.error('请输入正确的手机号和验证码')
          //   })
          // 使用async和await   res是Promise对象成功返回的结果  res包含了响应结果 try 捕获错误
          try {
            const { data: { data } } = await this.$http.post('authorizations', this.loginForm)
            store.setUser(data)
            this.$router.push('/')
            this.$message({
              message: '恭喜你，登陆成功',
              type: 'success'
            })
          } catch (e) {
            this.$message.error('请输入正确的手机号和验证码')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  //背景图定位/背景图尺寸  contain等比例完整在容器内显示  cover 等比例玩去铺满容器
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
}
.mycard {
  width: 400px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%);
  img {
    display: block;
    width: 200px;
    margin: 0 auto 20px;
  }
}
</style>
