import api from '@/services/api';

export default({
  async fetchPresales(context) {
    let res = await api().get('presales');
    if(res.data.success){
      context.commit('initPresales', res.data.data);
    } else {
      console.log(res.data.message);
    }
  },
  async generateCodes(context, batch){
    let res = await api().post('generate', batch);
    console.log(res.data);
    if(res.data.success){
      // todo - lock reports route
      window.location.href = 'reports/' + res.data.filename;
      context.commit('addPresaleCodes', res.data.data);
    } else {
      console.log(res.data.message);
    }
  }
})
