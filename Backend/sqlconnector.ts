import mySQL from "npm:mysql2"

export const connection = mySQL.createConnection({
  host:"localhost",
  user: "web",
  password: "AGoodPassword",
  database: "FinalDemo" 



})

connection.connect((_err)=>{
  if (_err)(console.error(_err))
})
export interface MySQLObject {
    setConnection(connection: mySQL.Connection): void;
}





