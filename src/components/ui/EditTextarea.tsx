import { Editable, EditablePreview, EditableTextarea } from "@chakra-ui/react";
import { bookmarkService } from "../../service/bookmark.service";
import { useActions, useBookmarkCurrent } from "../../store/bookmark";
import { useEffect, useRef, useState } from "react";

export const EditTextarea = ({ data }: any) => {
  const editRef = useRef<any>(data.description);
  const { bookmarkInfo } = useBookmarkCurrent();
  const { updateList } = useActions();
  const divRef = useRef<any>(null);
  const [hasScroll, setHasScroll] = useState(false);
  const [isOpenEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    const divElement = divRef.current;
    if (divElement) {
      const hasVerticalScrollbar =
        divElement.scrollHeight > divElement.clientHeight;
      setHasScroll(hasVerticalScrollbar);
    }

    editRef.current = data?.description;
  }, [bookmarkInfo]);

  const loadBookmarks = async () => {
    const { data } = await bookmarkService.fetch();
    updateList(data);
  };

  const saveDescription = async (url: string) => {
    await loadBookmarks();
  };

  return (
    <div
      className={`flex absolute w-full p-2 rounded-lg bg-slate-100 h-[55px] items-start justify-center  overflow-hidden transition-all duration-500 hover:${
        hasScroll && "h-full"
      }`}
    >
      {!bookmarkInfo?.description && !isOpenEdit ? (
        <div
          className="flex flex-row h-full items-center cursor-text"
          onClick={() => setOpenEdit(true)}
        >
          <img src="/pencil.png" className="w-8 flex justify-center top-3 " />
          <span className="flex">어떤 북마크 인가요 ?</span>
        </div>
      ) : (
        <Editable
          ref={divRef}
          defaultValue={data.description}
          value={editRef.current.value}
          className="w-full h-full flex items-center ml-3 overflow-auto"
          startWithEditView={isOpenEdit ? true : false}
          placeholder="북마크를 설명해 주세요"
        >
          <EditablePreview
            alignContent={!hasScroll ? "center" : ""}
            className="w-full h-full flex"
          />
          <EditableTextarea
            alignContent={!hasScroll ? "center" : ""}
            className="w-full h-full resize-none"
            onBlur={() => saveDescription(data.url)}
            onChange={(e) => {
              editRef.current = e.target.value;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.currentTarget.blur();
              }
            }}
          />
        </Editable>
      )}
    </div>
  );
};
