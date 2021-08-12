import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import SigninForm from "../components/SigninForm";
import ForgotPassword from "../components/ForgotPassword";
import SignupForm from "../components/SignupForm";
import ConfirmEmail from "../components/ConfirmEmail";
import Home from "../components/Home";
import ResetPassword from "../components/ResetPassword";
const MainRouter = () => {
  return (
    <Switch>
      <Route exact path="/signin" component={SigninForm} />
      <Route path="/confirm/:confirmationCode" component={ConfirmEmail} />
      <Route exact path="/signin" component={SigninForm} />
      <Route exact path="/forgotpassword" component={ForgotPassword} />
      <Route exact path="/signup" component={SignupForm} />
      <Route path="/reset-password/:resetId" component={ResetPassword} />
      <Route exact path="/home" component={Home} />
      <Redirect from="/" to="/signin" />
    </Switch>
  );
};
export default MainRouter;
