import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TodoDetail from '../views/TodoDetail.vue'
import UserDetail from '../views/Users/UserDetail.vue'
import login from '../views/Users/login.vue'
import RoomDetail from '../views/Rooms/RoomDetail.vue'
import protectedroute from '../views/Users/protectedroute.vue'
import myorders from '../views/Orders/myorders.vue'
import Profile from '../views/Profile/Profile.vue'
import Unauthorized from '../views/Admin/Unauthorized.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    
    {
      path: '/todos',
      name: 'todos',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TodosView.vue')
    },
    {
      path: '/users',
      name: 'users',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UsersView.vue')
    },
    {
      path: '/todo/:id',
      name: 'todo single',
      component: TodoDetail
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    //  component: () => import(/* webpackChunkName: "about" */ '../views/TodoDetail.vue')
    },
    {
      path: '/todo/:id',
      name: 'todo single',
      component: TodoDetail
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    //  component: () => import(/* webpackChunkName: "about" */ '../views/TodoDetail.vue')
    },
    // {
    //   path: '/room/:id',
    //   name: 'Room Details',
    //   component: RoomDetail
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    // //  component: () => import(/* webpackChunkName: "about" */ '../views/TodoDetail.vue')
    // },
    {
      path: '/Register',
      name: 'Register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Users/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Users/login.vue')
    },
    {
      path: '/users_export',
      name: 'users_export',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Users/users_export.vue')
    },
    {
      path: '/airbnb',
      name: 'airbnb',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Users/airbnb.vue')
    },
    {
      path: '/room/:id',
      name: 'rooms details',
      component: () => import('../views/Rooms/RoomDetail.vue'),
      meta: { requiresAuth: true, roles: ['admin', 'user', 'editor', 'moderator']}
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    },
    {
      path: '/protected-route',
      name: 'protected-route',
      component: protectedroute,
      meta: { requiresAuth: true }
    },
    {
      path: '/myorders',
      name: 'myorders',
      component: myorders,
      meta: { requiresAuth: true, roles: ['admin', 'user', 'editor', 'moderator'] }
    },
    {
      path: '/myprofile',
      name: 'myprofile',
      component: Profile,
      meta: { requiresAuth: true, roles: ['admin', 'user', 'editor', 'moderator'] }
    },
    {
      path: '/cancel_order/:orderId',
      name: 'cancel_order',
      component: () => import('../views/Orders/cancel_order.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/Admin/home',
      name: 'adminHome',
      component: () => import('../views/Admin/adminHome.vue'),
      meta: { requiresAuth: true, roles: ['admin'] }
    },
    {
      path: '/Admin/users',
      name: 'adminUsers',
      component: () => import('../views/Admin/adminUsers.vue'),
      meta: { requiresAuth: true, roles: ['admin'] }
    },
    {
      path: '/Admin/rooms',
      name: 'adminRooms',
      component: () => import('../views/Admin/adminRooms.vue'),
      meta: { requiresAuth: true, roles: ['admin'] }
    },
    {
      path: '/Admin/users/Edit/:id',
      name: 'AdminEditUser',
      component: () => import('../views/Admin/editUser.vue'),
      meta: { requiresAuth: true, roles: ['admin'] }
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: Unauthorized
    },  
  ]
})







 // Function to get the userId from JWT stored in localStorage or sessionStorage
 const getUserIdFromJWT = () => {
  // Implement the logic to retrieve the JWT from localStorage or sessionStorage
  const jwtToken = localStorage.getItem('jwtToken');
  // Parse the JWT to get user information
  const decodedToken = jwtToken ? JSON.parse(atob(jwtToken.split('.')[1])) : null;
  return decodedToken ? decodedToken.userId : null;
};


router.beforeEach(async (to, from, next) => {
  const isAuthenticated = localStorage.getItem('jwtToken') !== null;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.meta.requiresAuth && isAuthenticated) {
    const userId = getUserIdFromJWT();

    if (userId) {
      // Fetch user-specific data including user role
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      };

      try {
        const userDataResponse = await fetch(`http://localhost:3000/users/${userId}`, requestOptions);
        const userDataJson = await userDataResponse.json();

        if (userDataResponse.status === 200) {
          // Check if user's role is allowed to access the route
          if (to.meta.roles.includes(userDataJson.role)) {
            next(); // Allow access
          } else {
            next('/unauthorized'); // Redirect to unauthorized access page
          }
        } else {
          console.error('Error fetching user data:', userDataResponse.statusText);
          next('/unauthorized');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        next('/unauthorized');
      }
    }
  } else {
    next();
  }
});




export default router
