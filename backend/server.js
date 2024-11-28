const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
require('dotenv').config();

const app = express();

const port = 8081;

app.use(cors());
app.use(express.json());


// Creates a connection to the db with credentials from .env file
const db = mysql.createConnection({
	host     : process.env.host,
	user     : process.env.user,
	password : process.env.password,
	database : 'db_pause'
});


// Test Database Connection:
db.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });


// user registeration endpoint
app.post('/register', async (req, res) => {
    try {
      const { f_name, email, password } = req.body;
      const sql = 'INSERT INTO tbl_users (f_name, email, _password) VALUES (?, ?, ?)';
      db.query(sql, [f_name, email, password], (err, result) => {
        if (err) {
          console.error(err.message);
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).send('Email already exists');
          }
          return res.status(500).send('Server Error');
        }
        
        const newUser = {
          user_id: result.insertId,
          f_name: f_name,
          email: email
        };
        res.json(newUser);
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


//   // User login endpoint (updated to use bcrypt for password comparison)
// app.post('/login', (req, res) => {
//     const { email, password } = req.body;
//     const sql = "SELECT user_id, email, _password, f_name FROM tbl_users WHERE email = ?";
//     db.query(sql, [email], async (err, data) => {
//         if(err) return res.status(500).json("Server Error");
//         if(data.length > 0) {
//             const isMatch = password === data[0]._password;
//             if (isMatch) {
//                 const user = {
//                     user_id: data[0].user_id,
//                     email: data[0].email,
//                     f_name: data[0].f_name
//                 };
//                 return res.json(user);
//             } else {
//                 return res.status(401).json("Invalid credentials");
//             }
//         } else {
//             return res.status(404).json("User not found");
//         }
//     });
// });


// GET endpoint
// http://localhost:8081/symptoms
// Gets a list of the symptoms (code, description)
app.get('/symptoms', (req, res) => {
    const sql = "SELECT symptom_id, symptom_description FROM tbl_symptoms ORDER BY _order;";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    })
})


// GET endpoint
// Get the full list of daily symptom records for a particular user
// Changed to post as need to include the http body in the request
app.post('/user/symptoms', (req, res) => {
    const sql = "SELECT s.symptom_description FROM tbl_symptoms AS s " +
    "INNER JOIN tbl_user_symptoms AS u " +
    "ON s.symptom_id=u.symptom_id " +
    "WHERE user_id = ? AND _date = ?";
    const u_id = req.body.user;
    const date = req.body.date;
    db.query(sql, [u_id, date], (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    })
})


// POST endpoint
// http://localhost:8081/user/diary/add
// Deletes any symptoms that exist for that user on that date
// Creates new symptom records for the user for the given date
app.post('/user/diary/add', async (req, res) => {
    const u_id = req.body.user;
    const date = req.body.date;
    const symptoms = req.body.symptoms;
    console.log(req.body);

    deleteSymptomsForDateAndUser(u_id, date);

    const sql = "INSERT INTO tbl_user_symptoms (user_id, _date, symptom_id) VALUES (?)";
    const dbErrors = [];
    let successCount = 0;

    // Wrap each db.query in a Promise
    const insertPromises = symptoms.map((symptom) => {
        return new Promise((resolve, reject) => {
            const values = [u_id, date, symptom];
            db.query(sql, [values], (err, data) => {
                if (err) {
                    dbErrors.push(err);
                    reject(err);
                } else {
                    successCount++;
                    resolve(data);
                }
            });
        });
    });

    try {
        // Wait for all Promises to resolve
        await Promise.all(insertPromises);
    } catch (err) {
        // Handle any errors that occurred during the insertion
        console.error("Error inserting symptoms:", err);
    }

    res.json({ errors: dbErrors, successCount: successCount });
});


// function for the backend
function deleteSymptomsForDateAndUser(user_id, date) {
    const sql = "DELETE FROM tbl_user_symptoms WHERE user_id = ? AND _date = ?;";
    db.query(sql, [user_id, date], (err, data) => {
        if (err) {
            return err;
        } else {
            return data;
        }
    })
}

// DELETE endpoint
// tested on postman and works
// Deletes all symptom records for a specific user on a specific date
// operation from the frontend
app.post('/user/diary/delete', (req, res) => {
    const u_id = req.body.user;
    const date = req.body.date;
    const result = deleteSymptomsForDateAndUser(u_id, date);
    return res.json(result);
})


// Verifies the user's credentials and returns the user id
app.post('/login', (req, res) => {
    const sql = "SELECT user_id, email, _password FROM tbl_users WHERE email = ? AND _password = ?;";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err) return res.json("Error");
        if(data.length > 0) {
            return res.json(data);
        } else {
            return res.json("No record");
        }
    })
}
)


app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
})
