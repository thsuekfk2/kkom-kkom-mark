import { useBookmarkListData } from "../../store/bookmark";
import { PageItem } from "./PaginationItem";

export const Pagination = () => {
  const { list } = useBookmarkListData();

  return (
    <div className="flex flex-row items-center justify-center w-full gap-1">
      {list?.map((_, i: number) => (
        <PageItem page={i + 1} key={i} />
      ))}
    </div>
  );
};
