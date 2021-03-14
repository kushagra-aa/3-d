import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerform;
  constructor(private fb: FormBuilder, private userservice: UserService, private router: Router) { }

  ngOnInit(): void {
    this.initform();
    console.log(this.userservice.appname);
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
  initform() {
    this.registerform = this.fb.group({
      fullname: ['', Validators.required],
      username: ['', [Validators.minLength(4), Validators.maxLength(10)]],
      email: ['', Validators.email],
      password: ['', Validators.minLength(6)],
      admin: false
    })
  }
  userSubmit() {
    let formdata = this.registerform.value;
    console.log(formdata);

    if (this.registerform.invalid) {
      return;

    }
    else {
      this.userservice.adduser(formdata).subscribe((res) => {
        console.log(res);
        Swal.fire({
          title: 'well Done!',
          text: 'You Have Successfully Registered',
          icon: 'success'

        })
        this.router.navigate(['/login']);

      });
    }

  }
}