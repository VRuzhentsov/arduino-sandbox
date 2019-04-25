const _ = require('underscore');

exports.accelerometerSandbox = function (socket, servo, rgb) {
  let initialized = false;
  const initAccel = {};

  return function (changedObject, objectName) {
    const data = {
      accelerometer: _.pick(this.accelerometer, [
        'zeroV',
        'pitch',
        'roll',
        'x',
        'y',
        'z',
        'acceleration',
        'inclination',
        'orientation',
      ]),
      gyro: _.pick(this.gyro, [
        'x',
        'y',
        'z',
        'isCalibrated',
        'pitch',
        'rate',
        'roll',
        'yaw',
      ]),
      thermometer: _.pick(this.thermometer, [
        'celsius',
        'fahrenheit',
        'kelvin',
        'C',
        'F',
        'K',
        'freq',
      ]),
    };

    if (!initialized) {
      Object.assign(initAccel, data.accelerometer);

      initialized = true;
    } else {
      data.accelerometer.x = Number((data.accelerometer.x - initAccel.x).toFixed(3));
      data.accelerometer.y = Number((data.accelerometer.y - initAccel.y).toFixed(3));
      data.accelerometer.z = Number((data.accelerometer.z - initAccel.z).toFixed(3));
    }

    if (servo && initialized) {
      const servoYTo = (data.accelerometer.y + 1) * 90;

      servo.to(servoYTo);

      const plusRed = Math.abs(data.accelerometer.y) * 255;
      const plusGreen = 255 - (Math.abs(data.accelerometer.y) * 255);

      const toColorHex = (number) => {
        let str = '';
        const rounded = number.toFixed(0);
        if (rounded < 16) {
          str += '0';
        }
        str += parseFloat(rounded)
          .toString(16);
        return str;
      };

      const myColor = `${toColorHex(plusRed)}${toColorHex(plusGreen)}00`;
      rgb.color(myColor);
    }

    socket.emit('message.imu', data);
  };
};
