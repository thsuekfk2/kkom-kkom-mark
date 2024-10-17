import { useToast } from "@chakra-ui/react";
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
        description: "등록 실패",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
    await loadBookmarks();
  };

  return (
    <div
      className="flex cursor-pointer border border-[gray-200] hover:bg-gray-200 p-3 rounded-lg w-full h-[50px] items-center"
      onClick={saveBookmark}
    >
      <span className="flex items-center justify-center w-full text-center">
        <img src="/kkom.png" className="w-5 mr-3" />
        새로운 북마크 추가
      </span>
    </div>
  );
};
