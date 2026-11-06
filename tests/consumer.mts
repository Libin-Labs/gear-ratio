import { outputRpm, trainRatio } from '@lp-labs/gear-ratio';
if (outputRpm(900, 20, 60) !== 300 || trainRatio([{ driverTeeth: 20, drivenTeeth: 60 }]) !== 3)
  throw new Error('Gears');
// @ts-expect-error invalid argument must be rejected by declarations
outputRpm(100, '20', 60);
