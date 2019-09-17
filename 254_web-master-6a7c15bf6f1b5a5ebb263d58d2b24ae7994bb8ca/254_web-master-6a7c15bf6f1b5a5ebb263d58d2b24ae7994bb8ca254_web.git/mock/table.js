import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})

const falldata =
  [{
    "patientId": null,
    "visitId": null,
    "createTime": '08/12',
    "nl": null,
    "rzyc": "1",
    "styc": null,
    "zdzk": "4",
    "zdyyjl": "4",
    "xyxz": "1",
    "syyw": "1",
    "ddzcs": "1",
    "yf1": "1",
    "yf2": "1",
    "yf3": null,
    "yf4": null,
    "yf5": "1",
    "yf6": "1",
    "yf7": null,
    "yf8": "1",
    "updateTime": null
  }, {
    "patientId": null,
    "visitId": null,
    "createTime": '08/13',
    "nl": null,
    "rzyc": "",
    "styc": "1",
    "zdzk": "",
    "zdyyjl": "4",
    "xyxz": "",
    "syyw": "1",
    "ddzcs": "1",
    "yf1": "1",
    "yf2": "1",
    "yf3": null,
    "yf4": null,
    "yf5": "1",
    "yf6": null,
    "yf7": null,
    "yf8": "",
    "updateTime": null
  }, {
    "patientId": null,
    "visitId": null,
    "createTime": '08/14',
    "nl": 3,
    "rzyc": "1",
    "styc": "",
    "zdzk": "1",
    "zdyyjl": "4",
    "xyxz": "",
    "syyw": "1",
    "ddzcs": "1",
    "yf1": "1",
    "yf2": "1",
    "yf3": null,
    "yf4": null,
    "yf5": "1",
    "yf6": null,
    "yf7": "1",
    "yf8": "",
    "updateTime": null
  }];
const pipeData=[{
  "patientId": null,
  "visitId": null,
  "createTime": '08/13',
  "nl":"2",
  "ss":"2",
  "ml":null,
  "zd":null,
  "jl":"2",
  "kj":null,
  "fz":null,
  "sh":"3",
  "xdbw":null,
  "pt":null,
  "syzxq":null,
  "bnzzhd":null,
  "kns":"1",
  "nyns":null,
  "ybnlj":"1",
  "bnph":null,
  "yf1": "1",
  "yf2": "1",
  "yf3": null,
  "yf4": null,
  "yf5": "1",
  "yf6": null,
  "yf7": "1",
  "yf8": "",
  "yf9": "1",
  "yf10": null,
  "updateTime": null
}];
const exoData=[{
  "patientId": null,
  "visitId": null,
  "createTime": '08/13',
  "gsyw":"1",
  "hlyw":"2",
  "xghxy":null,
  "zd":null,
  "zce":"2",
  "jxyw":null,
  "glln":null,
  "ts":"3",
  "ytld":null,
  "jmcc":null,
  "xk":null,
  "sysjc":null,
  "ylzry":"1",
  "yld":null,
  "xyzyj":"1",
  "tnb":null,
  "sysdk": "1",
  "ytwd": "1",
  "jjzl": null,
  "dj": null,
  "updateTime": null
}];
const burnsData=[{
  "patientId": null,
  "visitId": null,
  "createTime": '08/13',
  "gjgnjt":"1",
  "hm":"2",
  "jt":"2",
  "nl":null,
  "xyxhza":null,
  "mzwx":"2",
  "crq":null,
  "dl":null,
  "tnbz":"3",
  "rszy":null,
  "qyryys":null,
  "rl":null,
  "xz":null,
  "bshz":"1",
  "yf1": "1",
  "yf2": "1",
  "yf3": null,
  "yf4": null,
  "yf5": "1",
  "updateTime": null
}];
const cokingData=[{
  "patientId": null,
  "visitId": null,
  "createTime": '08/13',
  "yqkxx":"1",
  "xhddcx":"2",
  "tygnza":"2",
  "cywxs":null,
  "jlot":null,
  "ss":"2",
  "xzjsz":null,
  "dxzd":null,
  "nl":"3",
  "gsysz":null,
  "yenxx":null,
  "hbpsmzy":null,
  "jlks":null,
  "yf1": "1",
  "yf2": "1",
  "yf3": null,
  "yf4": null,
  "yf5": "1",
  "yf6": null,
  "yf7": "1",
  "yf8": "",
  "updateTime": null
}];
const abilityData=[{
  "patientId": null,
  "visitId": null,
  "createTime": '08/13',
  "db1":"1",
  "db2":"2",
  "db3":"2",
  "xb1":null,
  "xb2":null,
  "xb3":"2",
  "xs1":null,
  "xs2":null,
  "yc1":"3",
  "yc2":null,
  "yc3":null,
  "js1":null,
  "js2":null,
  "js3": "1",
  "zy1": "1",
  "zy2": null,
  "zy3": null,
  "zy4": "1",
  "hd1": null,
  "hd2": "1",
  "hd3": "",
  "hd4":null,
  "cy1":null,
  "cy2":null,
  "cy3":null,
  "sxlt1": "1",
  "sxlt2": "1",
  "sxlt3": null,
  "xz1": null,
  "xz2": "1",
  "updateTime": null
}];
const pressureData=[{
  "patientId": null,
  "visitId": null,
  "createTime": '08/13',
  "gjwxss":"1",
  "gjyzss":"2",
  "gjqdsh":"2",
  "gjwssh":null,
  "cjcs":null,
  "sfcs":"2",
  "oecs":null,
  "hscs":null,
  "wcbq":"3",
  "jxyy":null,
  "fzxd":null,
  "hdsx":null,
  "xdwqbn":null,
  "xdyzxz": "1",
  "xdqdxz": "1",
  "xdbsxz": null,
  "yyyzbl": null,
  "yybl": "1",
  "yyzd": null,
  "yylh": "1",
  "mcjqy": "",
  "mcjqqz":null,
  "mcjqw": "1",
  "yf1": "1",
  "yf2": "1",
  "yf3": null,
  "yf4": null,
  "yf5": "1",
  "yf6": null,
  "yf7": "1",
  "yf8": "",
  "yf9": "1",
  "yf10": null,
  "yf11": "1",
  "yf12": "1",
  "yf13": null,
  "yf14": null,
  "yf15": "1",
  "yf16": null,
  "yf17": "1",
  "updateTime": null
}];
export default [
  {
    url: '/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 200,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/table/fall',
    type: 'get',
    response: config => {
      return {
        code: 200,
        data: falldata
      }
    }
  },
  {
    url: '/table/pipeSlip',
    type: 'get',
    response: config => {
      return {
        code : 200,
        data: pipeData
      }
    }
  },
  {
    url: '/table/exosmosis',
    type: 'get',
    response: config => {
      return {
        code : 200,
        data: exoData
      }
    }
  },{
    url: '/table/burns',
    type: 'get',
    response: config => {
      return {
        code : 200,
        data: burnsData
      }
    }
  },
  {
    url: '/table/coking',
    type: 'get',
    response: config => {
      return {
        code : 200,
        data: cokingData
      }
    }
  },
  {
    url: '/table/ability',
    type: 'get',
    response: config => {
      return {
        code : 200,
        data: abilityData
      }
    }
  },
  {
    url: '/table/pressure',
    type: 'get',
    response: config => {
      return {
        code : 200,
        data: pressureData
      }
    }
  }

]
