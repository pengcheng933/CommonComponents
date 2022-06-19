<template>
  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :label="false">expand</el-radio-button>
    <el-radio-button :label="true">collapse</el-radio-button>
  </el-radio-group>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      select="handleSelect"
      router
      unique-opened
  >
    <!-- 将渲染导航每一项传给子组件渲染，item代表要渲染每一项 -->
    <SubAside :isCollapse="isCollapse" v-for="(item,index) in navs" :key="item.path" :menu="item" :index="item.path" />
  </el-menu>

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import router from '../router/module';
const navs =router.filter((item) => item.meta?.permission)[0].children // 过滤拿到数据
console.log(navs);

const isCollapse = ref(true); // 是否收起，默认不收起

</script>

<style lang="scss" scoped></style>
