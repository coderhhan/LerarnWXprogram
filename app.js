App({
  globalData:{
    token:''
  },
  
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    const token = wx.getStorageSync('token')
    if (token && token.length !== 0){
      console.log('进行验证token')
      this.checkout(token)
    }else{
      console.log('进行登录操作')
      this.login()
    }

   
  },
 checkout(token){
   wx.request({
     url: 'http://123.207.32.32:3000/auth',
     method: 'post',
     header: {
       token
     },
     success: (res) => {
       const isok = res.data.message
       if (isok === '已登录') {
         console.log('token有效')
         this.globalData.token = token
       } else {
         console.log('token无效重新登录')
         this.login()
       }
     }
   })
 }, 
login(){
  wx.login({
    success: (res) => {
      const code = res.code
      wx.request({
        url: 'http://123.207.32.32:3000/login',
        method: 'post',
        data: { code },
        success: (res) => {
          const token = res.data.token
          //存储token
          this.globalData.token = token
          //存缓存
          wx.setStorageSync('token', token)
          console.log('存成功')
        
        }
      })
    }
  })
}
})
