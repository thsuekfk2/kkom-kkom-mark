import { useActions } from "../../store/bookmark";

export const PageItem = ({
  page,
  isActive,
}: {
  page: number;
  isActive: boolean;
}) => {
  const { current } = useActions();

  return (
    <div
      className={`flex items-center justify-center w-3 h-3 p-3 text-[10px] rounded-md cursor-pointer border border-[#e2e8f0] ${
        isActive ? "bg-black text-white" : ""
      }`}
      onClick={() => current.updateCurrentPage(page - 1)}
    >
      {page}
    </div>
  );
};
