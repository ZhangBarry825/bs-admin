import request from '@/utils/request'

export function getAllMemberships(page_size,page_num) {
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






