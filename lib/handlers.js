



export let dbOpenConnection = async (sqlite3)=> {
    return await new Promise((resolve, reject)=>{
        let db = new sqlite3.Database('./users.db', ( sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE ), (err) => {

            if (err) {
                console.log('Oops...')
                console.error(err.message);
            }
            // console.log('Connected to the users.db database.');
            resolve(db)
        });
    })
}

export let dbDropTable = async (db, sql)=>{
    return await new Promise((resolve, reject) => {
        db.run(sql, function (err) {
            if (err) {
                res.status(400).json({ error: err.message });
            }
            // console.log('drop table')
            resolve();
        });
    });
}

export let dbCreateTable = async (db, sql) => {
    return await new Promise((resolve, reject) => {
        db.run(sql, function (err) {
            if (err) {
                res.status(400).json({ error: err.message });
            }
            // console.log('create table')
            resolve();
        });
    });
}

export let dbRestoreTable = async (db, sql) => {
    return await new Promise((resolve, reject)=>{
        db.run(sql, function (err) {
            if(err){
                res.status(400).json({"error": err.message})
            }
            resolve()
        })
    })
}

export let dbReadAllData = async (db, sql)=>{
    return await new Promise((resolve, reject)=>{
        db.all(sql, (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            // console.log('res  in get by id crud server', row)
            resolve(row)
        })
    })
}

export const dbDeleteAllData = async (db, sql)=>{
    return                 await new Promise((resolve, reject) => {
        db.run(sql, function (err) {
            if (err) {
                res.status(400).json({error: err.message});
            } else {
                // console.log('after DELETE before resolve')
            }
            console.log(`Row(s) deleted: ${this.changes}`);
            const message = `Row(s) deleted: ${this.changes}`
            resolve(message);
        });
    })
}

export const dbCloseConnection = async (db)=>{
    return await new Promise((resolve, reject)=>{
        db.close((err) => {
            if (err) {
                console.error(err.message);
                reject()
            }
            // console.log('Close the database connection.');
            resolve()
        });
    })
}


export const dbRunSql = async (db, sql, message) => {
    return await new Promise((resolve, reject) => {
        db.run(sqlPatchById, function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            if(message!==''){
                console.log(message)
            }
            resolve();
        });
    });
}


export const dbCreateOnePerson = async (db, sql) => {
    return await new Promise((resolve, reject) => {
        db.run(sql, function (err) {
            if (err) {
                if (
                    err.message ===
                    "SQLITE_CONSTRAINT: UNIQUE constraint failed: person.code"
                ) {
                    res.status(400).json({
                        error: `person ${data.firstname} ${data.lastname} with role ${data.role} already exists`,
                    });
                }
                res.status(400).json({ error: err.message });
            }
            resolve();
        });
    });
}



// await new Promise((resolve, reject)=>{
//     db.close((err) => {
//         if (err) {
//             console.error(err.message);
//             reject()
//         }
//         console.log('Close the database connection.');
//         resolve()
//     });
// })