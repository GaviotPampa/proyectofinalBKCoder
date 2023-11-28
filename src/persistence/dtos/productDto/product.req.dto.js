export default class ProdReqDto {
    constructor(product) {
      this.titulo = product.titulo;
  
       this.importe = product.price;
  
       this.descipcion= product.description;
  
       this.stock= product.stock;
  
       this.estado= product.status;
  
       this.categoria= product.category;
  
       this.codigo= product.code;
  
       this.owner= product.owner;

       this.thumbnails= product.thumbnails;
       
    };
  };
  