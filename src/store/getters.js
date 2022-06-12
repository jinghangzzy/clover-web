const getters = {
  isMobile: state => state.app.isMobile,
  lang: state => state.app.lang,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  userAvatar: state => state.user.userAvatar,
  loginName: state => state.user.loginName,
  welcome: state => state.user.welcome,
  roles: state => state.user.roles,
  currentUserInfo: state => state.user.currentUserInfo,
  addRouters: state => state.permission.addRouters,
  multiTab: state => state.app.multiTab
}

export default getters
