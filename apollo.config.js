// apollo.config.js
module.exports = {
  client: {
    service: {
      name: "food-recipe-app",
      // URL to the GraphQL API
      url: "https://food-recipe-app-v1.herokuapp.com/v1/graphql",
    },
    // Files processed by the extension
    includes: ["src/**/*.vue", "src/**/*.js"],
  },
};
