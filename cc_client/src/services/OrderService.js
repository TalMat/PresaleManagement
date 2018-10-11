import axios from 'axios';

import api from '@/services/api';

export default({
  async fetchOrders(context) {
    let res = await api().get('orders');
    res.data.success
      ? context.commit('initOrders', res.data.orders)
      : console.log(res.data.message);
  }
})
