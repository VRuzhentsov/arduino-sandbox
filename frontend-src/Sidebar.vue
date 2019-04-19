<template>
    <aside>
        <ul>
            <li v-for="link in links">
                <router-link :to="link.url">{{link.title}}</router-link>
            </li>
        </ul>
    </aside>
</template>

<script>
  export default {
    data() {
      return {
        links: [
          {
            url: '/color-picker',
            title: 'Color picker for RGB LED'
          },
          {
            url: '/stepper-sandbox',
            title: 'Stepper sandbox'
          },
          {
            url: '/accelerometer-sandbox',
            title: 'Accelerometer sandbox'
          },
        ]
      };
    }
  };
</script>

<style lang="scss" scoped>
    ul {
        display: flex;
        flex-direction: column;
    }
</style>
