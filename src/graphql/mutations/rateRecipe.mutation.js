import gql from "graphql-tag";

export const rateRecipe = gql`
  mutation ($recipeId: Int!, $userId: uuid!, $rateValue: Int!) {
    rate_recipe(
      args: { recipe_id: $recipeId, user_id: $userId, rate_value: $rateValue }
    ) {
      rate
    }
  }
`;
