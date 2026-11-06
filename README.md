# @lp-labs/gear-ratio

Ideal tooth-count gear ratios and compound speed transformations.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/gear-ratio
```

## Working example

```js
import { outputRpm, trainRatio } from '@lp-labs/gear-ratio';
if (outputRpm(900, 20, 60) !== 300 || trainRatio([{ driverTeeth: 20, drivenTeeth: 60 }]) !== 3)
  throw new Error('Gears');
```

CommonJS: `const api = require('@lp-labs/gear-ratio')`.

## Behavior, customization and limits

gearRatio(driverTeeth,drivenTeeth) returns driven/driver reduction. outputRpm(inputRpm,driver,driven) returns input/reduction, signed RPM permits reverse caller direction. trainRatio(stages) multiplies1..1000 {driverTeeth,drivenTeeth} stages; teeth integer1..10000, result finite positive. Does not infer rotation direction, torque losses, compatibility, load or mechanical safety. O(stages), no mutation.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export interface GearStage {
  driverTeeth: number;
  drivenTeeth: number;
}
export declare function gearRatio(driverTeeth: number, drivenTeeth: number): number;
export declare function outputRpm(
  inputRpm: number,
  driverTeeth: number,
  drivenTeeth: number,
): number;
export declare function trainRatio(stages: readonly GearStage[]): number;
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
