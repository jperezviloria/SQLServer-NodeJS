const { request } = require("express");
const express = require("express");

var Connection = require('tedious').Connection; 

const app = express();

app.get('/users', function (req, res) {

    const sqlserver = require('mssql')


    const dbConfig = {
        user: 'sa',
        password: 'Password01.',
        server: 'localhost',
        database: 'rubikDB'
    };
    
    sqlserver.connect(dbConfig, function(err){
        if (err) console.log(err);
        var request = new sqlserver.Request();
        let littleQuery = 'SELECT * FROM users'
        request.query(littleQuery, function(err, data){
            if(err) console.log(err)
    
            console.log(data);
            console.table(data.recordset);
            console.log(data.rowsAffected);
            console.log(data.recordset[0]);
    
            res.send(data);
            sqlserver.close();
        })
    })

  });





// sql.ConnectionPool(dbConfig, function(err){
//     if (err) console.log(err);

//     var request = new sql.Request();

//     request.query('select * from users', function(err, recordset){
//         if (err) console.log(err);

//         res.send(recordset)
//     })
// })



var config = {  
    server: 'localhost',  //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'sa', //update me
            password: 'Password01.'  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'rubikDB'  //update me
    }
};  
var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        // If no error, then good to proceed.
        console.log("Connected");
        executeStatement();  
    });  
    

/*

sql.Co(dbConfig, function(err){
    if (err) console.log(err);

    var request = new sql.Request();

    request.query('select * from users', function(err, recordset){
        if (err) console.log(err);

        res.send(recordset)
    })
})
*/

var Request = require('tedious').Request;

function getallusers(){

    request = new Request("SELECT * FROM users", function(err){
        if(err){
            console.log(err)}
    });

    console.log(request)

    connection.execSql(request)
}



app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
   });