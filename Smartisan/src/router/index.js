/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import '../assets/css/header.css'
import '../assets/css/reset.css'

Vue.use(Router);
import Home from '../views/home.vue'
import MPhone from '../views/mphone'
import PageOne from '../views/page_one.vue'
import PageTwo from '../views/page_two.vue'
import Shop from '../views/shop.vue'
import PageThree from '../views/page_three.vue'
import PageFour from '../views/page_four.vue'
import PageFive from '../views/page_five.vue'
import Item from '../views/item'
import Cart from '../views/cart'
import Checkout from '../views/checkout'
import Payment from '../views/payment'
import Account from '../views/account'
import Order from '../views/account/order'



export default new Router({
	mode:'history',
  routes: [
    {path :'/',component: Home},
    {
			path : '/Home',component: Home
		},
		{
			path : '/MPhone',component: MPhone
		},
		{
			path : '/PageOne',component: PageOne
		},
		{
			path : '/PageTwo',component: PageTwo
		},
		{
			path : '/PageThree',component: PageThree
		},
		{
			path : '/PageFour',component: PageFour
		},
		{
			path : '/PageFive',component: PageFive
		},
 		{
 		  path :'/Shop',component:Shop
 		},
		{
			path:'/Item',name:"Item",component:Item
		},
		{
			path:'/Cart',name:"Cart",component:Cart
		},
		{
			path:'/Checkout',name:"Checkout",component:Checkout
		},
		{
			path:'/Payment',name:"Payment",component:Payment
		},
		{
			path:'/Account',
			component:Account,
			children:[{
				path:'',
				name:'Account',
				component:Order
			}]
		}
  ]
})
