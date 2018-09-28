import axios from 'axios';

import api from '@/services/api';

export default({
  async fetchOrders(context) {
    let res = await api().get('orders');
    context.commit('initOrders', res.data);
  }
})
