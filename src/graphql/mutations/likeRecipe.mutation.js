import gql from "graphql-tag";

export const likeRecipe = gql`
  mutation ($recipeId: Int!, $userId: uuid) {
   like_recipe(args: {user_id: $userId, recipe_id: $recipeId}){
      likes
  }
  }
`;
