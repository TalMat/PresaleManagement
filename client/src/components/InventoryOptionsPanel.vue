<template>
  <div class="options-panel">
    <ul>
      <li>
        <button id="new-inventory" @click="showInvModal">New Inventory Item</button>
      </li>
    </ul>
  </div>
</template>


<script>
  import InventoryService from '@/services/InventoryService';

  export default {
    name: 'InventoryOptionsPanel',
    methods: {
      showInvModal() {
        this.$bus.$emit('openInvModal');
      }
    }
  }
</script>


<style lang="less">
  @import "../assets/global.less";
</style>
