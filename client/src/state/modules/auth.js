const state = {
    user: {
        jwt: localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')).jwt : '',
        loggedIn: localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')).loggedIn : false,
        name: localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')).name : '',
        email: localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')).email : '',
        profileImage: localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')).profileImage : ''
    }
};

const getters = {
    userInfo(state) {
        return {
            name: state.user.name,
            email: state.user.email,
            profileImage: state.user.profileImage
        }
    },
    isLogged(state) {
        return state.user.loggedIn
    },
    getJwt(state) {
        return {
            jwt: state.user.jwt
        }
    }
}

const mutations = {
    setJWT(state, data) {
        localStorage.setItem('user', JSON.stringify({
            jwt: data.token,
            loggedIn: true,
            name: data.name,
            email: data.email,
            profileImage: data.profileImage 
        }));
        state.user.jwt = data.token;
        state.user.loggedIn = true;
        state.user.name = data.name;
        state.user.email = data.email;
        state.user.profileImage = data.profileImage;
    },
    logout(state) {
        localStorage.removeItem('user');
        state.user = {
            jwt: '',
            loggedIn: false,
            name: '',
            email: ''
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}

