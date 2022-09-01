import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { TextField, Button } from '@mui/material';
import { useAuth0 } from "@auth0/auth0-react";
import DeleteModal from '../components/delete-modal';
import './page-styles/create-update.scss'

function Update({ recipe, setRecipe, recipes, setRecipes }) {
    const { getAccessTokenSilently, user } = useAuth0();
    const navigate = useNavigate();
    const { id }= useParams();

    const handleUpdate = (event) => {
        event.preventDefault();
        const index = recipes.findIndex(recipe => recipe.id === id);
        let name = event.target.elements.name.value;
        let imageURL = event.target.elements.imageURL.value;
        let ingredients = event.target.elements.ingredients.value;
        let method = event.target.elements.method.value;
        let notes = event.target.elements.notes.value;
        let tags = event.target.elements.tags.value;
        const updatedRecipe = {
            'id': recipe.id,
            'name': name,
            'imageURL': imageURL,
            'ingredients': ingredients,
            'method': method,
            'notes': notes,
            'tag': " " + tags,
        };

        setRecipe(updatedRecipe);
        setRecipes( Object.assign([], recipes, { [index]: updatedRecipe }));

        (async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                axios.put(process.env.REACT_APP_API,
                    updatedRecipe,{
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        user: user.email,
                    },
                }).then(() => {
                    navigate(-1)
                });

            } catch (error) {
            }
        })();
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
                            required={true}
                        />
                    </div>

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
                        id="tags"
                        margin="normal"
                        label="Tags"
                        fullWidth
                        variant="outlined"
                        type="text"
                        name="tags"
                        defaultValue={recipe.tags}
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
                        required={true}
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
                        <DeleteModal recipe={recipe} recipes={recipes} setRecipes={setRecipes} />

                        <div className='button-group'>
                            <Button onClick={() => navigate(-1)} variant="contained" color="secondary">Cancel</Button>
                            <Button type="submit" variant="contained">Update</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default Update