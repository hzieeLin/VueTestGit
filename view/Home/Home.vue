<template>
  <div class="home-container">
    <van-nav-bar title="头条" :fixed="true"/>
    <van-pull-refresh v-model="isLoading" :disabled="finished" @refresh="onfresh">
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad">
        <ArticleInfo v-for="item in artList"
                     :key="item.id"
                     :title="item.title"
                     :author="item.aut_name"
                     :cmt-count="item.comm_count"
                     :time="item.pubdate"
                     :cover="item.cover">
        </ArticleInfo>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleListAPI } from '@/api/articleAPI.js'
import ArticleInfo from '@/components/Article/ArticleInfo.vue'
export default {
  name: 'Home',
  data() {
    return {
      page: 1,
      limit: 10,
      artList: [],
      // 每当下一页数据请求回来之后，千万要记住，吧loading从true改为false
      loading: true,
      // 所以数据是否加载完毕后，如果没有数据了，一点要把finshed状态改为true
      finished: false,
      // 是否正在下拉刷新
      isLoading: false
    }
  },
  created() {
    this.initArticleList()
  },
  methods: {
    async initArticleList(isRefresh) {
      const { data: res } = await getArticleListAPI(this.page, this.limit)
      if (isRefresh) {
        this.artList = [...res, ...this.artList]
        this.isLoading = false
      } else {
        this.artList = [...this.artList, ...res]
        this.loading = false
      }
      if (res.length === 0) {
        this.finished = true
      }
    },
    onLoad() {
      // 1.让页码值加1
      this.page++
      // 2.重新请求数据
      this.initArticleList()
    },
    onfresh() {
      // 下路刷新的处理函数
      this.page++
      this.initArticleList(true)
    }
  },
  components: {
    ArticleInfo
  }
}
</script>

<style lang="less" scoped>

.home-container {
  padding: 46px 0 50px 0;
    .van-nav-bar {
  }
  /deep/.van-nav-bar__title {
    color: white;
  }
}
</style>
