const mysql = require('mysql')

// const pool = mysql.createPool({
//     host: '127.0.0.1',
//     user: 'root',
//     password: 's1110434027',
//     database: 'exam'
// })

const pool = mysql.createPool({
    host: 'exam.mysql.database.azure.com',
    user: 'Jordan',
    password: 'Slimoon19122366',
    database: 'exam'
})

let query = function(sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err)
            } else {
                // 執行 sql 腳本對資料庫進行讀寫
                connection.query(sql, values, (err, rows) => {

                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release() // 結束會話
                })
            }
        })
    })
}

module.exports = query