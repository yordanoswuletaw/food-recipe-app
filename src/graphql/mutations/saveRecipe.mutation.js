import gql from "graphql-tag";

export const saveRecipe = gql`
  mutation ($recipeId: Int!, $userId: uuid) {
    bookmark_recipe(args: { recipe_id: $recipeId, user_id: $userId }) {
      id
    }
  }
`;
