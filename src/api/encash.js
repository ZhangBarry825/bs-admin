import request from '@/utils/request'

export function deleteEncash(id) {
  const data = {
    id
  }
  return request({
    url: '/api/admin/encash/deleteEncash',
    method: 'post',
    data
  })
}
export function allEncashs(page_size, page_num) {
  const data = {
    page_size,
    page_num
  }
  return request({
    url: '/api/admin/encash/allEncashs',
    method: 'post',
    data
  })
}
export function updateEncash(id, status, membership_id, account) {
  const data = {
    id: id,
    status: status,
    membership_id: membership_id,
    account: account
  }
  return request({
    url: '/api/admin/encash/updateEncash',
    method: 'post',
    data
  })
}

