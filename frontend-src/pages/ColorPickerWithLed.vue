<template>
    <section class="demo">
        <div class="center">
            <div class="color-picker"></div>
        </div>
        <p>(Tap it)</p>
    </section>
</template>

<script>
  import Pickr from '../../node_modules/@simonwep/pickr/dist/pickr.es5.min';
  import socket from '../ioServer';

    export default {
      methods: {
        initColorPicker() {
          const pickr = new Pickr({
            el: '.color-picker',

            default: '#42445A',

            position: 'left',

            swatches: [
              'rgba(244, 67, 54, 1)',
              'rgba(233, 30, 99, 0.95)',
              'rgba(156, 39, 176, 0.9)',
              'rgba(103, 58, 183, 0.85)',
              'rgba(63, 81, 181, 0.8)',
              'rgba(33, 150, 243, 0.75)',
              'rgba(3, 169, 244, 0.7)',
              'rgba(0, 188, 212, 0.7)',
              'rgba(0, 150, 136, 0.75)',
              'rgba(76, 175, 80, 0.8)',
              'rgba(139, 195, 74, 0.85)',
              'rgba(205, 220, 57, 0.9)',
              'rgba(255, 235, 59, 0.95)',
              'rgba(255, 193, 7, 1)'
            ],

            components: {

              preview: true,
              opacity: true,
              hue: true,

              interaction: {
                hex: true,
                rgba: true,
                hsva: true,
                input: true,
                clear: true,
                save: true
              }
            }
          });

          pickr.on('change', (pickrObj) => {
            const hexObj = pickrObj.toHEX();
            const hexValueNumber = hexObj[0] + hexObj[1] + hexObj[2];
            console.log(hexValueNumber);
            socket.emit('message', { color: hexValueNumber });
          });
        },
      },

      mounted(){
        this.initColorPicker();
      }
    }
</script>
