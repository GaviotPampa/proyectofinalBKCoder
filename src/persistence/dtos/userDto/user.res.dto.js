/* dto para respuesta */
/* se traen los datos de la base de datos y se devuelven de otro modo */
/* Un DTO se puede utilizar para moldear un objeto antes de enviarlo al DAO, o bien se puede utilizar al modo inverso, para moldear un objeto antes de enviarlo al cliente.

No es necesario implementarlo en ambos lados, salvo que sea sumamente necesario.
 */

export default class UseResDto {
  constructor(user) {
    this.user = user.first_name;

    this.user = user.last_name;

    this.user = user.email;

    this.user = user.role;
  }
}
