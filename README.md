# Welcome to the What's Cooking ? - Recipe generater Project.


-This project was built to generate recipes for users based on the set of ingredients they choose.

- This project utilizes gen ai funcitonalities - (particularly the COHERE AI feature) to generate the recipes - (After analyzing and developing generations with GPT models like GPT2 , this project was finally designed to use an exsisting gen ai model-cohere to attain a better accuracy in the recipe that is generated.)

- This model first starts with a dataset of ingredients and respective cuisines, and EDA is perfomed on the dataset, to retreive quantifiable information.

- The dataset is further used to build different Machine learning models - namely - XGBoost, SVM, Gradient Boost etc. To predict the cuisine of a set of provided ingredients.

- Further analysis is done on choosing the most optimal machine learning model.

- All this backend work in tied up neatly with the use of react framework for the front end, which display a attractive web page, where the users can choose ingredients that they want to generate their recipe using, from a list of provided ingredients which are displayed on the screen.

- This project also uses the unsplash api to fetch the API's of the images for these ingredients, and displays these images on the react front end.

- Users can choose their preffered ingredients and choose to generate a recipe, the chosen ingredients are sent as a POST request to the back end where the ML model and the GEN AI feature coloborate and send back a generated recipe, which is finally displayed back to the user.



# What's Cooking ?
