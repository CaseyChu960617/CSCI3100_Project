import http from "../http-common";
const Thread = "/thread/";
const Tutorial = "/tutorial/";
const Profile = "/user/";
const Category = "category/";
const Upload = "/upload/";
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

  delete(table, id) {
    //, //id, header) {
    return http.delete(`/${table}/${id}`); //header);
  }

  deleteChapter(tutorial_id, chapter_id) {
    //, //id, header) {
    return http.delete(Tutorial + `deleteChapter/${tutorial_id}/${chapter_id}`); //header);
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
  getProfile(id) {
    return http.get(Profile + id);
  }

  updateProfile(data, header) {
    return http.put(Profile + "editProfile", data, header);
  }

  changePassword(data, header) {
    return http.put(Profile + "resetPassword", data, header);
  }

  updateProPic(data, header) {
    return http.put(Profile + "updateProPic", data, header);
  }

  uploadProPic(formData) {
    return http.post(Upload + "uploadProPic", formData);
  }
}

export default new DataService();
