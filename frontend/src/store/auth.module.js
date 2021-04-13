import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { status: { signedIn: true }, user } : { status: { signedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    signin({ commit }, user) {
      return AuthService.signin(user).then(
        (user) => {
          commit("signinSuccess", user);
          return Promise.resolve(user);
        },
        (error) => {
          commit("signinFailure");
          return Promise.reject(error);
        }
      );
    },
    signout({ commit }) {
      AuthService.signout();
      commit("signout");
    },
    registered({ commit }, user) {
      commit("signinSuccess", user);
      return Promise.resolve(user);
    },
    editProfile({ commit }, user) {
      commit("signinSuccess", user);
      return Promise.resolve(user);
    },
    uploadProPic({ commit }, image) {
      commit("uploadProPicSuccess", image);
      return Promise.resolve(image);
    },
  },
  mutations: {
    signinSuccess(state, user) {
      state.status.signedIn = true;
      state.user = user;
    },
    signinFailure(state) {
      state.status.signedIn = false;
      state.user = null;
    },
    signout(state) {
      state.status.signedIn = false;
      state.user = null;
    },
    uploadProPicSuccess(state, image) {
      state.user.profileImage = image;
    },
  },
};
