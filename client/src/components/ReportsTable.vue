<template>
  <div id="reports-container" class="data-container">

    <table id="reports-table" class="data-table">
      <thead class="data-heading">
      <tr>
        <th colspan="5"><h1>Reports</h1></th>
      </tr>

      <tr>
        <th>Description</th>
        <th>Type</th>
        <th>Date</th>
        <th class="dl-btn-cell"></th>
      </tr>

      </thead>

      <tbody>
      <tr v-for="report in reports"
          :class="report.kind">
        <td>{{ report.description }}</td>
        <td>{{ report.kind }}</td>
        <td>{{ formatDate(report.date) }}</td>
        <td class="dl-btn-cell"><button class="dl-btn" @click="download(report)">
          <svg height="25" width="25" viewBox="-35 -40 527 532">
            <path d="M395.25,153h-102V0h-153v153h-102l178.5,178.5L395.25,153z M38.25,382.5v51h357v-51H38.25z"
                  fill="#FFFFFF">
            </path>
          </svg>
        </button></td>
      </tr>

      </tbody>

    </table>

  </div>

</template>


<script>
  import ReportService from '@/services/ReportService';

  export default {
    name: 'ReportsTable',
    mounted(){
      this.loadReports();
    },
    methods: {
      async loadReports(){
        await this.$store.dispatch('fetchReports');
      },
      formatDate(date){
        let formattedDate = '';
        if(typeof date === 'string'){
          formattedDate = date.split('T')[0];
        }

        if(typeof date === 'number'){
          formattedDate = new Date(date).toISOString().split('T')[0];
        }

        console.log('Formatted Date: ' + formattedDate);
        return formattedDate;
      },
      download(report){
        console.log('Downloading report: ' + report.description + ' | ' + report.kind + ' | ' + report.date);
        ReportService.downloadReport(report._id);
      }
    },
    computed: {
      reports(){
        return this.$store.getters.reports;
      }
    }
  }
</script>


<style lang="less">
  @import "../assets/global.less";

  .dl-btn {
    border: none;
    padding: 0;
    margin: 0;
    position: relative;
    top: 3px;
    width: 25px;
    height: 25px;
    background-color: rgba(0, 0, 0, 0.2);
    color: white;

    &:hover {
      background-color: rgba(0, 0, 0, 0.6);
    }
  }

  .dl-btn-cell {
    width: 30px;
    padding: 0;
  }

  .presale {
    background-color: @table-red;
  }

  .production {
    background-color: @table-blue;
  }

  .shipping {
    background-color: @table-green;
  }

  .invoice {
    background-color: @table-yellow;
  }

  .general {
    background-color: @table-purple;
  }

</style>
