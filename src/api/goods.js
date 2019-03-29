import request from '@/utils/request'


export function addGoods(val) {
  const data = {
    name:val.name,
    price:val.price,
    express_cost:val.express_cost,
    type_id:val.type_id,
    pic1:val.pic1,
    pic2:val.pic2,
    pic3:val.pic3,
    status:val.status,
    content:val.content,
    stock:val.stock,
    specification:val.specification
  }
  return request({
    url: '/api/admin/goods/create',
    method: 'post',
    data
  })
}
export function updateGoods(val) {
  const data = {
    id:val.id,
    goods_id:val.goods_id,
    name:val.name,
    price:val.price,
    express_cost:val.express_cost,
    create_time:val.create_time,
    type_id:val.type_id,
    pic1:val.pic1,
    pic2:val.pic2,
    pic3:val.pic3,
    status:val.status,
    content:val.content,
    stock:val.stock,
    specification:val.specification
  }
  return request({
    url: '/api/admin/goods/update',
    method: 'post',
    data
  })
}
export function deleteGoods(id) {
  const data = {
    id
  }
  return request({
    url: '/api/admin/goods/delete',
    method: 'post',
    data
  })
}
export function getAllGoods(page_size,page_num) {
  const data = {
    page_size,
    page_num
  }
  return request({
    url: '/api/admin/goods/lists',
    method: 'post',
    data
  })
}
export function getGoodsDetail(id) {
  const data = {
    id
  }
  return request({
    url: '/api/admin/goods/detail',
    method: 'post',
    data
  })
}

