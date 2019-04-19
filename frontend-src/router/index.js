import VueRouter from 'vue-router';
import ColorPickerWithLed from '../pages/ColorPickerWithLed.vue';
import StepperSandbox from '../pages/StepperSandbox.vue';
import AccelerometerSandbox from '../pages/AccelerometerSandbox.vue';

const routes = [
  {
    path: '/color-picker',
    component: ColorPickerWithLed,
  },
  {
    path: '/stepper-sandbox',
    component: StepperSandbox,
  },
  {
    path: '/accelerometer-sandbox',
    component: AccelerometerSandbox,
  },
];

const router = new VueRouter({
  routes, // short for `routes: routes`
});

export default router;
