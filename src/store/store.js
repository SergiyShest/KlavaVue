import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    speed:0
  },
  getters: {
    SPEED:  function(state) {
      return state.speed;
    }
  },
  mutations: {
    SET_SPEED: (state, payload) => {
      state.speed = payload;}
  },
  actions: {
    SAVE_SPEED: async (context, payload) => {
     // let {data} = await Axios.post('http://yourwebsite.com/api/todo');
      context.commit('SET_SPEED', payload);
    }
  },
});