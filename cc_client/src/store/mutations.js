import Vue from 'vue';
import sort from '../util/sort';

export default {
  initOrders(state, data){
    state.orders = data.sort(sort.byDate);
  }
}
