import './RecipePage.css'

import {AiOutlineArrowLeft} from 'react-icons/ai'

import { Recipe } from "../recipeCard/RecipeType"
import { useNavigate } from 'react-router-dom'


interface RecipePageI {
    selectedRecipe: Recipe | null
}

export const RecipePage: React.FC<RecipePageI> = ({selectedRecipe}) => {

    const navigate = useNavigate()

    const createdBy = selectedRecipe?.contributed_by.split(' ')
    createdBy?.splice(createdBy.length - 1, 1).join(' ')
    const createdByStr = createdBy?.join(' ')

    const followBack = () => {
        navigate('/')
    }
    
    return (
        <div className="recipe_page__wrapper">
            <button className='back_btn' onClick={followBack}><AiOutlineArrowLeft /></button>
            <div className="recipe_page__image">
                <img src={selectedRecipe?.image_url} alt={selectedRecipe?.name} />
            </div>

            <div className="recipe_page__main">
                <div className="main_discription">
                    <h1 className='recipe_title'>{selectedRecipe?.name}</h1>
                    <p><span className='main_sub_title'>Slogan:</span> {selectedRecipe?.tagline}</p>
                    <p><span className='main_sub_title'>First Brewed:</span> {selectedRecipe?.first_brewed}</p>
                    <p className='discription'><span className='main_sub_title'>Description:</span> {selectedRecipe?.description}</p>
                </div>

                <div className="main_food"><p className='main_sub_title'>Food Pairing:</p>{selectedRecipe?.food_pairing.map(item => <p key={item}>• {item}</p>)}</div>

                <div>
                    <p className='main_title'>Details:</p>
                    <div className="main_details">
                        <div>
                            <p><span className='main_sub_title'>IBU:</span> {selectedRecipe?.ibu}</p>
                            <p><span className='main_sub_title'>ABV:</span> {selectedRecipe?.abv}</p>
                            <p><span className='main_sub_title'>Target FG:</span> {selectedRecipe?.target_fg}</p>
                            <p><span className='main_sub_title'>Terget OG:</span> {selectedRecipe?.target_og}</p>
                        </div>

                        <div>
                            <p><span className='main_sub_title'>EBC:</span> {selectedRecipe?.ebc}</p>
                            <p><span className='main_sub_title'>SRM:</span> {selectedRecipe?.srm}</p>
                            <p><span className='main_sub_title'>PH:</span> {selectedRecipe?.ph}</p>
                            <p><span className='main_sub_title'>Attenuation:</span> {selectedRecipe?.attenuation_level}</p>
                        </div>

                        <div className="main_volume">
                            <p><span className='main_sub_title'>Volume:</span> {selectedRecipe?.volume.value} {selectedRecipe?.volume.unit}</p>
                            <p><span className='main_sub_title'>Boil Volume:</span> {selectedRecipe?.boil_volume.value} {selectedRecipe?.boil_volume.unit}</p>
                        </div>
                    </div>
                </div>

                <div className='main_recipe'>
                    <h2>Recipe</h2>

                    <div className="main_ingedients">
                        <h3 className='main_title'>Ingredients:</h3>
                        <div className='main_ingedients_details'>
                            <div>
                                <span className='main_sub_title'>Malt:</span> 
                                {selectedRecipe?.ingredients.malt.map((item, index) => <p key={index}>{item.name}: {item.amount.value} {item.amount.unit === 'kilograms' ? 'kg' : 'g'}</p>)}
                            </div>
                            <div>
                                <span className='main_sub_title'>Hops:</span> 
                                {selectedRecipe?.ingredients.hops.map((item, index) => <p key={index}>{item.name}: {item.amount.value} {item.amount.unit === 'kilograms' ? 'kg' : 'g'}, when to add: {item.add}, {item.attribute}</p>)}
                            </div>
                            <div>
                                <span className='main_sub_title'>Yest:</span>
                                <p>{selectedRecipe?.ingredients.yeast}</p>
                            </div>
                        </div>
                    </div>

                    <div className="main_method">
                        <h3 className='main_title'>Method:</h3>
                        <p><span className='main_sub_title'>Mash Temp:</span> {selectedRecipe?.method.mash_temp.map(item => `${item.temp.value} ${item.temp.unit === 'kilograms' ? 'kg' : 'g'}, duratinion: ${item.duration}`)}</p>
                        <p><span className='main_sub_title'>Fermentation:</span> {selectedRecipe?.method.fermentation.temp.value} {selectedRecipe?.method.fermentation.temp.unit === 'kilograms' ? 'kg' : 'g'}</p>
                        <p><span className='main_sub_title'>Twist:</span> {selectedRecipe?.method.twist ? selectedRecipe.method.twist : '-'}</p>
                    </div>
                </div>

                <div className='main_quote'>
                    <span className='main_sub_title'>Brewers Tips: </span>
                    <span className='quote'>"{selectedRecipe?.brewers_tips}"</span>
                </div>

                <p><span className='main_sub_title'>Contributed By:</span> {createdByStr}</p>
            </div>
        </div>
    )
}