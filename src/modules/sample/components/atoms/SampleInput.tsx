import React, { ChangeEventHandler, FC } from 'react';
import styled from 'styled-components';
import { InputComponentProps } from '../../../../common';

export interface SampleInputProps extends InputComponentProps {
  /**
   * 입력을 하지 않았을 때 출력 될 안내 텍스트
   */
  placeholder?: string;
}

const Input = styled.input<Omit<SampleInputProps, 'onChange'>>`
  &:disabled {

  }
`;

/**
 * 컴포넌트: 샘플 입력
 */
export const SampleInput: FC<SampleInputProps> = ({
  disabled,
  className,
  value,
  name,
  placeholder,
  onChange,
}) => {

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    onChange && onChange({
      name,
      value: e.target.value,
    });
  };

  return (
    <Input
      type="text"
      name={name}
      value={value}
      className={className}
      disabled={disabled}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};
