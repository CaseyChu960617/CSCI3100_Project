import http from "../http-common";
const thread = "/thread/";
const tutorial = "/tutorial/";
const profile = "/user/";
const subject = "subject/";
const upload = "/upload/";
const chat = "/chat/";


class DataService {
  getAll(table) {
    return http.get(`/${table}`);
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
    return http.delete(`/${table}/${id}`, header);
  }

  deleteTutorial(tutorial_id, header) {
    //, //id, header) {
    return http.delete(
      tutorial + `deleteTutorial/${tutorial_id}`,
      header
    );
  }

  deleteChapter(tutorial_id, chapter_id, header) {
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

  postComment(data, header) {
    return http.put(thread + "postComment", data, header);
  }

  post(table, data, header) {
    return http.post(`/${table}`, data, header);
  }

  put(table, data, header) {
    return http.put(`/${table}`, data, header);
  }

  getAllTutorial() {
    return http.get(tutorial);
  }

  getLatestTutorials() {
    return http.get(tutorial + "getLatestTutorials");
  }

  // Chat
  getAllChats(id, header) {
    return http.get(chat + "getAllChats/" + id, header);
  }

  getOneChatById(id, header) {
    return http.get(chat + "getOneChat/" + id, header);
  }
  
  getOneChat(data, header) {
    return http.post(chat + "getOneChat", data, header);
  }

  // Profile
  getProfile(id) {
    return http.get(profile + id);
  }

  updateProfile(data, header) {
    return http.put(profile + "editProfile", data, header);
  }

  follow(data, header) {
    return http.put(profile + "follow", data, header);
  }

  unfollow(data, header) {
    return http.put(profile + "unfollow", data, header);
  }

  changePassword(data, header) {
    return http.put(profile + "changePassword", data, header);
  }

  updateProPic(data, header) {
    return http.put(profile + "updateProPic", data, header);
  }

  uploadThumbnail(formData, header) {
    return http.post(upload + "uploadThumbnail", formData, header);
  }

  uploadProPic(formData, header) {
    return http.post(upload + "uploadProPic", formData, header);
  }
}

export default new DataService();
