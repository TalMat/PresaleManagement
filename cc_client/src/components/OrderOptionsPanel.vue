<template>
  <div class="options-panel">

    <ul>
      <li id="status-filter" class="options-checkbox-filter">
        <div class="filter-label">
          <label>Status</label>
        </div>


        <!--<select id="status-select" v-model="filter.status" multiple>-->
          <!--<option v-for="status in statuses">{{status}}</option>-->
        <!--</select>-->

        <div class="checkboxes">
          <div v-for="status in statuses">
            <input type="checkbox" :id="status" :value="status" v-model="filter.status">
            <label :for="status">{{status}}</label>
          </div>
        </div>


      </li>

      <li id="namedrop-filter" class="options-filter">
        <div class="filter-label">
          <label>Namedrop</label>
        </div>
        <input v-model="filter.namedrop">
      </li>

      <li id="size-filter" class="options-checkbox-filter">
        <div class="filter-label">
          <label>Size</label>
        </div>
        <div class="checkboxes">
          <div v-for="(size, sizeKey) in sizeMap">
            <input type="checkbox" :id="sizeKey" :value="size" v-model="filter.size">
            <label :for="sizeKey">{{size}}</label>
          </div>
        </div>
      </li>

      <li id="name-filter" class="options-filter">
        <div class="filter-label">
          <label>Customer Name</label>
        </div>
        <input v-model="filter.name">
      </li>

      <li id="id-filter" class="options-filter">
        <div class="filter-label">
          <label>Code / ID</label>
        </div>
        <input v-model="filter.code">
      </li>
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
    methods: {},
    computed: {
      filter() {
        console.log(this.$store.getters.orderFilters);
        return this.$store.getters.orderFilters;
      }
    }
  }
</script>


<style lang="less">
  @import "../assets/global.less";

</style>
