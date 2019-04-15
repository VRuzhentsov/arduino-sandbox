<template>
    <div>
        <Sidebar/>
        <router-view/>
    </div>
</template>

<script>
  import Sidebar from './Sidebar.vue'

  export default {
    components: {
      Sidebar
    },

    data() {
      return {}
    },

    methods: {},

    mounted() {}
  };
</script>
