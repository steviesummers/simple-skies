import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() 
  {console.log("hi there")
  
    const token = this.getToken();
    if (!token) return false
    return token && !this.isTokenExpired(token) ? true : false;
    
  }

  isTokenExpired(token) {
    // const decoded = decode(token);
    // if (decoded.exp < Date.now() / 1000) {
    //   localStorage.removeItem('id_token');
    //   return true;
    // }
    // return false;
    try { console.log('token expired');
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) { console.log(err);
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

export default new AuthService();
