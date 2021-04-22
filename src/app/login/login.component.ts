import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userservice: UserService, private router: Router) { }

  ngOnInit(): void {
  }
  validateUser(email, password) {
    console.log(email, password);
    this.userservice.getbyemail(email).subscribe(data => {
      if (data) {
        if (data['password'] == password) {
          console.log('login success');
          sessionStorage.setItem('user', JSON.stringify(data));
          this.userservice.loggedIn = true;
          this.router.navigate(['/']);
        }
        else {
          console.log('password incorrect');
        }
      }
      else {
        console.log('user not found');
      }
    })
  }

  showPassword = false;

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
