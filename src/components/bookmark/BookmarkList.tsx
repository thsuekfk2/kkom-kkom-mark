import { BookmarkItem } from "./BookmarkItem";
import {
  BookmarkListType,
  useBookmarkCurrent,
  useBookmarkListData,
} from "../../store/bookmark";
import { useSession } from "../../store/user";
import { DeleteBookmark } from "./DeleteBookmark";

export const BookmarkList = () => {
  const { session } = useSession();
  const { list } = useBookmarkListData();
  const { url, bookmarkPage } = useBookmarkCurrent();

  return (
    <div className="flex flex-col gap-2">
      {session && list && list.length <= 0 && (
        <span>즐겨찾기가 비었습니다. '+' 를 눌러 추가해보세요!</span>
      )}
      {list &&
        list[bookmarkPage]?.map((data: BookmarkListType, i) => (
          <div
            className={`flex flex-row w-full ${
              url === data.url ? "bg-slate-200" : "bg-[#F1F4F6]"
            } rounded-sm p-2 hover:bg-slate-200 justify-between`}
            key={i}
          >
            <BookmarkItem data={data} />
            <DeleteBookmark data={data} />
          </div>
        ))}
    </div>
  );
};
