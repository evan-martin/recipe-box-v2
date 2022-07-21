import { Link } from 'react-router-dom';
import axios from "axios";
import { TextField, MenuItem } from '@mui/material';

import DeleteModal from '../components/delete-modal';

function Update({ recipe, setRecipe }) {

    const handleUpdate = (event) => {
        event.preventDefault();
        let name = event.target.elements.name.value;
        let category = event.target.elements.category.value;
        let imageURL = event.target.elements.imageURL.value;
        let ingredients = event.target.elements.ingredients.value;
        let method = event.target.elements.method.value;
        let notes = event.target.elements.notes.value;
        setRecipe({
            ...recipe, 'name': name,
            'category': category,
            'imageURL': imageURL,
            'ingredients': ingredients,
            'method': method,
            'notes': notes,
        });
        axios.put("https://recipe-box-master-api.herokuapp.com/" + recipe._id, {
            name,
            category,
            imageURL,
            ingredients,
            method,
            notes
        })
            .then(() => {
                window.location.href = "/" + recipe._id;
            });
    }

    return (

        <>
            <h2>Editing {recipe.name}</h2>
            <form onSubmit={handleUpdate}>

                <TextField
                    id="name"
                    margin="normal"
                    label="Name"
                    variant="outlined"
                    type="text"
                    name="name"
                    defaultValue={recipe.name}
                />

                <TextField
                    select
                    id="category"
                    label="Category"
                    variant="outlined"
                    size="medium"
                    helperText="Select a category"
                    name="category"
                    defaultValue={recipe.category}
                >
                    <MenuItem value="pasta" >Pasta</MenuItem>
                    <MenuItem value="chicken" >Chicken</MenuItem>
                    <MenuItem value="soup" >Soup</MenuItem>
                    <MenuItem value="rice" >Rice & Grains</MenuItem>
                    <MenuItem value="baking" >Bread & Baking</MenuItem>
                    <MenuItem value="booze" >Booze</MenuItem>
                    <MenuItem value="dessert" >Dessert</MenuItem>
                </TextField>

                <TextField
                    id="imageURL"
                    margin="normal"
                    label="Image Url"
                    fullWidth
                    variant="outlined"
                    type="text"
                    name="imageURL"
                    defaultValue={recipe.imageURL}
                />

                <TextField
                    margin="normal"
                    fullWidth
                    label="Ingredients"
                    type="text"
                    name="ingredients"
                    multiline
                    rows={20}
                    variant="outlined"
                    defaultValue={recipe.ingredients}
                />

                <TextField
                    margin="normal"
                    fullWidth
                    label="Method"
                    type="text"
                    name="method"
                    multiline
                    rows={20}
                    variant="outlined"
                    defaultValue={recipe.method}
                />

                <TextField
                    margin="normal"
                    fullWidth
                    label="Notes"
                    type="text"
                    name="notes"
                    multiline
                    rows={10}
                    variant="outlined"
                    defaultValue={recipe.notes}
                />

                <button type="submit">Update</button>
            </form>
            <Link to={`/${recipe._id}`}>
                <button>Cancel</button>
            </Link>

            <DeleteModal recipe_id={recipe._id} />

        </>
    )
}

export default Update