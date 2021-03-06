import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-management-component',
  templateUrl: './management-component.component.html',
  styleUrls: ['./management-component.component.css']
})
export class ManagementComponentComponent implements OnInit {

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

   add(){
     console.log(this.myForm.value);
      this.httpClient.post(this.baseUrl + 'user',this.myForm.value).subscribe(
        (val:any) => {
          if(val.succ){
            alert('添加成功！');
          }
        }
      );
   }

   select(u:User){
     this.currentUser = u;
     this.myForm.setValue(this.currentUser);
   }

   delete(){
     if(!this.currentUser){
       alert('必须先选择用户!');
     }
     else{
       this.httpClient.delete(this.baseUrl + 'user/' + this.currentUser.id).subscribe(
         (val:any) => {
           if(val.succ){
             alert('删除成功！');
           }
         }
       )
     }
   }

   update(){
    if(!this.currentUser){
      alert('必须先选择用户!');
    }
    else{
      this.httpClient.put(this.baseUrl + 'user' ,this.myForm.value).subscribe(
        (val:any) => {
          if(val.succ){
            alert('修改成功！');
          }
        }
      )
    }
  }

}
