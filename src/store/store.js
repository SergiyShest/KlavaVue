import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
      speed: 0,//current Avg speed, updated after ewery key press
      running: true,
      userResult: 0,
      userAchievementChart:[],//график достижений пользователя
  },
  getters: {
    GET_SPEED:  state => {
      return state.speed;
      },
      GET_RUNNING: state => {
          return state.running;
      },
      GET_USER_RESULT: state => {
          return state.userResult;
      },
      GET_USER_ACHIEVEMENT_CHART: state => {
          return state.userAchievementChart;
      },
  },
  mutations: {
    SET_SPEED: (state, payload) => {
          state.speed = payload;
      },
      SET_RUNNING: (state, payload) => {
          state.running = payload;
      },
      SET_USER_RESULT: (state, payload) => {
          state.userResult = payload;
      },
      SET_USER_ACHIEVEMENT_CHART: (state, payload) => {
          state.userAchievementChart = payload;
      },
  },
  actions: {
    SAVE_SPEED: async (context, payload) => {
     // let {data} = await Axios.post('http://yourwebsite.com/api/todo');
      context.commit('SET_SPEED', payload);
      },
      SAVE_RUNNING: async (context, payload) => {
          context.commit('SET_RUNNING', payload);
      },
      SAVE_USER_RESULT: async (context, payload) => {
          context.commit('SET_USER_RESULT', payload);
      },
      SAVE_USER_ACHIEVEMENT_CHART: async (context, payload) => {
           context.commit('SET_USER_ACHIEVEMENT_CHART', payload);
      }
  },
});