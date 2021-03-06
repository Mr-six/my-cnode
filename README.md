### 前言
由于当时用Vue重构的公司手机端项目暂停了，便想找个项目练练手，最初做的是的知乎日报的手机页面，后来发现API调用不是很方便，也没有抽出空来自己写一个（接下来打算自己写一个docker版本的）。也是就发现了cnodejs社区的[开放API](https://cnodejs.org/api)，在此感谢[cnodejs](https://cnodejs.org/)社区提供的API。
项目参考了[https://github.com/lzxb/vue-cnode](https://github.com/lzxb/vue-cnode)

### 说明
使用vue-cli 2.8.1 进行构建，起初使用postcss来处理样式，但发现写起来没scss顺手，于是就换回了scss
样式文件没有写入组件中，因为总觉得样式文件应该分离统一管理要清晰些，也便于引入变量等生成主题等（当然仁者见仁）。
开始打算采用Mintui来做，可是发现组件用的不多，就自己写了，发现还是用组件样式来的快一些啊。
部分配色参考的[adobe color](https://color.adobe.com/zh/explore/?filter=most-popular&time=all)


### 体会
- vue-router 提供了scrollBehavior来达到回退页面回到原来位置的需求，但实际使用中，发现不是每次都能准确的会到原来位置，而且数据还原还需要完善
- 在向对象添加属性时，使用$set()来添加，这个方法主要用于避开 Vue 不能检测属性被添加的限制。从而确保属性被创建后也是响应式的，同时触发视图更新
- 在头部标题栏等信息采用了vuex来管理，并使用mixins来达到状态的获取和管理，感觉还挺方便，但是如果将vuex与vue-router的管理合并到一起，应该会更便捷（后来发现了尤大大的[vuex-router-sync](https://github.com/vuejs/vuex-router-sync)留作以后多多研究）
- 在看了Vue-conf 北京的那段视频，发现ssr挺重要的，毕竟后端渲染，对应SEO和页面的加载速度还是有不少提升的，将来逐渐将项目升级为支持后端渲染的┑(￣Д ￣)┍

[在线地址](http://cnode.mrsix.top)
### 功能实现
- [x] 首页列表，上拉加载
- [x] 主题详情，收藏，点赞
- [x] 个人主页
- [x] 用户信息
- [x] 登录
- [x] 退出
- [x] 关于
- [x] 页面后退，滚动位置还原
- [x] 路由切换动画
- [x] 启动图
- [x] 滑动菜单
- [x] 主题评论及回复评论
- [x] 主题发布
- [x] 消息
- [x] 线上地址
- [ ] 请求拦截
- [ ] 数据还原
- [ ] ssr后端渲染
