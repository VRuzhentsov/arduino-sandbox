<template>
    <div>
        <h2>Accelerometer sandbox</h2>
        <section >
            <p>X: {{accelerometer.x}}</p>
            <p>Y: {{accelerometer.y}}</p>
            <p>Z: {{accelerometer.z}}</p>

        </section>
        <div class="card-wrapper">
            <div id="card-1" class="card" :style="`transform:rotateX(${-(accelerometer.x)*10}deg) rotateY(${(accelerometer.y)*10}deg)`">
                <div class="border">
                    <header>
                        <h2>#Codevember</h2>
                        <h1>DAY <span>9</span></h1>
                    </header>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import socket from '../ioServer';

  export default {
    data() {
      return {
        accelerometer: {},
        gyro: {},
        thermometer: {},
      };
    },

    watch: {

    },

    created() {
      socket.on('message.imu', data => {
        this.accelerometer = data.accelerometer;
        this.gyro = data.gyro;
        this.thermometer = data.thermometer;
      });

    }
  };
</script>


<style scoped>
    body, html, canvas {
        overflow: hidden;
        background-color: #E9E9ED;
        color : #011627;
        margin: 0;
        font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif;
    }

    ul {
        list-style-type : none;
        padding : 0 10px;
    }

    .coordinate {
        position : fixed;
        color : #A6B9C0;
        bottom : 0;
        left : 10px;
        perspective:800px;
    }

    .card-wrapper {
        position: absolute;
        width : 50%;
        height : 50%;
        top:50%;
        left:50%;
        transform:translate( -50%, -50% );
        perspective : 400px;
    }

    .card {
        width : 100%;
        height: 100%;
        border : 2px solid #011627;
        transform-style: preserve-3d;
        backface-visibility: hidden;
    }

    .card header {
        position: absolute;
        top:50%;
        left:50%;
        transform:translate( -50%, -50% );
        text-align : center;
        perspective : 400px;
        transform-style: preserve-3d;
    }

    .card h1 {
        font-size : 500%;
        transform : translateZ(80px);
        color : #00AABC;
        line-height : 0.9em;
    }
    .card h1 span {
        color : #066C91;
    }
    .card h2 {
        font-size : 150%;
        transform : translateZ(50px);
        color : #011627;
    }


    .border {
        position : absolute;
        top : 40px;
        bottom : 40px;
        left : 40px;
        right : 40px;
        border : 2px solid #011627;
        transform : translateZ(50px);
        transform-style: preserve-3d;
    }

    .f {
        font-size: 0.8em;
        position: fixed;
        top: 5px;
        right: 10px;
        font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif;
        color : #011627;
    }

    .f a {
        color : #066C91;
    }
</style>
