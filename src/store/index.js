import { createClient } from "contentful";
import { createStore } from "vuex";
const contentFulSpace = import.meta.env.VITE_SPACE || null;
const token = import.meta.env.VITE_CONTENTFUL_TOKEN_DELIVERY || null;

const contentfulClient = createClient({
  space: contentFulSpace,
  accessToken: token,
});
const store = createStore({
  state() {
    return {
      quizes: [],
      isLoading: false,
      error: {
        message: null,
        hasError: false,
      },
    };
  },
  getters: {
    hasQuizData(state) {
      return (
        !state.isLoading && state.quizes.length > 0 && !state.error.hasError
      );
    },
  },
  mutations: {
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },
  actions: {
    fetchQuizes({ commit }) {
      if (token !== null && contentFulSpace !== null) {
        commit("SET_LOADING", true);
        contentfulClient
          .getContentType("quizd")
          .then((contentType) => {
            commit("SET_LOADING", false);

            console.log(contentType);
          })
          .catch((error) => {
            commit("SET_LOADING", false);

            commit("SET_ERROR", {
              hasError: true,
              message:
                JSON.parse(error.message)?.message || "No Quizes available",
            });
          });
      }
    },
  },
});

export default store;
