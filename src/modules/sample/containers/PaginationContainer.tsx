import React, {
  FC,
  ChangeEventHandler,
  useState,
  FormEventHandler,
} from 'react';
import { LayoutContainer } from '../../_shared';
import { LinkPagination as Pagination } from '../../../common/components/pagination';
import styled from 'styled-components';
import { useHistory } from 'react-router';

interface Props {
  limit: number;
  skip: number;
  keyword: string;
}

const Prev: FC = () => <>{'〈'}</>;
const Next: FC = () => <>{'〉'}</>;
const Ellipsis: FC = () => <>{'···'}</>;

const LinkPagination = styled(Pagination)`
  .link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 24px;
    height: 24px;
    font-size: 16px;

    &.active {
      color: skyblue;
      background: #44a;
      cursor: default;
    }
  }
  .ellipsis {
    color: lightslategray;
  }
  .next,
  .prev {
    font-weight: bold;
    color: #000;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  }
`;

const Form = styled.form`
  width: 600px;
  margin: 0 auto;
  margin-bottom: 1em;
  text-align: center;
`;
const Input = styled.input`
  border: 1px solid #000;
`;
const Button = styled.button`
  border: 1px solid #888;
  border-radius: 4px;
`;

/**
 * 컨테이너: 설명
 */
export const PaginationContainer: FC<Props> = ({ limit, skip, keyword }) => {
  const [stateKeyword, setKeyword] = useState(keyword);
  const history = useHistory();
  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    history.push(`?keyword=${stateKeyword}`);
  };
  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setKeyword(e.target.value);
  };
  return (
    <LayoutContainer>
      <Form onSubmit={handleSubmit}>
        <Input type="text" value={stateKeyword} onChange={handleChange} />
        <Button>검색</Button>
      </Form>
      <LinkPagination
        center
        prevIcon={Prev}
        nextIcon={Next}
        ellipsisIcon={Ellipsis}
        totalCount={250}
        limit={limit}
        skip={skip}
        params={{ keyword }}
      />
    </LayoutContainer>
  );
};
