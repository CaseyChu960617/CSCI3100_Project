import http from "../http-common";

class DataService {
  getAll(table, header) {
    return http.get(`/${table}`, header);
  }

  get(table, id, header) {
    return http.get(`/${table}/${id}`, header);
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

  upload(file, header) {
    let formData = new FormData();
    formData.append("file", file);
    //header.headers["Content-Type"]="text/csv";
    return http.post(`/upload`, formData, header);
  }
}

export default new DataService();
