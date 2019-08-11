<template>
  <div class="my-image">
    <!-- 图片按钮 -->
    <div class="img-btn">
      <img :src="value||defaultImage" @click="openDialog" />
    </div>
    <!-- 对话框 -->
    <el-dialog title="选择封面" :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <el-radio-group v-model="reqParams.collect" @change="collectChange" size="mini">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="img-list">
            <div
              class="img-item"
              :class="{selected:selectedImageUrl===item.url}"
              v-for="item in images"
              @click="selectedImage(item.url)"
              :key="item.id"
            >
              <img :src="item.url" alt />
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
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <!-- 上传图片 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="uploadHeaders"
            :show-file-list="false"
            name="image"
            :on-success="handleSuccess"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import defaultImage from '../assets/images/default.png'
export default {
  props: ['value'],
  name: 'my-image',
  data () {
    return {
      // 控制对话框的显示与隐藏
      dialogVisible: false,
      //   控制选中的选项卡 选项卡的name值
      activeName: 'image',
      //   传递参数
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8

      },
      //   图片裂变数据??
      images: [],
      total: 0,
      selectedImageUrl: null,
      defaultImage,
      // 封面图地址
      // vue-cli 3.0 是基于webpack 打包的 当src 是一个数据而不是 地址 他是不会打包的
      // value: defaultImage,
      // 上传的请求头
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      // 记录上传图片的地址
      uploadImageUrl: null
    }
  },
  methods: {
    // 点击确认的函数
    confirmImage () {
      // 能够显示点击确定按钮的图片地址、
      if (this.activeName === 'image') {
        // this.value = this.selectedImageUrl   下面是给父组件传值
        this.$emit('input', this.selectedImageUrl)
      } else {
        // this.value = this.uploadImageUrl//    下面是给父组件传值
        this.$emit('input', this.uploadImageUrl)
      }
      this.dialogVisible = false
    },
    // 上传成功的回调函数
    handleSuccess (res) {
      this.uploadImageUrl = res.data.url
    },
    // 记录选中时的图片的地址
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    // 改变分页
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 显示隐藏
    openDialog () {
      this.dialogVisible = true
      //   获取素材列表数据
      this.getImages()
    },
    //   获取素材列表数据
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    // 收藏
    collectChange () {
      this.reqParams.page = 1
      this.getImages()
    }
  }
}
</script>
<style scope lang='less'>
.my-image{
  display: inline-block;
  margin-right: 20px
}
.img-btn {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;

  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.img-btn {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.img-list {
  margin-top: 10px;
}

.dialog-footer {
  text-align: center;
  width: 100%;
  display: block;
}
.img-item {
  width: 160px;
  height: 120px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 15px;
  margin-bottom: 10px;
  position: relative;
  &.selected {
    &::after {
      // .img-item.selected::after{}
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
        no-repeat center / 50px 50px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
  }
}
</style>
