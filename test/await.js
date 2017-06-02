const axios = require('axios')

function getTopics (page, tab, limit, mdrender) {
  return axios.get('https://cnodejs.org/api/v1/topics', {
    page: page,
    tab: tab,
    limit: limit,
    mdrender: mdrender
  })
}

async function test (page, tab, limit, mdrender) {
  let {data} = await getTopics(page, tab, limit, mdrender)
  // let str = await data.toSting()
  console.log(data.data.length)
  return 'hhh'
}

test(1, 'job')
  .then(function (res) {
    console.log(res)
  })

