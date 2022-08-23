import * as React from 'react';
import { Button } from '@mui/material';
import axios from "axios";
import { useAuth0 } from '@auth0/auth0-react';

export default function CheckboxList({ ingredientArray, list, setList }) {
    const [checked, setChecked] = React.useState([]);
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
        setList(removeDuplicates([...list, ...checked]))
        pushToDB(removeDuplicates([...list, ...checked]))
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
                axios.put("https://recipe-api-authorized.herokuapp.com/api/recipes/update-shopping-list", {
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
        </>
    );
}
