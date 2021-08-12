import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { Paper } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import { CircularProgress } from "@material-ui/core";
import Announcement from "@material-ui/icons/Announcement";
import { deleteTask } from "../apiCalls/taskCalls";

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

const DeleteTask = ({
  openDelete,
  setOpenDelete,
  task,
  refreshTaskView,
  setRefreshTaskView,
}) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);

  const handleClose = (e) => {
    e.preventDefault();
    if (success) {
      setRefreshTaskView(!refreshTaskView);
    }
    setOpenDelete(false);
  };
  const handleYes = (e) => {
    e.preventDefault();
    setLoading(true);
    deleteTask(task._id).then((data) => {
      if (data) {
        if (data.error) {
          setLoading(false);
          setStep(2);
        } else {
          setSuccess(true);
          setLoading(false);
          setStep(2);
        }
      } else {
        setLoading(false);
        setStep(2);
      }
    });
  };

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <>
      <Dialog
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <Grid container spacing={1} style={{ maxWidth: "25rem" }}>
            {step === 1 && (
              <Grid item xs={12}>
                <Paper elevation={0} className={classes.root}>
                  <Grid item xs={12}>
                    <Announcement className={classes.unsuccessIcon} />
                  </Grid>
                  {!loading ? (
                    <>
                      <Grid item xs={12}>
                        <Typography variant="h6">Delete Task?</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>
                          Are you sure you want to delete this task? This action
                          cannot be undone!
                        </Typography>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item xs={12}>
                        <Typography variant="h6">Deleting Task...</Typography>
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
            {step === 2 && (
              <>
                {success ? (
                  <Grid item xs={12}>
                    <Paper elevation={0} className={classes.root}>
                      <Grid item xs={12}>
                        <CheckCircleIcon className={classes.successIcon} />
                      </Grid>

                      <Grid item xs={12}>
                        <Typography variant="h6">Task Deleted!</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>
                          Congratulations! You have successfully deleted this
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
                          System is unable to delete this task. Please contact
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
              {" "}
              <Button
                onClick={handleClose}
                variant={step === 2 && "contained"}
                color="primary"
                className={step === 2 && classes.button}
              >
                {step === 2 ? "Close" : "Cancel"}
              </Button>
              {step === 1 && (
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
export default DeleteTask;
