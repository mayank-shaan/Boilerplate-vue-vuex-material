<template>
  <v-container fluid fill-height class="ma-0 pa-0">
    <v-layout>
      <v-flex>
        <categorySwiper />
        <foraList2 whichFora="fora2" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import categorySwiper from './categorySwiper';
import foraList2 from './foraList2';

export default {
  name: 'Favourite',
  components: {
    categorySwiper,
    foraList2,
  },
  data: () => ({}),
  props: {
    source: String,
  },
};
</script>

<style lang="stylus">
  #keep
    .v-navigation-drawer__border
      display: none
</style>
