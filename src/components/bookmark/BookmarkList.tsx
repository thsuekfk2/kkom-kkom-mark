import { supabase } from "../../lib/supabase";
import { BookmarkItem } from "./BookmarkItem";
import { CloseIcon } from "../Icons";

export const BookmarkList = ({ url, fetchUrls, currentUrl }: any) => {
  const deleteBookmark = async (url: string) => {
    const { error } = await supabase.from("url").delete().eq("url", url);
    if (error) throw new Error(`에러!! ${error.message}`);
    fetchUrls();
  };

  return url?.map((data: any) => (
    <div
      className={`flex flex-row ${
        currentUrl === data.url ? "bg-slate-200" : "bg-[#F1F4F6]"
      } rounded-sm p-2 w-[400px] hover:bg-slate-200 justify-between`}
      key={data.id}
    >
      <BookmarkItem data={data} fetchUrls={fetchUrls} />
      <div
        className="flex items-center cursor-pointer"
        onClick={() => deleteBookmark(data.url)}
      >
        <CloseIcon />
      </div>
    </div>
  ));
};
