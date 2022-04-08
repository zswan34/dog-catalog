import { ActionButton, Button, ButtonGroup, Content, Dialog, Text, DialogTrigger, Divider, Header, Heading, DialogContainer, AlertDialog } from "@adobe/react-spectrum";
import { useState } from "react";

const CatalogCompareDialog = ({...props}) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    return (
        <>
      <ActionButton onPress={() => setOpen(true)}>
        <Text>Delete</Text>
      </ActionButton>
      <DialogContainer onDismiss={() => setOpen(false)} {...props}>
        {isOpen &&
          <AlertDialog
            title="Delete"
            variant="destructive"
            primaryActionLabel="Delete">
            Are you sure you want to delete this item?
          </AlertDialog>
        }
      </DialogContainer>
    </>
    )
}

export default CatalogCompareDialog;