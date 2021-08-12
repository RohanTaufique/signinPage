import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import TopBar from "../components/TopBar";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import TaskView from "./TaskView";
import { authenticate } from "../apiCalls/authCalls";

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

const Home = () => {
  const classes = useStyles();
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window == "undefined" || !localStorage.getItem("jwt")) {
      setLoading(false);
    } else {
      const jwt = JSON.parse(localStorage.getItem("jwt"));
      if (!valid) {
        authenticate(jwt.user._id, jwt.token).then((data) => {
          if (data || !data.error) {
            if (data.user) {
              setValid(true);
              setLoading(false);
            } else {
              setLoading(false);
            }
          } else {
            setLoading(false);
          }
        });
      }
    }
  });

  return (
    <>
      <TopBar link={"siginin"} name={"Sign Out"} />
      {loading && (
        <>
          <Box className={classes.root} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        </>
      )}
      {!loading && !valid && (
        <Alert severity="error">
          You don't have permission to view this page. Please signin to continue{" "}
        </Alert>
      )}
      {!loading && valid && <TaskView />}
    </>
  );
};
export default Home;
