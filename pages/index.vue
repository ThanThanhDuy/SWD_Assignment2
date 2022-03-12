<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="getData">click to get data</button>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      message: ''
    }
  },
  methods: {
    async getData() {
      const res = await this.$api.getData()
      console.log(await res.json())
    }
  }
}
</script>
