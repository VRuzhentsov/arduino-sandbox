import VueRouter from 'vue-router';
import ColorPickerWithLed from '../pages/ColorPickerWithLed.vue';
import StepperSandbox from '../pages/StepperSandbox.vue';

const routes = [
  {
    path: '/color-picker',
    component: ColorPickerWithLed,
  },
  {
    path: '/stepper-sandbox',
    component: StepperSandbox,
  },
];

const router = new VueRouter({
  routes, // short for `routes: routes`
});

export default router;
