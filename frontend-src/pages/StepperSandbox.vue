<template>
    <div>
        <h2>Stepper sandbox</h2>
        <section class="slider">
            <vue-slider
                    v-model="sliderValue"
                    :min="-180"
                    :max="180"
            />
        </section>
    </div>
</template>

<script>
  import VueSlider from 'vue-slider-component';
  import 'vue-slider-component/theme/antd.css';

  import socket from '../ioServer';

  export default {

    components: {
      VueSlider
    },

    data() {
      return {
        sliderValue: 0
      };
    },

    watch: {
      sliderValue(newValue){
        socket.emit('message.stepper', {
          stepperPosition: newValue
        });
      }
    }
  };
</script>
