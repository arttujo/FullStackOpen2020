import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const deletePers = (newObject) => {
  const id = newObject.id;
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response);
};

const updatePers = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response);
};

export default { getAll, create, deletePers, updatePers };
