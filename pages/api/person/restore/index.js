import {
    dbCloseConnection,
    dbCreateTable,
    dbDropTable,
    dbOpenConnection,
    dbReadAllData,
    dbRestoreTable
} from "../../../../lib/handlers";

import { Buffer } from 'node:buffer';

const sqlite3 = require('sqlite3').verbose()

const restore = async  (req, res) => {
// console.log('', process.env.)
//     console.log('req in begin RESTORE', req)
    const reqBody = req.body
    // console.log('reqBody = ', reqBody )
    // console.log('reqBodyStringify = ', JSON.stringify(reqBody) )
    const login = reqBody['login']
    // console.log('login = ', login)
    const password = reqBody['password']
    // console.log('password = ', password)

    const loginAdmin = process.env.ADMIN_LOGIN
    // console.log('loginAdmin = ', loginAdmin)
    const loginPassword = process.env.ADMIN_PASSWORD
    // console.log('loginPassword = ', loginPassword)

    const method = req.method;
    // console.log('method:', method);

    if( login!==loginAdmin || password!==loginPassword){
        return (
            res.end(`You are  havn't permission for this action`)
        )
    }

    // let sql;
    // let params;
    switch (method) {
        case "POST":
            try {
                let db = await dbOpenConnection(sqlite3)

                const sqlDropTable= "DROP TABLE IF EXISTS person"
                await dbDropTable(db, sqlDropTable)

                const sqlCreateTable = "CREATE TABLE " +
                                            "IF NOT EXISTS person " +
                                                "(" +
                                                    "id INTEGER PRIMARY KEY, " +
                                                    "firstname TEXT, " +
                                                    "lastname TEXT, " +
                                                    "role TEXT, " +
                                                    "code TEXT UNIQUE " +
                                                ")"
                await dbCreateTable(db, sqlCreateTable)

                let persons = {
                    1:{
                        "firstname": "John",
                        "lastname": "Doe",
                        "role": "unknown man",
                    },
                    2:{
                        "firstname": "Jane",
                        "lastname": "Doe",
                        "role": "unknown woman",
                    },
                    3:{
                        "firstname": "James",
                        "lastname": "Bond",
                        "role": "agent 007",
                    },
                }

                function code(firstname, lastname, role) {
                    const dataStringify = JSON.stringify(firstname + lastname + role)
                    // let buff = new Buffer(dataStringify);
                    // let buffer = new Buffer();
                    const buff = Buffer.from(dataStringify)
                    return  buff.toString('base64');
                }

                const sqlRestoreTable = "INSERT INTO person " +
                            "(firstname, lastname, role, code) " +
                                `VALUES (
                                    "${persons["1"].firstname}", 
                                    "${persons["1"].lastname}", 
                                    "${persons["1"].role}", 
                                    "${code(persons["1"].firstname, persons["1"].lastname, persons["1"].role)}"
                                ), ` +
                                `(
                                    "${persons["2"].firstname}", 
                                    "${persons["2"].lastname}", 
                                    "${persons["2"].role}", 
                                    "${code(persons["2"].firstname, persons["2"].lastname, persons["2"].role)}"
                                ), ` +
                                `(
                                    "${persons["3"].firstname}", 
                                    "${persons["3"].lastname}", 
                                    "${persons["3"].role}", 
                                    "${code(persons["3"].firstname, persons["3"].lastname, persons["3"].role)}"
                                )`

                await dbRestoreTable(db, sqlRestoreTable)


                const sqlReadAll = `SELECT id, firstname, lastname, role FROM person`
                let data = await dbReadAllData(db, sqlReadAll)

                await dbCloseConnection(db)

                return res
                    ? res.status(200).json(data)
                    : res.end(`Ooops! Table was not restored`);

            } catch (error) {
                return res.status(400).json({
                    success: false,
                });
            }
        default:
            // res.setHeaders("Allow", ["POST"]);
            // res.setHeaders("Allow", ["GET"]);
            return res
                .status(405)
                .json({ success: false })
                .end(`Method ${method} Not Allowed`);
    }
}

export default restore