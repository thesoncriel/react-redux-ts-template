import { template } from './util.string';

interface TestCaseModel {
  desc: string;
  text: any;
  data?: any;
  result: string;
}

const TEST_CASES_EMPTY: TestCaseModel[] = [
  {
    desc: '템플릿 텍스트가 비어있으면 빈 값을 준다.',
    text: '',
    result: '',
  },
  {
    desc: '템플릿 텍스트가 null 이면 빈 값을 준다.',
    text: null,
    result: '',
  },
  {
    desc: '템플릿 텍스트가 undefined 면 빈 값을 준다.',
    text: undefined,
    result: '',
  },
];

const TEST_CASES_PRIMITIVE: TestCaseModel[] = [
  {
    desc: '유효한 문자열 자료면, 템플릿 내용 모두에 그 내용을 대입하여 돌려준다.',
    text: '오오! {{name}}는 {{def}} 입니다.',
    data: '포메',
    result: '오오! 포메는 포메 입니다.',
  },
  {
    desc: '유효한 숫자라면, 템플릿 내용을 빈 값으로 대입하여 돌려준다.',
    text: '오오! {{name}}는 {{def}} 입니다.',
    data: 1659,
    result: '오오! 1659는 1659 입니다.',
  },
  {
    desc: '숫자 0이면 0으로 채운다.',
    text: '오오! {{name}}는 {{def}} 입니다.',
    data: 0,
    result: '오오! 0는 0 입니다.',
  },
  {
    desc: '자료가 비었다면 템플릿 내용을 빈 값으로 대입하여 돌려준다.',
    text: '오오! {{name}}는 {{def}} 입니다.',
    result: '오오! 는  입니다.',
  },
  {
    desc: '자료가 NaN 일 경우 템플릿 내용을 빈 값으로 대입하여 돌려준다.',
    text: '오오! {{name}}는 {{def}} 입니다.',
    data: NaN,
    result: '오오! 는  입니다.',
  },
  {
    desc: '자료가 string 혹은 number 타입이 아니라면 템플릿 내용을 빈 값으로 대입하여 돌려준다.',
    text: '오오! {{name}}는 {{def}} 입니다.',
    data: true,
    result: '오오! 는  입니다.',
  },
];

const TEST_CASES_OBJECT: TestCaseModel[] = [
  {
    desc: '객체 자료면, 템플릿 내용 중 키값에 자료의 값 내용을 대입하여 돌려준다.',
    text: '오오! {{name}}는 {{def}} 입니다.',
    data: {
      name: '포메',
      def: '사랑',
    },
    result: '오오! 포메는 사랑 입니다.',
  },
  {
    desc: '객체 자료중 필드가 비어있다면 무시한다.',
    text: '오오! {{name}}는 {{def}} 입니다.',
    data: {
      def: '사랑',
    },
    result: '오오! 는 사랑 입니다.',
  },
  {
    desc: '객체 자료중 필드가 0이 있다면 해당 필드는 0으로 출력한다.',
    text: '오오! {{name}}는 {{def}} 입니다.',
    data: {
      name: '강쥐',
      def: 0,
    },
    result: '오오! 강쥐는 0 입니다.',
  },
  {
    desc: '짧은 템플릿도 정상 출력 되어야 한다. (우측)',
    text: '세상 짧은 {{story}}',
    data: {
      story: '이야기',
    },
    result: '세상 짧은 이야기',
  },
  {
    desc: '짧은 템플릿도 정상 출력 되어야 한다. (좌측)',
    text: '{{doIt}} 삶의 현장',
    data: {
      doIt: '체험',
    },
    result: '체험 삶의 현장',
  },
  {
    desc: '자료키에 언더바나 대문자가 허용된다.',
    text: '{{comicName}}을 모으면 {{WISH}}이 이뤄질까{{mark_value}}',
    data: {
      comicName: '드래곤볼',
      WISH: '소원',
      mark_value: '?!!',
    },
    result: '드래곤볼을 모으면 소원이 이뤄질까?!!',
  },
  {
    desc: '빈 객체면 템플릿은 모두 빈 값으로 채운다.',
    text: '{{comicName}}을 모으면 {{WISH}}이 이뤄질까{{mark_value}}',
    data: {},
    result: '을 모으면 이 이뤄질까',
  },
  {
    desc: '객체 필드에 boolean 타입이 있으면 무시한다.',
    text: '어라? {{value}} 일까요? {{rice}} 일까요?',
    data: {
      value: true,
      rice: false,
    },
    result: '어라?  일까요?  일까요?',
  },
];

const TEST_CASES = [
  ...TEST_CASES_EMPTY,
  ...TEST_CASES_PRIMITIVE,
  ...TEST_CASES_OBJECT,
]

describe('template function', () => {
  TEST_CASES.forEach(({ desc, text, data, result }) => {
    it(desc, () => {
      expect(template(text, data)).toBe(result);
    });
  });
});