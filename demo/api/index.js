
import { axios } from '@/libs/request'
// 获取验证码
const getImageVerifyCode = data => {
  return axios({
    url: '/user/getImageVerifyCode',
    method: 'post',
    data
  })
}
// 校验验证码
const verifyImageCode = data => {
  return axios({
    url: '/user/verifyImageCode',
    method: 'post',
    data
  })
}
export {
  getImageVerifyCode,
  verifyImageCode

}
