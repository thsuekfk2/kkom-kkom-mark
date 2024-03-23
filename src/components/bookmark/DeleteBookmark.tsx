import { useToast } from "@chakra-ui/react";
import { CloseIcon } from "../Icons";
import { bookmarkService } from "../../service/bookmark.service";
import { BookmarkListType, useActions } from "../../store/bookmark";

export const DeleteBookmark = ({ data }: { data: BookmarkListType }) => {
  const toast = useToast();
  const { updateList } = useActions();

  const loadBookmarks = async () => {
    const { data } = await bookmarkService.fetch();
    updateList(data);
  };

  const deleteBookmark = async (url: string) => {
    const { error } = await bookmarkService.delete(url);
    if (error) {
      toast({
        title: "북마크 삭제 실패",
        description: "북마크가 삭제되지 않았어요. 다시 시도해주세요",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }

    toast({
      title: "북마크 삭제 완료",
      description: "북마크가 삭제되었어요",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
    await loadBookmarks();
  };

  return (
    <div
      className="flex items-center p-[3px] rounded-sm cursor-pointer hover:bg-slate-100"
      onClick={() => deleteBookmark(data.url)}
    >
      <CloseIcon />
    </div>
  );
};
