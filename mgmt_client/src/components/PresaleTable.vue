<template>
  <div id="presale-container" class="data-container">

    <table id="presale-table" class="data-table">
      <thead>
      <tr>
        <th colspan="2"><h1>Presales</h1></th>
      </tr>
      <tr>
        <th>Code</th>
        <th>Batch Name</th>
        <th class="right-col">Status</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="code in presaleCodes"
          :class="availableClass(code.available)">
        <td>{{ code.code }}</td>
        <td>{{ code.batch }}</td>
        <td class="right-col">{{ code.available ? 'Available' : 'Redeemed' }}</td>
      </tr>
      </tbody>

    </table>
  </div>
</template>


<script>
  export default {
    name: 'PresaleTable',
    data() {
      return {}
    },
    mounted(){
      this.loadPresales();
    },
    methods: {
      async loadPresales(){
        await this.$store.dispatch('fetchPresales');
      },
      availableClass(available){
        if(available){
          return 'available';
        } else {
          return 'redeemed';
        }
      }
    },
    computed: {
      presaleCodes() {
        return this.$store.getters.presaleCodes;
      }
    }
  }
</script>


<style lang="less">
  @import "../assets/global.less";

  .right-col {
    width: 120px;
  }

  .redeemed {
    background-color: @table-red;
  }

  .available {
    background-color: @table-blue;
  }

</style>
