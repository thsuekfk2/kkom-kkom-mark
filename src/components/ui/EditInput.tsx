import {
  Button,
  ButtonGroup,
  EditableProps,
  Flex,
  Input,
  useEditableControls,
} from "@chakra-ui/react";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react";

export const EditInput = (props: EditableProps) => {
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <Button {...getSubmitButtonProps()}>save</Button>
        <Button {...getCancelButtonProps()}>X</Button>
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <Button size="sm" {...getEditButtonProps()}>
          edit
        </Button>
      </Flex>
    );
  }

  return (
    <Editable
      textAlign="center"
      fontSize="s"
      isPreviewFocusable={true}
      {...props}
    >
      <EditablePreview />
      <Input as={EditableInput} />
      <EditableControls />
    </Editable>
  );
};
