import axios from 'axios';
import url from './url.service';

class AuthService {
  login(email, password) {
    return axios
      .post(url.SIGNIN, {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(name, email, password) {
    return axios.post(url.REGISTER_URL, {
      name,
      email,
      password,
      roles: ['user'],
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();