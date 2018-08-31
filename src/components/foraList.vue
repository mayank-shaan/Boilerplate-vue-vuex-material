<template>
    <v-layout row class="mt-5">
      <v-flex d-flex xs12>
        <div>
          <div class="masonry-grid" >
            <div class="masonry-grid-sizer"></div>
            <div class="masonry-grid-item" v-for="(mood, index) in moods" :key="index">
              <fora :pMood="mood" />
            </div>
          </div>
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
