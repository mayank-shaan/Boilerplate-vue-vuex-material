<template>
  <v-container fluid fill-height class="ma-0 pa-0">
    <v-layout>
      <v-flex>
        <categorySwiper />
        <foraList />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import categorySwiper from './categorySwiper';
import foraList from './foraList';

export default {
  name: 'Dashboard',
  components: {
    categorySwiper,
    foraList,
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
