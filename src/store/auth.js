import axios from 'axios';


const TOKEN_URL ='http://127.0.0.1:8000/api/token/';
const REFRESH_URL = 'http://127.0.0.1:8000/api/token/refresh';


const state = {
    accessToken: null, // przyechowywanie dwóch tokenów
    refreshToken: null,
    isAuthenticated: false //domyslnie nie zalogowany
};

const getters = {
    getAccessToken(state) {
        return state.accessToken;
    },
    getRefreshToken(state) {
        return state.refreshToken;
    },
    isAuthenticated(state) {
        return state.isAuthenticated;
    }
};

const mutations = {
    setAccessToken(state, accessToken){
        state.accessToken = accessToken;
    },
    setRefreshToken(state, refreshToken){
        state.refreshToken = refreshToken;
    },
    setAuthenticated(state, isAuthenticated){
        state.isAuthenticated = isAuthenticated;
    }

};

const actions = {
    async login(context, payload){
        try {
            const response = await axios.post(TOKEN_URL, payload);//postem odpytujemy 
            context.commit('setAccessToken', response.data.access);//jeśli promise został rozwiazany i nie został rzucony wyjatek to zakładamy że w odpowiedzi dostajemy acces, refresh token 
            context.commit('setRefreshToken', response.data.refresh);
            context.commit('setAuthenticated', true); 
            return true;
        } catch (err) {
            context.commit('setAccessToken', null);
            context.commit('setRefreshToken', null);
            context.commit('setAuthenticated', false);
            console.log(err);
            return false;
        }

    },
    async refresh(context){
        try {
            const response = await axios.post(REFRESH_URL, {
                refresh: context.getters.getRefreshToken
            });
            context.commit('setAccessToken', response.data.access);
        }
        catch (err){
            context.commit('setAccessToken', null);
            context.commit('setRefreshToken', null);
            context.commit('setAuthenticated', false);
            console.log(err);
        }

    },

    async logout(context) {
        context.commit('setAccessToken', null);
        context.commit('setRefreshToken', null);
        context.commit('setAuthenticated', false);
    }

};

export default {
    state,
    getters,
    mutations,
    actions
};