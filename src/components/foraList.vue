<template>
    <v-layout row class="mt-5">
      <v-flex d-flex xs12>
        <div>
            <masonry
            :cols="{default: 4, 1000: 3, 700: 2, 400: 1}"
            :gutter="{default: '10px', 700: '7px'}"
            >
            <!-- <div v-for="(item, index) in items" :key="index">Item: {{index + 1}}</div> -->
            <div class="grid-item ma-4" v-for="(mood, index) in moods" :key="index">
              <fora :pMood="mood" />
            </div>
          </masonry>
        </div>
      </v-flex>
    </v-layout>
</template>

<script>
import fora from './fora';
import data from './data.json';

export default {
  name: 'fora-list',
  components: {
    fora,
  },
  data: () => ({
    categoryFilter: null,
    moods: data.name,
  }),
  methods: {},
};
</script>

<style lang="stylus">
</style>
