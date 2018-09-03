<template>
    <defaultHeader />
</template>
<script>
/* eslint-disable */
import Vue from 'vue';
import { mapState } from 'vuex';
import defaultHeader from "./Header"
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

import {
  faTimes,
} from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(
  faTimes,
);

Vue.component('font-awesome-icon', FontAwesomeIcon)

export default {
  name: 'shell',
  components: {
    defaultHeader,
  },
  data() {
    return {

    };
  },
};

</script>

<style lang="scss">
/* eslint-enable */
.cursor-pointer {
  cursor: pointer;
}
</style>
