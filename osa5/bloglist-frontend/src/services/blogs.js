import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}` 
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (newBlog) => {
  const config = {headers: {Authorization: token}}
  const response  = await axios.post(baseUrl,newBlog,config)
  return response.data
}

const likeBlog = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`,blog)
  return response.data
}

const getOneBlog = async(blog) => {
  const resposne = await axios.get(`${baseUrl}/${blog.id}`)
  return resposne.data
}

const deleteBlog = async(blog)=>{
  const config = {headers: {Authorization: token}}
  const response = await axios.delete(`${baseUrl}/${blog.id}`,config)
  return response
}

export default { getAll,createBlog, setToken, likeBlog,getOneBlog, deleteBlog }