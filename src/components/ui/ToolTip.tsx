import { Tooltip, TooltipProps } from "@chakra-ui/react";

export const ToolTip = (props: TooltipProps) => {
  return (
    <Tooltip
      bg="#2d3748"
      color="white"
      className="flex flex-wrap pl-1 pr-1 break-words text-wrap max-w-[300px]"
      placement="bottom-start"
      {...props}
    >
      <div className="overflow-hidden break-all text-nowrap text-ellipsis">
        {props.children}
      </div>
    </Tooltip>
  );
};
