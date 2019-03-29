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
    price:val.price,
    type_id:val.type_id,
    pic1:val.pic1,
    pic2:val.pic2,
    pic3:val.pic3,
    status:val.status,
    stock:val.stock,
    content:val.content,
    express_cost:val.express_cost,
    create_time:val.create_time,
    specification:val.specification,
  }
  return request({
    url: '/api/admin/goods/update',
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

