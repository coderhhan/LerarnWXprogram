import {baseUrl,timout} from './config.js'
export default function request(options) {
  return new Promise ((resolve,reject)=>{
    wx.request({
      url: baseUrl+options.url,
      timeout: timout,
      data: options.data || '',
      header: {},
      method: options.method || 'GET',
      dataType: 'json',
      responseType: 'text',
      success: resolve,
      fail:reject
    })
  })
}