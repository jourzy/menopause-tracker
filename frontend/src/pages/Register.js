import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { addUserId } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import '../styles/Header.css';

function Register() {
    const [f_name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState({ type: '', text: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:8081/register", { f_name, email, password })
        .then(res => {
            console.log(res);
            const newUserId = res.data.user_id;
            console.log("New user created with ID:", newUserId);
            dispatch(addUserId(newUserId));
            setMessage({ type: 'success', text: 'Registration successful!' });
            setTimeout(() => {
                navigate('/dashboard');  // Navigate to dashboard after successful registration
            }, 1500);  // Wait 1.5 seconds to show success message
        })
        .catch(err => {
            console.error(err);
            let errorMessage = 'Registration failed. Please try again.';
            if (err.response && err.response.status === 409) {
                errorMessage = 'Email already exists. Please use a different email.';
            }
            setMessage({ type: 'danger', text: errorMessage });
        });
    }

    return (
        <div>
            <h1>Pause.</h1>
            <br/>
            <p>Create your account</p>

            {message.text && (
                <Alert variant={message.type} className="mt-3">
                    {message.text}
                </Alert>
            )}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter your name"
                        value={f_name}
                        onChange={e => setName(e.target.value)} 
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email"
                        value={email}
                        onChange={e => setEmail(e.target.value)} 
                        required
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} 
                        required
                    />
                </Form.Group>

                <Button className="primary-button" variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </div>
    );
}

export default Register;