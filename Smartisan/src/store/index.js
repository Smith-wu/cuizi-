import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)
//创建一个仓库store
let store = new Vuex.Store({
  state: {
    //存放数据
    carPanelData:[],
    //是否为最大值
    maxOff:false,
    //控制隐藏显示
    carShow :false,
    //创建小球
    ball:{
      show : false,//显示
      el:null,//点击哪一个
      img:'',
    },
    //地址数据
    receiveInfo : [{
      "name": "王某某",
      "phone": "13811111111",
      "areaCode": "010",
      "landLine": "64627856",
      "provinceId": 110000,
      "province": "北京市",
      "cityId": 110100,
      "city": "市辖区",
      "countyId": 110106,
      "county": "海淀区",
      "add": "上地十街辉煌国际西6号楼319室",
      "default": true
    },{
      "name": "李某某",
      "phone": "13811111111",
      "areaCode": "010",
      "landLine": "64627856",
      "provinceId": 110000,
      "province": "北京市",
      "cityId": 110100,
      "city": "市辖区",
      "countyId": 110106,
      "county": "海淀区",
      "add": "上地十街辉煌国际东6号楼350室",
      "default": false
    }],
    orderData:[]
  },
  getters:{
    //计算,获取数量
    totalCount(state){
      let count=0;
      state.carPanelData.forEach(goods =>{
        count +=goods.count
      })
      return count
    },
    //价格
    totalPrice(state){
      let price  = 0;
      state.carPanelData.forEach(goods =>{
        price +=goods.count *goods.price
      })
      return price
    },
    //全选
    allChecked(state){
      let allcheck = true
      state.carPanelData.forEach(goods =>{
        if(!goods.check){
          allcheck = false
          return 
        }
      })
      return allcheck
      
    },
    //计算总金额
    checkedPrice(state){
      let price = 0
      state.carPanelData.forEach(goods =>{
        if(goods.check){
          price += goods.price*goods.count
           
        }
      })
      return price
    },
    //计算数量
    checkedCount(state){
      let count = 0
      state.carPanelData.forEach(goods =>{
        if(goods.check){
          count += goods.count
           
        }
      })
      return count
    },
    //当前加入的商品
    checkGoods(state){
      let checkGoods = []
      state.carPanelData.forEach(goods =>{
        if(goods.check){
          checkGoods.push(goods)
           
        }
      })
      return checkGoods
    }
  },
  mutations:{
    //添加商品
    addCarpanelData(state,data){
      //bOff判断购物车是否添加过
      let bOff = true
      state.carPanelData.forEach(goods=>{
        if(goods.sku_id === data.info.sku_id){
          goods.count += data.count
          bOff = false
          if(goods.count >goods.limit_num){
            goods.count -= data.count
            state.maxOff = true
            return
          }
          bOff = false
          state.carShow = true
          state.ball.show = true
          state.ball.img = data.info.ali_image
          state.ball.el = event.path[0]
        }
      })
      if(bOff){
      state.carShow = true
      let goodsData = data.info
      Vue.set(goodsData,'count',data.count)
      Vue.set(goodsData,'check',true)
      state.carPanelData.push(goodsData)
      state.carShow = true
      state.ball.show = true
      state.ball.img = data.info.ali_image
      state.ball.el = event.path[0]
      }
      
    },
    //删除购物车商品
    delCarpanelData(state,id){
        state.carPanelData.forEach((goods,index)=>{
          if(goods.sku_id === id){
            state.carPanelData.splice(index,1);
            return
          }
        })
    },
    //关闭提示
    closePrompt(state){
      state.maxOff = false
    },
    //显示隐藏购物车
    showCar(state){
      state.carShow = true
    },
    hideCar(state){
      setTimeout(()=>{state.carShow = false},500)
      
    },
    //增加
    plusCartPanelData(state,id){
        state.carPanelData.forEach((goods,index)=>{
        if(goods.sku_id === id){
          if(goods.count >=goods.limit_num) return
          goods.count++
          return
        }
      })
    },
    //减少
    subCartPanelData(state,id){
      state.carPanelData.forEach((goods,index)=>{
        if(goods.sku_id === id){
          if(goods.count <=1) return
          goods.count--
          return
        }
      })
    },
    checkGoods(state,id){
        state.carPanelData.forEach((goods,index)=>{
          if(goods.sku_id === id){
              goods.check = !goods.check
              return
        }
      })
    },
    //控制全选
    allCheckGoods(state,allChecked){
      state.carPanelData.forEach((goods,index)=>{
        goods.check = !allChecked
    })
    },
    //删除选中的商品
    delCheckGoods(state){
    //   state.carPanelData.forEach((goods,index)=>{
    //     if(goods.check){
    //       state.carPanelData.splice(index,1)
    //     }
    // })
      let i= state.carPanelData.length
      while(i--){
        if(state.carPanelData[i].check){
            state.carPanelData.splice(i,1)
        }
      }
    },
    //添加收货人信息
    submitInfo(state,data){
      if(data.default){
        state.receiveInfo.forEach((receive)=>{
          receive.default =false
        })
        state.receiveInfo.push(data)
      }
    },
    submitOrder(state,data){
        state.orderData.unshift(data)
        let i =state.carPanelData.length
        while(i--){
          if(state.carPanelData[i].check){
            state.carPanelData.splice(i,1)
          }
        }
    },
    //支付成功
    payNow(state,id){
      state.orderData.forEach((order)=>{
        if(order.orderId ===id){
          order.isPay =true
          return
        }
      })
    }
  }
})
//将store暴露
export default store
