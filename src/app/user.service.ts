import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appConfig } from './config';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedIn = false;
  appname = "Angular App";
  url = appConfig.api_url + "/user";
  constructor(private http: HttpClient) {
    if (sessionStorage.getItem('user')) {
      this.loggedIn = true;
    }
  }
  adduser(userdata) {
    return this.http.post(this.url + '/add', userdata);
  }
  getallusers() {
    return this.http.get(this.url + '/getall');
  }
  deleteuserbyID(id) {
    return this.http.delete(this.url + '/delete/' + id);
  }
  getbyemail(email) {
    return this.http.get(this.url + '/getbyemail/' + email);
  }
  updatebyid(id, data) {
    return this.http.put(this.url + '/update/' + id, data);
  }
}
