let sizeMap = {
  'y-xs': 'Youth XS',     'y-s': 'Youth S',       'y-m': 'Youth M',
    'y-l': 'Youth L',       'y-xl': 'Youth XL',     'a-s': 'Adult S',
    'a-m': 'Adult M',       'a-l': 'Adult L',       'a-xl': 'Adult XL',
    'a-2xl': 'Adult 2XL',   'a-3xl': 'Adult 3XL',   'a-4xl': 'Adult 4XL',
    'a-5xl': 'Adult 5XL'
};

export default {
  filteredOrders(state) {
    return state.orders.filter(order => {
      return (
        state.orderFilters.status.includes(order.status) > 0
        || state.orderFilters.status.length === 0
      ) && (
        state.orderFilters.size.includes(sizeMap[order.size]) > 0
        || state.orderFilters.size.length === 0
      ) && (
        order.name.toUpperCase().indexOf(state.orderFilters.name.toUpperCase()) >= 0
        || state.orderFilters.name === ''
      ) && (
        order.namedrop.indexOf(state.orderFilters.namedrop.toUpperCase()) >= 0
        || state.orderFilters.namedrop === ''
      ) && (
        order.code.indexOf(state.orderFilters.code.toUpperCase()) >= 0
        || state.orderFilters.code === ''
      );
    })
  },
  orderFilters(state) {
    return state.orderFilters;
  },
  orderState(state, code){
    console.log(code);
    return state.orders.find(order => {
      return order.code === code
    });
  }
}
