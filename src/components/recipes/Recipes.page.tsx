import './Recipes.css'

import { useEffect, useState, useRef, useCallback } from 'react'
import { NavLink } from 'react-router-dom'

import { useRecipesStore } from "./store"
import useGetRecipes from '../hooks/useGetRecipes'

import { Recipe } from '../recipeCard/RecipeType'
import { RecipeLink } from '../recipeCard/RecipeCard'

interface RecipesPageI {
  setSelectedRecipe: React.Dispatch<React.SetStateAction<Recipe | null>>
}

export const RecipesPage: React.FC<RecipesPageI> = ({setSelectedRecipe}) => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [visibleRecipes, setVisibleRecipes] = useState<Recipe[]>(useRecipesStore(state => state.visibleRecipes))
  const [visibleIndexes, setVisibleIndexes] = useState<number>(15)
  const [isSelected, setIsSelected] = useState<boolean>(false)

  useGetRecipes(pageNumber)

  const recipes = useRecipesStore(state => state.recipes)
  const loading = useRecipesStore(state => state.loading)
  const hasError = useRecipesStore(state => state.error)
  const hasMore = useRecipesStore(state => state.hasMore)

  console.log(recipes)

  const addVisibleRecipes = useRecipesStore(state => state.addVisibleRecipes)

  const observer = useRef<IntersectionObserver | null>()
  const lastRecipeElementRef = useCallback((node: HTMLDivElement) => {
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore) {
        if (visibleRecipes[visibleRecipes.length - 1].id % 25 === 0) {
          setPageNumber(prevPageNumner => prevPageNumner + 1)
        }
        setVisibleIndexes(prevIndexes => prevIndexes + 5)
      }
    })

    if (node) observer.current.observe(node)
  }, [hasMore, visibleRecipes])

  const handleDelete = () => {
    setVisibleRecipes(prevArray => prevArray.filter((item) => !item.selected))
  }

  const handleFollow = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, recipe: Recipe) => {
    if (!recipe.selected) {setSelectedRecipe(recipe)}
    else event.preventDefault()
  }

  useEffect(() => {
    if (recipes.length > 0) {
      setVisibleRecipes((prevVisibleRecipes) => {
        let newRecipes = [...prevVisibleRecipes]
        const prevLastElem = prevVisibleRecipes[prevVisibleRecipes.length-1]?.id

        if (newRecipes.length === 0) {
          console.log(0)
          for (let i = 0; i < visibleIndexes; i++) {
            if (recipes[i]) newRecipes.push({...recipes[i], selected: false})
          }
        } else {
          if (newRecipes.length < 15) {
            console.log(1)
            for (let i = prevLastElem; i < prevLastElem + 5; i++) {
              if (recipes[i]) {
                newRecipes.push({...recipes[i], selected: false})
              }
            }
          } else {
            newRecipes = []

            for (let i = visibleIndexes - 15; i < visibleIndexes; i++) {
              if (recipes[i]) newRecipes.push({...recipes[i], selected: false})
            }
          }
        }

        return newRecipes
      })
    }
  }, [recipes, visibleIndexes])

  useEffect(() => {
    const hasSelectedRecipe = visibleRecipes.some(obj => obj.selected === true);

    if (hasSelectedRecipe) {
      setIsSelected(true)
    } else {
      setIsSelected(false)
    }

    addVisibleRecipes(visibleRecipes)
  }, [visibleRecipes])

  return (
    <div className='wrapper'>
      <h1 className='recipes_title'>Beer Recipes</h1>
      {isSelected ? <button className='delete_btn' onClick={handleDelete}>Delete</button> : null}

      <div className='recipes_wrapper'>
        {loading ? <h3 className='loading_message'>Wait a second...</h3> : null}

        {visibleRecipes ? visibleRecipes.map((recipe, index) => {
          if (visibleRecipes.length === index + 1) {
            return (
              <NavLink 
                to='recipe_details' 
                style={{textDecoration: 'none', color: 'black'}} 
                key={recipe.id}
                onClick={(event) => handleFollow(event, recipe)}
              >
                <RecipeLink 
                  ref={lastRecipeElementRef}
                  recipe={recipe} 
                  setVisibleRecipes={setVisibleRecipes}
                />
              </NavLink>
            )
            
          } else {
            return (
              <NavLink 
                to='recipe_details' 
                style={{textDecoration: 'none', color: 'black'}} 
                key={recipe.id}
                onClick={(event) => handleFollow(event, recipe)}
              >
                <RecipeLink 
                  recipe={recipe} 
                  setVisibleRecipes={setVisibleRecipes}
                />
              </NavLink>
            )
          } 
        }) : null}

        {hasError ? <h3 className='error_message'>Some problems with recipes rendering, try again later :/</h3> : null}
        {!hasMore ? <h3 className='has_not_message'>That's all. There is nothing to show ^_^</h3> : null}
      </div>
    </div>
  )
}