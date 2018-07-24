<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" v-show="showModal">
      <div class="modal">
        <header class="modal-header">
          <h1>Are you sure?</h1>
        </header>
        <section class="modal-body">

          <h2 v-model="description"></h2>

          <table>
            <tr>
              <td colspan="2" align="left">Desc:</td>
              <td colspan="11" align="left">{{ item.description }}</td>
            </tr>

            <tr>
              <td colspan="2" align="left">Type:</td>
              <td colspan="11" align="left">{{ item.kind }}</td>
            </tr>

            <tr>
              <td colspan="2" align="left">Date:</td>
              <td colspan="11" align="left">{{ item.date }}</td>
            </tr>

            <tr>
              <th class="mid-gray" colspan="5">Youth</th>
              <th class="mid-gray" colspan="8">Adult</th>
            </tr>

            <tr class="mid-gray wide-42">
              <td><label>XS</label></td>
              <td><label>S</label></td>
              <td><label>M</label></td>
              <td><label>L</label></td>
              <td><label>XL</label></td>

              <td><label>S</label></td>
              <td><label>M</label></td>
              <td><label>L</label></td>
              <td><label>XL</label></td>
              <td><label>2XL</label></td>
              <td><label>3XL</label></td>
              <td><label>4XL</label></td>
              <td><label>5XL</label></td>
            </tr>

            <tr>
              <td>{{ item.counts['y-xs'] }}</td>
              <td>{{ item.counts['y-s'] }}</td>
              <td>{{ item.counts['y-m'] }}</td>
              <td>{{ item.counts['y-l'] }}</td>
              <td>{{ item.counts['y-xl'] }}</td>

              <td>{{ item.counts['a-s'] }}</td>
              <td>{{ item.counts['a-m'] }}</td>
              <td>{{ item.counts['a-l'] }}</td>
              <td>{{ item.counts['a-xl'] }}</td>
              <td>{{ item.counts['a-2xl'] }}</td>
              <td>{{ item.counts['a-3xl'] }}</td>
              <td>{{ item.counts['a-4xl'] }}</td>
              <td>{{ item.counts['a-5xl'] }}</td>
            </tr>
          </table>

          <h4>Deleting an inventory item cannot be undone...</h4>
        </section>
        <footer class="modal-footer">
          <button type="button" class="btn-close" @click="close">
            Cancel
          </button>

          <button type="button" @click="deleteInvItem">
            Delete
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
  import InventoryService from '@/services/InventoryService';

  export default {
    name: 'InventoryDeleteModal',
    data() {
      return {
        showModal: false,
        item: {}
      }
    },
    mounted() {
      let self = this;
      this.$bus.$on('openInvDeleteModal', function(item){
        console.log('Item to delete: ' + item);
        self.prepareModal(item);
      });
    },
    beforeDestroy() {
      this.$bus.$off('openInvDeleteModal');
    },
    methods: {
      prepareModal(item){
        this.item = item;
        this.showModal = true;
      },
      close() {
        this.showModal = false;
      },
      async deleteInvItem(){
        this.showModal = false;
        await this.$store.dispatch('deleteItem', this.item._id);
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

  #inv-desc {
    width: 300px;
  }

  .wide-42 td {
    width: 42px;
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
