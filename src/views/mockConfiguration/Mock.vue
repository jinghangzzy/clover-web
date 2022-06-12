<template>
  <a-result status="403" title="努力建设中..." sub-title="请再给我一点点时间...">
    <template #extra>
      <a-button type="primary" @click="toHome">
        返回首页
      </a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: 'Mock',
  methods: {
    toHome () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
