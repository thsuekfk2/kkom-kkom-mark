import { useEffect } from "react";
import { PlusIcon, LoadingIcon } from "../../components/Icons";
import { bookmarkService } from "../../service/bookmark.servce";
import {
  useActions,
  useBookmarkCurrent,
  useBookmarkListData,
} from "../../store/bookmark";
import { Pagination } from "../../components/pagination/Pagination";
import { BookmarkList } from "../../components/bookmark/BookmarkList";

export const Popup = () => {
  const { updateList, current } = useActions();
  const { url } = useBookmarkCurrent();
  const list = useBookmarkListData();

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentUrl = tabs[0].url ?? "";
      current.updateCurrentUrl(currentUrl);
      loadBookmarks();
    });
  }, []);

  const loadBookmarks = async () => {
    const fetchData = await bookmarkService.fetch();
    updateList(fetchData);
  };

  const saveBookmark = async () => {
    await bookmarkService.create(url);
    await loadBookmarks();
  };

  return (
    <div className="flex flex-col w-[400px] h-[450px] bg-white">
      <div className="flex justify-center h-[60px] items-center">
        <span className="text-[15px] text-black font-extrabold">꼼꼼마크</span>
        <div
          className="absolute right-0 p-1 m-3 cursor-pointer hover:bg-slate-100"
          onClick={saveBookmark}
        >
          <PlusIcon height={15} width={15} />
        </div>
      </div>
      <div className="flex flex-col h-[340px] items-center gap-2 overflow-auto">
        {list.length <= 0 && <LoadingIcon widths={24} height={24} />}
        <BookmarkList />
      </div>
      <Pagination />
    </div>
  );
};
