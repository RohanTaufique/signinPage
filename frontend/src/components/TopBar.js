import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const TopBar = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            MOROSOFT
          </Typography>

          <RouterLink
            to={`/${props.link}`}
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "1.1rem",
            }}
          >
            {props.name}
          </RouterLink>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default TopBar;
