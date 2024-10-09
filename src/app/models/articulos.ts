import { Familias } from "./familias";
import { Subfamilias } from "./subfamilias";

export class Articulos {

  id?:number;
  descripcion?:string;
  presentacion?:string;
  nroArticulo?:string;
  codCorrelativo?:string;
  estado?:boolean;
  fecCreacion?:Date;
  familiasDto?:Familias;
  subFamiliasDto?:Subfamilias;
}
