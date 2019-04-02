import request from '@/utils/request'

export function addOrder(val) {
  const data = {
    name: val.name,
    price: val.price,
    express_cost: val.express_cost,
    type_id: val.type_id,
    pic1: val.pic1,
    pic2: val.pic2,
    pic3: val.pic3,
    status: val.status,
    content: val.content,
    stock: val.stock,
    specification: val.specification
  }
  return request({
    url: '/api/admin/goods/create',
    method: 'post',
    data
  })
}
export function updateOrder(val) {
  const data = {
    id: val.id,
    status: val.status,
    querenshouhuo: 1,
    express_company: val.express_company,
    express_code: val.express_code,
    refund_address: val.refund_address,
    refund_contacts: val.refund_contacts,
    refund_phone: val.refund_phone

  }
  return request({
    url: '/api/admin/order/update',
    method: 'post',
    data
  })
}
export function deleteOrder(id) {
  const data = {
    id
  }
  return request({
    url: '/api/admin/order/delete',
    method: 'post',
    data
  })
}
export function getAllOrder(page_size, page_num) {
  const data = {
    page_size,
    page_num
  }
  return request({
    url: '/api/admin/order/lists',
    method: 'post',
    data
  })
}
export function getRefundOrder(page_size, page_num) {
  const data = {
    page_size,
    page_num
  }
  return request({
    url: '/api/admin/order/refundLists',
    method: 'post',
    data
  })
}
export function getOrderDetail(id) {
  const data = {
    id
  }
  return request({
    url: '/api/admin/order/detail',
    method: 'post',
    data
  })
}

export function orderStatistic() {
  const data = {
  }
  return request({
    url: '/api/admin/statistics/orderList',
    method: 'get',
    data
  })
}
export function saleAccount() {
  const data = {
  }
  return request({
    url: '/api/admin/statistics/saleAccount',
    method: 'get',
    data
  })
}
export function shopperList() {
  const data = {
  }
  return request({
    url: '/api/admin/statistics/shopperList',
    method: 'get',
    data
  })
}
export function payCommission() {
  const data = {
  }
  return request({
    url: '/api/admin/statistics/payCommission',
    method: 'get',
    data
  })
}
