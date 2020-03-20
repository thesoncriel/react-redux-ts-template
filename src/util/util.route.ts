/**
 * 객체 파라미터를 Query Parameter 로 쓸 수 있게 문자열로 직렬화 한다.
 *
 * 내부 필드 값이 숫자 0이 아니고 비어 있다면 (empty string, null, undefined) 해당 필드는 무시한다.
 * @param params 쿼리 파라미터로 만들 객체
 * @param withQuestionMark 앞에 ? 를 붙이는지 여부. 기본 false.
 */
export function serializeParams(params: any, withQuestionMark = false) {
  const aParams: string[] = [];

  if (!params) {
    return '';
  }

  Object.keys(params).forEach(key => {
    const value = params[key];

    if ((value !== 0) && !value) {
      return;
    }

    aParams.push(`${key}=${encodeURIComponent(value)}`);
  });

  return (withQuestionMark ? '?' : '') + aParams.join('&');
}

/**
 * 특정 경로에 대하여 파일 다운로드를 수행 한다.
 * @param path 파일을 다운로드 받을 경로
 */
export function fileDownload(path: string) {
  window.location.href = path;
}

/**
 * 특정 경로에 대하여 새창을 열어 수행 한다.
 * @param url
 */
export function newWindow(url: string) {
  return window.open(url, '_blank');
}
