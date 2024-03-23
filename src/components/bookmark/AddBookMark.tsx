import { useToast } from "@chakra-ui/react";
import { PlusIcon } from "../Icons";
import { bookmarkService } from "../../service/bookmark.service";
import { useActions, useBookmarkCurrent } from "../../store/bookmark";

export const AddBookMark = () => {
  const { updateList } = useActions();
  const toast = useToast();
  const { url } = useBookmarkCurrent();

  const loadBookmarks = async () => {
    const { data } = await bookmarkService.fetch();
    updateList(data);
  };

  const saveBookmark = async () => {
    const { data, error } = await bookmarkService.create(url);
    if (data) {
      toast({
        title: "북마크 등록 완료",
        description: "북마크가 등록되었어요",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
    if (error) {
      toast({
        title: "북마크 등록 실패",
        description:
          error.code === "23505" ? "이미 등록되어 있습니다." : "등록 실패",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
    await loadBookmarks();
  };

  return (
    <div
      className="flex cursor-pointer bg-slate-100 hover:bg-slate-200 p-3 rounded-lg w-full"
      onClick={saveBookmark}
    >
      <PlusIcon height={20} width={20} />
      <span className="ml-3">북마크 추가하기</span>
    </div>
  );
};
