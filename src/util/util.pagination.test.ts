import { createPages, createPagesByCenter } from './Pagination.services';

describe('pagination service', () => {
  describe('createPagesByCenter', () => {
    function createCases(
      navCount: number,
      maxPage: number,
      testCases: { page: number; values: number[] }[],
    ) {
      return testCases.map(testCase => ({
        navCount,
        maxPage,
        ...testCase,
      }));
    }
    function createCasesByMax(max: number, count: number, page: number) {
      return {
        page,
        values: Array(count)
          .fill(0)
          .map((_, idx) => max + (idx - count + 1)),
      };
    }

    describe('MAX=220, navCount=10', () => {
      const MAX = 220;
      const cases = createCases(10, MAX, [
        {
          page: 1,
          values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
        {
          page: 5,
          values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
        {
          page: 6,
          values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
        {
          page: 7,
          values: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        },
        {
          page: 9,
          values: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        },
        createCasesByMax(MAX, 10, MAX),
        createCasesByMax(MAX, 10, MAX - 1),
        // createCasesByMax(MAX, 10, MAX - 2),
        {
          page: MAX - 4,
          values: [211, 212, 213, 214, 215, 216, 217, 218, 219, 220],
        },
        {
          page: MAX - 5,
          values: [210, 211, 212, 213, 214, 215, 216, 217, 218, 219],
        },
        {
          page: MAX - 6,
          values: [209, 210, 211, 212, 213, 214, 215, 216, 217, 218],
        },
        {
          page: MAX - 11,
          values: [204, 205, 206, 207, 208, 209, 210, 211, 212, 213],
        },
        {
          page: 156,
          values: [151, 152, 153, 154, 155, 156, 157, 158, 159, 160],
        },
        {
          page: 99,
          values: [94, 95, 96, 97, 98, 99, 100, 101, 102, 103],
        },
      ]);
      cases.forEach(caseMap => {
        it(`${caseMap.page}페이지`, () => {
          expect(
            createPagesByCenter(
              caseMap.page,
              caseMap.navCount,
              caseMap.maxPage,
            ),
          ).toEqual(caseMap.values);
        });
      });
    }); // end
    describe('max=178, navCount=9', () => {
      const max = 178;
      const defVals = Array(9)
        .fill(0)
        .map((_, idx) => idx + 1);
      const defValsLast = Array(9)
        .fill(0)
        .map((_, idx) => max - (9 - idx - 1));
      const cases = createCases(9, max, [
        {
          page: 1,
          values: defVals,
        },
        {
          page: 3,
          values: defVals,
        },
        {
          page: 5,
          values: defVals,
        },
        {
          page: 6,
          values: [...defVals.slice(1), 10],
        },
        {
          page: 7,
          values: [...defVals.slice(2), 10, 11],
        },
        {
          page: 8,
          values: [...defVals.slice(3), 10, 11, 12],
        },
        {
          page: 9,
          values: [...defVals.slice(4), 10, 11, 12, 13],
        },
        {
          page: max,
          values: defValsLast,
        },
        {
          page: max - 1,
          values: defValsLast,
        },
        {
          page: max - 2,
          values: defValsLast,
        },
        {
          page: max - 3,
          values: defValsLast,
        },
        {
          page: max - 4,
          values: [
            max - 8,
            max - 7,
            max - 6,
            max - 5,
            max - 4, //
            max - 3,
            max - 2,
            max - 1,
            max - 0,
          ],
        },
        {
          page: max - 5,
          values: [
            max - 9,
            max - 8,
            max - 7,
            max - 6,
            max - 5, //
            max - 4,
            max - 3,
            max - 2,
            max - 1,
          ],
        },
        {
          page: max - 6,
          values: [
            max - 10,
            max - 9,
            max - 8,
            max - 7,
            max - 6, //
            max - 5,
            max - 4,
            max - 3,
            max - 2,
          ],
        },
        {
          page: 55,
          values: [51, 52, 53, 54, 55, 56, 57, 58, 59],
        },
      ]);
      cases.forEach(caseMap => {
        it(`${caseMap.page}페이지`, () => {
          expect(
            createPagesByCenter(
              caseMap.page,
              caseMap.navCount,
              caseMap.maxPage,
            ),
          ).toEqual(caseMap.values);
        });
      });
    }); // end
    describe('max=7, navCount=7', () => {
      const max = 7;
      const defVals = [1, 2, 3, 4, 5, 6, 7];

      const cases = createCases(7, max, [
        {
          page: 1,
          values: defVals,
        },
        {
          page: 3,
          values: defVals,
        },
        {
          page: 6,
          values: defVals,
        },
        {
          page: 7,
          values: defVals,
        },
        {
          page: 9,
          values: defVals,
        },
      ]);
      cases.forEach(caseMap => {
        it(`${caseMap.page}페이지`, () => {
          expect(
            createPagesByCenter(
              caseMap.page,
              caseMap.navCount,
              caseMap.maxPage,
            ),
          ).toEqual(caseMap.values);
        });
      });
    }); // end
    describe('max=6, navCount=11', () => {
      const max = 6;
      const defVals = [1, 2, 3, 4, 5, 6];

      const cases = createCases(11, max, [
        {
          page: 1,
          values: defVals,
        },
        {
          page: 3,
          values: defVals,
        },
        {
          page: 6,
          values: defVals,
        },
        {
          page: 7,
          values: defVals,
        },
        {
          page: 9,
          values: defVals,
        },
      ]);
      cases.forEach(caseMap => {
        it(`${caseMap.page}페이지`, () => {
          expect(
            createPagesByCenter(
              caseMap.page,
              caseMap.navCount,
              caseMap.maxPage,
            ),
          ).toEqual(caseMap.values);
        });
      });
    }); // end
    describe('max=0, navCount=8', () => {
      const max = 0;
      const defVals = [1];

      const cases = createCases(8, max, [
        {
          page: 1,
          values: defVals,
        },
        {
          page: 3,
          values: defVals,
        },
        {
          page: 6,
          values: defVals,
        },
        {
          page: 7,
          values: defVals,
        },
        {
          page: 9,
          values: defVals,
        },
      ]);
      cases.forEach(caseMap => {
        it(`${caseMap.page}페이지`, () => {
          expect(
            createPagesByCenter(
              caseMap.page,
              caseMap.navCount,
              caseMap.maxPage,
            ),
          ).toEqual(caseMap.values);
        });
      });
    }); // end
    describe('max=4, navCount=3', () => {
      const max = 4;
      const defVals = [1, 2, 3];

      const cases = createCases(3, max, [
        {
          page: 0,
          values: defVals,
        },
        {
          page: 1,
          values: defVals,
        },
        {
          page: 2,
          values: defVals,
        },
        {
          page: 3,
          values: [2, 3, 4],
        },
        {
          page: 4,
          values: [2, 3, 4],
        },
        {
          page: 7,
          values: [2, 3, 4],
        },
      ]);
      cases.forEach(caseMap => {
        it(`${caseMap.page}페이지`, () => {
          expect(
            createPagesByCenter(
              caseMap.page,
              caseMap.navCount,
              caseMap.maxPage,
            ),
          ).toEqual(caseMap.values);
        });
      });
    }); // end
  });
  describe('createPages', () => {
    const maxPage = 220;
    it('1페이지', () => {
      expect(createPages({ page: 1, navCount: 10, maxPage })).toEqual([
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        -1,
        maxPage,
      ]);
    });
    it('7페이지', () => {
      expect(createPages({ page: 7, navCount: 10, maxPage })).toEqual([
        1,
        -1,
        4,
        5,
        6,
        7,
        8,
        9,
        -1,
        maxPage,
      ]);
    });
    it('220페이지', () => {
      expect(createPages({ page: 7, navCount: 10, maxPage })).toEqual([
        1,
        -1,
        4,
        5,
        6,
        7,
        8,
        9,
        maxPage - 1,
        maxPage,
      ]);
    });
  });
});
