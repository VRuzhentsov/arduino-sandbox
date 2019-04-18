const { Stepper } = require('johnny-five');
const { throttle } = require('underscore');

const stepsInCircle = 2000;

const stepperMotorThrottledCB = (stepper) => throttle((data) => {
  const { stepperPosition } = data;

  if (stepperPosition < -180 || stepperPosition > 180) {
    throw new Error('Validation error. invalid stepperPosition');
  }

  const rpm = 180;
  let dir = Stepper.DIRECTION.CW;

  const degree = stepperPosition - stepper.currentDegree;

  if (degree < 0) {
    dir = Stepper.DIRECTION.CCW;
  } else {
    dir = Stepper.DIRECTION.CW;
  }

  const steps = stepsInCircle / 360 * Math.abs(degree);

  stepper.direction(dir);
  stepper.rpm(rpm);
  stepper.step(steps, () => {
    stepper.currentDegree = stepperPosition;
    console.log('movement done', {
      stepperPosition,
      rpm,
      dir,
      degree,
      steps,
    });
  });
}, 200);


exports.stepperMotorThrottledCB = stepperMotorThrottledCB;
