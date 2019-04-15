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
          }
        ]
      };
    }
  };
</script>
