// src/app/utils/date-utils.ts

/**
 * Formatea una fecha añadiendo ceros a la izquierda si el día o mes son menores a 10.
 * @param date - La fecha a formatear.
 * @returns La fecha formateada en el formato dd/MM/yyyy.
 */
export function formatDateWithLeadingZeros(date: Date): string {
  const day = (`0${date.getDate()}`).slice(-2); // Añade ceros a la izquierda si el día es menor a 10
  const month = (`0${date.getMonth() + 1}`).slice(-2); // Añade ceros a la izquierda si el mes es menor a 10
  const year = date.getFullYear();
  return `${day}/${month}/${year}`; // Devuelve la fecha en formato dd/MM/yyyy
}