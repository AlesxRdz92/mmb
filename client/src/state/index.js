import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import shoppingCar from './modules/shoppingCar';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        shoppingCar
    },
})