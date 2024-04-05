import { useLoaderData, useLocation } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { ProductsResponseWithParams, getPaginationLink } from "@/utils";

export default function PaginationContainer() {
  const results = useLoaderData() as ProductsResponseWithParams;
  const { page, pageCount } = results.meta.pagination;
  const location = useLocation();

  if (pageCount < 2) return null;
  return (
    <Pagination className="mt-16">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            to={
              page === 1
                ? getPaginationLink(
                    pageCount,
                    location.search,
                    location.pathname,
                  )
                : getPaginationLink(
                    page - 1,
                    location.search,
                    location.pathname,
                  )
            }
          />
        </PaginationItem>
        {Array.from({ length: pageCount }, (_, i) => {
          const pageNumber = i + 1;
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                to={getPaginationLink(
                  pageNumber,
                  location.search,
                  location.pathname,
                )}
                isActive={page === pageNumber}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            to={
              page === pageCount
                ? getPaginationLink(1, location.search, location.pathname)
                : getPaginationLink(
                    page + 1,
                    location.search,
                    location.pathname,
                  )
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
