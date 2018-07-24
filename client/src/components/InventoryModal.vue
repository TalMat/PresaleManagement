<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" v-show="showModal">
      <div class="modal">
        <header class="modal-header">
          <h1>New Inventory Item</h1>
        </header>
        <section class="modal-body">

          <label for="inv-type">Type</label>
          <select id="inv-type" v-model="invType" @change="printValue">
            <option :value="{ value: 'product-order' }">
              Product Order</option>
            <option :value="{ value: 'misprint' }">
              Misprint</option>
            <option :value="{ value: 'adjustment' }">
              Adjustment (relative)</option>
            <option :value="{ value: 'update' }">
              Update (absolute)</option>
          </select>

          <label for="inv-desc">Description</label>
          <input id="inv-desc" maxlength="35" v-model="description">

          <table>
            <tr>
              <th class="mid-gray" colspan="5">Youth</th>
              <th class="mid-gray" colspan="8">Adult</th>
            </tr>


            <!--todo - refactor to remove repetition-->

            <tr class="mid-gray">
              <td><label for="y-xs">XS</label></td>
              <td><label for="y-s">S</label></td>
              <td><label for="y-m">M</label></td>
              <td><label for="y-l">L</label></td>
              <td><label for="y-xl">XL</label></td>

              <td><label for="a-s">S</label></td>
              <td><label for="a-m">M</label></td>
              <td><label for="a-l">L</label></td>
              <td><label for="a-xl">XL</label></td>
              <td><label for="a-2xl">2XL</label></td>
              <td><label for="a-3xl">3XL</label></td>
              <td><label for="a-4xl">4XL</label></td>
              <td><label for="a-5xl">5XL</label></td>
            </tr>
            <tr>
              <td><input maxlength="4" id="y-xs"  v-model="sizeCounts['y-xs']"></td>
              <td><input maxlength="4" id="y-s"   v-model="sizeCounts['y-s']"></td>
              <td><input maxlength="4" id="y-m"   v-model="sizeCounts['y-m']"></td>
              <td><input maxlength="4" id="y-l"   v-model="sizeCounts['y-l']"></td>
              <td><input maxlength="4" id="y-xl"  v-model="sizeCounts['y-xl']"></td>

              <td><input maxlength="4" id="a-s"   v-model="sizeCounts['a-s']"></td>
              <td><input maxlength="4" id="a-m"   v-model="sizeCounts['a-m']"></td>
              <td><input maxlength="4" id="a-l"   v-model="sizeCounts['a-l']"></td>
              <td><input maxlength="4" id="a-xl"  v-model="sizeCounts['a-xl']"></td>
              <td><input maxlength="4" id="a-2xl" v-model="sizeCounts['a-2xl']"></td>
              <td><input maxlength="4" id="a-3xl" v-model="sizeCounts['a-3xl']"></td>
              <td><input maxlength="4" id="a-4xl" v-model="sizeCounts['a-4xl']"></td>
              <td><input maxlength="4" id="a-5xl" v-model="sizeCounts['a-5xl']"></td>
            </tr>
          </table>
          <h5 v-if="invType.value === 'misprint'">(Note: All values will be subtracted from current inventory)</h5>
          <h5 v-if="invType.value === 'update'">(Note: Current inventory will be replaced with values entered)</h5>
          <h5 v-if="invType.value === 'adjustment'">(Note: Use negative count values to reduce inventory)</h5>
          <h5 v-if="invType.value === 'product-order'">(Note: All values will be added to current inventory)</h5>
        </section>
        <footer class="modal-footer">
            <button type="button" class="btn-close" @click="close">
              Cancel
            </button>

            <button type="button" @click="submitNewInv">
              Submit
            </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
  import InventoryService from '@/services/InventoryService';

  const size_init = {
    'y-xs': 0,  'y-s': 0,   'y-m': 0,   'y-l': 0,   'y-xl': 0,
    'a-xs': 0,  'a-s': 0,   'a-m': 0,   'a-l': 0,   'a-xl': 0,
    'a-2xl': 0, 'a-3xl': 0, 'a-4xl': 0, 'a-5xl': 0
  };

  export default {
    name: 'InventoryModal',
    data() {
      return {
        showModal: false,
        invType: '',
        description: '',
        sizeCounts: {}
      }
    },
    mounted() {
      let self = this;
      this.$bus.$on('openInvModal', function(){
        self.openNewInv();
      });
    },
    beforeDestroy() {
      this.$bus.$off('openInvModal');
    },
    methods: {
      initValues() {
        this.invType = '';
        this.description = '';
        for(let sz in size_init){
          this.sizeCounts[sz] = size_init[sz];
        }
      },
      openNewInv(){
        this.initValues();
        this.showModal = true;
      },
      close() {
        this.showModal = false;
      },
      async submitNewInv(){
        if(this.invType !== ''){
          let newItem = {};
          newItem.counts = {};

          newItem.kind = this.invType.value;
          newItem.description = this.description;
          for(let size in this.sizeCounts){
            if(parseInt(this.sizeCounts[size]) !== 0){
              newItem.counts[size] = parseInt(this.sizeCounts[size]);
            }
          }

          this.showModal = false;

          await this.$store.dispatch('createNewItem', newItem);
        }
      },
      printValue(){
        console.log('invType = ' + this.invType.value);
      }
    }
  }
</script>

<style lang="less">
  @import "../assets/global.less";

  table {
    padding-top: 20px;
  }

  input {
    width: 35px;
  }

  h5 {
    padding: 10px 0 0;
    margin: 0;
  }

  #inv-desc {
    width: 300px;
  }

  button {
    font-size: 1.2em;
    width: 280px;
    height: 40px;
    margin: 0 5px;
    border: none;
    border-bottom: 1px solid #ddd;
    outline: none;
    background-color: @background-dark;
    color: #eee;

    &:hover {
      background-color: @primary-background;
      color: #eee;
      cursor: pointer;
    }
  }

  .btn-close {
    background-color: #333;
    &:hover {
      background-color: #666;
    }
  }
</style>
