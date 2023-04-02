// 默认导入
import request from '@/utils/request'

// axios.get(url, {
//   params: {},
//   headers: {}
// })

// 请求的token不在这里配，统一在请求拦截器中配置(request.js中)

// 封装接口，获取文章列表
export const getArticles = (obj) => {
  return request.get('/interview/query', {
    params: {
      current: obj.current, // 当前页
      pageSize: 10, // 每页条数
      sorter: obj.sorter // 排序字段 =>  传"weight_desc" 获取 推荐， "不传" 获取 最新
    }
  })
}

// 获取我的收藏
export const getArticlesCollect = ({ page }) => {
  return request.get('/interview/opt/list', {
    params: {
      page, // 当前页
      pageSize: 10, // 可选
      optType: 2 // 表示收藏
    }
  })
}

// 获取我的喜欢
export const getArticlesLike = (obj) => {
  return request.get('/interview/opt/list', {
    params: {
      page: obj.page, // 当前页
      pageSize: 10, // 可选
      optType: 1 // 表示喜欢
    }
  })
}

// 获取文章详情
export const getArticleDetail = (id) => {
  return request.get('interview/show', {
    params: {
      id
    }
  })
}

// 对某个文章喜欢操作
export const updateLike = (id) => {
  return request.post('interview/opt', {
    id,
    optType: 1 // 喜欢
  })
}

// 对某个文章收藏操作
export const updateCollect = (id) => {
  return request.post('interview/opt', {
    id,
    optType: 2 // 收藏
  })
}
