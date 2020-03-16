import { FC } from 'react';

interface PageHeadModel {
  title?: string;
}

export const PageHead: FC<PageHeadModel> = ({ title }) => {
  if (title) {
    document.title = title;
  }

  return null;
};

PageHead.defaultProps = {
  title: '',
};
