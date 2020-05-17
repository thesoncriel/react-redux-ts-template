/**
 * 템플릿 문자열에 데이터를 적용한 문자열로 바꿔준다.
 *
 * 객체형이면 각 key 에 대응되는 템플릿에 값을 대입시킨다.
 *
 * 반면, 기본형이면 모든 템플릿키명을 무시하고 그 곳에 해당값을 동일하게 대입 시킨다. (즉 이 때는 키명을 아무거나 해도 상관없음)
 *
 * 객체 입력시 해당 객체는 반드시 1depth 로만 이뤄져야 하며 2depth 일 경우는 무시한다.
 *
 * @example
 * const text = '당신의 이름은 {{userName}} 입니다.';
 * const data = { userName: '박봉팔' };
 * const result = template(text, data); // 당신의 이름은 박봉팔 입니다.
 *
 * @param text 템플릿이 포함된 문자열. 템플릿은 '{{keyName}}' 과 같이 작성해야 한다.
 * @param data 템플릿에 대입시킬 자료. 객체일 경우 1depth 객체만 지원하며 기본형(string, number)이면 제시된 텍스트 내 모든 템플릿에 동일 값을 대입 시킨다.
 */
export function template<T = string | number | any>(text: string, data?: T) {
  if (!text) {
    return '';
  }
  let regex: RegExp;
  let aText: string[];
  let len = 0;
  let result = '';
  let val: any;

  if (typeof data === 'object') {
    aText = text.split(/\{\{|\}\}/g);
    len = aText.length;

    for (let i = 0; i < len; i += 2) {
      val = (data as any)[aText[i + 1]];
      val = typeof val === 'boolean' ? '' : val;
      result += aText[i] + ((val || val === 0) ? val : '');
    }

    return result;
  } else {
    regex = /\{\{[A-z0-9_]+\}\}/g;

    if (typeof data === 'number' && !isNaN(data)) {
      return text.replace(regex, data + '');
    } else if (typeof data === 'string') {
      return text.replace(regex, data || '');
    } else {
      return text.replace(regex, '');
    }
  }
}