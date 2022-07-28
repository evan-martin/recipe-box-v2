import { Link } from 'react-router-dom';
import axios from "axios";
import { TextField, MenuItem, Button } from '@mui/material';

function Create({ setRecipe }) {

    const handleCreate = (event) => {
        event.preventDefault();
        const name = event.target.elements.name.value;
        const category = event.target.elements.category.value;
        const imageURL = event.target.elements.imageURL.value;
        const ingredients = event.target.elements.ingredients.value;
        const method = event.target.elements.method.value;
        const notes = event.target.elements.notes.value;
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

    const handleScrape = (event) => {
        event.preventDefault();
        const url = event.target.elements.url.value;
        axios.post("https://recipe-box-master-api.herokuapp.com/import", { url }).then((res) => {
            document.getElementById('name').value = res.data.name
            document.getElementById('imageURL').value = res.data.imageURL
            document.getElementById('ingredients').value = res.data.ingredients.join("\n")
            document.getElementById('method').value = res.data.method.join("\n")
        });

    }

    return (

        <div className='form-container'>
            <h2>New Recipe</h2>
            <form onSubmit={handleScrape}>
                <TextField
                    id="url"
                    margin="normal"
                    label="url"
                    variant="outlined"
                    type="text"
                    name="url"
                />
                <Button type='submit'>scrape!</Button>
            </form>
            <form onSubmit={handleCreate}>
                <div className='name-container'>
                    <TextField
                        id="name"
                        margin="normal"
                        label="Name"
                        variant="outlined"
                        type="text"
                        name="name"
                        required={true}
                    />
                </div>

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
                    id="ingredients"
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
                    id='method'
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
                <div className='button-bar' >
                    <Link to={`/`} style={{ textDecoration: "none" }}>
                        <Button variant="outlined" color='secondary'>Cancel</Button>
                    </Link>
                    <Button variant="outlined" type="submit">Create</Button>
                </div>
            </form>


        </div>
    )
}

export default Create