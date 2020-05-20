const USER_DATA = 'USER_DATA';
const BOOKLIST = 'BOOKLIST';
const QUIT = 'QUIT';
const ADDTOCART = 'ADDTOCART';

export default {
  [USER_DATA](state, payload) {
    console.log(payload);
    state.user.token = payload.token;
    state.user.name = payload.name;
    state.login = true;
  },
  [BOOKLIST](state, payload) {
    state.booklist = [...payload.data];
  },
  [QUIT](state) {
    state.user.token = '';
    state.user.name = '';
    state.login = false;
  },
  [ADDTOCART](state, payload) {
    let total = 0;
    for (let i = 0; i < state.cart.length; i += 1) {
      if (state.cart[i].id === payload.id) {
        state.cart[i].cartNum += 1;
        state.cart[i].totalPrice = state.cart[i].cartNum * payload.price;
      } else {
        total += 1;
      }
    }

    if (total === state.cart.length) {
      payload.cartNum = 1; // eslint-disable-line no-param-reassign
      payload.totalPrice = payload.cartNum * payload.price; // eslint-disable-line no-param-reassign
      state.cart.push(payload);
    }
  },
  ADD_TO_CART(state, payload) {
    const record = state.cart.find((item) => item.id === payload.id);
    if (!record) {
      payload.cartNum = 1; // eslint-disable-line no-param-reassign
      state.added.push(payload);
    } else {
      record.cartNum += 1;
    }
  },
  NUM_CHANGE(state, payload) {
    const cart = state.cart.map((item) => {
      if (item.id === payload.id) {
        item.cartNum = payload.cartNum; // eslint-disable-line no-param-reassign
        console.log(item.cartNum);
      }
      return item;
    });
    state.cart = cart;
  },
  DELETE(state, product) {
    state.cart.forEach((item, index) => {
      if (item.id === product.id) {
        state.cart.splice(index, 1);
      }
    });
  },
  CLEAR(state) {
    state.cart = [];
  },
  GETORDER(state, payload) {
    state.order = [...payload.data];
  },
  DELORDER(state, payload) {
    let index = -1;
    state.order.forEach((item, idx) => {
      if (item.id === payload.id) {
        index = idx;
      }
    });
    state.order.splice(index, 1);
  },
  REMOVEBOOK(state, payload) {
    let index = -1;
    state.booklist.forEach((item, idx) => {
      if (item.id === payload.id) {
        index = idx;
      }
    });
    state.booklist.splice(index, 1);
  },
  ADDBOOK(state, payload) {
    console.log(payload);
    state.booklist.push(payload);
  },
};
