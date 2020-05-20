export default {
  login({ commit }, payload) {
    return fetch('http://xyinproxy.free.idcfengye.com/login', {
      body: JSON.stringify({ username: payload.name, password: payload.password }),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
      mode: 'cors',
    }).then((res) => res.json()).then((json) => {
      console.log(json);
      commit('USER_DATA', {
        isAdmin: json.isAdmin,
        name: payload.name,
        token: json.data.token,
      });
      return true;
    }).catch((err) => {
      console.log('请求错误', err);
    });
  },
  register({ commit }, payload) { // eslint-disable-line no-unused-vars
    fetch('http://xyinproxy.free.idcfengye.com/register', {
      body: JSON.stringify({ username: payload.name, password: payload.password }),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    }).then((res) => res.json()).then((json) => {
      console.log(json);
    }).catch((err) => {
      console.log('请求错误', err);
    });
  },
  quit({ commit }) {
    commit('QUIT');
  },
  getList({ commit }) { // eslint-disable-line no-unused-vars
    fetch('http://xyinproxy.free.idcfengye.com/book/list', {
      headers: {
        'content-type': 'application/json',
      },
      method: 'GET',
    }).then((res) => res.json()).then((json) => {
      commit('BOOKLIST', json);
    }).catch((err) => {
      console.log('请求错误', err);
    });
  },
  addToCart({ commit }, payload) {
    commit('ADDTOCART', payload);
  },
  handleChange({ commit }, payload) {
    commit('NUM_CHANGE', payload);
  },
  delProduct({ commit }, payload) {
    commit('DELETE', payload);
  },
  // eslint-disable-next-line no-unused-vars
  delOrder({ commit }, payload) {
    fetch(`http://xyinproxy.free.idcfengye.com/order/remove?id=${payload.id}`, {
      headers: {
        'content-type': 'application/json',
        'token': payload.token, // eslint-disable-line quote-props
      },
      method: 'POST',
    }).then((res) => {
      console.log(res);
      commit('DELORDER', payload);
    }).catch((err) => {
      console.log('请求出错', err);
    });
    console.log(payload);
  },
  submit({ commit }, payload) { // eslint-disable-line no-unused-vars
    console.log(payload);
    for (let i = 0; i < payload.cart.length; i += 1) {
      console.log(payload.cart[i]);
      fetch('http://xyinproxy.free.idcfengye.com/order/create', {
        headers: {
          'content-type': 'application/json',
          'token': payload.user.token, // eslint-disable-line quote-props
        },
        method: 'POST',
        body: JSON.stringify({
          address: payload.form.address,
          count: payload.cart[i].cartNum,
          bookId: payload.cart[i].id,
        }),
      }).then((res) => res.json()).then((json) => {
        console.log(json);
        commit('CLEAR');
      }).catch((err) => {
        console.log('请求错误', err);
      });
    }
  },
  getOrder({ commit }, payload) { // eslint-disable-line no-unused-vars
    fetch('http://xyinproxy.free.idcfengye.com/order/list', {
      headers: {
        'content-type': 'application/json',
        'token': payload.token, // eslint-disable-line quote-props
      },
      method: 'GET',
    }).then((res) => res.json()).then((json) => {
      console.log(json);
      commit('GETORDER', json);
    }).catch((err) => {
      console.log('请求错误', err);
    });
  },
  addBook({ commit }, payload) { // eslint-disable-line no-unused-vars
    fetch('http://xyinproxy.free.idcfengye.com/book/add', {
      headers: {
        'content-type': 'application/json',
        'token': payload.token, // eslint-disable-line quote-props
      },
      method: 'POST',
      body: JSON.stringify(payload.form),
    }).then((res) => res.json()).then((json) => {
      console.log(json);
      commit('GETORDER', json);
    }).catch((err) => {
      console.log('请求错误', err);
    });
  },
  delbook({ commit }, payload) { // eslint-disable-line no-unused-vars
    fetch(`http://xyinproxy.free.idcfengye.com/book/remove?id=${payload.id}`, {
      headers: {
        'content-type': 'application/json',
        'token': payload.token, // eslint-disable-line quote-props
      },
      method: 'GET',
    }).then((res) => res.json()).then((json) => {
      console.log(json);
      commit('REMOVEBOOK', json);
    }).catch((err) => {
      console.log('请求错误', err);
    });
  },
};
