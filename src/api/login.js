import request from '@/utils/request'

const userApi = {
  Login: 'https://clover-api.codecareer.cn/login',
  Logout: 'https://clover-api.codecareer.cn/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  twoStepCode: '/auth/2step-code',
  SendSms: 'https://clover-api.codecareer.cn/login/sendSmsCaptcha',
  // get my info
  UserInfo: 'https://clover-api.codecareer.cn/api/user/userInfo/currentUser',
  UserMenu: 'https://clover-api.codecareer.cn/api/user/menu/list',
  // UserMenu: '/user/nav',
  LoginHistory: 'https://clover-api.codecareer.cn/api/login/loginHistory/thisMonth'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return request({
    url: userApi.Login,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    method: 'post',
    data: parameter
  })
}

export function getSmsCaptcha (parameter) {
  return request({
    url: userApi.SendSms,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return request({
    url: userApi.UserInfo,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getCurrentUserNav () {
  return request({
    url: userApi.UserMenu,
    method: 'post'
  })
}

export function logout () {
  return request({
    url: userApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return request({
    url: userApi.twoStepCode,
    method: 'post',
    data: parameter
  })
}

/**
 * 当月登录记录
 * @param {*} parameter {*}
 */
export function loginHistory (parameter) {
  return request({
    url: userApi.LoginHistory,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    method: 'post',
    data: parameter
  })
}
