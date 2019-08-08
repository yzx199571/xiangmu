<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <mybread>内容管理</mybread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态:">
          <el-radio-group v-model="reqParmas.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道:">
          <!-- 使用我们自己的组件  绑定v-model 相当于绑定了input 事件  ：value -->
          <myChannel v-model="reqParmas.channel_id"></myChannel>
        </el-form-item>
        <el-form-item label="日期:">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果 -->
    <el-card>
      <div slot="header">根据筛选条件共查询到{{total}}条结果：</div>
      <el-table :data="articles">
        <el-table-column label="封面" prop="img" width="200px">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" fit="fill" style="width:120px;height:80px">
              <div slot="error" class="image-slot">
                <img src="../../assets/images/error.gif" style="width:120px;height:80px" alt />
              </div>
            </el-image>
            <!---//动态绑定图片--->
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title" width="200px"></el-table-column>
        <el-table-column label="状态" width="200px">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button type="primary" plain icon="el-icon-edit" circle @click="edit(scope.row.id)"></el-button>
            <el-button type="danger" plain icon="el-icon-delete" circle @click="del(scope.row.id)"></el-button>
          </template>
        </el-table-column>
        <!-- 分页组件 -->
        <!-- :total="total"  总条数 -->
        <!--  background :page-size="reqParmas.per_page"   改变默认的总条数 -->
        <!--   @current-change="changePager"  页码改变事件 -->
        <!-- 更新过数据后  页码也需要更新  选中对应的按钮current-page  -->
      </el-table>
      <div style="text-align:center;margin-top:30px">
        <el-pagination
          @current-change="changePager"
          background
          :current-page="reqParmas.page"
          :page-size="reqParmas.per_page"
          layout="prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  data () {
    return {
      // 筛选表单数据  提交后台参数
      // axios 提交数据的时候  值为null 时 是不会提交的  不会携带参数的
      reqParmas: {
        status: null,
        channel_id: null,
        begin_pubdate: null, // 起始日期
        end_pubdate: null, // 结束日期
        page: 1, // 当前页数
        per_page: 20 // 每页显示的数量
      },
      // 频道下拉菜单选项
      channelOptions: [],
      // 日期列表
      dateArr: [],
      // 文章列表
      articles: [],
      total: 0 // 文章总数
    }
  },

  created () {
    // 获取文章列表
    this.getArticles()
  },
  methods: {
    edit (id) {
      this.$router.push('/publish?id=' + id)
    },
    // 删除列表
    del (id) {
      this.$confirm(' 沙雕， 此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击删除
        await this.$http.delete(`articles/${id}`)
        this.$message.success('沙雕删除成功')
        this.getArticles()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 选择日期后的事件
    changeDate (dateArr) {
      // 严谨一些 吧清空数据考虑在内
      console.log(dateArr)

      if (dateArr) {
        this.reqParmas.begin_pubdate = dateArr[0]
        this.reqParmas.end_pubdate = dateArr[1]
      } else {
        this.reqParmas.begin_pubdate = null
        this.reqParmas.end_pubdate = null
      }
    },
    // 筛选函数
    search () {
      // 筛选项双向绑定 拿着对应的数据发送请求即可  注意筛选后页码第一页
      this.reqParmas.page = 1
      this.getArticles()
    },
    // 改变分页事件对应函数
    changePager (newPager) {
      this.reqParmas.page = newPager // 分页设置
      this.getArticles()
    },

    async getArticles () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParmas })
      this.articles = data.results // 文章列表
      this.total = data.total_count // 文章总数
    }
  }
}
</script>

<style scope lang='less'>
.el-card {
  margin-bottom: 20px;
}
</style>
