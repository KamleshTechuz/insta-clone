import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  result: any;
  userData: any
  constructor(private user: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user.getUser().subscribe((result: any) => {
      console.log(result);

      this.result = result
      this.userData = this.result.user
    }, (error) => {
      console.log(error);

    })
  }

  logout() {

    Swal.fire({
      icon: 'success',
      title: 'Your have been logged out.',
      showConfirmButton: false,
      timer: 1500
    })
    localStorage.clear()
    this.router.navigateByUrl('/login')
  }

}
