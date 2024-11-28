import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux';
import { addUserId } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

// add code so that if login unsuccessful user gets notified.
// add code that upon successful login user gets home screen

function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.userId);


    useEffect(() => {
        if (user) {
          navigate('/dashboard');
        }
    },[user])


    function handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:8081/login", {email, password})
        .then(res => {
            console.log(res);
            const dataToSubmit = res.data[0]["user_id"];
            console.log(res.data);
            dispatch(addUserId(dataToSubmit));
            console.log(dataToSubmit);
        })
        .catch(err => {
            console.log(err);
        });
    }



    return (
        <div>
            <h1>Pause.</h1>
            <br/>
            <p>Please enter your login details</p>

            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                type="email" 
                placeholder="Enter email"
                onChange={e => setEmail(e.target.value)} 
                />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type="password" 
                placeholder="Password"
                onChange={e => setPassword(e.target.value)} 
                />
            </Form.Group>

            <Button className="primary-button" variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </div>
  );
}

export default Login;