<template>
  <div class='card'>
    <h3 v-if='title'>{{ title }}</h3>
    <canvas ref='canvas' v-if='graph.length !== 0'></canvas>
    <!--div data-test-v-else>This graph has no data to display.</div-->
  </div>
</template>

<style lang='scss' scoped>

</style>

<script lang='ts'>
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Graph, MultiLineGraph } from '@/api-common';
import Chart, { ChartType, ChartData, ChartDataSets } from 'chart.js';
import 'chartjs-plugin-colorschemes';

@Component
export default class GraphCard extends Vue {
  @Prop({
    default: 'line',
  })
  private type!: ChartType;
  @Prop({
    required: true,
  })
  private graph!: MultiLineGraph;
  @Prop()
  private title?: string;
  private chart!: Chart;

  private mounted() {
    console.warn(this.graph);
    if (this.graph.length === 0) {
      return;
    }
    let chartData: ChartData;
    const graphToData = (graph: Graph) => graph.map((point) => ({x: new Date(point.date), y: point.value}));
    chartData = {
      datasets: this.graph.map((graph, i) => ({
        label: graph.term,
        data: graphToData(graph.points),
        // backgroundColor: getColor,
        // pointBorderColor: getColor,
        // pointBackgroundColor: getColor,
      })),
    };
    this.chart = new Chart(this.$refs.canvas as HTMLCanvasElement, {
      type: this.type,
      data: chartData,
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            distribution: 'linear',
            bounds: 'data',
          }],
        },
        elements: {
          line: {
            fill: false,
          },
        },
        plugins: {
          colorschemes: {
            scheme: 'tableau.SuperfishelStone10',
          },
        },
      },
    });
  }

}
</script>