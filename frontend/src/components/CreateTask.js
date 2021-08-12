import React, { useRef, useState } from "react";

import { makeStyles } from "@material-ui/core";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import { Paper } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import { CircularProgress } from "@material-ui/core";
import Announcement from "@material-ui/icons/Announcement";
import { createTask } from "../apiCalls/taskCalls.js";

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
    textAlign: "center",
  },

  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(3),
    padding: theme.spacing(8),
  },
  successIcon: {
    color: "#7cb342",
    fontSize: "8rem",
  },
  unsuccessIcon: {
    color: "#c62828",
    fontSize: "8rem",
  },
  saveIcon: {
    color: "#ff6f00",
    fontSize: "8rem",
  },
  button: {
    color: "white",
    fontWeight: "400",
    letterSpacing: "0.04957em",
  },
}));

const CreateTask = ({ open, setOpen, refreshTaskView, setRefreshTaskView }) => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const errorIn = useRef("");
  const errorMessage = useRef("");
  const [refresh, setRefresh] = useState(false);
  const handleClose = (e) => {
    e.preventDefault();
    if (success) {
      setRefreshTaskView(!refreshTaskView);
    }
    setOpen(false);
  };
  const validate = () => {
    if (title.trim().length < 5 || title.trim().length > 50)
      return {
        errorIn: "title",
        error: "Task must be between 5-50 characters",
      };
    else if (description.trim().length < 20 || description.trim().length > 1000)
      return {
        errorIn: "description",
        error: "Description must be between 20-1000 characters",
      };
    else return "";
  };
  const handleYes = (e) => {
    setLoading(true);
    e.preventDefault();
    const task = { title, description };
    createTask(task).then((data) => {
      if (data) {
        if (data.error) {
          setLoading(false);
          setStep(3);
        } else {
          setSuccess(true);
          setLoading(false);
          setStep(3);
        }
      } else {
        setLoading(false);
        setStep(3);
      }
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const Errors = validate();
    if (Errors === "") setStep(2);
    else {
      errorIn.current = Errors.errorIn;
      errorMessage.current = Errors.error;
      setRefresh(!refresh);
    }
  };
  const handleBack = (e) => {
    e.preventDefault();
    setStep(1);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {step === 1 && (
          <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
            Create New Task
          </DialogTitle>
        )}

        <DialogContent>
          <Grid container spacing={1} style={{ maxWidth: "25rem" }}>
            {step === 1 && (
              <>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Task"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      errorIn.current = "";
                    }}
                    error={errorIn.current === "title"}
                    helperText={
                      errorIn.current === "title"
                        ? errorMessage.current
                        : `${title.length}/50`
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    id="description"
                    multiline
                    rows={4}
                    label="Description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      errorIn.current = "";
                    }}
                    error={errorIn.current === "description"}
                    helperText={
                      errorIn.current === "description"
                        ? errorMessage.current
                        : `${description.length}/1000`
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </>
            )}
            {step === 2 && (
              <Grid item xs={12}>
                <Paper elevation={0} className={classes.root}>
                  <Grid item xs={12}>
                    <Announcement className={classes.saveIcon} />
                  </Grid>
                  {!loading ? (
                    <>
                      <Grid item xs={12}>
                        <Typography variant="h6">Create Task?</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>
                          Are you sure you want to create this task? This action
                          cannot be undone!
                        </Typography>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item xs={12}>
                        <Typography variant="h6">Creating Task...</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <CircularProgress />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>
                          Please wait while we are processing your request.
                        </Typography>
                      </Grid>
                    </>
                  )}
                </Paper>
              </Grid>
            )}
            {step === 3 && (
              <>
                {success ? (
                  <Grid item xs={12}>
                    <Paper elevation={0} className={classes.root}>
                      <Grid item xs={12}>
                        <CheckCircleIcon className={classes.successIcon} />
                      </Grid>

                      <Grid item xs={12}>
                        <Typography variant="h6">Task Created!</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>
                          Congratulations! You have successfully created a new
                          task.
                        </Typography>
                      </Grid>
                    </Paper>
                  </Grid>
                ) : (
                  <Grid item xs={12}>
                    <Paper elevation={0} className={classes.root}>
                      <Grid item xs={12}>
                        <SentimentVeryDissatisfiedIcon
                          className={classes.unsuccessIcon}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6">System Error!</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>
                          System is unable to create this task. Please contact
                          IT support to report this problem.
                        </Typography>
                      </Grid>
                    </Paper>
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          {!loading && (
            <>
              <Button
                onClick={handleClose}
                variant={step === 3 ? "contained" : "text"}
                color="primary"
                className={step === 3 ? classes.button : ""}
              >
                {step === 3 ? "Close" : "Cancel"}
              </Button>
              {step === 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={handleCreate}
                >
                  Create
                </Button>
              )}
              {step === 2 && (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={handleBack}
                >
                  Back
                </Button>
              )}
              {step === 2 && (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={handleYes}
                >
                  Yes
                </Button>
              )}
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};
export default CreateTask;
