import React, { ComponentClass, FC, Fragment, ReactNode, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {
  /**
   * 컴포넌트 렌더링 시 참조할 비동기 값.
   * true 면 succComponent 를, 실패하거나 false 면 failComponent 를 렌더링 한다.
   */
  loader: () => boolean | Promise<boolean>;
  /**
   * loader 결과가 true 일 때 렌더링 할 컴포넌트.
   */
  succComponent: ComponentClass | FC;
  /**
   * loader 결과가 false 이거나 실패 했을 때 렌더링 할 컴포넌트.
   */
  failComponent: ComponentClass | FC;
}

/**
 * route 내에서 guard 이용 시 사용되는 비동기 컴포넌트.
 *
 * loader 프로퍼티의 비동기 결과값을 바탕으로 전달된 succComponent 를 렌더링 한다.
 *
 * 비동기 결과값이 실패하거나 loader 결과가 false 라면 failComponent 를 렌더링 한다.
 * @param props
 * @constructor
 */
export const AsyncGuardComponent: FC<Props> = props => {
  const [
    component,
    setComponent
  ] = useState<ComponentClass | FC | null>(() => props.succComponent);

  useEffect(() => {
    const {
      loader
    } = props;
    const retLoader = loader();

    if (retLoader instanceof Promise) {
      retLoader
        .then(res => res ? props.succComponent : props.failComponent)
        .catch(() => props.failComponent)
        .then(component => setComponent(component));
    } else {
      setComponent(retLoader ? props.succComponent : props.failComponent);
    }
    return () => {
      setComponent(null);
    };
  }, [props]);

  const Comp = component;

  if (Comp) {
    const mProps: Props & { children?: ReactNode } = { ...props };

    delete mProps.loader;

    return <Comp { ...mProps } />;
  }

  return <Fragment />;
};

// export class AsyncPageComponent extends Component<Props, State> {
//   constructor(props: Props) {
//     super(props);
//
//     this.state = {
//       component: props.succComponent,
//     };
//   }
//
//   componentDidMount() {
//     const props = this.props;
//     const loader = props.loader;
//     const retLoader = loader();
//
//     if (retLoader instanceof Promise) {
//       retLoader
//         .then(res => res ? props.succComponent : props.failComponent)
//         .catch(() => props.failComponent)
//         .then(component => this.setState({ component }));
//     } else {
//       this.setState({
//         component: retLoader ? props.succComponent : props.failComponent
//       });
//     }
//   }
//
//   componentWillUnmount() {
//     this.setState({
//       component: null,
//     });
//   }
//
//   render() {
//     const Comp = this.state.component;
//
//     if (Comp) {
//       const props: Props = {...this.props};
//
//       delete props.loader;
//
//       return <Comp {...this.props} />;
//     }
//
//     return <Fragment />;
//   }
// }