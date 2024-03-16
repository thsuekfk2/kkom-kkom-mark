import { useState } from "react";
import { bookmarkService } from "../../service/bookmark.servce";
import { BookmarkListType, useActions } from "../../store/bookmark";
import { ToolTip } from "../ui/ToolTip";
import { Input } from "@chakra-ui/react";

export const BookmarkItem = ({ data }: { data: BookmarkListType }) => {
  const [editingData, setEditingData] = useState({ id: -1, description: "" });
  const { updateList } = useActions();

  const moveToPage = (url: string) => {
    chrome.tabs.create({ url });
  };

  const loadBookmarks = async () => {
    const fetchData = await bookmarkService.fetch();
    updateList(fetchData);
  };

  const saveDescription = async (url: string) => {
    await bookmarkService.updateDescription(url, editingData.description);
    loadBookmarks();
    setEditingData({ id: -1, description: "" });
  };

  return (
    <div className="flex flex-row">
      <div
        className="cursor-pointer w-[140px] overflow-hidden text-nowrap text-ellipsis break-all"
        onClick={() => moveToPage(data.url)}
      >
        <ToolTip label={data.url}>
          {data.url.replace(/^https?:\/\//g, "")}
        </ToolTip>
      </div>
      <div
        onClick={() => {
          setEditingData({ id: data.id, description: data.description });
        }}
      >
        {editingData.id === data.id && (
          <Input
            variant="unstyled"
            autoFocus
            className="outline-none ml-2"
            value={editingData.description}
            onChange={(e) =>
              setEditingData({ ...editingData, description: e.target.value })
            }
            onBlur={() => saveDescription(data.url)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveDescription(data.url);
              }
            }}
          />
        )}
        {editingData.id !== data.id && data.description ? (
          <div className="text-[#6e6e6e] w-[160px] ml-2">
            <ToolTip label={data.description}>{data.description}</ToolTip>
          </div>
        ) : (
          <span className="text-[#3384f681] ml-2">편집</span>
        )}
      </div>
    </div>
  );
};
