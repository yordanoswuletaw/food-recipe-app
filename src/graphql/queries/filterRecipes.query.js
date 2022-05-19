import gql from "graphql-tag";

const filterRecipes = gql`
  query ($filter: String, $search: String, $category: String, $userId: uuid) {
    filter_recipes(
      args: {
        filter: $filter
        search: $search
        r_cat: $category
        user_id: $userId
      }
    ) {
      id
      title
      description
      featured_image
      time
      total_like
      total_rate
      total_comment
      userid
      is_bookmark(args: { uid: $userId })
      is_liked(args: { user_id: $userId })
      is_commented(args: { user_id: $userId })
      is_rated(args: { user_id: $userId })
    }
  }
`;

const isBookmark = gql`
  query ($userId: uuid, $recipeId: Int!) {
    recipes_by_pk(id: $recipeId) {
      is_bookmark(args: { uid: $userId })
    }
  }
`;

export { isBookmark, filterRecipes };
