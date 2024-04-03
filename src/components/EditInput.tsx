import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react";
import { BookmarkListType, useActions } from "../store/bookmark";
import { bookmarkService } from "../service/bookmark.service";
import { ToolTip } from "./ui/ToolTip";
import { useEffect, useState } from "react";

export const EditInput = ({ data }: { data: BookmarkListType }) => {
  const [editingData, setEditingData] = useState("");
  const { updateList } = useActions();

  useEffect(() => {
    setEditingData(data.description);
  }, [data]);

  const loadBookmarks = async () => {
    const { data } = await bookmarkService.fetch();
    updateList(data);
  };

  const saveDescription = async (url: string) => {
    await bookmarkService.updateDescription(url, editingData);
    await loadBookmarks();
  };

  return (
    <div
      className="flex flex-row justify-between w-full"
      onClick={() => {
        setEditingData(data.description);
      }}
    >
      <Editable
        defaultValue={data.description}
        value={editingData}
        placeholder="설명 추가"
        className="w-full h-full flex items-center placeholder:text-slate-100"
        color={data.description || editingData ? "black" : "#c7c7c7"}
      >
        <ToolTip label={data.description}>
          <EditablePreview className="w-full h-full flex" />
        </ToolTip>
        <EditableInput
          _placeholder={{ color: "#c7c7c7" }}
          onBlur={() => saveDescription(data.url)}
          onChange={(e) => {
            setEditingData(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              saveDescription(data.url);
            }
          }}
        />
      </Editable>
    </div>
  );
};
