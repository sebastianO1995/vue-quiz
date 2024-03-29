import { createClient } from 'contentful';
import { createStore } from 'vuex';
const contentFulSpace = import.meta.env.VITE_SPACE || null;
const token = import.meta.env.VITE_CONTENTFUL_TOKEN_DELIVERY || null;

const contentfulClient = createClient({
  space: contentFulSpace,
  accessToken: token
});
const store = createStore({
  state() {
    return {
      quizes: [],
      isLoading: false,
      error: {
        message: null,
        hasError: false
      },
      contentfulSettings: {
        space: contentFulSpace,
        token
      }
    };
  },
  getters: {
    hasQuizData(state) {
      return (
        !state.isLoading && state.quizes.length > 0 && !state.error.hasError
      );
    },
    failedLoadingData(state) {
      return (
        !state.isLoading && (state.quizes.length === 0 || state.error.hasError)
      );
    },

    getQuiz: (state) => (id) => {
      return state.quizes.find((quiz) => quiz.id === id) || null;
    }
  },
  mutations: {
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_QUIZES(state, quizArrayList) {
      state.quizes = quizArrayList;
    }
  },
  actions: {
    fetchQuizes({ commit }) {
      if (token !== null && contentFulSpace !== null) {
        commit('SET_LOADING', true);
        contentfulClient
          .getEntries({ content_type: 'quiz' })
          .then((entries) => {
            commit('SET_LOADING', false);

            commit(
              'SET_QUIZES',
              entries?.items.map((quiz) => {
                return {
                  questions: quiz.fields.questions.map((question) => ({
                    ...question.fields,
                    id: question.sys.id
                  })),
                  quizName: quiz.fields.quizName,
                  totalQuestions: quiz.fields.questions.length,
                  id: quiz.sys.id
                };
              }) || []
            );
          })
          .catch((error) => {
            commit('SET_LOADING', false);

            commit('SET_ERROR', {
              hasError: true,
              message:
                JSON.parse(error.message)?.message || 'No Quizes available'
            });
          });
      }
    }
  }
});

export default store;
