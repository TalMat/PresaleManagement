<template>
  <div class="options-panel">

    <ul>
      <li id="status-filter" class="options-filter">
        <label for="status-select">Status</label><br>
        <select id="status-select" v-model="filter.status" multiple>
          <option v-for="status in statuses">{{status}}</option>
        </select>
      </li>

      <li id="namedrop-filter" class="options-filter">
        <label>Namedrop</label><br>
        <input v-model="filter.namedrop">
      </li>

      <li id="size-filter" class="options-filter">
        <label for="size-select">Size</label><br>
        <select id="size-select" v-model="filter.size" multiple>
          <option v-for="size in sizeMap">{{size}}</option>
        </select>
      </li>

      <li id="name-filter" class="options-filter">
        <label>Customer Name</label><br>
        <input v-model="filter.name">
      </li>

      <li id="id-filter" class="options-filter">
        <label>Code / ID</label><br>
        <input v-model="filter.code">
      </li>
    </ul>
    <ul>
      <li><button v-on:click="printNew">Print New</button></li>
      <li><button v-on:click="shipPrinted">Ship Printed</button></li>
      <li><button v-on:click="invoiceShipped">Invoice Shipped</button></li>
    </ul>
  </div>
</template>


<script>
  import OrderService from '@/services/OrderService';

  export default {
    name: 'OrderOptionsPanel',
    data () {
      return {
        orders: [],
        status: '',
        showStatus: false,
        statuses: ['new', 'printing', 'shipped', 'invoiced', 'cancelled'],
        sizeMap: {
          'y-xs': 'Youth XS',     'y-s': 'Youth S',       'y-m': 'Youth M',
          'y-l': 'Youth L',       'y-xl': 'Youth XL',     'a-s': 'Adult S',
          'a-m': 'Adult M',       'a-l': 'Adult L',       'a-xl': 'Adult XL',
          'a-2xl': 'Adult 2XL',   'a-3xl': 'Adult 3XL',   'a-4xl': 'Adult 4XL',
          'a-5xl': 'Adult 5XL'
        }
      }
    },
    methods: {
      async printNew(){
        await this.$store.dispatch('printNew');
      },
      async shipPrinted(){
        await this.$store.dispatch('shipPrinted');
      },
      async invoiceShipped(){
        await this.$store.dispatch('invoiceShipped');
      }
    },
    computed: {
      filter() {
        return this.$store.getters.orderFilters;
      }
    }
  }
</script>


<style lang="less">
  @import "../assets/global.less";

</style>
