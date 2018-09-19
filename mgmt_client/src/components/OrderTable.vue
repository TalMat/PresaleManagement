<template>
  <div id="order-container" class="data-container">

    <table id="order-table" class="data-table">
      <thead class="data-heading">
      <tr>
        <th colspan="5"><h1>Orders</h1></th>
      </tr>
      <tr>
        <th>Status</th>
        <th>Namedrop</th>
        <th>Size</th>
        <th>Customer Name</th>
        <th class="right-col">Code / ID</th>
      </tr>
      </thead>

      <tbody>
      <!--Status row-->
      <tr>
        <td colspan="5" id="status-bar" v-if="showStatus">{{ loadingStatus }}</td>
      </tr>

      <!--Order rows-->
      <tr v-for="order in filteredOrders"
          :id="order.code"
          :class="[order.status, { selected: order.selected } ]" class="order"
          v-on:click="toggleSelected(order.code)">
        <td>{{ order.status }}</td>
        <td>{{ order.namedrop }}</td>
        <td>{{ sizeMap[order.size] }}</td>
        <td>{{ order.name }}</td>
        <td class="right-col">{{ order.code }}</td>
      </tr>

      </tbody>
    </table>
  </div>
</template>


<script>

  export default {
    name: 'OrderTable',
    data () {
      return {
        orders: [],
        loadingStatus: '',
        showLoadingStatus: false,
        sizeMap: {
          'y-xs': 'Youth XS',     'y-s': 'Youth S',       'y-m': 'Youth M',
          'y-l': 'Youth L',       'y-xl': 'Youth XL',     'a-s': 'Adult S',
          'a-m': 'Adult M',       'a-l': 'Adult L',       'a-xl': 'Adult XL',
          'a-2xl': 'Adult 2XL',   'a-3xl': 'Adult 3XL',   'a-4xl': 'Adult 4XL',
          'a-5xl': 'Adult 5XL'
        }
      }
    },
    mounted() {
      this.loadOrders();
    },
    methods: {
      async loadOrders(){
        this.loadingStatus = 'loading...';
        this.showLoadingStatus = true;
        await this.$store.dispatch('fetchOrders');
        this.loadingStatus = 'complete';
        this.showLoadingStatus = false;
      },
      toggleSelected(code) {
        this.$store.commit('toggleSelected', code);
      }
    },
    computed: {
      filteredOrders(){
        return this.$store.getters.filteredOrders;
      }
    }
  }
</script>


<style lang="less" scoped>
  @import "../assets/global.less";

  #status-bar {
    background-color: #999;
    color: #fff;
    font-size: 2em;
    padding: 5px;
  }

  .right-col {
    width: 160px;
  }

  .new {
    background-color: @table-red;
  }

  .printing {
    background-color: @table-blue;
  }

  .shipped {
    background-color: @table-green;
  }

  .invoiced {
    background-color: @table-yellow;
  }

  .cancelled {
    background-color: @table-purple;
  }

</style>
