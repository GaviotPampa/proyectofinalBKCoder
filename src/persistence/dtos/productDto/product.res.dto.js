/* dto para consultas, nos llega lo que tenemos en base de datos, para que le llegue al front de alguna otra manera */

export default class ProdResDto {
  constructor(product) {
    this.producto = product.titulo;
    this.precio = product.importe;
  }
}
