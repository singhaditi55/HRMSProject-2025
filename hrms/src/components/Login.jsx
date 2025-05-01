import { useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import '../styles/Auth.css';

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if there's a message from registration
    if (location.state && location.state.message) {
      setMessage(location.state.message);
    }
  }, [location]);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    // In a real app, you would validate against your backend
    console.log('Login values:', values);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      
      // For demo purposes, check against localStorage
      const storedUser = localStorage.getItem('registeredUser');
      
      if (!storedUser) {
        setErrors({ email: 'No registered users found. Please register first.' });
        return;
      }
      
      const registeredUser = JSON.parse(storedUser);
      
      if (registeredUser.email === values.email && registeredUser.password === values.password) {
        // Login successful
        onLoginSuccess();
        navigate('/home');
      } else {
        // Login failed
        setErrors({ email: 'Invalid email or password' });
      }
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2>Login to HRMS</h2>
        
        {message && <div className="success-message">{message}</div>}
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>

              <button type="submit" disabled={isSubmitting} className="auth-button">
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
        <p className="auth-link-text">
          Don't have an account? <span className="link" onClick={() => navigate('/register')}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
