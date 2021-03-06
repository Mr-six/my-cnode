import axios from 'axios'

const defaults = {
  baseURL: 'https://cnodejs.org/api/v1/'
}
Object.assign(axios.defaults, defaults)

export default {
  // 所有api来着 (cnodejs api)[https://cnodejs.org/api]

  /**
   * 获取首页主题
   * @param  {Number} page     页数
   * @param  {String} tab      主题分类。目前有 ask share job good dev 默认为all
   * @param  {Number} limit    每一页的主题数量 默认为40
   * @param  {String} mdrender 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本
   * @return {promise}         {success: true, data: []} 根据success 的值来判断是否请求成功
   */
  getTopics ({page, tab, limit, mdrender}) {
    return axios.get('/topics', {
      params: {
        page: page,
        tab: tab,
        limit: limit,
        mdrender: mdrender
      }
    })
  },

  /**
   * 主题详情
   * @param  {String} id          文章id值
   * @param  {String} mdrender    当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本
   * @param  {String} accesstoken 当需要知道一个主题是否被特定用户收藏时，才需要带此参数。会影响返回值中的 is_collect 值
   * @return {promise}             {success: true, data: []} 根据success 的值来判断是否请求成功
   */
  getTopic ({id, mdrender, accesstoken}) {
    return axios.get('/topic/' + id, {
      params: {
        mdrender: mdrender,
        accesstoken: accesstoken
      }
    })
  },

  /**
   * 新建主题
   * @param  {String} accesstoken 用户的Accesstoken
   * @param  {String} title       标题
   * @param  {String} tab         主题分类 目前有 ask share job
   * @param  {String} content     主题内容
   * @return {promise}            {success: true, topic_id: '5433d5e4e737cbe96dcef312'}
   */
  creatTopic ({accesstoken, title, tab, content}) {
    return axios.post('/topics', {
      accesstoken: accesstoken,
      title: title,
      tab: tab,
      content: content
    })
  },

  /**
   * 编辑主题
   * @param  {String} accesstoken accesstoken
   * @param  {String} topic_id    主题id
   * @param  {String} title       标题
   * @param  {String} tab         主题分类 目前有 ask share job
   * @param  {String} content     主题内容
   * @return {promise}            {success: true, topic_id: '5433d5e4e737cbe96dcef312'}
   */
  updateTopic ({accesstoken, topic_id, title, tab, content}) {
    return axios.post('/topics/update', {
      accesstoken: accesstoken,
      topic_id: topic_id,
      title: title,
      tab: tab,
      content: content
    })
  },

  /**
   * 收藏主题
   * @param  {String} accesstoken accesstoken
   * @param  {String} topic_id    主题id
   * @return {promise}            {"success": true}
   */
  collectTopic ({accesstoken, topic_id}) {
    return axios.post('/topic_collect/collect', {
      accesstoken: accesstoken,
      topic_id: topic_id
    })
  },

  /**
   * 取消收藏主题
   * @param  {String} accesstoken accesstoken
   * @param  {String} topic_id    主题id
   * @return {promise}            {"success": true}
   */
  deCollectTopic ({accesstoken, topic_id}) {
    return axios.post('/topic_collect/de_collect', {
      accesstoken: accesstoken,
      topic_id: topic_id
    })
  },

  /**
   * 用户所收藏的主题
   * @param  {String} accesstoken accesstoken
   * @param  {String} topic_id    主题id
   * @return {promise}            {"success": true}
   */
  getCollectTopic (loginname) {
    return axios.get('/topic_collect/' + loginname)
  },

  /**
   * 新建主题评论
   * @param  {String} accesstoken accesstoken
   * @param  {String} content     评论内容
   * @param  {String} reply_id    如果这个评论是对另一个评论的回复，请务必带上此字段 这样前端就可以构建出评论线索图
   * @return {promise}            {success: true, reply_id: '5433d5e4e737cbe96dcef312'}
   */
  createReplies ({accesstoken, content, topic_id, reply_id}) {
    return axios.post('/topic/' + topic_id + '/replies', {
      accesstoken: accesstoken,
      content: content,
      reply_id: reply_id
    })
  },

  /**
   * 为评论点赞
   * @param  {String} accesstoken accesstoken
   * @return {promise}            {"success": true, "action": "down"} 接口会自动判断用户是否已点赞 如果否，则点赞；如果是，则取消点赞。点赞的动作反应在返回数据的 action 字段中：up or down。
   */
  upsReplies (accesstoken, reply_id) {
    return axios.post('/reply/' + reply_id + '/ups', {
      accesstoken: accesstoken
    })
  },

  /**
   * 获取用户详情
   * @param  {Sting} name 用户名
   * @return {promise}    {"success":true,"data":"[……]"}
   */
  getUuser (name) {
    return axios.get('/user/' + name)
  },

  /**
   * 验证 accessToken 的正确性
   * @param  {String} accesstoken token值
   * @return {promise}            如果成功匹配上用户，返回成功信息。否则 403 {success: true, loginname: req.user.loginname, id: req.user.id, avatar_url: req.user.avatar_url}
   */
  accessToken (accesstoken) {
    return axios.post('/accesstoken', {
      accesstoken: accesstoken
    })
  },

  /**
   * 获取未读消息数
   * @param  {Sting} accesstoken token值
   * @return {promise}           { data: 3 }
   */
  getUnreadMessage (accesstoken) {
    return axios.get('/message/count', {
      params: {
        accesstoken: accesstoken
      }
    })
  },

   /**
   * 获取所有消息数(已读和未读)
   * @param  {Sting} accesstoken token值
   * @param  {String} mdrender    当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本
   * @return {promise}           { data: []}
   */
  getAllMessage (accesstoken, mdrender) {
    return axios.get('/messages', {
      params: {
        accesstoken: accesstoken,
        mdrender: mdrender
      }
    })
  },

   /**
   * 所有消息数标记全部已读
   * @param  {Sting} accesstoken token值
   * @return {promise}           { success: true,
  marked_msgs: [ { id: '544ce385aeaeb5931556c6f9' } ] }
   */
  readAllMessage (accesstoken) {
    return axios.post('/message/mark_all', {
      accesstoken: accesstoken
    })
  },

  /**
   * 标记单个消息为已读
   * @param  {String} accesstoken token值
   * @param  {String} msg_id      消息id
   * @return {[type]}             obj {
  success: true,
  marked_msg_id: "58ec7d39da8344a81eee0c14"
}
   */
  markOneMessage (accesstoken, msg_id) {
    return axios.post('/message/mark_one/' + msg_id, {
      accesstoken: accesstoken
    })
  }

}
