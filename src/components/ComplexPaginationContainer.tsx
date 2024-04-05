import { useLoaderData, useLocation } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { type OrdersResponse, getPaginationLink } from "@/utils";

export default function ComplexPaginationContainer() {
  const results = useLoaderData() as OrdersResponse;
  const { page, pageCount } = results.meta.pagination;
  const location = useLocation();

  if (pageCount < 2) return null;

  return (
    <Pagination>
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
        <PaginationItem>
          <PaginationLink
            isActive={page === 1}
            to={getPaginationLink(1, location.search, location.pathname)}
          >
            1
          </PaginationLink>
        </PaginationItem>
        <ComplexPaginationItem page={page} pageCount={pageCount} />
        <PaginationItem>
          <PaginationLink
            isActive={page === pageCount}
            to={getPaginationLink(
              pageCount,
              location.search,
              location.pathname,
            )}
          >
            {pageCount}
          </PaginationLink>
        </PaginationItem>
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

function ComplexPaginationItem({
  page,
  pageCount,
}: {
  page: number;
  pageCount: number;
}) {
  if (pageCount === 2) return null;
  if (page === 1 || page === pageCount) {
    return (
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
    );
  }
  return (
    <>
      {page === 2 ? null : (
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
      )}
      <PaginationItem>
        <PaginationLink
          isActive
          to={getPaginationLink(page, location.search, location.pathname)}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
      {page === pageCount - 1 ? null : (
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
      )}
    </>
  );
}
