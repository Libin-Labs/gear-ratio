import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('single reduction', () => {
  assert.equal(api.gearRatio(20, 60), 3);
  assert.equal(api.outputRpm(900, 20, 60), 300);
});
test('speed increase', () => {
  assert.equal(api.outputRpm(100, 60, 20), 300);
});
test('compound reduction', () => {
  assert.equal(
    api.trainRatio([
      { driverTeeth: 20, drivenTeeth: 60 },
      { driverTeeth: 10, drivenTeeth: 40 },
    ]),
    12,
  );
});
test('signed and zero speed', () => {
  assert.equal(api.outputRpm(-900, 20, 60), -300);
  assert.equal(api.outputRpm(0, 20, 60), 0);
});
test('invalid teeth and overflow', () => {
  assert.throws(() => api.gearRatio(0, 20));
  assert.throws(() => api.gearRatio(2.5, 20));
  assert.throws(() => api.trainRatio([]));
  assert.throws(() =>
    api.trainRatio(Array.from({ length: 100 }, () => ({ driverTeeth: 1, drivenTeeth: 10000 }))),
  );
});
test('tooth-speed conservation oracle', () => {
  for (let a = 1; a <= 100; a += 7)
    for (let b = 1; b <= 100; b += 11) {
      assert.ok(Math.abs(api.outputRpm(123, a, b) * b - 123 * a) < 1e-10);
    }
});
