<template>
  <div>
    <v-card class="mood" tile>
      <v-card-title primary-title class="pb-0 mood-blur">
        <div class="fora-heading">
        <p class="text-justify mb-0">
          {{pMood.title}}
        </p>
      </div>
      </v-card-title>

      <!-- Text/like Mood -->
      <v-card-actions class="py-0">

        <!-- Like/category -->
        <v-container  grid-list-lg class="px-1 py-2">
          <!-- Like -->
          <v-layout row wrap>
            <v-flex xs6 class="d-flex align-center pb-0">
              <span class="flex-gr-1 text-xs-left">
                <span class="font-weight-bold">
                  @{{pMood.user_name}}
                </span>
                  <p class="grey--text" style="font-size: 12px">
                    {{pMood.reveal_time | moment("from", "now", true) }} left
                  </p>
              </span>
            </v-flex>
            <v-flex xs6 class="d-flex align-center pb-0">
              <v-chip  color="primary"  text-color="white" small>
                <v-icon color="blue">home</v-icon>
                &nbsp; category
              </v-chip>
            </v-flex>
          </v-layout>
          <!-- category -->

        </v-container>
        <!-- End - Like/category -->

      </v-card-actions>
      <!-- End Text/like Mood -->

      <!-- Bottom Bar -->
      <v-card-actions class="mood-footer pa-1">
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
  name: 'fora',
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
