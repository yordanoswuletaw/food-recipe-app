import gql from "graphql-tag";

export const commentRecipe = gql`
  mutation ($recipeId: Int!, $userId: uuid!, $userComment: String) {
    comment_recipe(
      args: {
        recipe_id: $recipeId
        user_id: $userId
        user_comment: $userComment
      }
    ) {
      comment
    }
  }
`;
