import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryService } from '../services/country.service';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data: any;

  constructor(private fb: FormBuilder, private user: UserService, private route: Router, private country: CountryService) {
  }

  countries = this.country.countries
  form = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required],
  })

  ngOnInit(): void {

  }
  onSubmit(formData: any) {

    console.log(formData);
    this.user.loginUser(formData).subscribe((result: any) => {
      console.log(result);

      this.data = result
      if (this.data.message) {
        Swal.fire({
          icon: 'success',
          title: 'Logged in successfully.',
          showConfirmButton: false,
          timer: 1500
        })
        localStorage.setItem('token', this.data.token)
        localStorage.setItem('name', this.data.name)
        this.route.navigateByUrl(`/profile/${this.data.name}`)
      }
      if (result.error) {
        Swal.fire({
          icon: 'warning',
          title: result.error,
          showConfirmButton: false,
          timer: 1500
        })
      }

    }, (err: any) => {
      console.log(err);

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })

    })

  }

}
