import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-insta',
  templateUrl: './insta.component.html',
  styleUrls: ['./insta.component.css']
})
export class InstaComponent implements OnInit {
myForm:any;
  constructor(private fb : FormBuilder) {
this.myForm = this.fb.group({
  username : [],
  password : []
})
   }

  ngOnInit(): void {
  }
onSubmit(formData:any){
console.log(formData);

}
}
