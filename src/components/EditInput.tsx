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
        placeholder="북마크를 설명해 주세요"
        className="flex items-center w-full h-full placeholder:text-slate-100 focus:outline-none"
        color={data.description || editingData ? "black" : "#a0a0a0"}
      >
        <ToolTip label={data.description}>
          <EditablePreview className="flex w-full h-full" />
        </ToolTip>
        <EditableInput
          _focusVisible={{ border: "none" }}
          _placeholder={{ color: "#a0a0a0" }}
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
