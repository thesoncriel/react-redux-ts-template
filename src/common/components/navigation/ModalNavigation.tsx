import React, { Fragment } from 'react';
import styled from 'styled-components';
import {
  COLOR_BLACK,
  COLOR_YELLOW,
  SIZE_HEADER_MOBILE_HEIGHT,
  TRANSITION_EASING,
} from '../../../styles/variables';
import { cn, doSetTimeout } from '../../../util';
import { ButtonNavigation } from './ButtonNavigation';
import { TopNavigation } from './TopNavigation';

interface Props {
  white?: boolean;
  show?: boolean;
  onClose?: () => void;
}

interface State {
  aniSeq: number;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0.05;
  transition: 0.6s opacity ${TRANSITION_EASING};
  background: ${COLOR_BLACK};

  &.show {
    opacity: 0.9;
  }
`;

const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding-top: ${SIZE_HEADER_MOBILE_HEIGHT + 5}px;
  z-index: 11;
  transition: 0.6s all ${TRANSITION_EASING};
  background-color: ${COLOR_YELLOW};

  & > .wrap {
    transition: 0.3s all ${TRANSITION_EASING};
    opacity: 0;
  }

  &.white {
    background-color: #fff;
  }

  &.seq0 {
    max-height: ${SIZE_HEADER_MOBILE_HEIGHT}px;
  }
  &.seq1,
  &.seq2 {
    max-height: 500px;
  }
  &.seq2 {
    & > .wrap {
      opacity: 1;
    }
  }
`;

export class ModalNavigation extends React.Component<Props, State> {
  state = {
    aniSeq: -1,
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.show && state.aniSeq < 0) {
      return {
        aniSeq: 0,
      };
    }
    if (!props.show && state.aniSeq === 2) {
      return {
        aniSeq: 0,
      };
    }

    return null;
  }

  componentDidUpdate(prevProps: Props) {
    const { show } = this.props;
    const { aniSeq } = this.state;

    if (!prevProps.show && show && aniSeq === 0) {
      this.changeAniSeq(1, 0);
      return;
    }
    if (show && aniSeq === 1) {
      this.changeAniSeq(2);
      return;
    }
    if (!show && aniSeq === 0) {
      this.changeAniSeq(-1, 500);
    }
  }

  changeAniSeq(aniSeq: number, delay = 300) {
    doSetTimeout(() => this.setState({ aniSeq }), delay);
  }

  render() {
    const { show, white, onClose } = this.props;
    const { aniSeq } = this.state;

    if (!show && aniSeq === -1) {
      return null;
    }

    return (
      <Fragment>
        <Overlay className={cn({ show: aniSeq > 0 })} onClick={onClose} />
        <Wrap className={cn(`seq${aniSeq}`, { white: white || show })}>
          <div className="wrap">
            <TopNavigation vertical />
            <ButtonNavigation mobile />
          </div>
        </Wrap>
      </Fragment>
    );
  }
}
