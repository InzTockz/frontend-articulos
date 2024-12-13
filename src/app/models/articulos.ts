import { Color } from "./color";
import { Etiquetas } from "./etiquetas";
import { Familias } from "./familias";
import { Subfamilias } from "./subfamilias";
import { TiempoVida } from "./tiempo-vida";

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
  etiquetaDto?:Etiquetas;
  colorDto?:Color;
  etapa?:string;
  descripcionEtapa?:string;
  dosis?:string;
  tiempoVidaDto?:TiempoVida;
}
