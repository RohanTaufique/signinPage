import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as RouterLink, Redirect } from "react-router-dom";
import TopBar from "../components/TopBar";
import { signin } from "../apiCalls/authCalls";
import { validationSignin } from "../helpers/loginHelp";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SigninForm = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorIn, setErrorIn] = useState("");
  const [signinError, setSigninError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const Error = validationSignin(email, password);
    setErrorIn(Error.errorIn);
    setErrorMessage(Error.error);
    if (Error.error === "") {
      const user = { email, password };
      setSigninError(false);
      setLoading(true);
      setSigninError("");
      signin(user).then((data) => {
        if (data) {
          if (data.error) {
            setLoading(false);
            setSigninError(data.error);
          } else {
            if (typeof window !== "undefined") {
              localStorage.setItem("jwt", JSON.stringify(data));
              setRedirect(true);
            }
          }
        } else {
          setSigninError("Unable to Connect to Server");
          setLoading(false);
        }
      });
    }
  };
  if (redirect) {
    return <Redirect to="/home" />;
  }

  return (
    <>
      <TopBar link={"signup"} name={"SIGN UP"} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            {signinError ? (
              <div className={classes.root}>
                <Alert severity="error">{signinError}</Alert>
              </div>
            ) : (
              ""
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorIn("");
              }}
              error={errorIn === "email"}
              helperText={errorIn === "email" ? errorMessage : ""}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorIn("");
              }}
              error={errorIn === "password"}
              helperText={errorIn === "password" ? errorMessage : ""}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <RouterLink to="/forgotpassword" variant="body2">
                  Forgot Password
                </RouterLink>
              </Grid>
              <Grid item>
                <RouterLink to="/signup" variant="body2">
                  Don't have an account? Signup
                </RouterLink>
              </Grid>
            </Grid>
            {loading ? (
              <Box
                className={classes.root}
                display="flex"
                justifyContent="center"
              >
                <CircularProgress />
              </Box>
            ) : (
              ""
            )}
          </form>
        </div>
      </Container>
    </>
  );
};
export default SigninForm;
