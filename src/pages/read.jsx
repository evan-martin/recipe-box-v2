import { Link } from "react-router-dom"
import { Divider, Button } from "@mui/material"
import './page-styles/read.scss'

function Read({ recipe }) {

    return (
        <div class="read-container">
            <div className="read-header-container">
                <div class="read-image-container">
                    <img className="read-image"
                        src={recipe.imageURL}
                        alt={recipe.name}
                    />
                </div>
                <h2 className="recipe-name">{recipe.name}</h2>
            </div>
            <div className="ingredient-method-container">
                <div className="ingredients-container">
                    <h3 className="ingredients-heading">Ingredients</h3>
                    <Divider />
                    <p className="ingredients-content">
                        {recipe.ingredients}
                    </p>
                </div>
                <div className="method-container">
                    <h3 className="method-heading">Method</h3>
                    <Divider />
                    <p className="method-content">{recipe.method}</p>
                </div>
            </div>
            <div className="notes-container">
                <h3>Notes:</h3>
                <Divider />
                <p className="notes">{recipe.notes}</p>
            </div>
            <div className="read-button-bar">
                <Link to={`/update/${recipe._id}`}>
                    <Button variant="outlined" color="secondary">Edit</Button>
                </Link>
                <Link to="/">
                    <Button variant="outlined" color="primary">Back</Button>
                </Link>
            </div>
        </div>
    )
}

export default Read