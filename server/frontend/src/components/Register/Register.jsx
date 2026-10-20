import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
    // State management for all 5 required input fields
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Handle structural state changes for each input field dynamically
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Form submission handler pointing to the Django backend endpoint
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const response = await fetch('/djangoapp/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Registration successful! You can now log in.');
                // Reset form values on success
                setFormData({ username: '', firstName: '', lastName: '', email: '', password: '' });
            } else {
                setError(data.error || 'Registration failed. Please check your inputs.');
            }
        } catch (err) {
            setError('Server connection error. Please try again later.');
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow-sm p-4" style={{ width: '450px', borderRadius: '10px' }}>
                <div className="text-center mb-4">
                    <h2 className="fw-bold text-dark">Sign Up</h2>
                    <p className="text-muted">Create your dealership account</p>
                </div>

                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    {/* Username Input Field */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            required
                        />
                    </div>

                    {/* First Name Input Field */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Enter first name"
                            required
                        />
                    </div>

                    {/* Last Name Input Field */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Enter last name"
                            required
                        />
                    </div>

                    {/* Email Input Field */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="name@example.com"
                            required
                        />
                    </div>

                    {/* Password Input Field */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {/* Register Button */}
                    <button 
                        type="submit" 
                        className="btn w-100 py-2 mt-2 fw-bold text-dark" 
                        style={{ backgroundColor: 'darkturquoise', border: 'none' }}
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
