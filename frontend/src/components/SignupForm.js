import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as RouterLink } from "react-router-dom";
import { validation } from "../helpers/loginHelp";
import { signup } from "../apiCalls/authCalls";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import TopBar from "../components/TopBar";
const useStyles = makeStyles((theme) => ({
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignupForm = () => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorIn, setErrorIn] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [signupError, setSignupError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Error = await validation(firstName, lastName, email, password);
    setErrorIn(Error.errorIn);
    setErrorMessage(Error.error);
    if (Error.error === "") {
      const user = {
        fname: firstName,
        lname: lastName,
        email: email,
        password: password,
      };
      setLoading(true);
      setSignupError("");
      signup(user).then((response) => {
        if (response) {
          if (response.error) {
            setLoading(false);
            setSignupError(response.error);
          } else {
            setLoading(false);
            setSignupSuccess(response.message);
          }
        } else {
          setLoading(false);
          setSignupError("Unable to Connect");
        }
      });
    }
  };

  return (
    <>
      {" "}
      <TopBar link={"signin"} name={"LOGIN"} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {signupSuccess ? (
            <Box
              className={classes.root}
              display="flex"
              justifyContent="center"
            >
              <Alert severity="success">
                {signupSuccess}{" "}
                <RouterLink to="/signin" variant="body2">
                  Click here to Signin
                </RouterLink>
              </Alert>
            </Box>
          ) : (
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {signupError && (
                  <Grid item xs={12}>
                    <Alert severity="error">{signupError}</Alert>
                  </Grid>
                )}

                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setErrorIn("");
                    }}
                    error={errorIn === "firstName"}
                    helperText={errorIn === "firstName" ? errorMessage : ""}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setErrorIn("");
                    }}
                    error={errorIn === "lastName"}
                    helperText={errorIn === "lastName" ? errorMessage : ""}
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
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
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <RouterLink to="/signin" variant="body2">
                    Already have an account? Signin
                  </RouterLink>
                </Grid>
              </Grid>
              {loading && (
                <Box pt={3} display="flex" justifyContent="center">
                  <CircularProgress />
                </Box>
              )}
            </form>
          )}
        </div>
      </Container>
    </>
  );
};
export default SignupForm;
