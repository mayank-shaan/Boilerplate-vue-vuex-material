<template>
  <div>
    <v-card class="mood" tile>
      <v-card-title primary-title class="pb-0 mood-blur">
          <v-layout wrap justify-space-around>
            <v-flex xs5 class="text-xs-left">
              <span class="flex-gr-1 ">
                <span class="font-weight-bold">
                  @{{pMood.user_name}}
                </span>
                <p class="grey--text" style="font-size: 12px">
                  {{pMood.reveal_time | moment("from", "now", true) }} left
                </p>
              </span>
            </v-flex>
            <v-flex xs5 class="text-xs-right">
              <span class="flex-gr-1">
                <span class="font-weight-bold green--text" v-if="pIndex%2 === 0">
                  ${{pMood.recipients}} <v-icon color="green" small>lens</v-icon>
                </span>
                <span class="font-weight-bold grey--text" v-else>
                  ${{pMood.recipients}}
                </span>
                <p class="grey--text" style="font-size: 12px">
                  {{(Math.random() * (0.120 - 0.0200) + 0.0200).toFixed(4) }} ETH
                </p>
              </span>
            </v-flex>
          </v-layout>

      </v-card-title>

      <div class="fora-heading">
        <p class="text-justify mb-0 px-3">
          {{pMood.title}}
        </p>
      </div>
      <!-- Text/like Mood -->

      <!-- Bottom Bar -->
      <v-card-actions class="mood-footer pa-1 pb-3">
        <v-container class="pa-0" >
          <v-layout row justify-space-around>
            <v-flex d-flex xs3 class="justify-content-center">
              <span
              class="disqus-comment-count grey--text"
              data-disqus-url="#" style="flex-grow: 0;">{{pMood.recipients}}</span>
              <v-btn v-if="!pMood.reported" icon @click="reportModal = true">
                <v-icon color="secondary lighten-3">supervised_user_circle </v-icon>
              </v-btn>
            </v-flex>
            <v-flex d-flex xs3 class="justify-content-center">
              <span
              class="disqus-comment-count grey--text"
              data-disqus-url="#" style="flex-grow: 0;">{{pMood.sort_count}}</span>
              <v-btn icon @click="activeEditMoodModal()"   v-if="true">
                <!-- <font-awesome-icon icon="times"
                class="lighten-3" :style="{ color: 'grey' }"/> -->
                <v-icon color="secondary lighten-3">compare_arrows</v-icon>
              </v-btn>
            </v-flex>
            <v-flex d-flex xs3 class="justify-content-center">
              <span
              class="disqus-comment-count grey--text"
              data-disqus-url="#" style="flex-grow: 0;">{{pMood.answer_count}}</span>
              <v-btn icon @click="openMoodDetail()"  >
                <v-icon color="secondary lighten-3">question_answer</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-actions>

    </v-card>
  </div>
</template>

<script>

export default {
  name: 'fora2',
  props: ['pMood', 'pIndex'],
  components: {},
  data: () => ({
    categoryFilter: null,
  }),
  methods: {},
};
</script>

<style lang="stylus">
</style>
