import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryService } from '../services/country.service';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  data: any;

  constructor(private fb: FormBuilder, private user: UserService, private route: Router, private country: CountryService) {
  }

  countries = this.country.countries
  form = this.fb.group({
    firstname: [null, Validators.required],
    lastname: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    phone: this.fb.group({
      countryCode: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10),
        Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')
      ]],
    }),
    password: [null, Validators.required],
    confirmPass: [null, Validators.required],
  })

  ngOnInit(): void {
  }
  onSubmit(formData: any) {
    Swal.fire(
      'The Internet?',
      'That thing is still around?',
      'question'
    )
    console.log(formData);
    this.user.addUser(formData).subscribe((result:any) => {
      console.log(result);

      this.data = result
      if (this.data.status) {

        this.route.navigateByUrl('/login')
      }

    }, (err: any) => {
      console.log(err);

    })

  }

}
