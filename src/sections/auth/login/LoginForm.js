import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
// components
import Iconify from '../../../components/iconify';
import { clearMessage } from '../../../redux/Reducers/messageSlice';
import { login } from '../../../redux/Actions/authAction';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setemailValue] = useState('');
  const [password, setpasswordValue] = useState('');

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleClick = () => {
    console.log(email, password);

    dispatch(login({ email, password }))
      .unwrap()
      .then((res) => {
        console.log(res);
        navigate('/dashboard', { replace: true });
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
    // navigate('/dashboard', { replace: true });
  };

  if (isAuthenticated) {
    return navigate('/dashboard', { replace: true });
  }

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

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} />

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
