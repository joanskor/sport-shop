import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings} from './app-settings';

@Injectable()
export class LoginRegisterService {

  constructor(private http: HttpClient) { }

  public login(username: string, password: string) {
    let credentials = {
      username: username,
      password: password
    }
    return this.http.post(AppSettings.API_URL + '/login', credentials);
  }

  public register(username: string, password: string, email: string, passwordConf: string) {
    let credentials = {
      username: username,
      password: password,
      email: email,
      passwordConf: passwordConf
    }
    return this.http.post(AppSettings.API_URL + '/register', credentials);
  }

  public logout() {
    localStorage.removeItem('token');
  }
}