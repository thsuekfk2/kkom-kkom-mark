import { useEffect, useState } from "react";
import { LoadingIcon } from "../../components/Icons";
import { bookmarkService } from "../../service/bookmark.service";
import { useActions, useBookmarkCurrent } from "../../store/bookmark";
import { Pagination } from "../../components/pagination/Pagination";
import { BookmarkList } from "../../components/bookmark/BookmarkList";
import { supabase } from "../../lib/supabase";
import { Search } from "../../components/Search";
import { AddBookMark } from "../../components/bookmark/AddBookMark";
import { GoogleLogin } from "../../components/Auth/GoogleLogin";
import { useSession } from "../../store/user";
import { Logout } from "../../components/Auth/Loogout";

export const Popup = () => {
  const { updateList, current } = useActions();
  const { bookmarkInfo } = useBookmarkCurrent();
  const [initLoading, setInitLoading] = useState(true);
  const { session, setSession } = useSession();

  const getSession = async () => {
    const { data } = await supabase.auth.getSession();
    return data.session;
  };

  useEffect(() => {
    (async () => {
      chrome.storage.local.get("session", async function (result) {
        if (result.session) {
          await supabase.auth.setSession(result.session);
          const session = await getSession();
          setSession(session);
          loadBookmarks();
        }
        setInitLoading(false);
      });
    })();
  }, []);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentUrl = tabs[0].url ?? "";
      current.updateCurrentUrl(currentUrl);
      loadBookmarks();
    });
  }, []);

  const loadBookmarks = async () => {
    const { data } = await bookmarkService.fetch();
    updateList(data);
  };

  return (
    <div className="flex flex-col bg-white items-center w-[400px] h-[450px] ">
      {initLoading && (
        <div className="absolute flex justify-center items-center bg-white w-full h-full z-10">
          <LoadingIcon widths={24} height={24} />
        </div>
      )}
      {!session && <GoogleLogin />}
      {session && (
        <div className="flex flex-col  justify-center items-center h-full w-[90%] ">
          <Logout />
          <div className="flex h-[70px] w-full justify-center items-center ">
            {bookmarkInfo?.url ? (
              <div className="flex w-full flex-row justify-between">
                description : {bookmarkInfo.description}
              </div>
            ) : (
              <AddBookMark />
            )}
          </div>
          <div className="h-[340px] overflow-auto w-full">
      <div className="flex flex-col h-[340px] items-center gap-2 overflow-auto">
        {list.length <= 0 && <LoadingIcon widths={24} height={24} />}
            <BookmarkList />
          </div>
          <Pagination />
        </div>
      )}
    </div>
  );
};
