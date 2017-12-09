import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings} from './app-settings';

@Injectable()
export class LoginRegisterService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    let credentials = {
      username: username,
      password: password
    }
    return this.http.post(AppSettings.API_URL + '/login', credentials);
  }
}