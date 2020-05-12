import { storageFactory, ISimpleStorage } from './storage.factory';
import { makeNumberArray } from '../util';

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

function createManyData(count = 100) {
  const aRet: any[] = [];
  let iRand = 0;

  for (let i = 0; i < count; i++) {
    iRand = Math.floor(Math.random() * 1000);

    if (iRand % 3 === 0) {
      aRet.push(createTestModel());
    } else if (iRand % 4 === 0) {
      aRet.push(createTestArray());
    } else if (iRand % 5 === 0) {
      aRet.push(createTestModelArray());
    } else if (iRand % 7 === 0) {
      aRet.push('random number : ' + iRand);
    } else {
      aRet.push({
        ss: iRand,
      });
    }
  }

  return aRet;
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
        configurable: true,
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

        expect(aValue).toEqual(value);
        expect(getCurrentStorage().getItem(KEY)).toBe(JSON.stringify(value));
      });
      it('remove: 삭제한 뒤 스토리지 내 값은 없어야 한다.', () => {
        const value = createTestArray();
        sto.set(value);

        const aValue = sto.get();

        expect(aValue).toEqual(value);
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

        expect(aValue).toEqual(value);
        expect(getCurrentStorage().getItem(KEY)).toBe(JSON.stringify(value));
      });
      it('remove: 삭제한 뒤 스토리지 내 값은 없어야 한다.', () => {
        const value = createTestModelArray();
        sto.set(value);

        const aValue = sto.get();

        expect(aValue).toEqual(value);

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

describe('storage factory : memory mode', () => {
  function doCheck(isServer = false, type = 'memory') {
    beforeAll(() => {
      if (isServer) {
        return;
      }
      Object.defineProperty(global, 'window', {
        configurable: true,
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
      });
      it('remove: 삭제한 뒤 스토리지 내 값은 없어야 한다.', () => {
        sto.set(VALUE);

        expect(sto.get()).toBe(VALUE);

        sto.remove();

        expect(sto.get()).toBe(null);
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

        expect(aValue).toEqual(value);
      });
      it('remove: 삭제한 뒤 스토리지 내 값은 없어야 한다.', () => {
        const value = createTestArray();
        sto.set(value);

        const aValue = sto.get();

        expect(aValue).toEqual(value);
        sto.remove();

        expect(sto.get()).toBe(null);
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
      });
      it('remove: 삭제한 뒤 스토리지 내 값은 없어야 한다.', () => {
        const value = createTestModel();
        sto.set(value);

        const mValue = sto.get();

        expect(mValue).toEqual(value);

        sto.remove();

        expect(sto.get()).toBe(null);
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

        expect(aValue).toEqual(value);
      });
      it('remove: 삭제한 뒤 스토리지 내 값은 없어야 한다.', () => {
        const value = createTestModelArray();
        sto.set(value);

        const aValue = sto.get();

        expect(aValue).toEqual(value);

        sto.remove();

        expect(sto.get()).toBe(null);
      });
      it('check capacity: 메모리 스토리지는 종류에 관계 없이 최대 100개만 저장할 수 있다.', () => {
        const aValues = createManyData(100);
        const indices = makeNumberArray(1, 100);
        const aSto = indices.map(i => storageFactory<any>(type, 'mkey' + i));

        aSto.forEach((sto, idx) => {
          sto.set(aValues[idx]);
        });

        aSto.forEach((sto, idx) => {
          expect(sto.get()).toEqual(aValues[idx]);
        });

        // 101 번째 스토리지를 만들고 값을 넣는다.
        const stoLast = storageFactory<string>(type, 'lastKey');

        stoLast.set('last last !!');

        expect(stoLast.get()).toEqual('last last !!');

        console.log('length', aSto.length);

        const stoFirst = storageFactory<any>(type, 'mkey1');

        // 가장 처음 저장 했던 값은 null 이어야 한다.
        expect(stoFirst.get()).toEqual(null);

        stoLast.remove();

        const stoLastOver = storageFactory<TestModel>(type, 'lastOverKey');

        const model: TestModel = {
          name: 'at last',
          age: 102,
          isYouth: false,
        };

        stoLastOver.set(model);

        expect(stoLastOver.get()).toEqual(model);

        const stoSecond = storageFactory<any>(type, 'mkey2');

        expect(stoSecond.get()).toEqual(aValues[1]);
      });
    });

    afterAll(() => {
      const mGlobal: any = global;

      delete mGlobal.window;
    });
  }

  // beforeEach(() => {
  //   Object.defineProperty(global, `localStorage`, {
  //     configurable: true,
  //     value: createMockStorage(),
  //   });
  //   Object.defineProperty(global, `sessionStorage`, {
  //     configurable: true,
  //     value: createMockStorage(),
  //   });
  // });
  // afterEach(() => {
  //   const mGlobal: any = global;
  //   delete mGlobal.localStorage;
  //   delete mGlobal.sessionStorage;
  // });

  describe(`create type: memory`, () => {
    doCheck(false);
  });
  describe(`in server environment: 서버 환경에서는 무조건 메모리 모드로 동작 된다.`, () => {
    doCheck(true, 'local');
  });
});