import http from "../http-common";
import authHeader from "./auth-header";
const thread = "/thread/";
const tutorial = "/tutorial/";
const profile = "/user/";
const subject = "subject/";
const upload = "/upload/";
const chat = "/chat/";
const header = {
  headers: authHeader(),
}

class DataService {
  getAll(table) {
    return http.get(`/${table}`, header);
  }

  get(table, id) {
    //header) {
    return http.get(`/${table}/${id}`); //, header);
  }

  create(table, data) {
    return http.post(`/${table}`, data, header);
  }

  update(table, id, data, header) {
    return http.put(`/${table}/${id}`, data, header);
  }

  delete(table, id) {
    //, //id, header) {
    return http.delete(`/${table}/${id}`, header); //header);
  }

  deleteTutorial(tutorial_id) {
    //, //id, header) {
    return http.delete(
      tutorial + `deleteTutorial/${tutorial_id}`,
      header
    );
  }

  deleteChapter(tutorial_id, chapter_id) {
    //, //id, header) {
    return http.delete(
      tutorial + `deleteChapter/${tutorial_id}/${chapter_id}`,
      header
    );
  }

  //discussions
  getAllThread() {
    return http.get(thread);
  }

  getSubThread(id) {
    return http.get(thread + subject + id);
  }

  getOneThread(id) {
    return http.get(thread + id);
  }

  createThread(data, header) {
    return http.post(thread, data, header);
  }

  updateThread(id, data, header) {
    return http.put(thread + id, data, header);
  }

  deleteThread(table, id, header) {
    return http.delete(thread + id, header);
  }

  postComment(data) {
    return http.put(thread + "postComment", data, header);
  }

  post(table, data) {
    return http.post(`/${table}`, data, header);
  }

  put(table, data) {
    return http.put(`/${table}`, data, header);
  }

  getAllTutorial() {
    return http.get(tutorial);
  }

  getLatestTutorials() {
    return http.get(tutorial + "getLatestTutorials");
  }

  getLatestThreads() {
    return http.get(thread + "getLatestThreads");
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

  // Chat
  getOneChat(data) {
    return http.post(chat + "getOneChat", data, header);
  }

  // Profile
  getProfile(id) {
    return http.get(profile + id);
  }

  updateProfile(data) {
    return http.put(profile + "editProfile", data, header);
  }

  follow(data) {
    return http.put(profile + "follow", data, header);
  }

  unfollow(data) {
    return http.put(profile + "unfollow", data, header);
  }

  changePassword(data) {
    return http.put(profile + "resetPassword", data, header);
  }

  updateProPic(data) {
    return http.put(profile + "updateProPic", data, header);
  }

  uploadThumbnail(formData) {
    return http.post(upload + "uploadThumbnail", formData, header);
  }

  uploadProPic(formData) {
    return http.post(upload + "uploadProPic", formData, header);
  }
}

export default new DataService();
