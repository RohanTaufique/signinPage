import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CreateTask from "./CreateTask";
import Task from "./Task";
import { CircularProgress } from "@material-ui/core";
import { fetchTasks } from "../apiCalls/taskCalls";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "30rem",
    padding: theme.spacing(8),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const TaskView = () => {
  const classes = useStyles();
  const taskList = useRef([]);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    fetchTasks().then((data) => {
      setLoading(true);
      if (data) {
        if (data.error) {
          setLoading(false);
          setSuccess(false);
        } else {
          if (data.tasks) {
            taskList.current = data.tasks;
            setLoading(false);
            setSuccess(true);
          } else {
            setLoading(false);
            setSuccess(false);
          }
        }
      } else {
        setLoading(false);
        setSuccess(false);
      }
    });
  }, [refresh]);
  return (
    <React.Fragment>
      {open && (
        <CreateTask
          open={open}
          setOpen={setOpen}
          refreshTaskView={refresh}
          setRefreshTaskView={setRefresh}
        />
      )}
      <CssBaseline />
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Task Maker
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Create a task in a few easy steps. Perform update and delete
            operation on any task your want.
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpen}
                >
                  Create New Task
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      {loading && (
        <div className={classes.loading}>
          <CircularProgress size={130} thickness={5} />
        </div>
      )}
      {!loading && success && (
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {taskList.current.map((card) => (
              <Grid item key={card._id} xs={12} sm={6} md={4}>
                <Task
                  task={card}
                  refreshTaskView={refresh}
                  setRefreshTaskView={setRefresh}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
      {!loading && !success && (
        <Container className={classes.cardGrid}>
          <Alert severity="error" variant="filled">
            System is unable to fetch tasks from server. Please try again later
          </Alert>
        </Container>
      )}
    </React.Fragment>
  );
};
export default TaskView;
