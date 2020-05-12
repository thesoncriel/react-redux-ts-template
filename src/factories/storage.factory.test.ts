import { storageFactory, ISimpleStorage } from './storage.factory';

function createMockStorage(): Storage {
  let data: { [key: string]: string } = {};

  return {
    get length() {
      return Object.keys(data).length;
    },
    key(index: number) {
      try {
        return Object.keys(data)[index] || null;
      } catch (error) {
        return null;
      }
    },
    clear() {
      data = {};
    },
    getItem(key: string) {
      return data[key] || null;
    },
    setItem(key: string, value: string) {
      data[key] = value;
    },
    removeItem(key: string) {
      delete data[key];
    },
  };
}

interface TestModel {
  name: string;
  age: number;
  isYouth: boolean;
}

function createTestModel() {
  return {
    name: 'sonic',
    age: 32,
    isYouth: true,
  };
}
function createTestArray() {
  return ['대한민국', '서울특별시', '강남구', '양재너구리'];
}
function createTestModelArray(): TestModel[] {
  return [
    {
      name: '충무김밥',
      age: 30,
      isYouth: false,
    },
    {
      name: '꿀빵',
      age: 50,
      isYouth: true,
    },
    {
      name: '뺏때기죽',
      age: 42,
      isYouth: false,
    },
    {
      name: '우짜',
      age: 19,
      isYouth: true,
    },
  ];
}

describe('storage factory', () => {
  function doCheck(type: 'local' | 'session') {
    function getCurrentStorage() {
      if (type === 'local') {
        return localStorage;
      }
      return sessionStorage;
    }
    beforeAll(() => {
      Object.defineProperty(global, 'window', {
        value: {},
      });
    });

    describe('check: string', () => {
      const KEY = 'skbt';
      const VALUE = 'blah-blah';
      let sto: ISimpleStorage<string>;

      beforeEach(() => {
        sto = storageFactory<string>(type, KEY);
      });

      it('just get: 설정하지 않았을 때 값을 가져오면 내용이 없어야 한다.', () => {
        expect(sto.get()).toBe(null);
      });
      it('set and get: 스토리지 서비스 및 로컬 스토리지의 설정된 값이 같아야 한다.', () => {
        sto.set(VALUE);

        expect(sto.get()).toBe(VALUE);
        expect(getCurrentStorage().getItem(KEY)).toBe(VALUE);
      });
      it('remove: 삭제한 뒤 스토리지 내 값은 없어야 한다.', () => {
        sto.set(VALUE);

        expect(sto.get()).toBe(VALUE);

        sto.remove();

        expect(sto.get()).toBe(null);
        expect(getCurrentStorage().getItem(KEY)).toBe(null);
      });
    });

    describe('check: string array', () => {
      const KEY = 'skbt_arr';
      let sto: ISimpleStorage<string[]>;

      beforeEach(() => {
        sto = storageFactory<string[]>(type, KEY);
      });

      it('just get: 설정하지 않았을 때 값을 가져오면 내용이 없어야 한다.', () => {
        expect(sto.get()).toBe(null);
      });
      it('set and get: 스토리지 서비스 및 로컬 스토리지의 설정된 값이 같아야 한다.', () => {
        const value = createTestArray();
        sto.set(value);

        const aValue = sto.get();

        aValue.forEach((val, idx) => {
          expect(val).toEqual(value[idx]);
        });

        expect(getCurrentStorage().getItem(KEY)).toBe(JSON.stringify(value));
      });
      it('remove: 삭제한 뒤 스토리지 내 값은 없어야 한다.', () => {
        const value = createTestArray();
        sto.set(value);

        const aValue = sto.get();

        aValue.forEach((val, idx) => {
          expect(val).toEqual(value[idx]);
        });

        sto.remove();

        expect(sto.get()).toBe(null);
        expect(getCurrentStorage().getItem(KEY)).toBe(null);
      });
    });

    describe('check: object', () => {
      interface TestModel {
        name: string;
        age: number;
        isYouth: boolean;
      }

      const KEY = 'obj_people';
      let sto: ISimpleStorage<TestModel>;

      beforeEach(() => {
        sto = storageFactory<TestModel>(type, KEY);
      });

      it('just get: 설정하지 않았을 때 값을 가져오면 내용이 없어야 한다.', () => {
        expect(sto.get()).toBe(null);
      });
      it('set and get: 스토리지 서비스 및 로컬 스토리지의 설정된 값이 같아야 한다.', () => {
        const value = createTestModel();
        sto.set(value);

        const mValue = sto.get();

        expect(mValue).toEqual(value);
        expect(getCurrentStorage().getItem(KEY)).toBe(JSON.stringify(value));
      });
      it('remove: 삭제한 뒤 스토리지 내 값은 없어야 한다.', () => {
        const value = createTestModel();
        sto.set(value);

        const mValue = sto.get();

        expect(mValue).toEqual(value);

        sto.remove();

        expect(sto.get()).toBe(null);
        expect(getCurrentStorage().getItem(KEY)).toBe(null);
      });
    });

    describe('check: object array', () => {
      const KEY = 'obj_people_arr';
      let sto: ISimpleStorage<TestModel[]>;

      beforeEach(() => {
        sto = storageFactory<TestModel[]>(type, KEY);
      });

      it('just get: 설정하지 않았을 때 값을 가져오면 내용이 없어야 한다.', () => {
        expect(sto.get()).toBe(null);
      });
      it('set and get: 스토리지 서비스 및 로컬 스토리지의 설정된 값이 같아야 한다.', () => {
        const value = createTestModelArray();
        sto.set(value);

        const aValue = sto.get();

        aValue.forEach((val, idx) => {
          expect(val).toEqual(value[idx]);
        });

        expect(getCurrentStorage().getItem(KEY)).toBe(JSON.stringify(value));
      });
      it('remove: 삭제한 뒤 스토리지 내 값은 없어야 한다.', () => {
        const value = createTestModelArray();
        sto.set(value);

        const aValue = sto.get();

        aValue.forEach((val, idx) => {
          expect(val).toEqual(value[idx]);
        });

        sto.remove();

        expect(sto.get()).toBe(null);
        expect(getCurrentStorage().getItem(KEY)).toBe(null);
      });
    });

    afterAll(() => {
      const mGlobal: any = global;

      delete mGlobal.window;
    });
  }

  beforeEach(() => {
    Object.defineProperty(global, `localStorage`, {
      configurable: true,
      value: createMockStorage(),
    });
    Object.defineProperty(global, `sessionStorage`, {
      configurable: true,
      value: createMockStorage(),
    });
  });
  afterEach(() => {
    const mGlobal: any = global;
    delete mGlobal.localStorage;
    delete mGlobal.sessionStorage;
  });

  describe(`create type: local`, () => {
    doCheck('local');
  });
  describe(`create type: session`, () => {
    doCheck('session');
  });
});
