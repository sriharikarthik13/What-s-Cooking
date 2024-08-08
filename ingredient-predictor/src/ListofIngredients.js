//Let us design the Main Page for our Recipe generator project using react.
//First let us import the required dependencies
//Import react
//Import the usestatehook which allows the components to have state.
import React, { useEffect, useState } from 'react';
//Import Axios for handling HTTPS requests
import axios from 'axios';
//Import useNavigate for enabling navigation to other routes.
import { useNavigate } from 'react-router-dom';
//Import the CSS file for the page
import './ListofIngredients.css';

//We create a list to our ingredients, along with their placeholder images.
const IngredientsList = [
   { name: 'tomato', price: 1.5 },
   {name : 'chopped onion', price : 1},
   {name : 'ginger', price : 3},
   {name : 'carrot', price : 4},
   {name : 'garlic cloves', price : 3},
   {name : 'Rock salt', price : 3},
   {name : 'chicken', price : 5},
   {name : 'mutton', price : 5},
   {name : 'pork', price : 2},
   {name : 'beef', price : 3},
   {name : 'all-purpose flour', price : 1},
   {name : 'cheese', price : 2},
   {name : 'olive oil', price : 4},
   {name : 'tea ', price : 4},
   {name : 'soy sauce', price : 3},
   {name : 'water', price : 1},
   {name : 'milk', price : 3},
   {name : 'bread', price : 5},
   {name : 'jam', price : 5},
   {name : 'carrots', price : 3},
   {name : 'cumin seeds', price : 4},
   {name : 'extra-virgin olive oil', price : 1},
   {name : 'garam masala', price : 1},
   {name : 'turmeric', price : 4},
   {name : 'chilli powder', price : 3},
   {name : 'jalapeno chilies', price : 1},
   {name : 'noodles', price : 2},
   {name : 'dried oregano', price : 4},
   {name : 'purple onion', price : 2},
   {name : 'corn starch', price : 3},
   {name : 'baking powder', price : 4},
   {name : 'sausages', price : 2},
   {name : 'fresh lemon juice', price : 4},
   {name : 'button mushrooms', price : 4},
   {name : 'fresh parsley', price : 2}
   
 
   // Add more ingredients as needed
];
//Defining a funtional component to display our frontend - this uses hook for state methods
function ListofIngredients() {
   //Specifying the number of ingredients to be shown per page.
   const ItemsinPage = 5;
   //UseState is used to initialize the state variables
   //CurrentPage tracks the ingredients in the current page
   //SelectedIngredients tracks the ingredients selected by the users
   //The Current page is variable that is valued to 1
   const [currentPage, setCurrentPage] = useState(1);
   //creating a an empty array named selectIngredients
   const [chosenIngredients, setchosenIngredients] = useState([]);
   //Creating a variable to store the useNavigate feature
   const navigate = useNavigate();
   //Creating a variable to store the list of urls for the images
   const [ImageUrls, setImageUrls] = useState({});


    //Creating a function to utilize the unsplash api to display the images of our ingredients.
    //We first create get the image from the unsplash API and check if the image is actually retreived correctly if not assign image to default value.
    //We store the return the image url from the unsplash API for the specified ingredient.

    const getunsplashurl = async (nameofingredient) =>{ 

        try{
                const img_val = await axios.get(`https://api.unsplash.com/search/photos?query=${nameofingredient}&client_id=d1UDnF4iEJkyLTvGUBl97ZG5aGJsRiohTpD5GFXbClk`);
                
                if(img_val.data.results.length > 0)
                {
                     return img_val.data.results[0].urls.raw;
                }
                else
                {
                    return '../public/tomato.jpg'
                }




        }
        catch(error)
        {
            return '../public/tomato.jpg'
        }

    };

    //Creating a useeffect hook to retrieve the urls for the images of the ingredients, this is run when the component is rendered.
    // We create a variable which stores the URL for each ingredient by calling the previous getunsplashurl method.
    //We set the value for the created state ImageUrls which is used when specifying the source for the HTML image for the ingredient which can be seen when we call the ImageUrls[item.name] to retrieve the specific url for a particular ingredient.
    useEffect(

     () => {
        const getUrls = async ()=>{
            const urls ={};
            for (let i of IngredientsList)
            {
                const img_url = await getunsplashurl(i.name);
                urls[i.name] = img_url

            }
            setImageUrls(urls)
        };
        getUrls();
     }
,[]

    )

   //Creating a function that takes an ingredient as an arguement, when an ingredient is clicked the function is called.
   const IngredientSelect = (ingredient) => {
       // here we create a method to update the choseningredients based on whether an ingredient chosen is already present in the list.
       // set the selected ingredients to the state, if ingredient already chosen, remove it from the state.
       setchosenIngredients((prev) => {
           if (prev.includes(ingredient)) {
               return prev.filter(item => item !== ingredient);
           }
           return [...prev, ingredient];
       });
   };
   //This funciton does the work of an API, sends the data selected by the user in the frontend as a POST request to the backend.
   const Submit = async () => {
    alert("Please wait. Generating your delicious meal")
       try {
           //Sends the ingredients selected to the flask backend
           const response = await axios.post('http://127.0.0.1:5000/recipe', {
               Ingredients: chosenIngredients
           });
           //Receives the response from the backend and navigates/sends the data to the recipe.js page to display the recipe as a state.
           const recipe = response.data.Recipe;
           const cuisine =  response.data.Cuisine;
           console.log(recipe)
           navigate('/recipe', { state: { recipe,cuisine } });
       } catch (error) {
           console.error("Error fetching recipe:", error);
       }
   };
   //Creating a function to handle the previous and next buttons of our page.
   //Checks if the number of ingredients specified crosses a certain limit, and based on that either increases the value for the state of the CurrentPage
   const Next = () => {
       if ((currentPage * ItemsinPage) < IngredientsList.length) {
           setCurrentPage((prevstate) => prevstate + 1);
       }
   };
   //This is similar to the above funciton, and changes the value of the currentpage, based on the number of ingredients displayed in the page.
   const Previous = () => {
       if (currentPage > 1) {
           setCurrentPage((prevstate) => prevstate - 1);
       }
   };
   //Determines which ingredients to display on the webpage using the value for the ingredients list and the value for the current page.
   //Just uses a basic list indexing logic using slice
   const itemsToDisplay = IngredientsList.slice((currentPage - 1) * ItemsinPage, currentPage * ItemsinPage);
   //console.log(itemsToDisplay)
   // Let us create the JSX part of the webpage, which is the content that is displayed on the webpage.
   // We display the ingredients from the itemstoDisplay variable and each time the user clicks on an ingredient the IngredientSelect function is called and the ingredient is added to the list of ingredients.
   // We also create conditional case to add a particular css class to the selected ingredients to show that they have been chosen.
   //We create the logic for the previous and next buttons and add their respective classes to be called when they are cliked.
   //We also add a disabled logic to previous and the next buttons, based on the current page value.
   return (
<div className="ingredient-page">
<header className="header">
<h1>Whats Cooking ? </h1>
<p>Choose ingredients for your delicious recipe!</p>
</header>
<div className="ingredient-list">
               {itemsToDisplay.map((item, index) => (
<div
                       key={index}
                       className={`ingredient-item ${chosenIngredients.includes(item.name) ? 'selected' : ''}`}
                       onClick={() => IngredientSelect(item.name)}
>
<div className="image-wrapper">
<img src={ImageUrls[item.name]||'../public/tomato.jpg'} alt={item.name} />
</div>
<h3>{item.name}</h3>
<p>${item.price.toFixed(2)}</p>
</div>
               ))}
</div>
<div className="navigation-buttons">
<button
                   onClick={Previous}
                   disabled={currentPage === 1}
                   className="nav-button"
>
                   Previous
</button>
<button
                   onClick={Next}
                   disabled={(currentPage * ItemsinPage) >= IngredientsList.length}
                   className="nav-button"
>
                   Next
</button>
</div>
<button className="submit-button" onClick={Submit}>Submit</button>
</div>
   );
}
export default ListofIngredients;