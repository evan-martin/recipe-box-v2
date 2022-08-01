import * as React from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

function SimpleDialog(props) {
    const { onClose, open, recipe_id } = props;

    const handleClose = () => {
        onClose();
    };

    const handleDelete = () => {
        axios.delete("https://recipe-box-master-api.herokuapp.com/" + recipe_id)
            .then(() => {
                window.location.href = "/";
            });
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Are You Sure?</DialogTitle>
            <DialogContent>
                <DialogContentText>This Action Cannot Be Undone.</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDelete} color="error">Delete </Button>
            </DialogActions>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default function DeleteModal({ recipe_id } ) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="error" onClick={handleClickOpen}>
                Delete
            </Button>
            <SimpleDialog
                open={open}
                onClose={handleClose}
                recipe_id={recipe_id}
            />
        </div>
    );
}
