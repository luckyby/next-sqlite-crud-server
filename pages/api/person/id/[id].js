import { dbOpenConnection, dbDeleteAllData, dbReadAllData, dbCloseConnection } from "../../../../lib/handlers";

const sqlite3 = require('sqlite3').verbose()

const reqById = async (req, res) => {

    const id = req.query.id;

    const method = req.method;

    let db = await dbOpenConnection(sqlite3)

    const sqlGetById = `SELECT id, firstname, lastname, role FROM person WHERE id = ${id}`
    let row = await dbReadAllData(db, sqlGetById)

    if(row.length === 0){
        // console.log('Table is empty.')
        return res.status(200).json({"message:":`Table is empty. No person with the id ${id}`});
    }
    switch (method) {
        case "GET":

            dbCloseConnection(db)

            return res
                    // .setHeader('Content-Type', 'application/json')
                    .status(200)
                    .json([{
                        "id": `${id}`,
                        "firstname": `${row[0].firstname}`,
                        "lastname": `${row[0].lastname}`,
                        "role": `${row[0].role}`
                    }])
        case "PATCH":
            try {
                let data = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    role: req.body.role
                };

                const dataStringify = JSON.stringify(data.firstname + data.lastname + data.role)
                let buff = new Buffer(dataStringify);
                let base64data = buff.toString('base64');

                let sqlPatchById =  `UPDATE person
                            SET firstname="${data.firstname}",
                                lastname ="${data.lastname}",
                                role     ="${data.role}",
                                code     ="${base64data}"
                            WHERE id=${id}`

                try {
                    await new Promise((resolve, reject) => {
                        db.run(sqlPatchById, function (err) {
                            if (err) {
                                return res.status(400).json({ error: err.message });
                            }

                            resolve();
                        });
                    });
                }catch (e) {
                    console.log('error:', e.message)
                }

                const sqlReadById = `SELECT id, firstname, lastname, role FROM person WHERE id = ${id}`
                // console.log('sqlReadById = ', sqlReadById)
                let row = await dbReadAllData(db, sqlReadById)

                // console.log('row after fetch readDataFromDB = ', row)

                dbCloseConnection(db)

                return row
                                ? res
                        .status(200)
                        .json({
                            "id": `${id}`,
                            "firstname": `${row[0].firstname}`,
                            "lastname": `${row[0].lastname}`,
                            "role": `${row[0].role}`
                        })
                                : res
                        .json({
                            "message":`Row(s) updated: ${this.changes}. No person with the id ${id}`
                        });
            }catch (error) {
                return res.status(400).json({
                    "error": error.message,
                    success: false,
                });
            }
        case "DELETE":
            try {
                const sqlDeleteById = `DELETE FROM person WHERE id=${id}`

                await  dbDeleteAllData(db, sqlDeleteById)

                dbCloseConnection(db)

                return (res
                                    ? res.status(200).json({"message": `deleted row with id=${id} in table 'person'`})
                                    : res.json({"message":`No person with the id=${id}`})
                                )

            } catch (e) {
                            return res.status(400).json({
                                inCatch: true,
                                success: false,
                            });
            }

        default:
            res.setHeaders("Allow", ["GET", "PUT", "PATCH", "DELETE"]);
            return res
                .status(405)
                .json({ success: false })
                .end(`Method ${method} Not Allowed`);
    }

    // console.log('row in get by id crud server', row)


};


export default reqById