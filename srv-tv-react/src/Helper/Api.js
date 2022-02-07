import axios from 'axios';

const axios_ = axios.create({
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
  localStorage.setItem('user_token', response.user_token)
  localStorage.setItem( 'user', response.data)
return response.data})
}