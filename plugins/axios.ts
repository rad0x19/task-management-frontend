import axios from "axios";
import Swal from 'sweetalert2'
// @ts-ignore
import jquery from 'jquery'
import moment from 'moment'

export default defineNuxtPlugin((nuxtApp) => {
  const $config = useRuntimeConfig()
  let api = axios.create();
  const $nuxt = useNuxtApp()
  // Request interceptor
  api.interceptors.request.use(async (request : any) => {
    request.baseURL = "/api"
    const token = localStorage.getItem('token') || null
    if (token) {
      request.headers.common.Authorization = `Bearer ${token}`
    }
    return request
  })
  
  // Response interceptor
  api.interceptors.response.use(
    (response : any) => {
      return response
    },
    (error : any) => {
      const { status,data } = error.response || {}

      if (status >= 500) {
        Swal.fire({
          icon: 'error',
          title: 'Server Error!',
          text: data.message,
          reverseButtons: true,
          confirmButtonText: 'ok',
        })
      }

      else if (status == 403) {
        Swal.fire({
          icon: 'error',
          title: 'Permission Denied!',
          text: 'You dont have permission to do this action.',
          reverseButtons: true,
          confirmButtonText: 'ok',
        })
      }

      else if (status == 404) {
        Swal.fire({
          icon: 'error',
          title: 'Endpoint not Found!',
          text: 'You are trying to request on non-existing endpoint.',
          reverseButtons: true,
          confirmButtonText: 'ok',
        })
      }

      else if (status == 400) {
        Swal.fire({
          icon: 'warning',
          text: data.message,
          reverseButtons: true,
          confirmButtonText: 'ok',
        })
      }

      else if (status == 429) {
        Swal.fire({
          icon: 'warning',
          text: "Request has been limited due to spamming. Try again after " + moment(new Date(error.response.headers['x-ratelimit-reset'] * 1000)).format("MMM DD, YYYY h:mm:s A"),
          reverseButtons: true,
          confirmButtonText: 'ok',
        })
      }

      else if (status == 422) {
        var x = ''
        if(data.errors){
          x = '<ul style="list-style-type: none;">'
          jquery.each(data.errors, (index : any,value : any) => {
            x += '<li>'+value+'</li>'
          })
          x += '</ul>'
        }else {
          x = data.message
        }
        Swal.fire({
          icon: 'warning',
          html: x,
          reverseButtons: true,
          confirmButtonText: 'ok',
        })
      }

      else if (status == 401) {
        localStorage.removeItem('token')
        Swal.fire({
          icon: 'error',
          text: data.message,
          reverseButtons: true,
          confirmButtonText: 'ok',
        })
      }

      else{
        return Promise.reject(error)
      }
    }
  )
  return {
    provide: {
      api: api,
    },
  };
});