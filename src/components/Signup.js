import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import AccountCircleOutlined from "@material-ui/icons/AccountCircleOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      first_name: "",
      last_name: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const { props } = this.props;
    const signupData = {
      user_id: this.state.email,
      user_password: this.state.password,
      user_first_name: this.state.first_name,
      user_last_name: this.state.last_name
    };

    axios
      .post("http://localhost:4000/useraccount/signup", signupData)
      .then(res => {
        if (res.data) {
          console.log("signup success");
          props.userHasAuthenticated(true);
          this.props.history.push("/login");
        } else {
          console.log("signup fail");
          props.userHasAuthenticated(false);
          this.props.history.push("/signup");
        }
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <div>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <AccountCircleOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="text">First Name</InputLabel>
                <Input
                  id="first_name"
                  name="first_name"
                  autoFocus
                  value={this.state.first_name}
                  onChange={this.handleChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="text">Last Name</InputLabel>
                <Input
                  id="last_name"
                  name="last_name"
                  value={this.state.last_name}
                  onChange={this.handleChange}
                />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  autoComplete="current-password"
                />
              </FormControl>

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign up
              </Button>
            </form>
          </Paper>
        </div>
      </main>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);
