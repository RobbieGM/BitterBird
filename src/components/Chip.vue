<template>
  <span class='chip' v-on='$listeners' v-bind='$attrs'><span class='material-icons' v-if='icon'>{{ icon }}</span><span class='text'><slot></slot></span></span>
</template>

<style lang='scss' scoped>
@import '@/style/common.scss';

.chip {
  display: inline-flex;
  background: $light-gray;
  margin-right: 8px;
  margin-bottom: 8px;
  border-radius: 4px;
  line-height: 24px;
  padding: 4px;
  height: 24px;
  align-items: center;
  font-size: 0.9rem;
  vertical-align: bottom; // For some reason they don't line up right if this isn't here
  .material-icons {
    color: $gray;
    height: 18px;
    line-height: 18px;
    font-size: 16px;
    vertical-align: middle;
  }
  .text {
    margin: 0 2px;
  }
}
</style>

<script lang='ts'>
import Vue from 'vue';
import {Prop, Component} from 'vue-property-decorator';

@Component
export default class Chip extends Vue {
  @Prop()
  public icon!: string;
}
</script>