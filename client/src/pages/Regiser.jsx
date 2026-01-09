import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { register } from '../api/auth.js';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import FormWrapper from '../components/FormWrapper.jsx';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth(); // optional: auto-login after signup
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);

    try {
      const data = await register({ name, email, password });

      // Auto-login if backend returns token & user
      if (data?.token && data?.user) {
        loginUser(data); // save in context & localStorage
        toast.success('Registered & logged in successfully!');
        navigate('/dashboard');
      } else if (data?.message) {
        // Backend returned success message but no token (normal case)
        toast.success(data.message);
        setTimeout(() => navigate('/login'), 800);
      } else {
        throw new Error('Unexpected backend response');
      }
    } catch (err) {
      // Show backend error (e.g., duplicate email)
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <FormWrapper title="Register">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input label="Name" value={name} onChange={e => setName(e.target.value)} />
          <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
        <p className="mt-4 text-sm text-gray-500">
          Already have an account?{' '}
          <span
            className="text-indigo-600 cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </FormWrapper>
    </>
  );
};

export default Register;
