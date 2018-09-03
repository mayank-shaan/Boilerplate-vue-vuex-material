<template>
    <v-layout row class="mt-5" v-resize="onResize">
      <v-flex d-flex xs12>
          <div
            v-masonry
            transition-duration="0.3s"
            item-selector=".item"
            :column-width="windowSize.x/12"
            :origin-top="true"
            :horizontal-order="false"
          >
          <div
            v-masonry-tile
            class="item"
            v-for="(mood, index) in moods"
            :key="index"
          >
            <fora class="ma-4"
              v-if="whichFora === 'fora'"
              :pMood="mood"
              :pIndex="index"
              style="width: 300px; max-width: 300px;"
            />
            <fora2 class="ma-4"
              v-if="whichFora === 'fora2'"
              :pMood="mood"
              :pIndex="index"
              style="width: 300px; max-width: 300px;"
            />
          </div>
        </div>
      </v-flex>
    </v-layout>
</template>

<script>
import fora from './fora';
import fora2 from './fora2';
import data from './data.json';

export default {
  name: 'fora-list2',
  components: {
    fora,
    fora2,
  },
  props: ['whichFora'],
  data: () => ({
    categoryFilter: null,
    moods: data.name,
    windowSize: { x: 0, y: 0 },
  }),
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
      this.$redrawVueMasonry();
    },
  },
  mounted() {
    this.onResize();
  },
};
</script>

<style lang="stylus">
</style>
