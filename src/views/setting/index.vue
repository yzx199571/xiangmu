<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <mybread>个人设置</mybread>
      </div>
      <!-- 栅格 -->
      <el-row>
        <el-col :span="12">
          <el-form label-width="120px">
            <el-form-item label="编号：">{{userForm.id}}</el-form-item>
            <el-form-item label="手机：">{{userForm.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userForm.name "></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input v-model="userForm.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="saveUserInof">保存设置</el-button>
            </el-form-item>
          </el-form>
          <!-- 表单 -->
        </el-col>
        <el-col :span="12">
          <!-- 上传头像 -->
          <el-upload class="avatar-uploader" action="" :http-request="myUpload" :show-file-list="false">
            <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from '@/components/eventBus.js'
import store from '@/store'
export default {
  data () {
    return {
      userForm: {
        id: null,
        name: null,
        intro: null,
        email: null,
        photo: null,
        mobile: null
      },
      imageUrl: null
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // axios + formdata 进行上传
    // 选中的图片 触发函数 选择的结果
    // 文件信息获取result.fileuser/photo
    myUpload (result) {
      const formdata = new FormData()
      formdata.append('photo', result.file)
      this.$http.patch('user/photo', formdata).then(res => {
        // 山川头像成功
        this.$message.success('上传成功')
        // 预览
        this.userForm.photo = res.data.data.photo
        // 同步本地存储.
        store.setUser({ photo: this.userForm.photo })
        // 同步home组件
        eventBus.$emit('uploadPhoto', this.userForm.photo)
      })
    },
    //   获取用户信息
    async getUserInfo () {
      const {
        data: { data }
      } = await this.$http.get('user/profile')
      this.userForm = data
    },
    async saveUserInof () {
      // patch 请求类型做修改 局部修改  put 请求类型修改 全部修改
      await this.$http.patch('user/profile', {
        //   按照后台需要提交数据
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      this.$message.success('保存设置成功')
      //   当你刷新页面的时候  home组件刷新的是本地存储的数据  跟新本地数据
      store.setUser({ name: this.userForm.name })
      eventBus.$emit('uploadName', this.userForm.name)
    }
  }
}
</script>
<style scope  lang='less'>
</style>
