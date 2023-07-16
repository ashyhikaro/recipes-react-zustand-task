import './RecipeCard.css'

import { Recipe } from "./RecipeType"
import { forwardRef, ForwardRefRenderFunction, HTMLAttributes } from 'react'

interface RecipeLinkI extends HTMLAttributes<HTMLDivElement> {
  recipe: Recipe
  ref?: (node: HTMLDivElement) => void
  setVisibleRecipes: React.Dispatch<React.SetStateAction<(Recipe)[]>>
}

const RecipeLinkForward: ForwardRefRenderFunction<HTMLDivElement, RecipeLinkI> = ({recipe, setVisibleRecipes}, ref) => {
  
  const handleSelect = (itemId: number, event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button === 2) {
      event.target.addEventListener("contextmenu", (e) => {e.preventDefault()});

      setVisibleRecipes((prevItems) => prevItems.map((item) =>
          item.id === itemId ? { ...item, selected: !item.selected} : item
        )
      )
    }
  }

  return (
    <div
      className="recipe"
      ref={ref}
      onMouseDown={(event) => handleSelect(recipe.id, event)}
      style={{ backgroundColor: recipe.selected ? 'lightblue' : 'white' }}
    >
        <div className='recipe_img__wrapper'>
          <img src={recipe.image_url} alt={recipe.name} className='recipe_img' />
        </div>
    
        <div className='recipe_disc'>
            <h3 className='recipe_name'>{recipe.name}</h3>
            <p className='recipe_tag'><span className='recipe_span'>Slogan:</span> {recipe.tagline}</p>
            <p className='recipe_description'><span className='recipe_span'>Description:</span> {recipe.description.split('.')[0]}...</p>
        </div>
    </div>
  )
}

export const RecipeLink = forwardRef(RecipeLinkForward);