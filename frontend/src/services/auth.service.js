import http from "../http-common";

class AuthService {
  signin(user) {
    return http
      .post("/auth/signin", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  signout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();
