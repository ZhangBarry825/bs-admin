import request from '@/utils/request'

export function getRegulationDetail(id) {
  const data = {
    id
  }
  return request({
    url: '/api/admin/regulation/detail',
    method: 'post',
    data
  })
}


export function updateRegulation(val) {
  const data = {
    id:val.id,
    require_type:val.require_type,
    require_expense:val.require_expense,
    require_price:val.require_price,
    display_agreement:val.display_agreement,
    agreement_title:val.agreement_title,
    agreement_content:val.agreement_content,
    level_one:val.level_one,
    level_two:val.level_two,
    level_three:val.level_three,
  }
  return request({
    url: '/api/admin/regulation/update',
    method: 'post',
    data
  })
}
