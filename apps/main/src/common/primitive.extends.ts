// noinspection JSUnusedGlobalSymbols
/**
 * Extends Primitive wrapper object
 */
// eslint-disable-next-line
interface Number {
  between(min: number, max: number): boolean;
}

Number.prototype.between = function (min: number, max: number) {
  return Number(this) >= min && Number(this) < max;
}
