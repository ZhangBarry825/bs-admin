import request from '@/utils/request'


export function addGoodsType(val) {
  const data = {
    name:val.name,
    children:val.children
  }
  return request({
    url: '/api/admin/goodsType/create',
    method: 'post',
    data
  })
}
export function updateGoodsType(val) {
  const data = {
    id:val.id,
    name:val.name,
    type_id:val.type_id,
    avatar:val.avatar,
    belong_id:val.belong_id,
    children:val.children
  }
  return request({
    url: '/api/admin/goodsType/update',
    method: 'post',
    data
  })
}
export function deleteGoodsType(id) {
  const data = {
    id
  }
  return request({
    url: '/api/admin/goodsType/delete',
    method: 'post',
    data
  })
}
export function getAllTypes(page_size,page_num,level) {
  const data = {
    page_size,
    page_num,
    level
  }
  return request({
    url: '/api/admin/goodsType/lists',
    method: 'post',
    data
  })
}
export function getTypeDetail(id) {
  const data = {
    id
  }
  return request({
    url: '/api/admin/goodsType/detail',
    method: 'post',
    data
  })
}

