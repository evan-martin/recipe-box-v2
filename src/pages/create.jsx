import { Link } from 'react-router-dom';
import axios from "axios";
import { Button } from '@mui/material';
import CustomInput from '../components/custom-input';

function Create({ setRecipe }) {


    const handleCreate = (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const category = '';
        const imageURL = document.getElementById('imageURL').value;
        const ingredients = document.getElementById('ingredients').value;
        const method = document.getElementById('method').value;
        const notes = document.getElementById('notes').value;
        setRecipe({
            'name': name,
            'category': '',
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
            <form className='import-bar' onSubmit={handleScrape}>
                <CustomInput
                    fullWidth
                    id="url"
                    margin="normal"
                    label="Import Recipe"
                    type="text"
                    name="url"
                    focused
                    placeholder='Paste Recipe URL Here'
                />
                <Button variant='outlined' type='submit'>Import</Button>
            </form>
            <form onSubmit={handleCreate}>
                <div className='name-container'>
                    <CustomInput
                        fullWidth
                        id="name"
                        margin="normal"
                        label="Name"
                        type="text"
                        name="name"
                        required={true}
                    />
                </div>

                <CustomInput
                    id="imageURL"
                    margin="normal"
                    label="Image Url"
                    fullWidth
                    variant="outlined"
                    type="text"
                    name="imageURL"
                    focused
                />

                <CustomInput
                    id="ingredients"
                    margin="normal"
                    fullWidth
                    label="Ingredients"
                    type="text"
                    name="ingredients"
                    multiline
                    rows={20}
                    variant="outlined"
                    focused
                />

                <CustomInput
                    id='method'
                    margin="normal"
                    fullWidth
                    label="Method"
                    type="text"
                    name="method"
                    multiline
                    rows={20}
                    variant="outlined"
                    focused
                />

                <CustomInput
                    id="notes"
                    margin="normal"
                    fullWidth
                    label="Notes"
                    type="text"
                    name="notes"
                    multiline
                    rows={10}
                    variant="outlined"
                    focused
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