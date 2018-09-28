import api from '@/services/api';

export default({
  async fetchReports(context) {
    let res = await api().get('reports');
    context.commit('initReports', res.data.data);
  },
  async downloadReport(id){
    let res = await api().post('report/download', {id});
    if(res.data.success) {
      // Download printing report
      console.log('Opening ' + res.data.filename);
      window.location.href = 'api/reports/' + res.data.filename;
    } else {
      console.log(res.data.message);
    }
  }
})
