import api from '@/services/api';

export default({
  async fetchReports(context) {
    let res = await api().get('reports');
    context.commit('initReports', res.data.data);
  },
  downloadReport(filename){
    window.open('../api/reports/' + filename);
  }
})
