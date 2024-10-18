import {
  useActions,
  useBookmarkCurrent,
  useBookmarkListData,
} from "../../store/bookmark";
import { PageItem } from "./PaginationItem";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

export const Pagination = () => {
  const { list } = useBookmarkListData();
  const { bookmarkPage } = useBookmarkCurrent();
  const { current } = useActions();

  const totalPages = list?.length ?? 0;
  const itemsPerPage = 5;

  let startPage = Math.max(0, bookmarkPage - Math.floor(itemsPerPage / 2));
  let endPage = startPage + itemsPerPage;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(0, endPage - itemsPerPage);
  }
  return (
    <div className="flex relative flex-row items-center justify-center w-full gap-1 h-[50px]">
      {bookmarkPage > 0 && totalPages > 5 && (
        <button
          className="absolute left-[70px] p-2"
          onClick={() => current.updateCurrentPage(bookmarkPage - 1)}
        >
          <ChevronLeftIcon />
        </button>
      )}
      {list?.slice(startPage, endPage).map((_, i: number) => (
        <PageItem
          isActive={bookmarkPage === startPage + i}
          page={startPage + i + 1}
          key={i}
        />
      ))}
      {bookmarkPage > 0 && totalPages > 5 && bookmarkPage < totalPages - 1 && (
        <button
          className="absolute right-[60px] p-2"
          onClick={() => current.updateCurrentPage(bookmarkPage + 1)}
        >
          <ChevronRightIcon />
        </button>
      )}
    </div>
  );
};
