<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" v-show="showModal">
      <div class="modal">
        <header class="modal-header">
          <h1>Generate New Presale Codes</h1>
        </header>
        <section class="modal-body">


          <label for="batch-name">Batch Name</label>
          <input id="batch-name" maxlength="35" v-model="batchName">

          <label for="code-count">Code Qty</label>
          <input id="code-count" maxlength="4" v-model="codeCount">

          <h5>(Note: Maximum quantity per batch is 5000)</h5>
        </section>
        <footer class="modal-footer">
          <button type="button" class="btn-close" @click="close">
            Cancel
          </button>

          <button type="button" @click="submitGenCodes">
            Submit
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
  import PresaleService from '@/services/PresaleService';

  export default {
    name: 'PresaleGenerateCodesModal',
    data() {
      return {
        showModal: false,
        batchName: '',
        codeCount: 0
      }
    },
    mounted() {
      let self = this;
      this.$bus.$on('openGenCodesModal', function(){
        self.openGenCodes();
      });
    },
    beforeDestroy() {
      this.$bus.$off('openGenCodesModal');
    },
    methods: {
      initValues() {
        this.batchName = '';
        this.codeCount = '';
      },
      openGenCodes(){
        this.initValues();
        this.showModal = true;
      },
      close() {
        this.showModal = false;
      },
      async submitGenCodes(){
        if(this.batchName !== '' && this.codeCount > 0){

          console.log('Code Qty: ' + this.codeCount);
          console.log('Batch Name: ' + this.batchName);

          let codeInfo = {
            qty: parseInt(this.codeCount),
            batch: this.batchName
          };

          this.showModal = false;

          await this.$store.dispatch('generateCodes', codeInfo);
        }
      }
    }
  }
</script>

<style lang="less">
  @import "../assets/global.less";

  #batch-name {
    width: 150px;
    padding-right: 20px;
  }

  #code-count {
    width: 50px;
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
