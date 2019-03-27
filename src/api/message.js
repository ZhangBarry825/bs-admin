import request from '@/utils/request'


export function getAllMessages(page_size,page_num) {
  const data = {
    page_size,
    page_num
  }
  return request({
    url: '/api/admin/message/allMessages',
    method: 'post',
    data
  })
}

export function newMessage(info) {
  const data = {
    title:info.title,
    content:info.content,
    content_short:info.content_short,
  }
  return request({
    url: '/api/admin/message/newMessage',
    method: 'post',
    data
  })
}

export function deleteMessage(id) {
  const data = {
    id
  }
  return request({
    url: '/api/admin/message/deleteMessage',
    method: 'post',
    data
  })
}

export function getMessage(id) {
  const data = {
    id
  }
  return request({
    url: '/api/admin/message/getMessage',
    method: 'post',
    data
  })
}

export function updateMessage(info) {
  const data = {
    id:info.id,
    title:info.title,
    content:info.content,
    content_short:info.content_short,
  }
  return request({
    url: '/api/admin/message/updateMessage',
    method: 'post',
    data
  })
}



