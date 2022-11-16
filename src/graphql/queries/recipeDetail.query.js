import gql from "graphql-tag";

const recipeDetail = gql`
  query ($recipeId: Int!, $userId: uuid) {
    recipes_by_pk(id: $recipeId) {
      id
      title
      description
      featured_image
      category
      time
      serves
      cooks_note
      userid
      user {
        username
      }
      images {
        id
        image
      }
      get_ingredients {
        id
        ingredient
      }
      get_steps {
        id
        step
      }
    }
  }
`;

const likesQuery = gql`
 query ($recipeId: Int!, $userId: uuid) {
    user_like(args: {recipe_id: $recipeId}){
     id
      total_like
      is_liked(args: { user_id: $userId })
    }
  }
`;

const bookmarksQuery = gql`
  query ($recipeId: Int!, $userId: uuid) {
    recipes_by_pk(id: $recipeId) {
      id
      is_bookmark(args: { uid: $userId })
    }
  }
`;
const reviewCount = gql`
 query ($recipeId: Int!) {
    recipes_by_pk(id: $recipeId) {
      id
      total_rate
      total_comment
    }
  }
`

const userReview = gql`
query ($recipeId: Int!, $userId: uuid) {
    recipes_by_pk(id: $recipeId) {
      user_review(args: { user_id: $userId }) {
        rate
        comment
      }
    }
  }
`

const allReviews = gql`
  query ($recipeId: Int!) {
    all_review(args: {recipe_id: $recipeId}) {
        rate
        comment
        user {
          username
      }
    }
  }
`;

export { recipeDetail, likesQuery, bookmarksQuery, reviewCount, userReview, allReviews };
