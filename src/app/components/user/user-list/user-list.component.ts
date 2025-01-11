import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Users } from 'src/app/models/users';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { DialogUpdateUserComponent } from '../dialog-update-user/dialog-update-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Users[] = [];
  columnsUsers: string[] = ['Nombres', 'Apellidos', 'Usuario', 'Fecha de creacion', 'Rol', 'Accion'];

  constructor(private userService: UsersService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  openDialog(enterAnimationDuration:string, exitAnimationDuration:string):void{
    const dialog = this.dialog.open(DialogAddUserComponent, 
      {
        //width: '250px'
        
        enterAnimationDuration,
        exitAnimationDuration
      }
    )

    dialog.afterClosed().subscribe(
      () => {
        this.getAllUsers();
      }
    )
  }

  openDialog2(enterAnimationDuration:string, exitAnimationDuration:string, id:number):void{
    const dialog = this.dialog.open(DialogUpdateUserComponent,
      {
        //width: '250px',
        data: id,
        enterAnimationDuration,
        exitAnimationDuration
      }
    )

    dialog.afterClosed().subscribe(
      () => {
        this.getAllUsers();
      }
    )
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      data => this.users = data
    )
  }

  deleteById(id: number): void {
    Swal.fire({
      title: "Estas seguro?",
      text: "No podras revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminalo!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUsers(id).subscribe(
          () => this.getAllUsers()
        );

        Swal.fire({
          text: "Usuario eliminado.",
          icon: "success"
        });
      }
    });
  }
}
