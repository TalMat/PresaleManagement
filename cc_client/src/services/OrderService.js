import api from '@/services/api';

export default({
  async fetchOrders(context) {
    let res = await api().get('orders');
    context.commit('initOrders', res.data);
  },
  async printNew(context) {
    let res = await api().post('orders/print-new');
    if(res.data.success){
      // Download printing report
      console.log('Opening ' + res.data.filename);
      window.location.href = 'reports/' + res.data.filename;
      // Update the view
      context.commit('updateStatus',
        { oldStatus: 'new', newStatus: 'printing'});

      context.commit('addNewReport', res.data.report);

    } else {
      console.log(res.data.message);
    }
  },

  async shipPrinted(context) {
    let res = await api().post('orders/ship-printed');
    if(res.data.success){
      // Download shipping report
      console.log('Opening' + res.data.filename);
      window.location.href = 'reports/' + res.data.filename;
      // Update the view
      context.commit( 'updateStatus',
        { oldStatus: 'printing', newStatus: 'shipped' });

      context.commit('addNewReport', res.data.report);

    } else {
      console.log(res.data.message);
    }
  },
  async invoiceShipped(context) {
    let res = await api().post('orders/invoice-shipped');
    if(res.data.success){
      // Download invoice report
      console.log('Opening' + res.data.filename);
      window.location.href = 'reports/' + res.data.filename;

      // Update the view
      context.commit( 'updateStatus',
        { oldStatus: 'shipped', newStatus: 'invoiced' });

      context.commit('addNewReport', res.data.report);

    } else {
      console.log(res.data.message);
    }
  }
})
