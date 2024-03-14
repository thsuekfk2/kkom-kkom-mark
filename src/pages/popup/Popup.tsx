import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { AddIcon, LoadingIcon } from "../../components/Icons";
import { BookmarkList } from "../../components/bookmark/BookmarkList";

export const Popup = () => {
  const [url, setUrl] = useState<string[] | null>([]);
  const [currentUrl, setCurrentUrl] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentUrl = tabs[0].url;
      setCurrentUrl(currentUrl);
    });
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const { data } = await supabase.from("url").select("*");
      setUrl(data);
      setLoading(false);
    } catch (error) {
      console.error("Error data:", error);
      setLoading(false);
    }
  };

  const createBookMark = async () => {
    try {
      await supabase
        .from("url")
        .insert([{ url: currentUrl, description: "" }])
        .select();
      fetchUrls();
    } catch (error) {
      console.error("Error data:", error);
    }
  };

  return (
    <div className="flex flex-col w-[500px] h-[500px] overflow-y-auto overflow-x-hidden bg-[#ffffff]">
      <div
        className="absolute right-0 m-3 cursor-pointer"
        onClick={createBookMark}
      >
        <AddIcon />
      </div>
      <div className="flex justify-center h-[100px] items-center">
        <span className="text-[20px] text-black font-extrabold">꼼꼼마크</span>
      </div>
      <div className="flex flex-col flex-wrap items-center h-full gap-2">
        {loading && <LoadingIcon />}
        <BookmarkList url={url} fetchUrls={fetchUrls} currentUrl={currentUrl} />
      </div>
    </div>
  );
};
