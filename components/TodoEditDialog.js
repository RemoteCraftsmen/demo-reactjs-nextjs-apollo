import React from "react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  DialogContentText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(4)
  },
  content: {
    marginBottom: theme.spacing(1)
  }
}));

export default function TodoEditDialog(props) {
  const { open, desc, handleClose, handleEdit } = props;
  const [description, setDescription] = useState(desc);
  const classes = useStyles();
  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      className={classes.root}
    >
      <DialogTitle id="form-dialog-title">Edit Todo</DialogTitle>
      <DialogContent className={classes.content}>
        <DialogContentText>Enter new description:</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Description:"
          type="text"
          fullWidth
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
            setDescription(desc);
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleEdit(description);
          }}
          color="primary"
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
