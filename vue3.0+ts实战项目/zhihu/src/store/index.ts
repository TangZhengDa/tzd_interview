// import axios from '../http'
import { axios, AxiosRequestConfig } from '../http'
import { createStore, Commit } from 'vuex'
import { GlobalDataProps, GlobalErrorProps } from './types'
import { storageType, StorageHandler } from '../utils/storage'
const storageHandler = new StorageHandler()
const asyncAndCommit = async (url: string, mutationsName: string,
  commit: Commit, config: AxiosRequestConfig = { method: 'get' }, extraData?: any) => {
  const { data } = await axios(url, config)
  if (extraData) {
    commit(mutationsName, { data, extraData })
  } else {
    commit(mutationsName, data)
  }
  return data
}

const store = createStore<GlobalDataProps>({
  state: {
    error: { status: true },
    token: '',
    isLoading: false,
    columns: [],
    posts: [],
    user: { isLogin: false }
  },
  mutations: {
    login (state, rawData) {
      const { token } = rawData.data
      state.token = token
      storageHandler.setItem(storageType, 'token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    setLoading (state, status) {
      state.isLoading = status
    },
    fetchCurrentUser (state, rawData) {
      state.user = { isLogin: true, ...rawData.data }
    }
  },
  actions: {
    register ({ commit }, payload) {
      return asyncAndCommit('/api/users', 'regesiter', commit, { method: 'post', data: payload })
    },
    // 登录并且获取用户信息
    loginAndFetch ({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    },
    login ({ commit }, payload) {
      return asyncAndCommit('./api/user/login', 'login', commit, { method: 'post', data: payload })
    },
    fetchCurrentUser ({ commit }) {
      return asyncAndCommit('./api/user/current', 'fetchCurrentUser', commit)
    }
  },
  getters: {}
})

export default store
