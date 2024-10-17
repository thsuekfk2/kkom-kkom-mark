import { BookmarkItem } from "./BookmarkItem";
import {
  BookmarkListType,
  useBookmarkCurrent,
  useBookmarkListData,
} from "../../store/bookmark";
import { DeleteBookmark } from "./DeleteBookmark";

export const BookmarkList = () => {
  const { list } = useBookmarkListData();
  const { url, bookmarkPage } = useBookmarkCurrent();

  return (
    <div className="flex flex-col w-full gap-2">
      {list && list.length <= 0 && (
        <div className="flex items-center justify-center w-full h-[250px] text-[70px] text-[#c7c7c7]">
          텅
        </div>
      )}
      {list &&
        list[bookmarkPage]?.map((data: BookmarkListType, i) => (
          <div
            className={`h-[33px] flex flex-row w-full ${
              url === data.url
                ? "bg-gray-300"
                : "bg-[#F1F4F6] hover:bg-gray-200"
            } rounded-lg p-2 justify-between`}
            key={i}
          >
            <BookmarkItem data={data} />
            <DeleteBookmark data={data} />
          </div>
        ))}
    </div>
  );
};
