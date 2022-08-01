import React from "react";
import { Button } from "@mui/material";
import CustomInput from "../components/custom-input";
import './page-styles/shopping-list.scss'

export default function ShoppingList({ list, setList }) {
    const [checked, setChecked] = React.useState([]);

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
        if (!list.includes(item) && item !== '') {
            setList([...list, item])
        }
        document.getElementById('add-item').value = ""
    }

    const handleClear = () => {
        let filteredList = list
        checked.forEach(element => filteredList = filteredList.filter(value => value !== element))
        setList(filteredList)
        uncheckAll()
    }

    const handleClearAll = () => {
        setList([])
    }

    const uncheckAll = () => {
        var inputs = document.querySelectorAll('input');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].checked = false;
        }
    }

    return (
        <>
            <form onSubmit={handleAdd}>
                <CustomInput
                    label='Add Item'
                    id='add-item'
                />
                <Button variant='contained' type='submit'>Add Item</Button>
            </form>

            <dl>
                {list.map((item) => {
                    return (
                        <dt key={item} onChange={handleToggle(item)}>
                            <input type='checkbox' className='shopping-list-item' id={`checkbox-${item}`} />
                            <label htmlFor={`checkbox-${item}`}> {item} </label>
                        </dt>
                    );
                })}
            </dl>

            <Button variant='contained' onClick={() => handleClear()}>Clear</Button>
            <Button variant='contained' onClick={() => handleClearAll()}>Clear All</Button>

        </>
    )
}