export const calcMaxPage = (totalCount: number, limit: number) =>
  Math.floor(totalCount / limit) + (totalCount % limit > 0 ? 1 : 0);

export const parseProps = (newProps: {
  limit: number;
  totalCount: number;
  page: number;
}) => {
  const { limit, totalCount, page } = newProps;

  const maxPage = calcMaxPage(totalCount, limit);

  let skip = (page - 1) * limit;
  let iPage = page;
  let disabledPrev = true;
  let disabledNext = false;

  if (skip < 0) {
    skip = 0;
    iPage = 1;
  }

  if (skip + limit > totalCount) {
    iPage = maxPage;
    skip = iPage * limit - limit;
  }

  disabledPrev = skip === 0;

  if (skip + limit >= totalCount) {
    disabledNext = true;
  }

  return {
    page: iPage,
    skip,
    maxPage,
    disabledPrev,
    disabledNext,
  };
};

export const handlerOnPrev = (
  limit: number,
  maxPage: number,
  pageNum: number,
) => {
  let page = pageNum;
  let skip = 0;
  let disabledPrev = false;
  let disabledNext = false;

  page -= 1;
  skip = (page - 1) * limit;

  if (page <= 1) {
    page = 1;
    skip = 0;
  }

  if (page === 1) {
    disabledPrev = true;
  }

  if (page === maxPage) {
    disabledNext = true;
  }

  return {
    skip,
    page,
    maxPage,
    disabledPrev,
    disabledNext,
  };
};

export const handlerOnNext = (
  limit: number,
  maxPage: number,
  pageNum: number,
) => {
  let page = pageNum;
  let skip = 0;
  let disabledPrev = false;
  let disabledNext = false;

  page += 1;
  skip = (page - 1) * limit;

  if (page >= maxPage) {
    page = maxPage;
    skip = maxPage * limit - limit;
  }

  if (page === 1) {
    disabledPrev = true;
  }

  if (page === maxPage) {
    disabledNext = true;
  }

  return {
    skip,
    page,
    maxPage,
    disabledPrev,
    disabledNext,
  };
};

export function createPagesByCenter(
  page: number,
  navCount: number,
  maxPage: number,
) {
  let iStart = 1;
  let iCenter = 0;
  let iCount = navCount;
  const aRet: number[] = [];

  if (maxPage <= 1) {
    return [1];
  }
  if (maxPage <= 3) {
    return [1, 2, 3];
  }

  if (maxPage > navCount) {
    iCenter = Math.floor(navCount / 2) + 1;

    iStart = page <= iCenter ? 1 : page - iCenter + 1;

    if (page >= maxPage - (navCount - iCenter)) {
      iStart = maxPage - navCount + 1;
    }
  } else {
    iCount = maxPage;
  }

  for (let i = 0; i < iCount; i++) {
    aRet.push(iStart + i);
  }

  return aRet;
}

export const createPages = ({
  page,
  navCount,
  maxPage,
}: {
  page: number;
  navCount: number;
  maxPage: number;
}) => {
  const protoPages = createPagesByCenter(page, navCount, maxPage);

  if (maxPage <= navCount || protoPages.length < navCount) {
    return protoPages;
  }

  if (protoPages[0] > 1) {
    protoPages[0] = 1;
    protoPages[1] = -1;
  }
  const maxIdx = protoPages.length - 1;

  if (protoPages[maxIdx] < maxPage) {
    protoPages[maxIdx] = maxPage;
    protoPages[maxIdx - 1] = -2;
  }

  return protoPages;
};

// export const createPages = ({
//   page,
//   navCount,
//   maxPage,
// }: {
//   page: number;
//   navCount: number;
//   maxPage: number;
// }) => {
//   const iPage = page;
//   const iMaxPage = maxPage;
//   const iNavCount = navCount;
//   let iStartPage = Math.floor((iPage - 1) / iNavCount) * iNavCount + 1;
//   let iEndPage = iStartPage + (iNavCount - 1);
//   const aPaging = [];

//   if (iMaxPage > iNavCount && iStartPage > iMaxPage) {
//     iStartPage -= iNavCount;
//   }

//   if (iEndPage > iMaxPage) {
//     iEndPage = iMaxPage;
//   }

//   for (let i = iStartPage; i <= iEndPage; i += 1) {
//     aPaging.push(i);
//   }

//   return aPaging;
// };
