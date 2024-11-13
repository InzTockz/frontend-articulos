// src/app/utils/custom-date-adapter.ts
import { NativeDateAdapter } from '@angular/material/core';
import { formatDateWithLeadingZeros } from './date-utils';  // Importa la función de utilidad

export class CustomDateAdapter extends NativeDateAdapter {
  /**
   * Sobrescribe el método `format` de `NativeDateAdapter` para aplicar el formato personalizado de fecha.
   * @param date - La fecha a formatear.
   * @param displayFormat - El formato de visualización.
   * @returns La fecha formateada con ceros a la izquierda en formato dd/MM/yyyy.
   */
  override format(date: Date, displayFormat: Object): string {
    return formatDateWithLeadingZeros(date);  // Utiliza la función de utilidad para formatear la fecha
  }
}