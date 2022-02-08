import axios from 'axios';

export const axios_ = axios.create({
  baseURL: 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' },
})

export const register = async newUser => {
  return await axios_
    .post('/users/register', {
      data: newUser
    });
}

export const login = async user => {
  return await axios_
    .post('/users/login', {
      email: user.email,
      password: user.password
    }).then(response=>{
  localStorage.setItem('user_token', response.data.user_token)
  localStorage.setItem( 'user', JSON.stringify(response.data.data))
return response.data})
}

export const getAll = async (email) => {
  return await axios_.get(`/channels/fetch/${email}`);
};
const get = (id) => {
  return axios_.get(`/channels/fetch_one/${id}`);
};
const create = (data) => {
  return axios_.post(`/channels/create`, data);
};
const update = (id, data) => {
  return axios_.put(`/channels/update/${id}`, data);
};
const remove = (id) => {
  return axios_.delete(`/channels/${id}`);
};


const ChannelServices = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default ChannelServices;