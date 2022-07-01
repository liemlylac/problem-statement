import { isTruthy } from './helper';

describe('helper', () => {
  describe('isTruthy', () => {
    const trueTable = [
      { value: true, expect: true },
      { value: 'true', expect: true },
      { value: '1', expect: true },
      { value: 1, expect: true },
      { value: 'false', expect: false },
      { value: '0', expect: false },
      { value: null, expect: false },
      { value: undefined, expect: false },
    ];
    for (const test of trueTable) {
      it(`case ${test.value} must be return ${test.expect}`, () => {
        expect(isTruthy(test.value)).toEqual(test.expect);
      });
    }
  });
});
