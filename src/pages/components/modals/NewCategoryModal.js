import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { FormControl, FormGroup, TextField } from "@mui/material";
import commonAPI from "@/pages/api/common";
import { useAppState } from "@/context/AppProvider";

const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const [{ profile }, dispatch] = useAppState();

  const [state, setState] = React.useState({
    id: "",
    label: "",
    options: [],
    units: [],
  });

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleChange = (e) => {
    setState({
      ...state,
      id: e.target.value.toLowerCase().replace(/\s/g, ""),
      label: e.target.value,
    });
  };

  const createCategory = () => {
    console.log(state);
    let load = {
      user: profile.uid,
      data: state,
    };
    commonAPI("createCategory", load)
      .then((res) => {
        console.log(res);
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Create new line item category</DialogTitle>
      <FormGroup sx={{ m: 1, minWidth: 350, padding: 2 }} row>
        <TextField
          id="outlined-basic"
          label="Name"
          placeholder="ex. Fule"
          value={state.label}
          variant="outlined"
          onChange={handleChange}
        ></TextField>
        <Button color="secondary" variant="contained" onClick={createCategory}>
          Create
        </Button>
      </FormGroup>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function NewCategoryModal() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        New Category
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
