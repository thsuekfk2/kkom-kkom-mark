import { Editable, EditablePreview, EditableTextarea } from "@chakra-ui/react";
import { bookmarkService } from "../../service/bookmark.service";
import { useActions, useBookmarkCurrent } from "../../store/bookmark";
import { useEffect, useState } from "react";

export const EditTextarea = ({ data }: any) => {
  const [editingData, setEditingData] = useState("");
  const { bookmarkInfo } = useBookmarkCurrent();
  const { updateList } = useActions();
  const [isOpenEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    setEditingData(data?.description);
  }, [bookmarkInfo]);

  const loadBookmarks = async () => {
    const { data } = await bookmarkService.fetch();
    updateList(data);
  };

  const saveDescription = async (url: string) => {
    if (editingData === "") {
      setOpenEdit(false);
    }

    await bookmarkService.updateDescription(url, editingData);
    await loadBookmarks();
  };

  return (
    <div
      className={`flex w-full p-2 rounded-lg bg-gray-100 h-[55px] items-start justify-center  overflow-hidden transition-all duration-500`}
    >
      {!bookmarkInfo?.description && !isOpenEdit ? (
        <div
          className="flex flex-row items-center h-full cursor-text"
          onClick={() => setOpenEdit(true)}
        >
          <img
            src="/kkom.png"
            className="flex justify-center w-5 mr-3 opacity-50 top-3"
          />
          <span className="flex text-[#c7c7c7]">어떤 북마크 인가요 ?</span>
        </div>
      ) : (
        <Editable
          defaultValue={data.description}
          value={editingData}
          className="flex items-center w-full h-full ml-3 overflow-auto placeholder:text-red-500"
          startWithEditView={isOpenEdit ? true : false}
          placeholder={"북마크를 설명해 주세요"}
          color={data.description || editingData ? "black" : "#c7c7c7"}
        >
          <EditablePreview className="flex w-full h-full" />
          <EditableTextarea
            _focusVisible={{ border: "none" }}
            _placeholder={{ color: "#c7c7c7" }}
            className="w-full h-full resize-none"
            onBlur={() => {
              saveDescription(data.url);
            }}
            onChange={(e) => {
              setEditingData(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveDescription(data.url);
                e.currentTarget.blur();
              }
            }}
          />
        </Editable>
      )}
    </div>
  );
};
