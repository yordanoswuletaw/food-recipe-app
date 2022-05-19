import gql from "graphql-tag";

export const collections = gql`
  query ($userId: uuid) {
    collections(args: { user_id: $userId }) {
      id
      title
      description
      featured_image
      time
      total_like
      total_rate
      total_comment
      is_bookmark(args: { uid: $userId })
      is_liked(args: { user_id: $userId })
      is_commented(args: { user_id: $userId })
      is_rated(args: { user_id: $userId })
    }
  }
`;
