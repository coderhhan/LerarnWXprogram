import request from './network.js'

export function getHomeData(){
  return request({
    url:'/api/hy/home/multidata'
  })
}

export function getHomeListData(type,page){
  return request({
    url: '/api/hy/home/data',
    data:{
      type,
      page
    }
  })
}