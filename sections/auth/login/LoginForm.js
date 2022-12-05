import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, login } from '../../../redux/Actions/userAction';
import Iconify from '../../../components/iconify';

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const { error, isAuthenticated } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    navigate('/dashboard', { replace: true });
  };
  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (isAuthenticated && isAuthenticated === true) {
      navigate('/dashboard', { replace: true });
    }
    dispatch(loadUser());
  }, [isAuthenticated]);
  return (
    <>
      <form onSubmit={handleClick}>
        <Stack spacing={3}>
          <TextField
            name="email"
            autoComplete="false"
            label="Email address"
            required
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="false"
            required
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </form>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link
          variant="subtitle2"
          underline="hover"
          style={{ alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex', width: '100%' }}
        >
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
