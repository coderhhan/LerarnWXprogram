import { getHomeData, getHomeListData } from '../../network/homedata.js'

const types=['pop','new','sell']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[],
    recommend:{},
    titles:['流行','新款','精选'],
    goods:{
      'pop':  {page: 0, list: []},
      'new':  {page: 0, list: []},
      'sell': { page: 0, list: [] },
   },
    currentType:'pop',
    showbacktop:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   //获取banner 跟 recommend数据
    this._getHomeData()
    //
    this._getHomeListData('pop')
    this._getHomeListData('new')
    this._getHomeListData('sell')
  },
  _getHomeListData(type){
    const page = this.data.goods[type].page + 1
    getHomeListData(type,page)
    .then(res=>{
      console.log(res)
    const lists = res.data.data.list
    
    const oldlist = this.data.goods[type].list
    oldlist.push(...lists)

     const listkey = `goods.${type}.list`
      const pagekey = `goods.${type}.page`
     this.setData({
       [listkey]:oldlist,
       [pagekey]: page
     })
  
    // 
   })
  },
  _getHomeData(){
    getHomeData().then(res => {
      const banner = res.data.data.banner.list
      const recommend = res.data.data.recommend.list
      console.log(recommend)
      this.setData({
        banner,
        recommend
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this._getHomeData()
    //

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._getHomeListData(this.data.currentType)
  },
  onPageScroll(option){
    const scrollY=option.scrollTop
    const isshow = scrollY>=1000
    if (isshow!=this.data.showbacktop){
      this.setData({
        showbacktop: isshow
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  tabClick(event){
    console.log(event)
    const index = event.detail
    this.setData({
        currentType: types[index]
    })
  }
})