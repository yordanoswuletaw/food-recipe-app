import gql from "graphql-tag";

export const createRecipe = gql`
mutation($title: String!, $description: String!, $category: String!, $featuredImageUrl: String!, $imagesUrl: String, $time: String!, $serves: Int!, $ingredients: String!, $steps: String!, $cooksNote: String, $userId: uuid!){
create_recipe(args: {r_title: $title, r_description: $description, r_category: $category, r_featuredimage: $featuredImageUrl, r_images: $imagesUrl, r_time: $time, r_serves: $serves, r_ingredients: $ingredients, r_steps: $steps, r_cooksnote: $cooksNote, user_id: $userId}){
    id 
  }
}
`;
