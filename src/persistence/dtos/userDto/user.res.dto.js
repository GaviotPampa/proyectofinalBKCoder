/* dto para respuesta */
/* se traen los datos de la base de datos y se devuelven de otro modo */
/* Un DTO se puede utilizar para moldear un objeto antes de enviarlo al DAO, o bien se puede utilizar al modo inverso, para moldear un objeto antes de enviarlo al cliente.

No es necesario implementarlo en ambos lados, salvo que sea sumamente necesario.
 */

export default class UseResDto {
    constructor(user) {
      user.first_name;
  
      user.last_name;
  
      user.email;
  
      user.age;
  
      user.role;
    }
  }
  