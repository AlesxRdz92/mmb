import home from './views/Home';
import register from './views/SignUp';
import login from './views/Login';

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
    }
]