import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import Moment from "react-moment";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import UpdateTask from "./UpdateTask";
import DeleteTask from "./DeleteTask";
const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
}));

const Task = ({ task, refreshTaskView, setRefreshTaskView }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenUpdate = () => {
    handleClose();
    setOpenUpdate(true);
  };

  const handleOpenDelete = () => {
    handleClose();
    setOpenDelete(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardHeader
          action={
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={task.title}
          subheader={
            <Moment format="MMM DD, YYYY  hh:m A">
              {new Date(task.createdAt)}
            </Moment>
          }
        />
        <CardContent className={classes.cardContent}>
          <Typography>{task.description}.</Typography>
        </CardContent>
      </Card>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}
      >
        <MenuItem className={classes.menuOption} onClick={handleOpenUpdate}>
          Edit
        </MenuItem>
        <MenuItem className={classes.menuOption} onClick={handleOpenDelete}>
          Delete
        </MenuItem>
      </Menu>
      {openUpdate && (
        <UpdateTask
          openUpdate={openUpdate}
          setOpenUpdate={setOpenUpdate}
          task={task}
          refreshTaskView={refreshTaskView}
          setRefreshTaskView={setRefreshTaskView}
        />
      )}
      {openDelete && (
        <DeleteTask
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          task={task}
          refreshTaskView={refreshTaskView}
          setRefreshTaskView={setRefreshTaskView}
        />
      )}
    </React.Fragment>
  );
};
export default Task;
