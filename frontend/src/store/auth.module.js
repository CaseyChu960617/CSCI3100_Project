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
    follow({ commit }, id) {
      commit("followSuccess", id);
      return Promise.resolve(id);
    },
    unfollow({ commit }, id) {
      commit("unfollowSuccess", id);
      return Promise.resolve(id);
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
    followSuccess(state, id) {
      state.user.following.push(id);
    },
    unfollowSuccess(state, id) {
      state.user.following = state.user.following.filter((item) => item !== id);
    },
  },
};
