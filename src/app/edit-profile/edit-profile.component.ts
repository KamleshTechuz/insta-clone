import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryService } from '../services/country.service';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userData: any;
  data: any;
  form: any
  constructor(private fb: FormBuilder, private user: UserService, private route: Router, private country: CountryService) {
  }

  countries = this.country.countries


  ngOnInit(): void {
    this.getUserDetail()
  }

  getUserDetail() {
    this.user.getUser().subscribe((result: any) => {
      this.userData = result.user
      const mobNum = this.userData.number.split('-')
      console.log(this.userData);
      this.form = this.fb.group({
        firstname: [this.userData.firstname, Validators.required],
        lastname: [this.userData.lastname, Validators.required],
        email: [this.userData.email, [Validators.required, Validators.email]],
        phone: this.fb.group({
          countryCode: [mobNum[0], Validators.required],
          mobile: [mobNum[1], [Validators.required, Validators.minLength(10), Validators.maxLength(10),
          Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')
          ]],
        }),
        gender: [this.userData.gender],
        dateOfBirth: [this.userData.dateOfBirth],
        oldPass: [],
        newPass: [],
        confirmPass: [],
      })

    })
  }

  onSubmit(formData: any) {

    this.user.editUser(formData).subscribe((result: any) => {
      console.log(result);
   if(!result.error){
     Swal.fire({
       icon: 'success',
       title: 'Profile has benn updated',
       showConfirmButton: false,
       timer: 1500
     })
     this.route.navigateByUrl(`/profile/${localStorage.getItem('name')}`)
   }else{
    Swal.fire({
      icon: 'error',
      title: result.error,
      showConfirmButton: false,
      timer: 1500
    })
   }
    }, (error) => {
      console.log(error);

    })

  }
  processFile(data:any){
    console.log('image data : ', data);
    
  }
}
