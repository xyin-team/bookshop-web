import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './action';

Vue.use(Vuex);

const state = {
  good_list: [{
    id: '1',
    name: '护手霜',
    price: 9.9,
  }, {
    id: '2',
    name: '植物精华',
    price: 12.8,
  }, {
    id: '3',
    name: '洁面乳',
    price: 3.9,
  }, {
    id: '4',
    name: '保湿水',
    price: 5.6,
  }],
  // 添加到购物车的商品
  added: [],
};

const getters = {
  // 商品列表
  goodList: (data) => {
    data.good_list.map((item) => { return { id: item.id, name: item.name, price: item.price.toFixed(2) }; });
  },

  // 购物车的列表
  cartProducts: (data) => {
    data.added.map(
      ({ id, num }) => {
        const product = data.good_list.find((item) => item.id === id);
        return {
          id: product.id,
          name: product.name,
          price: product.price.toFixed(2),
          num,
          total_num: (product.price * num).toFixed(2),
        };
      },
    );
  },

  // 计算总价
  totalPrice: (data, get) => {
    let total = 0;
    get.cartProducts.forEach((item) => {
      total += item.price * item.num;
    });
    return total.toFixed(2);
  },

  // 计算总数量
  totalNum: (data, get) => {
    let total = 0;
    get.cartProducts.forEach((item) => {
      total += item.num;
    });
    return total;
  },
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
