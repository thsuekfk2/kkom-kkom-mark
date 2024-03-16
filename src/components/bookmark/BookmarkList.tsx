import { BookmarkItem } from "./BookmarkItem";
import { CloseIcon } from "../Icons";
import { bookmarkService } from "../../service/bookmark.servce";
import {
  BookmarkListType,
  useActions,
  useBookmarkCurrent,
  useBookmarkListData,
} from "../../store/bookmark";

export const BookmarkList = () => {
  const list = useBookmarkListData();
  const { url, bookmarkPage } = useBookmarkCurrent();
  const { updateList } = useActions();

  const loadBookmarks = async () => {
    const fetchData = await bookmarkService.fetch();
    updateList(fetchData);
  };

  const deleteBookmark = (url: string) => {
    bookmarkService.delete(url);
    loadBookmarks();
  };

  return list[bookmarkPage]?.map((data: BookmarkListType) => (
    <div
      className={`flex flex-row ${
        url === data.url ? "bg-slate-200" : "bg-[#F1F4F6]"
      } rounded-sm p-2 w-[90%] hover:bg-slate-200 justify-between`}
      key={data.id}
    >
      <BookmarkItem data={data} />
      <div
        className="flex items-center p-[3px] rounded-sm cursor-pointer hover:bg-slate-100"
        onClick={() => deleteBookmark(data.url)}
      >
        <CloseIcon />
      </div>
    </div>
  ));
};
