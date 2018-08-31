<template>
    <defaultHeader />
</template>
<script>
/* eslint-disable */
import { mapState } from 'vuex';
import defaultHeader from "./Header"

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
