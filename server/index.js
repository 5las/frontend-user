var axios = require('axios');
var localStorage = require('localStorage');
let api = axios.create({
  method: 'get',
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'Authorization': localStorage.getItem('Auth')
  },
  timeout: 40000,
  withCredentials: false,
  responseType: 'json',
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `onDownloadProgress` allows handling of progress events for downloads
  onDownloadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `maxContentLength` defines the max size of the https response content allowed
  maxContentLength: 2000000,

  // `maxRedirects` defines the maximum number of redirects to follow in node.js.
  // If set to 0, no redirects will be followed.
  maxRedirects: 3, // default
});

export const signup = async (userInfo) => {
  console.log(userInfo)
  try {
    const res = await api.post(`https://5las.renatocenteno.com/auth/signup`, userInfo)
    Object.assign(api.defaults, { headers: { Authorization: res.data.id } })
    return res
  } catch (error) {
    return error
  }
}

export const signin = async (userCredentials) => {
  try {
    const res = await api.post(`https://5las.renatocenteno.com/auth/signin`, userCredentials)

    return res
  } catch (error) {
    return error
  }
}

export const getDistricts = async () => {
  try {
    const res = await api.get(`https://5las.renatocenteno.com/companies/districts/1501`)

    return res
  } catch (error) {
    return error
  }
}

export const getCompany = async (district, token) => {
  try {
    Object.assign(api.defaults, { headers: { Authorization: `Bearer ${token}` } })
    const res = await api.get(`https://5las.renatocenteno.com/companies/byDistrict/${district}`)
    return res
  } catch (error) {
    return error
  }
}

export const schedule = async (turn, token) => {
  try {
    Object.assign(api.defaults, { headers: { Authorization: `Bearer ${token}` } })
    const res = await api.get(`https://5las.renatocenteno.com/companies/branch/${turn}/schedule`)
    return res
  } catch (error) {
    return error
  }
}

export const generateQR = async (turn, token) => {
  try {
    const res = await api.post(`https://5las.renatocenteno.com/tickets/generate`, turn)
    return res
  } catch (error) {
    return error
  }
}

export const recoverPassword = async (email) => {
  try {
    const res = await api.post(`https://5las.renatocenteno.com/auth/recover-password`, email)
    return res
  } catch (error) {
    return error
  }
}

export const resetPassword = async (token, password) => {
  const auth = {
    password: password,
    token: token,
  }
  try {
    Object.assign(api.defaults, { headers: { Authorization: `Bearer ${token}` } })
    const res = await api.post(`https://5las.renatocenteno.com/auth/reset-password`, auth)
    return res
  } catch (error) {
    return error
  }
}

export default api

