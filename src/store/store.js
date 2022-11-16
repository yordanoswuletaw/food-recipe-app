import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      categories: [
        { name: "All Recipes" },
        { name: "Quick & Easy Recipes" },
        { name: "Breakfast Recipes" },
        { name: "Lunch Recipes" },
        { name: "Dinner Recipes" },
        { name: "Holiday Recipes" },
        { name: "Traditional Recipes" },
        { name: "Appetizer Recipes" },
        { name: "Dessert Recipes" },
        { name: "Vegetarian Recipes" },
        { name: "Salad Recipes" },
        { name: "Main-course Recipes" },
        { name: "Side-dish Recipes" },
        { name: "Baked-goods Recipes" },
        { name: "Snack Recipes" },
      ],

      recipe: {
        title: null,
        description: null,
        featuredImage: null,
        featuredImageUrl: null,
        images: [],
        imagesUrl: [],
        imagesName: [],
        category: "Quick & Easy Recipes",
        time: null,
        serves: 1,
        ingredients: [],
        steps: [],
        cooksNote: ""
      },
      user: null,
      accessToken: null,
    };
  },
  mutations: {
    updateRecipe(state, payload){
      state.recipe = {...state.recipe, ...payload}
    },
    clearHistory(state) {
      state.recipe = {
        title: null,
        description: null,
        featuredImage: null,
        featuredImageUrl: null,
        images: [],
        imagesUrl: [],
        imagesName: [],
        category: "Quick & Easy Recipes",
        time: null,
        serves: 1,
        ingredients: [],
        steps: [],
        cooksNote: ""
      };
    },
    setUser(state, payload){
      state.user = payload;
    },
    setAccessToken(state, payload){
      state.accessToken = payload;
    }
  },
  actions: {
    SET_USER: ({commit}, payload) => {
      commit("setUser", payload);
    },
    SET_ACCESS_TOKEN: ({commit}, payload) => {
      commit("setAccessToken", payload)
    },
  },
  getters: {
    recipeCategories: (state) => (payload) => {
      return state.categories.filter((category, i) => i !== 0);
    },
  },
});
