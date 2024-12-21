import { Login } from "./login";

export class Clientes {
    id_cliente?:number
    cardCode?:string
    ruc?:string
    nombre_cliente?:string
    correo_cliente?:string
    usuario_portal?:string
    clave_portal?:string
    idVendedor = {
        id_vendedor: 0,
        nombres: '',
        codigo: 0
    }
}
