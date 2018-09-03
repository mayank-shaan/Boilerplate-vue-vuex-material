<template>
  <v-container fluid class="ma-0 pa-0">
    <v-layout row justify-center >
      <v-flex d-flex xs10>
        <swiper :options="swiperOption" ref="mySwiper" style="height: 40px;">
          <!-- slides -->
          <swiper-slide v-for="category of categories" :key="category.id">
            <v-chip :color="category.color"
            :selected="categoryFilter == category.id"
            text-color="white"
            @click="categoryFilter = category.id;">
              <v-icon :color="category.colorIcon">{{ category.icon}}</v-icon>
              {{ category.description }}
            </v-chip>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-button-prev pr-3" slot="button-prev"></div>
          <div class="swiper-button-next pl-3" slot="button-next"></div>
        </swiper>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  name: 'category-swiper',
  components: {
    swiper,
    swiperSlide,
  },
  data: () => ({
    categoryFilter: null,
    swiperOption: {
      slidesPerView: 7,
      spaceBetween: 15,
      breakpoints: {
        600: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        960: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
        1264: {
          slidesPerView: 5,
          spaceBetween: 15,
        },
        1904: {
          slidesPerView: 7,
          spaceBetween: 15,
        },
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    },
    categories: [
      {
        id: 1,
        description: 'All',
        icon: 'public',
        color: 'grey',
        colorIcon: 'grey darken-4',
      },
      {
        id: 2,
        description: 'Politics',
        icon: 'account_balance',
        color: 'blue-grey',
        colorIcon: 'blue-grey darken-4',
      },
      {
        id: 3,
        description: 'Games',
        icon: 'gamepad',
        color: 'red',
        colorIcon: 'red darken-4',
      },
      {
        id: 4,
        description: 'Film',
        icon: 'movie_filter',
        color: 'brown',
        colorIcon: 'brown darken-4',
      },
      {
        id: 5,
        description: 'Music',
        icon: 'headset',
        color: 'indigo',
        colorIcon: 'indigo darken-4',
      },
      {
        id: 6,
        description: 'Fun',
        icon: 'sentiment_satisfied',
        color: 'yellow',
        colorIcon: 'yellow darken-4',
      },
      {
        id: 7,
        description: 'Love',
        icon: 'favorite',
        color: 'pink',
        colorIcon: 'pink darken-4',
      },
      {
        id: 8,
        description: 'Friendship',
        icon: 'people',
        color: 'deep-purple',
        colorIcon: 'deep-purple darken-4',
      },
      {
        id: 9,
        description: 'food',
        icon: 'cake',
        color: 'light-blue',
        colorIcon: 'light-blue darken-4',
      },
      {
        id: 10,
        description: 'Ambient',
        icon: 'local_florist',
        color: 'green',
        colorIcon: 'green darken-4',
      },
      {
        id: 11,
        description: 'outburst',
        icon: 'sentiment_neutral',
        color: 'teal',
        colorIcon: 'teal darken-4',
      },
      {
        id: 12,
        description: 'fool',
        icon: 'mood_bad',
        color: 'lime',
        colorIcon: 'lime darken-4',
      },
      {
        id: 13,
        description: 'Tecnology',
        icon: 'important_devices',
        color: 'orange',
        colorIcon: 'orange darken-4',
      },
    ],
  }),
  methods: {},
};
</script>

<style lang="stylus">
</style>
