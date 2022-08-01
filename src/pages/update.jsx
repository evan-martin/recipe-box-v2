import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { TextField, MenuItem, Button } from '@mui/material';
import DeleteModal from '../components/delete-modal';
import './page-styles/create-update.scss'

function Update({ recipe, setRecipe }) {
    const navigate = useNavigate();

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
                navigate(-1)
            });
    }

    return (

        <div className='form-container'>
            <div className='form-content'>
                <h2>Editing {recipe.name}</h2>
                <form onSubmit={handleUpdate}>

                    <div className='name-container'>
                        <TextField
                            id="name"
                            margin="normal"
                            label="Name"
                            variant="outlined"
                            type="text"
                            name="name"
                            defaultValue={recipe.name}
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
                    <div className='button-bar'>
                        <DeleteModal recipe_id={recipe._id} />

                        <div className='button-group'>
                            <Button onClick={() => navigate(-1)} variant="outlined" color="secondary">Cancel</Button>
                            <Button type="submit" variant="outlined">Update</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default Update