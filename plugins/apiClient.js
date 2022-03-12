export default (context, inject) => {
  inject('api', api)
  context.$api = api
}

const api = {
  getData() {
    return fetch('/api/getdata', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
