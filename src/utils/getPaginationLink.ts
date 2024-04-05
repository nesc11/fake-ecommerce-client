export const getPaginationLink = (
  pageNumber: number,
  search: string,
  pathname: string,
  // pagesNumber: number,
  // currentPage: number,
): string => {
  const searchParams = new URLSearchParams(search);
  // if (pageNumber < currentPage && currentPage === 1) {
  //   searchParams.set("page", pagesNumber.toString());
  // } else if (pageNumber > currentPage && currentPage === pagesNumber) {
  //   searchParams.set("page", "1");
  // } else {
  //   searchParams.set("page", pageNumber.toString());
  // }
  searchParams.set("page", pageNumber.toString());
  return `${pathname}?${searchParams.toString()}`;
};
