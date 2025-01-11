import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from 'src/app/models/role';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-update-user',
  templateUrl: './dialog-update-user.component.html',
  styleUrls: ['./dialog-update-user.component.css']
})
export class DialogUpdateUserComponent implements OnInit {

  user:Users = new Users;
  indice!:string;


  constructor(public dialogRef:DialogRef<DialogUpdateUserComponent>, @Inject(MAT_DIALOG_DATA) public data:number,
                private userService:UsersService){}

  ngOnInit(): void {
    this.getUserById();
  }

  getUserById():void{
    this.userService.getUserId(this.data).subscribe(
      data => {
        this.user = data;
        data.role === 'ADMIN' ? this.indice = "1" : this.indice = "2";
      }
    )
  }

  updateUser():void{
    const index = Number(this.indice);
    switch(index){
      case 1: 
      this.userService.getUserId(this.data).subscribe(
        data => {
          const admin = {
            id: this.data,
            name: this.user.name,
            lastName: this.user.lastName,
            username: this.user.username,
            password: data.password,
            dateCreated: data.dateCreated,
            role: Role.ADMIN
          }
          this.userService.updateUsers(this.data, admin).subscribe(
            () => {
              this.dialogRef.close();
              Swal.fire({
                text: 'Usuario actualizado',
                icon: 'success'
              })
            }
          )
        }
      );
      break;
      case 2:
        this.userService.getUserId(this.data).subscribe(
          data => {
            const user = {
              id: this.data,
              name: this.user.name,
              lastName: this.user.lastName,
              username: this.user.username,
              password: data.password,
              dateCreated: data.dateCreated,
              role: Role.USER
            }
            this.userService.updateUsers(this.data, user).subscribe(
              () => {
                this.dialogRef.close();
                Swal.fire({
                  text: 'Usuario actualizado',
                  icon: 'success'
                })
              }
            )
          }
        );
        break;
        default: 
    }
  }
}
