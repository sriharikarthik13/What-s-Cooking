import cohere
# Initialize the Cohere client with your API key
co = cohere.Client('4Z2jCLMucsBO1oDz9K6ui8YDBMtso0QYJp4WUFTj')
def generate_recipe(ingredients,cuisine):
   # Define the prompt for generating the recipe
   prompt = f"Generate a {cuisine} cuisine recipe using the following ingredients: {', '.join(ingredients)}"
   # Call the Cohere generate endpoint
   response = co.generate(
       model='command',
       prompt=prompt,
       max_tokens=10000,
       temperature=0.7,
       k=0,
       p=0.75,
       stop_sequences=[],
       return_likelihoods='NONE'
   )
   # Print the generated recipe
   recipe = response.generations[0].text.strip()
   print("Generated Recipe:")
   print(recipe)

if __name__ == "__main__":
   # Example list of ingredients
   ingredients = ["eggs","beef","chicken"]
   cuisine = "italian"
   # Generate the recipe
   generate_recipe(ingredients,cuisine)
