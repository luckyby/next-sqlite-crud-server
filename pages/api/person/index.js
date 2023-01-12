import {
    dbCloseConnection,
    dbCreateOnePerson, dbCreateTable,
    dbDropTable,
    dbOpenConnection,
    dbReadAllData
} from "../../../lib/handlers";

const sqlite3 = require("sqlite3").verbose();

export default async (req, res) => {

    const method = req.method;
    // console.log('method = ', method)
    switch (method) {
        case "GET":
            try {
                let db = await dbOpenConnection(sqlite3)

                const sqlReadAllPersons = "SELECT id, firstname, lastname, role FROM person";
                let data= await dbReadAllData(db, sqlReadAllPersons)

                await dbCloseConnection(db)

                return data
                    ? res.status(200).json(data)
                    // : res.end(`No person with the lastname ${lastname}`);
                    : res.end(`Database don't return any data`);

            }catch (e) {
                return res.status(400).json({
                    success: false,
                });
            }
        case "POST":
            try {
                let db = await dbOpenConnection(sqlite3)

                let data = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    role: req.body.role
                };

                const dataStringify = JSON.stringify(data.firstname + data.lastname + data.role)
                let buff = new Buffer(dataStringify);
                let base64data = buff.toString('base64');

                const sqlCreateOnePerson = `INSERT 
                            INTO person (firstname, lastname, role, code) 
                            VALUES ("${data.firstname}","${data.lastname}","${data.role}", "${base64data}")`;
                await dbCreateOnePerson(db, sqlCreateOnePerson)

                let sqlReadPesonByCode = `SELECT 
                            id, 
                            firstname, 
                            lastname, 
                            role 
                       FROM person 
                       WHERE code="${base64data}"`;
                let getData = await dbReadAllData(db, sqlReadPesonByCode)

                await dbCloseConnection(db)

                return res
                    ? res.status(200).json(getData)
                    : res.end(`No person with the lastname ${lastname}`);


            }catch (e) {
                return res.status(400).json({
                    success: false,
                });
            }
        case "DELETE":
            try {
                let db = await dbOpenConnection(sqlite3)

                const sqlDropTable= "DROP TABLE IF EXISTS person"
                await dbDropTable(db, sqlDropTable)

                const sqlCreateTable = "CREATE TABLE " +
                                    "IF NOT EXISTS " +
                    "                               person (" +
                    "                                       id INTEGER PRIMARY KEY, " +
                    "                                       firstname TEXT, " +
                    "                                       lastname TEXT, " +
                    "                                       role TEXT, " +
                    "                                       code TEXT UNIQUE)"
                await dbCreateTable(db, sqlCreateTable)

                await dbCloseConnection(db)

                return res
                    ? res.status(200).json({"message": "table 'person' is empty"})
                    : res.end(`No person with the lastname ${lastname}`);
            } catch (error) {
                return res.status(400).json({
                    success: false,
                });
            }
        default:
            res.setHeader("Allow", ["GET", "POST", "DELETE"]);
            return res
                .status(405)
                .json({ success: false, "message": `Method ${method} Not Allowed` })
                // .end(`Method ${method} Not Allowed`);
    }
}

