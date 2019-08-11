<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <mybread>{{articleId?"修改文章":"发布文章"}}</mybread>
      </div>
      <!-- 表单 -->
      <el-form label-width="100px">
        <el-form-item label="标题 ：">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容 ： "  >
            <quill-editor v-model="articleForm.content"  :options="editorOption" ></quill-editor>
        </el-form-item>
        <el-form-item label="封面 ： " class="cover">
          <el-radio-group v-model="articleForm.cover.type" @change="changeType">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
         <!-- 素材组件 -->
         <diV v-if="articleForm.cover.type===1">
           <my-image v-model="articleForm.cover.images[0]"></my-image>
         </diV>
         <diV v-if="articleForm.cover.type===3">
           <my-image v-model="articleForm.cover.images[0]"></my-image>
           <my-image v-model="articleForm.cover.images[1]"></my-image>
           <my-image v-model="articleForm.cover.images[2]"></my-image>

         </diV>
        </el-form-item>
        <el-form-item label="频道 ： ">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="!articleId">
          <el-button type="primary" @click="submit(false)">发表</el-button>
          <el-button @click="submit(true)">存入草稿</el-button>
        </el-form-item>
          <el-form-item v-else>
          <el-button type="success" @click="update(false)">修改</el-button>
          <el-button @click="update(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
  data () {
    return {
      // 文章表单
      articleForm: {
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null // 频道id

      },
      //  富文本配置
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['image']
          ]
        }
      },
      // 获取文章id、
      articleId: null
    }
  },
  watch: {
    $route () {
      if (!this.$route.query.id) {
        this.articleId = null
        this.articleForm = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null // 频道id

        }
      }
    }
  },
  created () {
    // 获取地址栏传参
    this.articleId = this.$route.query.id
    // 如果有id 修改文章
    if (this.articleId) {
      this.getArticle()
    }
  },
  methods: {
    // 获取文章id
    async  getArticle () {
      const { data: { data } } = await this.$http.get('articles/' + this.articleId)
      this.articleForm = data
    },
    // 图片重置
    changeType () {
      this.articleForm.cover.images = []
    },
    // 草稿及发布
    async submit (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      console.log(draft)
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      this.$router.push('/article')
    },
    // 修改及发布
    async update (draft) {
      await this.$http.put(`articles/${this.articleId}?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '文章草稿成功' : '修改成功')
      // 去内容管理
      this.$router.push('/article')
    }
  }
}
</script>

<style scope lang='less'>

</style>
