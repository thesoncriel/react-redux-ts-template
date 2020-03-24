/* eslint-disable @typescript-eslint/no-empty-function */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

/**
 * react-slick 이용 시 test 코드 오류가 발생되므로 아래 코드 추가
 *
 * https://github.com/akiran/react-slick/issues/742#issuecomment-557793922
 */
window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
    };
  };
