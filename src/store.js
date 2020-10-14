import Vue from 'vue'
import Vuex from 'vuex'
import router from './router/index'
import auth0 from 'auth0-js'
Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  darkMode: false,
  backgroundColor: '',
  userIsAuthorized:false,
  auth0: new auth0.WebAuth({
    domain: process.env.VUE_APP_AUTH0_CONFIG_DOMAIN, 
    clientID: process.env.VUE_APP_AUTH0_CONFIG_CLIENTID,
    redirectUri: process.env.VUE_APP_DOMAINURL + '/auth0callback',  
    responseType: process.env.VUE_APP_AUTH0_CONFIG_RESPONSETYPE,
    scope: process.env.VUE_APP_AUTH0_CONFIG_SCOPE,
  }),
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  },
  toggle (state, variable) {
    state[variable] = !state[variable]
  },

  viewBackground(state, data){
    state.backgroundColor = data;
  },

  // Actual project code

  setUserIsAuthenticated(state, replacement){
    state.userIsAuthorized = replacement
  },

}

const actions = {
  auth0Login(context){
    context.state.auth0.authorize()
  },
  auth0HandleAuthentication (context) {
    context.state.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        let expiresAt = JSON.stringify(
          authResult.expiresIn * 10000 + new Date().getTime()
        )
        // save the tokens locally
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);  

        router.replace('/');
      } 
      else if (err) {
        alert('login failed. Error #KJN838');
        router.replace('/home');
        console.log(err);
      }
    })
  },
  
  auth0Logout (context) {
    // No need to update the bearer in global axiosConfig to null because we are redirecting out of the application
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    // redirect to auth0 logout to completely log the user out
    // window.location.href = process.env.VUE_APP_AUTH0_CONFIG_DOMAINURL + "/v2/logout?returnTo=" + process.env.VUE_APP_DOMAINURL + "/login&client_id=" + process.env.VUE_APP_AUTH0_CONFIG_CLIENTID; 
    router.replace('/home');
  },
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})