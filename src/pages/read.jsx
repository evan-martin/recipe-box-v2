import { Link } from "react-router-dom"

function Read({ recipe }) {

    return (
        <div>
            <p>{recipe.name}</p>
            <p>{recipe.ingredients}</p>
            <p>{recipe.method}</p>
            <Link to={`/update/${recipe._id}`}>
                <button>Edit</button>
            </Link>
            <Link to="/">
                <button>Home</button>
            </Link>
        </div>
    )
}

export default Read