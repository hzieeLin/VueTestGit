// 文章相关的api封装在这
import request from '@/utils/request.js'

export const getArticleListAPI = function(_page, _limit) {
  return request.get('/articles', {
    params: {
      _page,
      _limit
    }
  })
}
