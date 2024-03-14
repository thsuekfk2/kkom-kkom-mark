import { Input, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export const BookmarkItem = ({ fetchUrls, data }: any) => {
  const [openEditUrlDescription, setOpenEditUrlDescription] =
    useState<number>(0);
  const [descriptionData, setDescriptionData] = useState("");

  const moveToPage = (url: string) => {
    chrome.tabs.create({ url });
  };

  const updateDescription = async (url: string) => {
    const { error } = await supabase
      .from("url")
      .update({
        description: descriptionData,
      })
      .eq("url", url);
    console.log(error);
    setDescriptionData("");
    setOpenEditUrlDescription(-1);
    fetchUrls();
  };

  return (
    <div className="flex flex-row">
      <div
        className="cursor-pointer w-[200px] overflow-hidden text-nowrap text-ellipsis break-all"
        onClick={() => moveToPage(data.url)}
      >
        {data.url.replace(/^https?:\/\/www./g, "")}
      </div>
      <div
        className="flex"
        onClick={() => {
          setOpenEditUrlDescription(data.id);
          setDescriptionData(data.description);
        }}
      >
        {openEditUrlDescription == data.id ? (
          <>
            <Input
              variant="unstyled"
              value={descriptionData}
              onChange={(e) => {
                const newValue = e.target.value;
                setDescriptionData(newValue);
              }}
              className="outline-none"
            />
            <span
              className="text-[#3384f681] cursor-pointer"
              onClick={() => {
                updateDescription(data.url);
              }}
            >
              save
            </span>
          </>
        ) : data.description ? (
          <div className="text-[#6e6e6e] overflow-hidden w-[170px] text-nowrap text-ellipsis break-all">
            <Tooltip
              label={data.description}
              bg="#2d3748"
              color="white"
              className="pl-1 pr-1 break-words text-wrap"
            >
              {`: ${data.description}`}
            </Tooltip>
          </div>
        ) : (
          <div className="text-[#3384f681]">edit</div>
        )}
      </div>
    </div>
  );
};
