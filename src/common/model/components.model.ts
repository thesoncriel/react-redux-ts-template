import { InputChangeArgs, PageChangeArgs } from './events.model';
import { HashMap } from './collections.model';

/**
 * 컴포넌트 프로퍼티에 className 을 넣을 때 포함하는 모델.
 */
export interface ClassNameProps {
  /**
   * 컴포넌트에 적용할 CSS 클래스명.
   */
  className?: string;
}

/**
 * 선택 상자(select) 의 각 목록 옵션 내용.
 */
export interface SelectOption {
  /**
   * 화면에 출력되는 텍스트.
   */
  text: string;
  /**
   * 선택 시 실제 전달 될 값.
   */
  value: string;
}

/**
 * 격자(Grid) 형태의 선택 컴포넌트에서 쓰이는 각 목록 옵션 내용.
 */
export interface GridSelectOption extends SelectOption {
  /**
   * 격자 칸(cell)에 표현 될 아이콘 정보.
   */
  icon: string;
  /**
   * 비활성화 여부.
   */
  disabled?: boolean;
}

/**
 * 모든 버튼 컴포넌트의 공통 프로퍼티를 정의해 놓은 것.
 */
export interface ButtonComponentProps extends ClassNameProps {
  /**
   * submit 버튼 적용 여부. 적용 시 form 요소와 연동된다.
   */
  submit?: boolean;
  /**
   * 버튼 색상.
   * - (없음) - 기본 색상
   * - primary - 가장 눈에 띄어야 하는 것
   * - secondary - primary 보다 덜 눈에 띄는 색상
   */
  color?: string | 'primary' | 'secondary';
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
  /**
   * 클릭 이벤트
   */
  onClick?: () => void;
}

/**
 * 간단한 입력 컴포넌트의 프로퍼티
 */
export interface SimpleInputProps {
  /**
   * 입력값
   */
  value?: string;
  /**
   * 변경 이벤트
   */
  onChange?: (args: InputChangeArgs) => void;
}

/**
 * 모든 입력 컴포넌트의 공통 프로퍼티를 정의해 놓은 것.
 * 입력 컴포넌트들은 모두 이 인터페이스를 Props 로 이용한다.
 */
export interface InputComponentProps extends ClassNameProps, SimpleInputProps {
  /**
   * 자동완성 여부
   */
  autoCompleteOff?: boolean;
  /**
   * 컴포넌트 고유 ID
   */
  id?: string;
  /**
   * 입력란 옆에 출력되는 레이블 워딩.
   */
  label?: string;
  /**
   * 입력란에 적용되는 name 속성값
   */
  name: string;
  /**
   * 안내문구
   */
  placeholder?: string;
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
  /**
   * 옵션 목록
   */
  options?: SelectOption[];
  /**
   * 최소값
   */
  min?: string | number;
  /**
   * 최대값
   */
  max?: string | number;
  /**
   * 최대 길이
   */
  maxlen?: number;
  /**
   * 입력이 허용되는 Regexp 패턴
   */
  pattern?: string;
}


/**
 * 체크 박스에 공통으로 쓰이는 프로퍼티
 */
export interface CheckboxComponentProps extends ClassNameProps {
  /**
   * 입력란에 적용될 name 속성값
   */
  name: string;
  /**
   * 체크 여부
   */
  checked: boolean;
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
}

/**
 * 페이징 링크에서 url 경로를 만들 때 필요한 데이터
 */
export interface PaginationLinkMakeModel extends PageChangeArgs {
  /**
   * 현재 페이지
   */
  page: number;
}

/**
 * 잘못된 입력에 의한 메시지를 키/값 형태로 전달할 때 쓰인다.
 */
export interface InvalidMessagesModel {
  /**
   * 잘못딘 메시지 모음. 빈 객체라면 별도 메시지가 없는 것이다.
   */
  invalidMessages: HashMap<string>;
}
