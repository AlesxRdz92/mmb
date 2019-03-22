import home from './views/Home';
import register from './views/SignUp';
import login from './views/Login';
import product from './views/Products'

export default [
    {
        path: '/',
        name: 'Home',
        component: home,
        meta: {
            auth: false
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: register,
        meta: {
            auth: false
        }
    },
    {
        path: '/signin',
        name: 'Login',
        component: login,
        meta: {
            auth: false
        }
    },
    {
        path: '/items/:id',
        name: 'Product',
        component: product,
        meta: {
            auth: false
        }
    }
]