/**
 * 반응형 및 적응형 컴포넌트 제작 시 필요한 각종 디바이스별 사이즈를 선언 함.
 *
 * 참고 자료:
 * https://stackoverflow.com/questions/6370690/media-queries-how-to-target-desktop-tablet-and-mobile
 */

/**
 * 작은 모바일 기기의 최소 가로폭
 *
 * ex: smartphones, iPhone, portrait 480x320 phones
 */
export const MOBILE_SMALL_MIN_WIDTH = 320;
/**
 * 일반적인 모바일 기기의 최소 가로폭
 *
 * ex: portrait e-readers (Nook/Kindle), smaller tablets @ 600 or @ 640 wide.
 */
export const MOBILE_MIN_WIDTH = 481;
/**
 * 작은 태블릿 기기의 최소 가로폭
 *
 * ex: portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones
 */
export const TABLET_SMALL_MIN_WIDTH = 641;
/**
 * 일반적인 태블릿 기기의 최소 가로폭
 *
 * ex: tablet, landscape iPad, lo-res laptops ands desktops
 */
export const TABLET_MIN_WIDTH = 961;
/**
 * 데스크탑 혹은 넓은 화면의 태블릿 기기의 최소 가로폭
 *
 * big landscape tablets, laptops, and desktop
 */
export const DESKTOP_MIN_WIDTH = 1025;
