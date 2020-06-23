import {
  ComponentType,
  Dispatch,
  FC,
  MouseEventHandler,
  SetStateAction,
} from 'react';
import { HashMap } from './collections.model';
import { InputChangeArgs, PageChangeArgs } from './events.model';

/**
 * 인자 없고 리턴값도 없는 간단한 형태의 이벤트 핸들러 타입.
 */
export type SimpleEventHandler = () => void;

/**
 * 클릭 이벤트와 자식 요소가 포함될 수 있는 리액트 요소.
 */
export interface ClickableReactElement<T = HTMLButtonElement> {
  onClick?: MouseEventHandler<T> | SimpleEventHandler;
}

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
   * 입력란에 적용되는 name 속성값
   */
  name: string;
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
}

/**
 * 레이블 및 안내문구(Placeholder)가 포함된 입력 컴포넌트에 사용되는 프로퍼티.
 */
export interface LabeledInputComponentProps extends InputComponentProps {
  /**
   * 입력란 옆에 출력되는 레이블 워딩.
   */
  label?: string;
  /**
   * 안내문구
   */
  placeholder?: string;
}

/**
 * 입력 길이에 제한이 있는 입력 컴포넌트에 사용되는 프로퍼티.
 */
export interface LimitedInputComponentProps extends InputComponentProps {
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
}

/**
 * 자동완성 기능이 지원되는 컴포넌트에 사용되는 프로퍼티.
 */
export interface AutoCompleteComponentProps extends InputComponentProps {
  /**
   * 자동완성 여부
   */
  autoCompleteOff?: boolean;
  /**
   * 옵션 목록
   */
  options?: SelectOption[];
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
 * 라디오버튼에 공통으로 쓰이는 프로퍼
 */
export interface RadioComponentProps extends CheckboxComponentProps {
  /**
   * 라디오 버튼이 체크 되었을 때 전달될 값.
   */
  value: string;
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

/**
 * 컨텍스트의 상태값을 바탕으로 업무 로직을 구성할 때 쓰이는 인터렉터(Interactor).
 */
export type ContextInteractor<S = any, E = any> = (
  state: () => S,
  dispatch: Dispatch<Partial<S>>,
) => E;

/**
 * 컨텍스트 상태 모델. state 와 자료를 적용시키는 apply 로 구성된다.
 */
export interface ContextState<T> {
  /**
   * 컨텍스트 상태.
   */
  state: T;
  /**
   * 컨텍스트 상태를 변경하기 위한 메서드.
   */
  dispatch: Dispatch<SetStateAction<T>>;
}

/**
 * 컨텍스트 인젝터로 만들어진 결과물.
 */
export interface ContextInjectorResult<T, IT> {
  /**
   * 상태 값을 제공하는 컴포넌트.
   *
   * 상태 관리를 하고싶은 컴포넌트를 감싸서 사용한다.
   *
   * 만약 직접 사용이 아닌 hoc 로 사용하고 싶다면 withCtx 를 이용한다.
   */
  CtxProvider: FC;
  /**
   * HOC: 컨텍스트를 Decorator 형식으로 이용 할 수 있다.
   */
  withCtx: <P>(Comp: ComponentType<P>) => FC<P>;
  /**
   * 컨텍스트용 셀렉터. 가져오고 싶은 데이터만 선택할 수 있다.
   */
  useCtxSelector: <R>(selector: (state: T) => R) => R;
  /**
   * 컨텍트스용 셀렉터. 해당 컨텍스트의 모든 상태값을 가져올 수 있다.
   */
  useCtxSelectorAll: () => T;
  /**
   * 컨텍스트용 디스패치. 변경된 상태 전체를 넘기면 컨텍스트에 반영된다.
   */
  useCtxDispatch: () => Dispatch<Partial<T>>;
  /**
   * 컨텍스트용 인터렉터. 액션 및 데이터 호출, 조작 및 디스패치등의 기능을 가진 객체를 가져와 사용할 수 있다.
   */
  useInteractor: () => IT;
}
