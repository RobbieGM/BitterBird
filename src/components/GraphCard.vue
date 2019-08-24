<template>
  
</template>

<style lang='scss' scoped>
</style>

<script lang='ts'>
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Graph } from '@/api-common';

@Component
export default class GraphCard extends Vue {
  @Prop({
    required: true,
  }) private graph!: Graph;
}
</script>