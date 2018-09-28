import axios from 'axios';

let api = axios.create({ baseURL: '/api' });

export default({
  async fetchOrders(context) {
    let res = await api().get('orders');
    context.commit('initOrders', res.data);
  }
})
