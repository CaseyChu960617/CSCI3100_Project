import http from "../http-common";
const Thread = "/thread/";
const Tutorial = "/tutorial/";
const Profile = "/user/";
const Subject = "subject/";
const Upload = "/upload/";
const Chat = "/chat/";
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

  delete(table, id, header) {
    //, //id, header) {
    return http.delete(`/${table}/${id}`, header); //header);
  }

  deleteChapter(tutorial_id, chapter_id, header) {
    //, //id, header) {
    return http.delete(
      Tutorial + `deleteChapter/${tutorial_id}/${chapter_id}`,
      header
    ); //header);
  }

  //discussions
  getAllThread() {
    return http.get(Thread);
  }

  getSubThread(id) {
    return http.get(Thread + Subject + id);
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

  postComment(data, header) {
    return http.put(Thread + "postComment", data, header);
  }

  post(table, data, header) {
    return http.post(`/${table}`, data, header);
  }

  put(table, data, header) {
    return http.put(`/${table}`, data, header);
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

  // Chat
  getOneChat(data, header) {
    return http.post(Chat + "getOneChat", data, header);
  }

  // Profile
  getProfile(id) {
    return http.get(Profile + id);
  }

  updateProfile(data, header) {
    return http.put(Profile + "editProfile", data, header);
  }

  follow(data, header) {
    return http.put(Profile + "follow", data, header);
  }

  unfollow(data, header) {
    return http.put(Profile + "unfollow", data, header);
  }

  changePassword(data, header) {
    return http.put(Profile + "resetPassword", data, header);
  }

  updateProPic(data, header) {
    return http.put(Profile + "updateProPic", data, header);
  }

  uploadThumbnail(formData, header) {
    return http.post(Upload + "uploadThumbnail", formData, header);
  }

  uploadProPic(formData, header) {
    return http.post(Upload + "uploadProPic", formData, header);
  }
}

export default new DataService();
