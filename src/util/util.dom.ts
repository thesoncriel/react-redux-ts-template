import { isServer, doSetTimeout } from './util.common';

/**
 * 새창을 연다.
 * @param url 새창에 출력될 주소.
 */
export function openNewWindow(url: string) {
  return window.open(url, '_blank');
}

/**
 * 특정 경로를 통하여 파일 다운로드를 수행한다.
 * @param url 수행할 경로
 * @param filename 다운받게될 파일명
 */
export function downloadLink(url: string, filename: string) {
  // const elem = document.createElement('iframe');

  // elem.style.display = 'none';
  // elem.src = url;

  // document.body.appendChild(elem);
  const elem = document.createElement('a');

  elem.href = url;
  elem.target = '_blank';
  elem.download = filename;

  document.body.appendChild(elem);
  elem.click();

  doSetTimeout(() => document.body.removeChild(elem), 200);
}

/**
 * 트랜지션 종료 이벤트를 등록 한다.
 * @param elem 이벤트를 등록할 요소.
 * @param callback 이벤트 발생 시 수행될 함수
 */
export function addTransitionEnd(
  elem: HTMLElement | null,
  callback: () => any,
) {
  if (!elem) {
    return;
  }
  elem.addEventListener('transitionend', callback);
  elem.addEventListener('webkitTransitionEnd', callback);

  return elem;
}

/**
 * 트랜지션 종료 이벤트를 제거 한다.
 * 반드시 이전에 등록했던 콜백이어야 한다.
 * @param elem 이벤트를 제거할 요소.
 * @param callback 이벤트 발생 시 수행될 함수
 */
export function removeTransitionEnd(
  elem: HTMLElement | null,
  callback: () => any,
) {
  if (!elem) {
    return;
  }
  elem.removeEventListener('transitionend', callback);
  elem.removeEventListener('webkitTransitionEnd', callback);

  return elem;
}

/**
 * 특정 요소의 스크롤 위치를 백분율 단위로 가져 온다.
 * 인수를 넣으면 그 요소를 대상으로 계산,
 * 없으면 window 와 body 요소로 화면 전체 스크롤을 대상으로 계산한다.
 * @param elem 스크롤 위치를 가져올 요소
 */
export function getScrollPosition(elem?: HTMLElement) {
  if (isServer()) {
    return {
      percent: -1,
      quarter: -1,
    };
  }

  let iScrollHeight = 0;
  let iOffsetHeight = 0;
  let iScrollTop = 0;

  if (!elem) {
    const elemDoc = document.documentElement;
    const elemBody = document.body;

    iScrollHeight = elemBody.scrollHeight;
    iOffsetHeight = elemDoc.clientHeight;
    iScrollTop = elemDoc.scrollTop;
  } else {
    iScrollHeight = elem.scrollHeight;
    iOffsetHeight = elem.offsetHeight;
    iScrollTop = elem.scrollTop;
  }

  const percent = Math.floor(
    (iScrollTop / (iScrollHeight - iOffsetHeight)) * 100,
  );
  let quarter = 0;

  if (isNaN(percent)) {
    return {
      percent: 0,
      quarter,
    };
  }

  if (percent > 0 && percent <= 33) {
    quarter = 25;
  } else if (percent > 33 && percent <= 66) {
    quarter = 50;
  } else if (percent > 66 && percent <= 99) {
    quarter = 75;
  } else {
    quarter = percent;
  }

  return {
    percent,
    quarter,
  };
}

function freezeViewPort(e: any) {
  e.preventDefault();
}

let isStoppedBody = false;

/**
 * 화면의 스크롤링 기능을 멈추거나 되돌린다.
 * @param use 사용여부
 */
export function stopBodyScrolling(use: boolean, force = false) {
  if (isServer()) {
    return;
  }

  if (!force && isStoppedBody === use) {
    return;
  }

  isStoppedBody = use;

  const html = document.getElementsByTagName('html')[0];
  const body = document.body;
  const className = 'prevent-body';

  // const style = document.body.style;

  if (use) {
    // style.overflow = 'hidden';
    // html.style.position = 'fixed';
    // style.top = '0';
    // style.left = '0';
    // style.right = '0';
    // style.bottom = '0';
    // body.style.overflowY = 'hidden';
    // html.className = 'prevent-html';
    const y = window.scrollY;
    body.className += ' ' + className;
    body.style.top = -1 * y + 'px';
    html.style.overflowY = 'hidden';
    document.addEventListener('touchmove', freezeViewPort, { passive: false });
  } else {
    // style.overflow = null;
    // html.style.position = null;
    // style.top = null;
    // style.left = null;
    // style.right = null;
    // style.bottom = null;
    // body.style.overflowY = '';
    // html.className = '';
    try {
      const classNames = body.className.split(' ');

      if (classNames.length > 0) {
        body.className = classNames.filter((cn) => cn !== className).join(' ');
      }

      // body.className = body.className.replace(className, '');
      window.scrollTo(0, -1 * Number(body.style.top.replace('px', '')));
    } catch (error) {
      // 오류 시 그냥 넘긴다. (그럴 일은 없을 듯 하지만..)
    }

    body.style.top = '';
    html.style.overflowY = '';
    document.removeEventListener('touchmove', freezeViewPort, false);
  }
}

/**
 * 스크롤 위치를 초기화 시킨다.
 */
export function initScroll() {
  if (isServer()) {
    return;
  }
  doSetTimeout(() => window.scrollTo(0, 0), 50);
}
