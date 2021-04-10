import http from "../http-common";
const Thread = "/thread/";

class DataService {
  getAll(table, header) {
    return http.get(`/${table}`, header);
  }

  get(table, id) { //header) {
    return http.get(`/${table}/${id}`); //, header);
  }

  create(table, data, header) {
    return http.post(`/${table}`, data, header);
  }

  update(table, id, data, header) {
    return http.put(`/${table}/${id}`, data, header);
  }

  delete(table, id, header) {
    return http.delete(`/${table}/${id}`, header);
  }

  //discussions
  getAllThread() {
    return http.get(Thread);
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

  upload(file, header) {
    let formData = new FormData();
    formData.append("file", file);
    //header.headers["Content-Type"]="text/csv";
    return http.post(`/upload`, formData, header);
  }
}

export default new DataService();
