import { Link } from 'react-router-dom';
import axios from "axios";
import { TextField, MenuItem } from '@mui/material';

function Create({ setRecipe }) {

    const handleCreate = (event) => {
        event.preventDefault();
        let name = event.target.elements.name.value;
        let category = event.target.elements.category.value;
        let imageURL = event.target.elements.imageURL.value;
        let ingredients = event.target.elements.ingredients.value;
        let method = event.target.elements.method.value;
        let notes = event.target.elements.notes.value;
        setRecipe({
            'name': name,
            'category': category,
            'imageURL': imageURL,
            'ingredients': ingredients,
            'method': method,
            'notes': notes,
        });
        axios.post("https://recipe-box-master-api.herokuapp.com/", {
            name,
            category,
            imageURL,
            ingredients,
            method,
            notes
        })
            .then(() => {
                window.location.href = "/";
            });
    }

    return (

        <>
            <h2>New Recipe</h2>
            <form onSubmit={handleCreate}>

                <TextField
                    id="name"
                    margin="normal"
                    label="Name"
                    variant="outlined"
                    type="text"
                    name="name"
                    required={true}
                />

                <TextField
                    select
                    id="category"
                    label="Category"
                    variant="outlined"
                    size="medium"
                    helperText="Select a category"
                    name="category"
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
                />

                <button type="submit">Create</button>
            </form>
            <Link to={`/`}>
                <button>Cancel</button>
            </Link>

        </>
    )
}

export default Create