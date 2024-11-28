// this file is to test the registration of a new user, and to check if the user is successfully registered
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Mock database connection and query
const mockDb = {
  query: jest.fn(),
};

app.post('/register', async (req, res) => {
  try {
    const { f_name, email, password } = req.body;
    const sql = 'INSERT INTO tbl_users (f_name, email, _password) VALUES (?, ?, ?)';
    mockDb.query(sql, [f_name, email, password], (err, result) => {
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
        email: email,
      };
      res.json(newUser);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

describe('POST /register', () => {
  it('should register a new user', async () => {
    mockDb.query.mockImplementation((sql, values, callback) => {
      callback(null, { insertId: 1 });
    });

    const res = await request(app)
      .post('/register')
      .send({ f_name: 'John', email: 'john@example.com', password: 'password123' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user_id');
    expect(res.body).toHaveProperty('f_name', 'John');
    expect(res.body).toHaveProperty('email', 'john@example.com');
  });

  it('should return 409 if email already exists', async () => {
    mockDb.query.mockImplementation((sql, values, callback) => {
      const err = new Error('Duplicate entry');
      err.code = 'ER_DUP_ENTRY';
      callback(err, null);
    });

    const res = await request(app)
      .post('/register')
      .send({ f_name: 'Jane', email: 'jane@example.com', password: 'password123' });

    expect(res.statusCode).toEqual(409);
    expect(res.text).toEqual('Email already exists');
  });

  it('should return 500 on server error', async () => {
    mockDb.query.mockImplementation((sql, values, callback) => {
      const err = new Error('Server error');
      callback(err, null);
    });

    const res = await request(app)
      .post('/register')
      .send({ f_name: 'Jake', email: 'jake@example.com', password: 'password123' });

    expect(res.statusCode).toEqual(500);
    expect(res.text).toEqual('Server Error');
  });
});
