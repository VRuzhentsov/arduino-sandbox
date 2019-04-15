import VueRouter from 'vue-router';
import ColorPickerWithLed from '../pages/ColorPickerWithLed.vue';

const routes = [
  {
    name: 'color-picker',
    path: '/color-picker',
    component: ColorPickerWithLed,
  },
];

const router = new VueRouter({
  routes, // short for `routes: routes`
});

export default router;
