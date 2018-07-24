<template>
  <div class="options-panel">
    <ul>
      <li><button v-on:click="showGenCodesModal">Generate Codes</button></li>
    </ul>
  </div>
</template>


<script>
  import PresaleService from '@/services/PresaleService';

  export default {
    name: 'PresaleOptionsPanel',
    methods: {
      showGenCodesModal(){
        this.$bus.$emit('openGenCodesModal');
      }
    }
  }
</script>


<style lang="less">
  @import "../assets/global.less";

</style>
