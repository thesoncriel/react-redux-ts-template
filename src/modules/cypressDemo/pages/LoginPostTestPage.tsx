import React, {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useState,
} from 'react';
import styled from 'styled-components';

const AsyncForm = styled.form`
  max-width: 800px;
  margin: 0 auto;
`;

export const LoginPostTestPage: FC = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [result, setResult] = useState('');
  const handleSubmit: FormEventHandler = async e => {
    e.preventDefault();
    const res = await fetch('/data/signin.json', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ id, pw }),
    });
    const { token } = await res.json();

    if (token === 'fail') {
      setResult('로그인 실패');
    } else {
      setResult('성공!');
    }
  };
  const handleChangeId: ChangeEventHandler<HTMLInputElement> = e => {
    setId(e.target.value);
  };
  const handleChangePw: ChangeEventHandler<HTMLInputElement> = e => {
    setPw(e.target.value);
  };

  return (
    <AsyncForm onSubmit={handleSubmit}>
      <input type="text" id="txt_id" value={id} onChange={handleChangeId} />
      <input type="password" id="txt_pw" value={pw} onChange={handleChangePw} />
      <button id="btn_submit">로그인하기</button>
      <div id="print">{result}</div>
    </AsyncForm>
  );
};
