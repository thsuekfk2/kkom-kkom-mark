import { BookmarkListType } from "../../store/bookmark";
import { ToolTip } from "../ui/ToolTip";
import dayjs from "dayjs";

export const BookmarkItem = ({ data }: { data: BookmarkListType }) => {
  const todayDate = dayjs();
  const bookmarkDate = dayjs(data.created_at);
  const subDay = todayDate.diff(bookmarkDate, "day");
  const subHours = todayDate.diff(bookmarkDate, "hours");
  const subMinute = todayDate.diff(bookmarkDate, "minute");

  const moveToPage = (url: string) => {
    chrome.tabs.create({ url });
  };

  const getTimeDifference = () => {
    if (subMinute <= 0) return "방금";
    if (subHours <= 0) return `${subMinute}분 전`;
    if (subDay === 0 && subHours < 24) return `${subHours}시간 전`;
    if (subDay < 7) {
      if (subDay === 0 && todayDate.hour() < bookmarkDate.hour())
        return `D + ${subDay}`;
      return `D + ${subDay + 1}`;
    }
    return bookmarkDate.format("MM.DD");
  };

  return (
    <div className="flex flex-row w-full h-full overflow-hidden text-nowrap">
      <div className="min-w-[50px] text-[#8b95a1] text-[10px] flex items-center">
        {getTimeDifference()}
      </div>
      <div
        className="cursor-pointer w-[140px] min-w-[140px]"
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
