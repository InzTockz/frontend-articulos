import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Users[] = [];
  columnsUsers: string[] = ['Nombres', 'Apellidos', 'Usuario', 'Fecha de creacion', 'Rol', 'Accion'];

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      data => this.users = data
    )
  }

  deleteById(id: number): void {
    Swal.fire({
      title: "Estas seguro?",
      text: "No pogras revertir esta acción!",
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
          title: "Eliminado!",
          text: "Usuario eliminado.",
          icon: "success"
        });
      }
    });
  }
}
