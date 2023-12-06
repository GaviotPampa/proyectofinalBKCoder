/* dto para respuesta */
/* se traen los datos de la base de datos y se devuelven de otro modo */
/* Un DTO se puede utilizar para moldear un objeto antes de enviarlo al DAO, o bien se puede utilizar al modo inverso, para moldear un objeto antes de enviarlo al cliente.

No es necesario implementarlo en ambos lados, salvo que sea sumamente necesario.
 */

export default class UserResDto {
  constructor(user) {
    this.nombre = user.first_name;

    this.apellido = user.last_name;

    this.correo = user.email;

    this.rol = user.role;
  }
}
