import request from '@/utils/request.js'

export const getUserInfoAPI = function() {
  return request.get('/user')
}
