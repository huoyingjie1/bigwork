import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../management-component/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-management-component',
  templateUrl: './user-management-component.component.html',
  styleUrls: ['./user-management-component.component.css']
})
export class UserManagementComponentComponent implements OnInit {

  myForm: FormGroup;
  userName: AbstractControl;
  id: AbstractControl;
  ChineseGrade: AbstractControl;
  MathGrade: AbstractControl;
  users$: Observable<User>;
  baseUrl = 'http://localhost:8080/';
  currentUser:User;
  

  constructor(private fb: FormBuilder,private httpClient: HttpClient){
    this.myForm=this.fb.group({
      'userName':[''],
      'ChineseGrade':[''],
      'id':[''],
      'MathGrade':['']
    });

    this.userName = this.myForm.controls['userName'];
    this.id = this.myForm.controls['id'];
    this.ChineseGrade = this.myForm.controls['ChineseGrade'];
    this.MathGrade = this.myForm.controls['MathGrade'];
  }

  ngOnInit():void{
     this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'users');
  }

  search(){
     if (this.id.value){
       this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'users/' +this.id.value);
     }else {
       this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'users');
     }
  }

  select(u:User){
    this.currentUser = u;
    this.myForm.setValue(this.currentUser);
  }



}
