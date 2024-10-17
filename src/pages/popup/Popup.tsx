import { useEffect } from "react";
import { bookmarkService } from "../../service/bookmark.service";
import { useActions, useBookmarkCurrent } from "../../store/bookmark";
import { Pagination } from "../../components/pagination/Pagination";
import { BookmarkList } from "../../components/bookmark/BookmarkList";
import { Search } from "../../components/Search";
import { AddBookMark } from "../../components/bookmark/AddBookMark";
import { EditTextarea } from "../../components/ui/EditTextarea";

export const Popup = () => {
  const { updateList, current } = useActions();
  const { bookmarkInfo } = useBookmarkCurrent();

  useEffect(() => {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      async function (tabs) {
        const currentUrl = tabs[0].url ?? "";
        current.updateCurrentUrl(currentUrl);
        await loadBookmarks();
      }
    );
  }, []);

  const loadBookmarks = async () => {
    const { data } = await bookmarkService.fetch();
    updateList(data);
  };

  return (
    <div className="flex flex-col bg-white items-center w-[400px] h-[450px] ">
      <div className="flex flex-col justify-center items-center h-full w-[90%]">
        <div className="flex h-[90px] w-full items-center">
          {bookmarkInfo?.url ? (
            <div className="flex flex-row w-full">
              <EditTextarea data={bookmarkInfo} />
            </div>
          ) : (
            <AddBookMark />
          )}
        </div>
        <Search />
        <div className="h-[320px] overflow-auto w-full">
          <BookmarkList />
        </div>
        <Pagination />
      </div>
    </div>
  );
};
