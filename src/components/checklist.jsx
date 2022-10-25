import * as React from 'react';
import { Button } from '@mui/material';
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth0 } from '@auth0/auth0-react';

export default function CheckboxList({ ingredientArray, shoppingList, setShoppingList }) {
    const [checked, setChecked] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const { getAccessTokenSilently, user } = useAuth0();

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAdd = () => {
        if(checked.length !== 0){
            setOpen(true);
        }
        setShoppingList(removeDuplicates([...shoppingList, ...checked]))
        pushToDB(removeDuplicates([...shoppingList, ...checked]))
        setChecked([])
        uncheckAll()
    }

    const removeDuplicates = (arr) => {
        return [...new Set(arr)];
    }

    const uncheckAll = () => {
        var inputs = document.querySelectorAll('input');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].checked = false;
        }
    }

    const pushToDB = (shoppingList) => {
        (async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                axios.put("https://34rz1edov8.execute-api.us-west-1.amazonaws.com/shoppingList", {
                    shoppingList: shoppingList
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        user: user.email
                    },
                });
            } catch (error) {
            }
        })();
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <>
            <dl className='checklist'>
                {ingredientArray.map((item) => {
                    return (
                        <dt key={item} onChange={handleToggle(item)} className='checklist-item' >
                            <input type="checkbox" className='checkbox' id={`checkbox-${item}`} />
                            <label htmlFor={`checkbox-${item}`} className='check-label'>
                                {item}
                            </label>
                        </dt>
                    );
                })}

            </dl>
            <Button variant='contained' onClick={() => handleAdd()}> Add To Shopping List</Button>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message="Items added to Shopping List"
                action={action}
            />
        </>
    );
}
