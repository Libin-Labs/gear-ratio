function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
export interface GearStage {
  driverTeeth: number;
  drivenTeeth: number;
}
export function gearRatio(driverTeeth: number, drivenTeeth: number): number {
  integer(driverTeeth, 1, 10000);
  integer(drivenTeeth, 1, 10000);
  return drivenTeeth / driverTeeth;
}
export function outputRpm(inputRpm: number, driverTeeth: number, drivenTeeth: number): number {
  return finite(finite(inputRpm) / gearRatio(driverTeeth, drivenTeeth));
}
export function trainRatio(stages: readonly GearStage[]): number {
  if (!Array.isArray(stages) || !stages.length || stages.length > 1000)
    throw new RangeError('Stage count');
  let r = 1;
  for (const stage of stages) {
    if (!stage) throw new TypeError('Expected stage');
    r = finite(r * gearRatio(stage.driverTeeth, stage.drivenTeeth), Number.MIN_VALUE);
  }
  return r;
}
