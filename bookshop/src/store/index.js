import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations';
import actions from './action';

Vue.use(Vuex);

const state = {
  user: {
    name: '',
    token: '',
  },
  login: false,
  booklist: [],
  cart: [],
  order: [],
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
});
