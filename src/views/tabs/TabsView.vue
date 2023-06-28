
<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
import { ref, watch } from 'vue'

// 记录当前选择的tab
const active = ref(route.name as string)
watch(active, (nv) => {
  router.push({ name: nv })
})
</script>
<template>
  <RouterView />
  <!-- <div class="center">{{ active }}</div> -->
  <VanTabbar v-model="active">
    <VanTabbarItem name="home" icon="home-o">首页</VanTabbarItem>
    <VanTabbarItem name="order" icon="bars">订单</VanTabbarItem>
    <VanTabbarItem name="me" icon="contact">我的</VanTabbarItem>
  </VanTabbar>
</template>
<style>
.center {
  text-align: center;
}
</style>