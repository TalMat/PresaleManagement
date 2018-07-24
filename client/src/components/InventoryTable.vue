<template>
  <div id="inventory-container">

    <table id="inventory-table" class="data-table">
      <thead class="data-heading">
      <tr>
        <th colspan="2"><h1>Inventory</h1></th>
      </tr>

      <tr>
        <th>Type</th>
        <th>Description</th>
      </tr>
      </thead>

      <tr @click="hoverCurrent" v-model="current" class="current">
        <td>{{ current.kind }}</td>
        <td>{{ current.description }}</td>
        <td class="delete"></td>
      </tr>

      <tr v-for="item in inventory" @click="hoverItem(item)" :class="item.kind">
        <td>{{ item.kind }}</td>
        <td>{{ item.description }}</td>
        <td class="delete" >
          <button @click="showInvDeleteModal(item)"
            v-if="item.kind !== 'production'">×</button></td>
      </tr>
    </table>



    <div id="info-container" v-model="currentHover">
      <table id="item-details">
        <tr>
          <td colspan="2" align="left">Desc:</td>
          <td colspan="11" align="left">{{ currentHover.description }}</td>
        </tr>

        <tr>
          <td colspan="2" align="left">Type:</td>
          <td colspan="11" align="left">{{ currentHover.kind }}</td>
        </tr>

        <tr>
          <td colspan="2" align="left">Date:</td>
          <td colspan="11" align="left">{{ currentHover.date }}</td>
        </tr>

        <tr>
          <th colspan="5">Youth</th>
          <th colspan="8">Adult</th>
        </tr>

        <tr>
          <th>XS</th>
          <th>S</th>
          <th>M</th>
          <th>L</th>
          <th>XL</th>

          <th>S</th>
          <th>M</th>
          <th>L</th>
          <th>XL</th>
          <th>2XL</th>
          <th>3XL</th>
          <th>4XL</th>
          <th>5XL</th>
        </tr>

        <tr>
          <td>{{ currentHover.counts['y-xs']  }}</td>
          <td>{{ currentHover.counts['y-s']   }}</td>
          <td>{{ currentHover.counts['y-m']   }}</td>
          <td>{{ currentHover.counts['y-l']   }}</td>
          <td>{{ currentHover.counts['y-xl']  }}</td>

          <td>{{ currentHover.counts['a-s']   }}</td>
          <td>{{ currentHover.counts['a-m']   }}</td>
          <td>{{ currentHover.counts['a-l']   }}</td>
          <td>{{ currentHover.counts['a-xl']  }}</td>
          <td>{{ currentHover.counts['a-2xl'] }}</td>
          <td>{{ currentHover.counts['a-3xl'] }}</td>
          <td>{{ currentHover.counts['a-4xl'] }}</td>
          <td>{{ currentHover.counts['a-5xl'] }}</td>
        </tr>
      </table>
    </div>

  </div>
</template>


<script>

  let blankItem = {
    'y-xs': '',   'y-s': '',    'y-m': '',    'y-l': '',
    'y-xl': '',   'a-s': '',    'a-m': '',    'a-l': '',
    'a-xl': '',   'a-2xl': '',  'a-3xl': '',  'a-4xl': '',
    'a-5xl': ''
  };

  export default {
    name: 'InventoryTable',
    data() {
      return {
        currentHover: {
          counts:{ 'y-xs': ' ' }
        }
      }
    },
    mounted() {
      this.loadInventory();
    },
    methods: {
      async loadInventory(){
        await this.$store.dispatch('fetchInventory');
      },
      hoverItem(item) {
        let itemCopy = {};
        Object.assign(itemCopy, item);

        for(let s in blankItem){
          if(item.counts[s] !== undefined){
            itemCopy.counts[s] = item.counts[s];
          } else {
            itemCopy.counts[s] = blankItem[s];
          }
        }

        // Reformat temp data here rather than in view
        itemCopy.date = itemCopy.date.split('T')[0];

        this.currentHover = itemCopy;
      },
      showInvDeleteModal(item){
        this.$bus.$emit('openInvDeleteModal', item);
      },
      hoverCurrent(){
        this.currentHover = this.$store.getters.currentInventory;
      }
    },
    computed: {
      inventory(){
        return this.$store.getters.inventory;
      },
      current(){
        let current = this.$store.getters.currentInventory;
        return current;
      }
    }
  }
</script>


<style lang="less" scoped>
  @import "../assets/global.less";

  #inventory-container {
    position: fixed;
    top: 60px;
    bottom: 170px;
    left: 0;
    right: 300px;
    overflow-y: scroll;
    padding: 30px 0 0;
    background-color: rgba(0, 0, 0, 0);
  }

  #info-container {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 300px;
    /*width: 634px;*/
    height: 150px;
    z-index: 3;

    background-color: #fff;
    padding: 10px 10px 10px 30px;
  }

  #item-details {
    max-width: 575px;

    tr{
      th {
        font-size: 14px;
        background-color: #999;
        color: #fff;
        width: 40px;
      }
      td {
        width: 40px;
        background-color: transparent;
        color: #000;
      }
    }
  }

  .delete {
    width: 30px;
    button {
      border: none;
      width: 25px;
      height: 25px;
      background-color: rgba(0, 0, 0, 0.3);
      color: white;

      &:hover {
        background-color: rgba(255, 0, 0, 0.5);
      }

    }
  }

  .product-order {
    background-color: @table-blue;
  }

  .misprint {
    background-color: @table-red;
  }

  .adjustment {
    background-color: @table-green;
  }

  .update {
    background-color: @table-yellow;
  }

  .production {
    background-color: @table-purple;
  }

  .current {
    background-color: #cc913d;
  }

</style>
