import { Input, InputProps } from "@chakra-ui/react";

export const EditInput = (props: InputProps) => {
  return (
    <Input
      variant="unstyled"
      className="outline-none"
      autoFocus
      onBlur={props.onBlur}
      {...props}
    />
  );
};
