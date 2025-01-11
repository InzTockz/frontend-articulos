import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Role } from 'src/app/models/role';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.css']
})
export class DialogAddUserComponent implements OnInit {

  user: Users = new Users;
  indice!: string

  rolObjeto: string[] = ['Administrador', 'Usuario']

  constructor(private userService: UsersService, public dialogRef: MatDialogRef<DialogAddUserComponent>) { }

  ngOnInit(): void {
  }

  addUser(): void {
    const index = Number(this.indice);
    switch (index) {
      case 1:
        const admin = {
          name: this.user.name,
          lastName: this.user.lastName,
          username: this.user.username,
          password: this.user.password,
          role: Role.ADMIN
        }
        this.userService.register(admin).subscribe(
          () => {
            this.dialogRef.close();
            Swal.fire({
              text: 'Usuario registrado',
              icon: 'success'
            })
          }
        );
        break;
      case 2:
        const user = {
          name: this.user.name,
          lastName: this.user.lastName,
          username: this.user.username,
          password: this.user.password,
          role: Role.USER
        }
        this.userService.register(user).subscribe(
          () => {

            this.dialogRef.close();

            Swal.fire({
              text: 'Usuario registrado',
              icon: 'success'
            });
          }
        );
        break;
      case 3:
        const operator = {
          name: this.user.name,
          lastName: this.user.lastName,
          username: this.user.username,
          password: this.user.password,
          role: Role.OPERATOR
        }

        this.userService.register(operator).subscribe(
          () => {
            this.dialogRef.close();
            Swal.fire({
              text: 'Usuario registrado',
              icon: 'success'
            });
          }
        );
        break;
      default:
    }
  }
}
