require('./primitive.extends');

describe('Primitive extends', () => {
    describe('Number', () => {
      const trueTable = [
        { input: 403, min: 400, max: 500, expect: true },
        { input: 502, min: 500, max: 599, expect: true },
        { input: 201, min: 200, max: 300, expect: true },
        { input: 302, min: 300, max: 400, expect: true },
        { input: 400, min: 400, max: 500, expect: true },
        { input: 300, min: 200, max: 300, expect: false },
        { input: 500, min: 400, max: 500, expect: false },
        { input: 500, min: 400, max: 500, expect: false },
      ];
      for (const testCase of trueTable) {
        it(`should return ${testCase.expect} when input ${testCase.input} between ${testCase.min} an ${testCase.max}`, () => {
          expect(Number(testCase.input).between(testCase.min, testCase.max)).toBe(testCase.expect);
        });
      }
    });
});
