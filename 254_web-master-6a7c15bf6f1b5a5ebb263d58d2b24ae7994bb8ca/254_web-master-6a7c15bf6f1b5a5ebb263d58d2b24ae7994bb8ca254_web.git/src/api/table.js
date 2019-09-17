import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
export function getFallList(params) {
  return request({
    url: '/fall/forSelectPage',
    method: 'get',
    params:params
  })
}

export function addFall(params) {
  return request({
    url: '/fall/forSaveOrUpdate',
    method: 'post',
    params:params
  })
}
export function getPipeList(params) {
  return request({
    url: '/gdht/forSelectPage',
    method: 'get',
    params:params
  })
}

export function addPipeSlip(params) {
  return request({
    url: '/gdht/forSaveOrUpdate',
    method: 'post',
    params:params
  })
}

export function getExoList(params) {
  return request({
    url: '/syw/forSelectPage',
    method: 'get',
    params:params
  })
}

export function addExo(params) {
  return request({
    url: '/syw/forSaveOrUpdate',
    method: 'post',
    params:params
  })
}

export function getBurnsList(params) {
  return request({
    url: '/ts/forSelectPage',
    method: 'get',
    params:params
  })
}

export function addBurns(params) {
  return request({
    url: '/ts/forSaveOrUpdate',
    method: 'post',
    params:params
  })
}
export function getCokingList(params) {
  return request({
    url: '/wx/forSelectPage',
    method: 'get',
    params:params
  })
}

export function addCoking(params) {
  return request({
    url: '/wx/forSaveOrUpdate',
    method: 'post',
    params:params
  })
}
export function getAbilityList(params) {
  return request({
    url: '/zlnl/forSelectPage',
    method: 'get',
    params:params
  })
}

export function addAbility(params) {
  return request({
    url: '/zlnl/forSaveOrUpdate',
    method: 'post',
    params:params
  })
}
export function getPressureList(params) {
  return request({
    url: '/yc/forSelectPage',
    method: 'get',
    params:params
  })
}
export function addPressure(params) {
  return request({
    url: '/yc/forSaveOrUpdate',
    method: 'post',
    params:params
  })
}
export function addPain(params) {
  return request({
    url: '/tt/forSaveOrUpdate',
    method: 'post',
    params:params
  })
}

