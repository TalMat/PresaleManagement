import api from '@/services/api';

export default({
  async fetchInventory(context) {
    let res = await api().get('inventory');
    context.commit('initInventory', res.data);
  },
  async createNewItem(context, data) {
    let result = await api().post('inventory/new-item', data);
    if(result.data.success){
      context.commit('addInvItem', result.data);
    } else {
      console.log(result.data.message);
    }
  },
  async deleteItem(context, id){
    let result = await api().post('inventory/delete-item', { id });
    if(result.data.success){
      context.commit('removeInvItem', result.data);
    } else {
      console.log(result.data.message);
    }
  }
})
