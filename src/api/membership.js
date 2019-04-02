import request from '@/utils/request'

export function getAllMemberships(page_size, page_num) {
  const data = {
    page_size,
    page_num
  }
  return request({
    url: '/api/admin/membership/allMemberships',
    method: 'post',
    data
  })
}

export function resetPassword(id) {
  const data = {
    id
  }
  return request({
    url: '/api/admin/membership/resetPassword',
    method: 'post',
    data
  })
}

export function deleteMembership(id) {
  const data = {
    id
  }
  return request({
    url: '/api/admin/membership/deleteMembership',
    method: 'post',
    data
  })
}

export function allSaleMembers(page_size, page_num) {
  const data = {
    page_size,
    page_num
  }
  return request({
    url: '/api/admin/membership/allSaleMembers',
    method: 'post',
    data
  })
}

export function getMembershipDetail(id) {
  const data = {
    id
  }
  return request({
    url: '/api/admin/membership/getMembership',
    method: 'post',
    data
  })
}

export function updateSaleUser(info) {
  const data = {
    id: info.id,
    status: info.status,
    is_shopper: info.is_shopper
  }
  return request({
    url: '/api/admin/membership/updateMembership',
    method: 'post',
    data
  })
}

