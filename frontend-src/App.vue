<template>
    <div class="app">
        <Sidebar class="sidebar"/>
        <router-view class="router-view"/>
    </div>
</template>

<script>
  import Sidebar from './Sidebar.vue';

  export default {
    components: {
      Sidebar
    },

    data() {
      return {};
    },

    methods: {},

    mounted() {}
  };
</script>

<style lang="scss">
    .app {
        display: flex;
        overflow-x: hidden;

        .sidebar,
        .router-view{
            height: 100vh;
            display: flex;
            flex-direction: column;
            padding: 15px;
        }

        .sidebar{
            border-right: gray 1px solid;
            width:20vw;
        }
        .router-view {
            width: 80vw;
        }
    }
</style>
