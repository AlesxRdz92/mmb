import home from './views/Home';
import register from './views/SignUp';
import login from './views/Login';
import product from './views/Products';
import item from './views/Item';
import confirm from './views/Confirm';

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
    }
]