const state = {
    user: {
        jwt: localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')).jwt : '',
        loggedIn: localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')).loggedIn : false,
        name: localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')).name : '',
        email: localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')).email : '',
        profileImage: localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')).profileImage : '',
        address: localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')).address : '',
        phone: localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')).phone : '', 
        city: localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')).city : '', 
        cp: localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')).cp : '',
        state: localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')).state : ''  
    }
};

const getters = {
    userInfo(state) {
        return {
            name: state.user.name,
            email: state.user.email,
            profileImage: state.user.profileImage,
            address: state.user.address,
            phone: state.user.phone,
            cp: state.user.cp,
            state: state.user.state,
            city: state.user.city
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
            profileImage: data.profileImage,
            address: data.address,
            phone: data.phone,
            cp: data.cp,
            state: data.state,
            city: data.city
        }));
        state.user.jwt = data.token;
        state.user.loggedIn = true;
        state.user.name = data.name;
        state.user.email = data.email;
        state.user.profileImage = data.profileImage;
        state.user.address = data.address;
        state.user.phone = data.phone;
        state.user.cp = data.cp;
        state.user.state = data.state;
        state.user.city = data.city;
    },
    setData(state, data) {
        let tempToken = state.user.jwt;
        let tempLogIn = state.user.loggedIn;
        localStorage.setItem('user', JSON.stringify({
            jwt: tempToken,
            loggedIn: tempLogIn,
            name: data.name,
            email: data.email,
            profileImage: data.profileImage,
            address: data.address,
            phone: data.phone,
            cp: data.cp,
            state: data.state,
            city: data.city
        }));
        state.user.jwt = data.token;
        state.user.loggedIn = true;
        state.user.name = data.name;
        state.user.email = data.email;
        state.user.profileImage = data.profileImage;
        state.user.address = data.address;
        state.user.phone = data.phone;
        state.user.cp = data.cp;
        state.user.state = data.state;
        state.user.city = data.city;
    },
    logout(state) {
        localStorage.removeItem('user');
        state.user = {
            jwt: '',
            loggedIn: false,
            name: '',
            email: '',
            address: '',
            phone: '',
            cp: '',
            state: '',
            city: ''
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}

