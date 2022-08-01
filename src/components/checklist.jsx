import * as React from 'react';
import { Button } from '@mui/material';

export default function CheckboxList({ ingredientArray, list, setList }) {
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

    const handleAdd = () => {
        setList(removeDuplicates([...list, ...checked]))
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

    return (
        <>
            <dl>
                {ingredientArray.map((item) => {
                    return (
                        <dt key={item} onChange={handleToggle(item)} >
                            <input type="checkbox" id={`checkbox-${item}`}/>
                            <label htmlFor={`checkbox-${item}`}> {item} </label>
                        </dt>
                    );
                })}

            </dl>
            <Button variant='contained' onClick={()=>handleAdd()}> Add To Shopping List</Button>
        </>
    );
}
