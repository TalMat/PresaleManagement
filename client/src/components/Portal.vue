<template>
  <div id="portal">

    <!--Modal needs to be here to function correctly-->
    <InventoryModal></InventoryModal>
    <InventoryDeleteModal></InventoryDeleteModal>
    <PresaleGenerateCodesModal></PresaleGenerateCodesModal>

    <div id="nav">
      <ul>
        <li><button v-on:click="setCurrentTab('Order')">Orders</button></li>
        <li><button v-on:click="setCurrentTab('Inventory')">Inventory</button></li>
        <li><button v-on:click="setCurrentTab('Presale')">Presale</button></li>
        <li><button v-on:click="setCurrentTab('Reports')">Reports</button></li>
      </ul>
      <a id="logout-link" href="/logout">
        <svg height="30px" viewBox="0 0 512 512">
          <path fill="white" stroke="white"
                d="M330.667,384h-21.333c-5.891,0-10.667,4.776-10.667,10.667v74.667h-256V42.667h256v74.667
                c0,5.891,4.776,10.667,10.667,10.667h21.333c5.891,0,10.667-4.776,10.667-10.667V42.667C341.333,19.103,322.231,0,298.667,0h-256
                C19.103,0,0,19.103,0,42.667v426.667C0,492.898,19.103,512,42.667,512h256c23.564,0,42.667-19.102,42.667-42.667v-74.667
                C341.333,388.776,336.558,384,330.667,384z"/>

          <path fill="white" stroke="white"
                d="M508.542,248.135l-128-117.333c-3.125-2.844-7.656-3.625-11.5-1.896c-3.875,1.698-6.375,5.531-6.375,9.76V160
                c0,3.021,1.281,5.906,3.531,7.927l74.151,66.74H138.667c-5.896,0-10.667,4.771-10.667,10.667v21.333
                c0,5.896,4.771,10.667,10.667,10.667h301.682l-74.151,66.74c-2.25,2.021-3.531,4.906-3.531,7.927v21.333
                c0,4.229,2.5,8.063,6.375,9.76c1.375,0.615,2.844,0.906,4.292,0.906c2.615,0,5.198-0.969,7.208-2.802l128-117.333
                C510.75,261.844,512,258.99,512,256S510.75,250.156,508.542,248.135z"/>
        </svg></a>
    </div>
    <div id="table">
      <keep-alive>
        <component v-bind:is="currentTable"></component>
      </keep-alive>
    </div>
    <div id="options-panel">
      <keep-alive>
        <component v-bind:is="currentOptionsPanel"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import OrderTable                 from '@/components/OrderTable';
  import OrderOptionsPanel          from '@/components/OrderOptionsPanel';

  import InventoryTable             from '@/components/InventoryTable';
  import InventoryOptionsPanel      from '@/components/InventoryOptionsPanel';
  import InventoryModal             from '@/components/InventoryModal';
  import InventoryDeleteModal       from '@/components/InventoryDeleteModal';

  import PresaleTable               from '@/components/PresaleTable';
  import PresaleOptionsPanel        from '@/components/PresaleOptionsPanel';
  import PresaleGenerateCodesModal  from '@/components/PresaleGenerateCodesModal';

  import ReportsTable               from '@/components/ReportsTable';
  import ReportsOptionsPanel        from '@/components/ReportsOptionsPanel';


  export default {
    name: 'Portal',
    components: {
      OrderTable,
      OrderOptionsPanel,

      InventoryTable,
      InventoryOptionsPanel,
      InventoryModal,
      InventoryDeleteModal,

      PresaleTable,
      PresaleOptionsPanel,
      PresaleGenerateCodesModal,

      ReportsTable,
      ReportsOptionsPanel
    },
    data: function(){
      return {
        currentTab: 'Order'
      }
    },
    methods: {
      setCurrentTab(curTab){
        this.currentTab = curTab;
      }
    },
    computed: {
      currentTable: function(){
        return this.currentTab + 'Table';
      },
      currentOptionsPanel: function(){
        return this.currentTab + 'OptionsPanel';
      }
    }
  }
</script>

<style lang="less">
  @import "../assets/global.less";

  body {
    overflow-y: hidden;
  }

  #nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    z-index: 2;
    ul {
      height: 100%;
      list-style: none;
      padding: 0;
      margin: 0;
      background-color: @background-dark;
    }
    li {
      display: inline-block;
      width: 120px;
      height: 40px;
      float: left;
      padding: 10px 0 0 25px;
    }
    button {
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
      font-size: 1.4em;
      background-color: #333;
      color: #ffffff;
      outline: none;
      cursor: pointer;
      box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.4);
      /*border: none;*/
      border: solid #515151 1px;
      border-bottom: none;
      border-right: none;
      /*border-radius: 10px 10px 0 0;*/
    }
    button:hover {
      background-color: #666;
      border: solid #7d7d7d 1px;
      /*color: #000;*/
    }
  }

  #table {
    position: absolute;
    top: 60px;
    left: 0;
    right: 300px;
    bottom: 0;
    overflow-y: scroll;
    background-color: #ddd;
  }

  #options-panel {
    z-index: 3;
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100%;
  }

  #logout-link {
    position: absolute;
    right: 315px;
    top: 15px;
  }
</style>
