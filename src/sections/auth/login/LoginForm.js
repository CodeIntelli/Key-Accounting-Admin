import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
// components
import Iconify from '../../../components/iconify';
// import { clearMessage } from '../../../redux/Reducers/messageSlice';
// import { loadUser, login } from '../../../redux/Actions/authAction';
import { errorToast, successToast } from '../../../utils/Toast';
import { loadUser, login } from '../../../redux/Actions/userAction';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setemailValue] = useState('');
  const [password, setpasswordValue] = useState('');

  useEffect(() => {
    dispatch(loadUser());
    if (error) {
      const errMsg = error.includes('JsonWebTokenError') ? 'Session Time Out Please Login Again' : error;
      errorToast(errMsg);
    }
    if (user && user) {
      navigate('/dashboard/app', { replace: true });
    }
  }, [dispatch, error]);

  const handleClick = () => {
    console.log(email, password);
    dispatch(login({ email, password }));
    successToast('Login Successfully');
    navigate('/dashboard', { replace: true });
    // navigate('/dashboard', { replace: true });
  };

  // if (user && user) {
  //   return navigate('/dashboard', { replace: true });
  // }

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          value={email}
          on
          onChange={(e) => {
            setemailValue(e.target.value);
          }}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
            setpasswordValue(e.target.value);
          }}
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

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
