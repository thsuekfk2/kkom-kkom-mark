import { useActions } from "../../store/bookmark";

export const PageItem = ({ page }: { page: number }) => {
  const { current } = useActions();

  return (
    <div
      className="flex items-center justify-center w-3 h-3 p-3 text-[10px] rounded-full cursor-pointer bg-gray-100 hover:bg-gray-200"
      onClick={() => current.updateCurrentPage(page - 1)}
    >
      {page}
    </div>
  );
};
