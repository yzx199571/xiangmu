<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <mybread>素材管理</mybread>
      </div>
      <div class="btn_box">
        <el-radio-group v-model="reqParams.collect" @change="changeCollect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" size="small" style="float:right" @click="openDialog()">添加素材</el-button>
      </div>
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="foot" v-show="!  reqParams.collect">
            <!-- 设置收藏的切换 item 包含需要的内容  每次循环item 都是不一样的 -->
            <span
              @click="toggleCollect(item)"
              class="el-icon-star-off"
              :class="{selected:item.is_collected}"
            ></span>
            <span @click="delectImage(item.id)" class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <el-pagination
        background
        style="text-align:center;margin-top:30px;"
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        v-if="total>reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePager"
      ></el-pagination>
    </el-card>
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <!-- 上传图片 -->
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="uploadHeader"
        :show-file-list="false"
        name="image"
        :on-success="handleSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      // 提交参数
      reqParams: {
        //   默认值全部
        collect: false,
        page: 1,
        per_page: 10
        // is_collected: false
      },
      //   获取文章列表数据
      images: [],
      //   总条数
      total: 0,
      //   添加素材的显示与隐藏
      dialogVisible: false,
      //   上传成功后的图片地址
      imageUrl: null,
      //   上传图片的请求头
      uploadHeader: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  created () {
    this.getImage()
  },
  methods: {
    // 删除操作
    async delectImage (id) {
      this.$confirm('大佬,操作将永久删除该素材, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`user/images/${id}`)
          this.$message.success('删除成功')
          this.getImage()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 收藏状态的切换
    async toggleCollect (item) {
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      // 成功后的提示
      this.$message.success(data.collect ? '收藏成功' : '取消收藏')
      // 更新图片状态
      item.is_collected = data.collect
    },
    //   上传成功后的回调函数
    handleSuccess (res) {
      // 1获取图片地址显示img标签  2 提示上传成功  3 过两秒后关闭页面更新列表
      this.imageUrl = res.data.url // 上传成功的图片预览
      this.$message.success('上传成功')
      window.setTimeout(() => {
        this.dialogVisible = false
        this.getImage()
      }, 2000)
    },
    //   打开对话框
    openDialog () {
      this.imageUrl = null // 清空上次的图片预览
      this.dialogVisible = true
    },
    //   页码的点击切换事件
    changePager (newpage) {
      this.reqParams.page = newpage
      this.getImage()
    },
    //   收藏和全部切换
    changeCollect () {
      this.reqParams.page = 1
      this.getImage()
    },
    //  获取图片
    async getImage () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scope  lang='less'>
.img_list {
  margin-top: 20px;
  .img_item {
    width: 170px;
    height: 170px;
    border: 1px dashed #ddd;
    position: relative;
    margin-right: 50px;
    display: inline-block;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .foot {
      position: absolute;
      width: 100%;
      height: 30px;
      line-height: 30px;
      bottom: 0;
      left: 0;
      background: rgba(000, 000, 000, 0.4);
      color: aliceblue;
      text-align: center;
      font-size: 20px;
      span {
        margin: 0 20px;
        &.selected {
          color: red;
        }
      }
    }
  }
}
</style>
