import gql from "graphql-tag";

export const deleteRecipe = gql`
  mutation ($recipeId: Int!) {
    delete_recipes_by_pk(id: $recipeId) {
      id
    }
  }
`;
