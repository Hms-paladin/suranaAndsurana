
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';
import Surana from '../../images/SSIALogo.png'
import { apiurl } from "../../utils/baseUrl";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { notification } from 'antd';

import './login.scss';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(images/login.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
    },
    paper: {
        margin: theme.spacing(10, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 30
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        height: 60,
        borderRadius: 50
    },
    left: {
        position: 'relative'
    },
    fab: {

        margin: theme.spacing(3, 0, 2),
    },
    extendedIcon: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const SignInSide = (props) => {

    const classes = useStyles();
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState(false)
    const [invalidEmail, setInvalidEmail] = useState(false)
    const [isLoggedIn, setLoggedIn] = React.useState(false);
    const { setAuthTokens } = useAuth();
    const history = useHistory();
    const handleSubmit = event => {
        event.preventDefault()

        if (email === "") {
            setEmailError(true)
        }

        if (password === "") {
            setPasswordError(true)
        }

        if (!emailError && !passwordError && !invalidEmail) {
            axios.post(apiurl + "login", {
                email: email,
                password: password
            }).then(res => {
                if (res.status === 200) {
                    if (res.data.status === 1) {
                        setAuthTokens(res.data);
                        history.push("/Home/dashboardnew");
                    } else {
                        notification.error({
                            message: res.data.msg,
                        });
                    }
                }
            }).catch(e => {
                notification.error({
                    message: 'Something went wrong please try again',
                });
            });
        }

    }

    const storeUserDetails = (event) => {
        if (event.target.name === "email") {
            setEmail(event.target.value)
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(event.target.value)) {
                setInvalidEmail(false)
            } else {
                setInvalidEmail(true)
            }
            setEmailError(false)
        }

        if (event.target.name === "password") {
            setPassword(event.target.value)
            setPasswordError(false)
        }
    }

    const renderButton = (btn) => {

        return (
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                {"Login"}
            </Button>
        )
    }



    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={6} md={8} className={classes.image}   >
                <div className='login-left-content'>
                    <Typography variant="h3" gutterBottom
                        style={{ color: 'white', fontWeight: 'bold', fontSize: 35 }}>
                        WELCOME TO SURANA
                    </Typography>
                    <Typography variant="h6" gutterBottom
                        style={{ color: 'white', fontSize: 14 }}
                    >
                        A law is valuable, not because its a law,but <br></br> because there is right on
                        it!!
                    </Typography>
                </div>
            </Grid>


            <Grid item xs={12} sm={6} md={4} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <img src={Surana} width='197px' height='194px' />   <Typography component="h5" variant="h6">
                        {/* Client Portal */}
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>

                        <TextField
                            required={true}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            placeholder={"Email Address"}
                            name={"email"}
                            value={email}
                            type="email"
                            autoComplete={false}
                            onChange={(e) => storeUserDetails(e)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">

                                        <EmailOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <div>
                            {emailError && <span className="loginErrMsg">Email is required</span>}
                            {invalidEmail && <span className="loginErrMsg">Invalid email</span>}
                        </div>

                        <TextField
                            required={true}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            placeholder={"Password"}
                            value={password}
                            name={"password"}
                            type="password"
                            onChange={(e) => storeUserDetails(e)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">

                                        <LockOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <div>
                            {passwordError && <span className="loginErrMsg">Password required</span>}
                        </div>
                        {
                            renderButton()
                        }
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}


export default SignInSide;

