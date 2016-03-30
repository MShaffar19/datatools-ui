import { fetchProjects } from './projects'

export const checkingExistingLogin = () => {
  return {
    type: 'CHECKING_EXISTING_LOGIN'
  }
}

export const noExistingLogin = () => {
  return {
    type: 'NO_EXISTING_LOGIN'
  }
}

export const userLoggedIn = (token, profile) => {
  return {
    type: 'USER_LOGGED_IN',
    token,
    profile
  }
}

export function checkExistingLogin() {
  return function (dispatch, getState) {
    dispatch(checkingExistingLogin())
    console.log('checkExistingLogin');
    var login = getState().user.auth0.checkExistingLogin()
    if(login) {
      login.then((userTokenAndProfile) => {
        console.log(userTokenAndProfile)
        return dispatch(userLoggedIn(userTokenAndProfile.token, userTokenAndProfile.profile))
      })
      // .then(() => {
      // })
    } else {
      console.log('no login found');
      dispatch(noExistingLogin())
    }
  }
}

export function login () {
  return function (dispatch, getState) {
    getState().user.auth0.loginViaLock().then((userInfo) => {
      return dispatch(userLoggedIn(userInfo.token, userInfo.profile))
    }).then(() => {
      dispatch(fetchProjects())
    })
  }
}

export function userLogout () {
  return {
    type: 'USER_LOGGED_OUT'
  }
}

export function logout () {
  return function (dispatch, getState) {
    dispatch(userLogout())
    getState().user.auth0.logout()
  }
}

export function resetPassword() {
  return function (dispatch, getState) {
    getState().user.auth0.resetPassword()
  }
}
