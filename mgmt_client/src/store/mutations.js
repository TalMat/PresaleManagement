import Vue from 'vue';
import sort from '../util/sort';

export default {
  initOrders(state, data){
    state.orders = data.sort(sort.byDate);
  },
  updateStatus(state, status){
    for(let o in state.orders){
      if(state.orders[o].status === status.oldStatus){
        Vue.set(state.orders[o], 'status', status.newStatus);
      }
    }
  },
  initInventory(state, data){
    state.inventory = data.items.sort(sort.byDate);

    state.currentInventory = data.current;
    console.log('Current Inventory Item...');
    console.dir(state.currentInventory);
  },
  addInvItem(state, data){
    state.inventory.push(data.item);
    state.inventory.sort(sort.byDate);
    state.currentInventory = data.current;
  },
  removeInvItem(state, data){
    let arr = state.inventory;
    state.inventory.some((item, i) => {
      return arr[i]._id === data.id  // If item has id of deleted item
        ? (arr.splice(i, 1))          // remove it
        : false;
    });
    state.currentInventory = data.current;
  },
  initPresales(state, data){
    state.presales = data.sort(sort.byDate);
  },
  addPresaleCodes(state, data) {
    console.log('Adding presale code...');
    console.log(data);
    state.presales = state.presales.concat(data);
    state.presales.sort(sort.byDate);
  },
  initReports(state, data){
    state.reports = data.sort(sort.byDate);
  },
  addNewReport(state, data){
    state.reports.push(data);
    state.reports.sort(sort.byDate);
  }
}
