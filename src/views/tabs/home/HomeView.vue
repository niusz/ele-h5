<script setup lang="ts">
import type {IHomeInfo} from '@/types'
import TheTop from './components/TheTop.vue'
import TheTransformer from './components/TheTransformer.vue'
import SearchView from '@/views/search/SearchView.vue'
import {useToggle} from '@/use/useToggle'
import {useAsync} from '@/use/useAsync'
import { fetchHomePageData } from '@/api/home'
import OpLoadingView  from './components/OpLoadingView.vue'

const [isSearchViewShown, toggleSearchView] = useToggle(false)

const {data, pending} = useAsync(fetchHomePageData, {} as IHomeInfo)
</script>

<template>
  <div class="home-page">
    <Transition name="fade">

      <SearchView v-if="isSearchViewShown" @cancel="toggleSearchView"></SearchView>
    </Transition>
    <TheTop :recomments="data.searchRecomments" @searchClick="toggleSearchView"/>

    <OpLoadingView :loading="pending" type="skeleton">
      <div class="home-page__banner">
        <img v-for="v in data.banner" :key="v.imgUrl"
        :src="v.imgUrl"/>
      </div>
      <TheTransformer :data="data.transformer"></TheTransformer>
    </OpLoadingView>
  </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, 
.fade-enter-leave {
  opacity: 0;
}

.home-page {
  background: var(--op-gray-bg-color);

  &__banner {
    img {
      width: 100%;
      padding-top: 10px;
      background: white;
    }
  }
}
</style>