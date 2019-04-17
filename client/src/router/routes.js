import home from './views/Home';
import register from './views/SignUp';
import login from './views/Login';
import product from './views/Products';
import item from './views/Item';
import confirm from './views/Confirm';
import forgot from './views/ForgotPassword';
import reset from './views/ResetPassword';
import profile from './views/Profile';

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
    },
    {
        path: '/item/:id',
        name: 'Item',
        component: item,
        meta: {
            auth: false
        }
    },
    {
        path: '/confirm/:id',
        name: 'Confirm',
        component: confirm,
        meta: {
            auth: false
        }
    },
    {
        path: '/forgot',
        name: 'Forgot',
        component: forgot,
        meta: {
            auth: false
        }
    },
    {
        path: '/forgot/:token',
        name: 'Reset',
        component: reset,
        meta: {
            auth: false
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: profile,
        meta: {
            auth: true
        }
    }
]