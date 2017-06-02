/**
 * 返回主题标签
 * @param  {String}  tab     类型
 * @param  {String}  good    是否为精华
 * @param  {String}  top     是否为指定
 * @param  {Boolean} isClass 是否返回类型
 * @return {String}          类型或中文描述
 */
exports.getTabInfo = (tab, good, top, isClass) => {
  let str = ''
  let className = ''
  if (top) {
    str = '置顶'
    className = 'top'
  } else if (good) {
    str = '精华'
    className = 'good'
  } else {
    switch (tab) {
      case 'share':
        str = '分享'
        className = 'share'
        break
      case 'ask':
        str = '问答'
        className = 'ask'
        break
      case 'job':
        str = '招聘'
        className = 'job'
        break
      case 'all':
        str = '全部'
        className = 'all'
        break
      case 'good':
        str = '精华'
        className = 'good'
        break
      case 'dev':
        str = '测试'
        className = 'dev'
        break
      default:
        str = '暂无'
        className = 'default'
        break
    }
  }
  return isClass ? className : str
}

/**
 * layer 弹出层
 * @param  {String} msg      弹出框提示信息
 * @param  {Number} interval 提示消息停留时间
 * @return {[type]}          undefined
 */
let timer  // 维护一个定时器
exports.layerMsg = (msg = '', interval = 2000) => {   // 弹出层

  let layers = document.querySelectorAll('.layer-msg')  // 获取当前的所有layer层
  if (layers.length) {  // 进行清除
    layers.forEach(function (el) {
      document.body.removeChild(el)
      clearTimeout(timer)
    })
  }

  let layer = document.createElement('div')
  layer.className = 'layer-msg layer-msg-show'
  layer.innerHTML = msg
  document.body.appendChild(layer)
  timer = setTimeout(() => {
    layer.className = 'layer-msg layer-msg-hide'
    clearTimeout(timer)
    let timer2 = setTimeout(() => {
      try {
        document.body.removeChild(layer)
      } catch (err) {}
      clearTimeout(timer2)
    }, 300)
  }, interval)
}
