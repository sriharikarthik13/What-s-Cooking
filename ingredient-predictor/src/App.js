import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Recipe from './Recipe';
import ListofIngredients from './ListofIngredients';
function App() {
   return (
<Routes>
<Route path="/" element={<ListofIngredients />} />
<Route path="/recipe" element={<Recipe />} />
</Routes>
   );
}
export default App;