//This is a basic react page that receives data from the 
import React from 'react';
//This is imported to access the data from the navigate function
import { useLocation } from 'react-router-dom';
import './Recipe.css';

//Define a main function Recipe that uses the useLocation() hook to get the data passed to the current URL
//Receive the recipe data and cuisine value sent from the backend store it in a state recipe.
function Recipe() {
   const { state } = useLocation();
   const { recipe,cuisine } = state || { recipe,cuisine: '' };
   console.log({recipe});
   console.log(cuisine);
   // Implement the JSX of the recipe page, which is just a simple webpage display the acquired data of the JSX
   return (
<div className="recipe-page">
<header className="recipe-header">
<h1>Recipe Details</h1>
</header>
<div className="recipe-content">
<p>{recipe}</p>
</div>
</div>
   );
}
export default Recipe;