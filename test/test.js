import api from '../src/api'
import { expect } from 'chai'

// 测试API接口
const token = 'e29b153b-b287-456a-909f-badfde460b8c'

describe('cnode API接口测试', function () {
  it('测试获取所有文章', function () {
    api.getTopics()
      .then((res) => {
        expect(res).to.be.an('object')
        done()
      })
      .catch(function () {
        done(err)
      })
  })
})
