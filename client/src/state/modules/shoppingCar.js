const state = {
    shoppingCar: localStorage.getItem('shoppingCar') !== null ? JSON.parse(localStorage.getItem('shoppingCar')).shoppingCar : []
};

const getters = {
    getShoppingCar(state) {
        return {
            shoppingCar: state.shoppingCar
        }
    },
    numberItems(state) {
        let leng = state.shoppingCar.length
        return {
            leng
        }
    }
};

const mutations = {
    addItem(state, data) {
        state.shoppingCar.push(data);
        localStorage.setItem('shoppingCar', JSON.stringify(state));
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations
}