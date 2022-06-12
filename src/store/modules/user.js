import storage from 'store'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    loginName: '',
    welcome: '',
    userAvatar: '',
    currentUserInfo: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { loginName, welcome }) => {
      state.loginName = loginName
      state.welcome = welcome
    },
    SET_AVATAR: (state, userAvatar) => {
      state.userAvatar = userAvatar
    },
    SET_INFO: (state, currentUserInfo) => {
      state.currentUserInfo = currentUserInfo
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          if (response.success) {
            const result = response.data
            storage.set(ACCESS_TOKEN, result.accessToken, 4 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.accessToken)
            resolve(response)
          } else {
            reject(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          console.log('response' + response)
          if (response.success) {
            const result = response.data
            result.userAvatar = result.userAvatar + '?' + Math.random()
            commit('SET_INFO', result)
            commit('SET_NAME', { loginName: result.loginName, welcome: welcome() })
            commit('SET_AVATAR', result.userAvatar)

            resolve(response)
        } else {
          reject(response)
        }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_INFO', [])
          storage.remove(ACCESS_TOKEN)
          resolve()
        }).catch((err) => {
          console.log('logout fail:', err)
          // resolve()
        }).finally(() => {
        })
      })
    }

  }
}

export default user
