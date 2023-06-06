import React, { useEffect } from 'react';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Center from './Center';
import useForm from '../hooks/useForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { Link } from 'react-router-dom';
import useStateContext from '../hooks/useStateContext';
const getFreshModel = () => ({
  email: '',
  password: '',
});

export default function Login() {

  const { context, setContext, resetContext } = useStateContext();
  const navigate=useNavigate();

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
  } = useForm(getFreshModel);

  useEffect(() => {
    // Reset the form values and errors on component mount
    setValues(getFreshModel());
    setErrors({});
    resetContext()
  
  }, []);

  const login = (e) => {

    e.preventDefault();
    if (validate()) {
      // Send the login details to the specified URL
      axios
        .post('http://localhost:5180/api/User/login', values)
        .then((res) => {
          console.log(res);
          setContext({ userId: res.data.userId })
          // Handle the response as needed
          // Redirect to another page or perform any other actions
          navigate('/quiz');
        })
        .catch((err) => console.log(err));
    }
  };

  const validate = () => {
    let temp = {};
    temp.email = /\S+@\S+\.\S+/.test(values.email)
      ? ''
      : 'Email is not valid.';
    temp.password =
      values.password !== '' ? '' : 'This field is required.';
    setErrors(temp);
    return Object.values(temp).every((x) => x === '');
  };

  return (
    <Center>
      <Card sx={{ width: 400 }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ my: 3 }}>
            Quiz App
          </Typography>
          <Box
            sx={{
              '& .MuiTextField-root': {
                m: 1,
                width: '90%',
              },
            }}
          >
            <form noValidate autoComplete="off" onSubmit={login}>
              <TextField
                label="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                variant="outlined"
                {...(errors.email && { error: true, helperText: errors.email })}
              />
              <TextField
                label="Password"
                name="password"
                value={values.password}
                onChange={handleInputChange}
                variant="outlined"
                {...(errors.password && {
                  error: true,
                  helperText: errors.password,
                })}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ width: '90%' }}
              >
                Start
              </Button>

              <div>
          <p className="not-a-member-signup text-right mt-2">
            Not a member? <Link to="/register">Register Here.</Link>
          </p>
        </div>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Center>
  );
}
