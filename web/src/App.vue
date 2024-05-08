<template>
  <Navbar/>
  <router-view/>
</template>

<script setup>
import Navbar from '@/components/Navbar'
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
::-webkit-scrollbar {
  width: 2px;
  height: 2px;
  position: absolute;
}
::-webkit-scrollbar-thumb {
  background-color: #1890ff;
}
::-webkit-scrollbar-track {
  background-color: #dddddd;
}
</style>
