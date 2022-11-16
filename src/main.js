import { createApp, provide, h, onBeforeMount } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import "./index.css";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { refresh } from "./axios/";

const httpLink = new HttpLink({
  uri: "https://food-recipe-app-et.hasura.app/v1/graphql",
});

const wsLink = new WebSocketLink({
  uri: "wss://food-recipe-app-et.hasura.app/v1/graphql",
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
  const token = store.state.accessToken;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

refresh().then((data) => {
  store.dispatch("SET_USER", data.user);
  store.dispatch("SET_ACCESS_TOKEN", data.accessToken);
  const apolloClient = new ApolloClient({
    link: authLink.concat(link),
    cache,
  });

  const app = createApp({
    setup() {
      provide(DefaultApolloClient, apolloClient);
    },

    render: () => h(App),
  });

  app.use(router).use(store);

  app.mount("#app");
});
