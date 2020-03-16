// export const PAGINATION_TYPE = {
//   link: 'link',
//   event: 'event',
//   simple: 'simple',
//   status: 'status',
// };

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
/**
this.makePaging = function(){
    var aPaging = [],
        iPage = self.page(),
        iNavCount = self.navCount(),
        iRowCount = self.count(),
        iTotalCount = parseInt( this.totalcount() ),
        iMaxPage = Math.ceil( iTotalCount / iRowCount ),
        iStartPage = (Math.floor( ( iPage - 1 ) / iNavCount ) * iNavCount) + 1,
        iEndPage = iStartPage + iNavCount - 1,
        i
    ;

    if ((iMaxPage > iNavCount) && (iStartPage > iMaxPage)){
        iStartPage -= iNavCount;
    }

    if (iEndPage > iMaxPage){
        iEndPage = iMaxPage;
    }

    for(i = iStartPage; i <= iEndPage; i++){
        aPaging.push( i );
    }

    // console.log("page : ", iPage);
    // console.log("navCount : ", iNavCount);
    // console.log("totalCount : ", iTotalCount);
    // console.log("iMaxPage : ", iMaxPage);
    // console.log("iStartPage : ", iStartPage);
    // console.log("iEndPage : ", iEndPage);

    if (aPaging.length < 1){
        aPaging.push(1);
    }

    this.paging( aPaging );
    maxPage = iMaxPage;
};

 */
export const createPages = ({
  page,
  navCount,
  maxPage,
}: {
  page: number;
  navCount: number;
  maxPage: number;
}) => {
  const iPage = page;
  const iMaxPage = maxPage;
  const iNavCount = navCount;
  let iStartPage = Math.floor((iPage - 1) / iNavCount) * iNavCount + 1;
  let iEndPage = iStartPage + (iNavCount - 1);
  const aPaging = [];

  if (iMaxPage > iNavCount && iStartPage > iMaxPage) {
    iStartPage -= iNavCount;
  }

  if (iEndPage > iMaxPage) {
    iEndPage = iMaxPage;
  }

  for (let i = iStartPage; i <= iEndPage; i += 1) {
    aPaging.push(i);
  }

  return aPaging;
};

// export const PAGINATION_PROP_TYPES = {
//   className: PropTypes.string,
//   onHref: PropTypes.func,
//   onClick: PropTypes.func,
//   page: PropTypes.number,
//   totalCount: PropTypes.number,
//   limit: PropTypes.number,
//   navCount: PropTypes.number,
// };

// export const PAGINATION_DEFAULT_PROPS = {
//   page: 1,
//   totalCount: 1,
//   limit: 10,
//   navCount: 5,
//   onHref: () => {},
//   onClick: () => {},
// };

// export default {
//   PAGINATION_TYPE,
//   parseProps,
// };
