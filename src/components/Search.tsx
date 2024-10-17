import { Input } from "@chakra-ui/react";
import { SearchIcon } from "./Icons";
import { useEffect, useState } from "react";
import { bookmarkService } from "../service/bookmark.service";
import { useDebounce } from "../hooks/useDebounce";
import { useActions } from "../store/bookmark";

export const Search = () => {
  const [searchText, setSearchText] = useState("");
  const debouncedQuery = useDebounce(searchText, 500);
  const { searchList } = useActions();

  const searchBookmark = async (searchText: string) => {
    const { data } = await bookmarkService.select(searchText);
    if (data) {
      searchList(data);
    }
  };

  useEffect(() => {
    searchBookmark(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <div className="flex justify-end w-full mb-2">
      <div className="flex flex-row items-center  border border-[gray-200] p-1 rounded-lg">
        <SearchIcon className="mt-1 mr-2" />
        <Input
          size={"xs"}
          variant="unstyled"
          placeholder="검색하기"
          className="outline-none w-[100px] text-xs placeholder:text-xs font-thin"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
    </div>
  );
};
