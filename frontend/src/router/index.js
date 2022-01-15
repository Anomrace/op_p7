import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import axios from 'axios'
// import auth from '../auth/index.js'

const auth = (to, from, next) => {
  let token = localStorage.getItem('token');
  const config = {
       headers: {
        'Content-Type': 'application/json',
        'authorization' : 'bearer '+ token,
       }
     }
     let data = {
        'token' : token
     }
  axios.post("http://localhost:8082/api/auth/user", data , config )
    .then((result) => {
      console.log(result)
      if(result.data.user){
        next();
      }else{
        router.push("/")
      }
      
    })
    .catch((err) => {
      console.log(err) 
      router.push("/")
    });
}

const routes = [
  {
    path:'/',
    name: 'Welcome',
    component: Welcome,
    
  },
  {
    path:'/home',
    name: 'Home',
    component: Home,
    beforeEnter: auth
  },
  {
    path:'/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: auth
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router