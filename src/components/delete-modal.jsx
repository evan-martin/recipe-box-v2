import * as React from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { useAuth0 } from '@auth0/auth0-react';

function SimpleDialog(props) {
    const { onClose, open, recipe, recipes, setRecipes } = props;
    const { getAccessTokenSilently, user } = useAuth0();
    const navigate = useNavigate();

    const handleClose = () => {
        onClose();
    };

    const handleDelete = () => {
        setRecipes(recipes.filter(item => item !== recipe));
        (async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                axios.delete("https://recipe-api-authorized.herokuapp.com/api/recipes/delete", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        user: user.email,
                        recipe: recipe._id,
                    },
                }).then(() => {
                    navigate("/recipes");
                });

            } catch (error) {
            }
        })();
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

export default function DeleteModal({ recipe, recipes, setRecipes }) {
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
                recipe={recipe}
                recipes={recipes}
                setRecipes={setRecipes}
            />
        </div>
    );
}
