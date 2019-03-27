import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/api/admin/sys_user/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/api/admin/sys_user/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/api/admin/sys_user/info',
    method: 'get',
    params: { token }
  })
}

