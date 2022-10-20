import React from "react";
import { Button } from "@mui/material";
import CustomInput from "../components/custom-input";
import axios from "axios";
import { useAuth0 } from '@auth0/auth0-react';
import './page-styles/shopping-list.scss'

export default function ShoppingList({ shoppingList, setShoppingList }) {
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

    const handleAdd = (event) => {
        event.preventDefault();
        const item = document.getElementById('add-item').value.trim()
        if (!shoppingList.includes(item) && item !== '') {
            setShoppingList([...shoppingList, item])
            pushToDB([...shoppingList, item])
        }
        document.getElementById('add-item').value = ""
    }

    const handleClear = () => {
        let filteredList = shoppingList
        checked.forEach(element => filteredList = filteredList.filter(value => value !== element))
        setShoppingList(filteredList)
        pushToDB(filteredList)
        uncheckAll()
    }

    const handleClearAll = () => {
        setShoppingList([])
        pushToDB([])
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

    return (
        <div className="shopping-container">
            <div className="shopping-content">
                <h2>Shopping List</h2>
                <form className='add-bar' onSubmit={handleAdd}>
                    <CustomInput
                        label='Add Item'
                        id='add-item'
                        fullWidth
                        margin="normal"
                    />
                    <Button variant='contained' type='submit'>Add Item</Button>
                </form>

                <dl>
                    {shoppingList.map((item) => {
                        return (
                            <dt key={item} onChange={handleToggle(item)}>
                                <input type='checkbox' className='shopping-list-item' id={`checkbox-${item}`} />
                                <label htmlFor={`checkbox-${item}`}> {item} </label>
                            </dt>
                        );
                    })}
                </dl>

                <div className="button-bar">
                    <Button variant='contained' onClick={() => handleClear()}>Clear</Button>
                    {/* <Button variant='contained' onClick={() => handleClearAll()}>Clear All</Button> */}
                </div>
            </div>
        </div>
    )
}