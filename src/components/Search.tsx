import { Input } from "@chakra-ui/react";
import { SearchIcon } from "./Icons";
import { useEffect, useState } from "react";
import { bookmarkService } from "../service/bookmark.service";
import { useDebounce } from "../hooks/useDebounce";
import { useActions } from "../store/bookmark";

export const Search = () => {
  const [searchText, setSearchText] = useState("");
  const debouncedQuery = useDebounce(searchText, 500);
  const { updateList } = useActions();

  const searchBookmark = async (searchText: string) => {
    const { data } = await bookmarkService.select(searchText);
    if (data) {
      updateList(data);
    }
  };

  useEffect(() => {
    searchBookmark(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <div className="flex w-full justify-end mb-2">
      <div className="flex flex-row items-center">
        <SearchIcon className="mr-2" />
        <Input
          variant="unstyled"
          placeholder="검색하기"
          className="outline-none w-[100px]"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
    </div>
  );
};
