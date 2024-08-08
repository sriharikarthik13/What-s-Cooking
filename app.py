from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
def get_cuisine_and_recipe(ingredients):
   # Your function logic here
   cuisine = "Italian"  # Example
   recipe = "Spaghetti Carbonara"  # Example
   return cuisine, recipe
@app.route('/get-recipe', methods=['POST'])
def get_recipe():
   data = request.json
   ingredients = data.get('ingredients', [])
   cuisine, recipe = get_cuisine_and_recipe(ingredients)
   return jsonify({'cuisine': cuisine, 'recipe': recipe})
if __name__ == '__main__':
   app.run(debug=True)

