import http from "../http-common";
const Thread = "/thread/";
const Tutorial = "/tutorial/";
const Profile = "/user/";
const Category = "category/";
class DataService {
  getAll(table, header) {
    return http.get(`/${table}`, header);
  }

  get(table, id) {
    //header) {
    return http.get(`/${table}/${id}`); //, header);
  }

  create(table, data, header) {
    return http.post(`/${table}`, data, header);
  }

  update(table, id, data, header) {
    return http.put(`/${table}/${id}`, data, header);
  }

  delete(table, data) {//, //id, header) {
    return http.delete(`/${table}`, data); //header);
  }

  //discussions
  getAllThread() {
    return http.get(Thread);
  }

  getCatThread(id) {
    return http.get(Thread + Category + id);
  }

  getOneThread(id) {
    return http.get(Thread + id);
  }

  createThread(data, header) {
    return http.post(Thread, data, header);
  }

  updateThread(id, data, header) {
    return http.put(Thread + id, data, header);
  }

  deleteThread(table, id, header) {
    return http.delete(Thread + id, header);
  }

  post(table, data) {
    return http.post(`/${table}`, data);
  }

  put(table, data) {
    return http.put(`/${table}`, data);
  }

  getAllTutorial() {
    return http.get(Tutorial);
  }

  getLatestTutorials() {
    return http.get(Tutorial + "getLatestTutorials");
  }

  getLatestThreads() {
    return http.get(Thread + "getLatestThreads");
  }

  // create(table, data, header) {
  //   return http.post(`/${table}`, data, header);
  // }

  // post(table, data) {
  //   return http.post(`/${table}`, data);
  // }

  // update(table, id, data, header) {
  //   return http.put(`/${table}/${id}`, data, header);
  // }

  // delete(table, id, header) {
  //   return http.delete(`/${table}/${id}`, header);
  // }

  // Profile
  updateProfile(data, header) {
    return http.put(`${Profile}editProfile`, data, header);
  }

  changePassword(data, header) {
    return http.put(`${Profile}resetPassword`, data, header);
  }

  upload(table, formData) {
    //header) {
    //let formData = new FormData();
    //formData.append("file", file);
    //header.headers["Content-Type"]="text/csv";
    return http.post(`/upload/${table}`, formData); // header);
  }
}

export default new DataService();
