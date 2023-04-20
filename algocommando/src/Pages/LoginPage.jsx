import React, { Component } from "react";
import SimpleReactValidator from "simple-react-validator";
import { connect } from "react-redux";
import axios from "axios";
// import Navbar from "../Navbar/navbar";
import { Link } from "react-router-dom";
import "../css/login.css";
import { login } from "../User/UserActions";

export class Login extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            email: "",
            password: "",
            error: false,
            loading: false,
            popup: false,
            notFoundError: false,
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.validator.allValid()) {
            this.setState({ loading: true });
            var obj = {
                email: this.state.email,
                password: this.state.password,
                type: "user",
            };
            // axios
            //     .post("/api-token-auth/", obj)
            //     .then((res) => {
            //         if (res.status === 200) {
            //             if (res.data.error === "User not found") {
            //                 this.setState({
            //                     notFoundError: true,
            //                     loading: false,
            //                 });
            //             }
            //             else {
            //                 this.props.fetchUser(res.data);
            //                 // this.props.history.push(`/`);
            //                 window.location.pathname = "/dashboard";
            //                 console.log(res);
            //             }
            //             this.setState({ loading: false });
            //         }
            //         else if (res.status === 400) {
            //             console.log(res);
            //             this.setState({ loading: false });
            //         }
            //     })
            //     .catch((err) => {
            //         this.setState({ error: true, loading: false });
            //     });
            
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    handleTrouble = () => {
        this.setState({ popup: true });
    };

    onClose = () => {
        this.setState({ popup: false });
    };

    render() {
        return (
            <div>
                <div className="full-back">
                    <div className="login-form">
                        <div className="headline">
                            <div className="login-head">LOGIN</div>
                        </div>
                        <div className="border"></div>
                        <form className="login-form-1" onSubmit={this.onSubmit}>
                            <label htmlFor="email" className="fill-it-email">
                                Email ID
                            </label>
                            <input
                                className="email"
                                placeholder="Email"
                                required
                                value={this.state.email}
                                onChange={(e) => this.setState({ email: e.target.value })}
                            />
                            {this.validator.message(
                                "email",
                                this.state.email,
                                "required|email",
                                {
                                    className: "text-danger",
                                }
                            )}
                            <label className="fill-it-password">Password</label>
                            <input
                                className="password"
                                type="password"
                                required
                                placeholder="Password"
                                value={this.state.password}
                                onChange={(e) => this.setState({ password: e.target.value })}
                            />
                            <button className="btn-login">Login</button>
                            {this.state.error && (
                                <div className="text-danger">Email/Password is Incorrect</div>
                            )}
                            {/* {this.state.verifiederror && (
                                <div className="text-info">
                                    User is not verified. Please check registered mail.
                                </div>
                            )} */}
                            {this.state.notFoundError && (
                                <div className="text-danger">
                                    You are not registered.
                                </div>
                            )}
                            <div className="trouble">
                                Not registered yet?{" "}
                                <Link to="/register" >
                                    Register Now
                                </Link>
                            </div>
                            <div className="trouble-d" onClick={this.handleTrouble}>
                                <div className="trouble">Trouble logging in?</div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUser: (id) => dispatch(login(id)),
    };
};

export default connect(null, mapDispatchToProps)(Login);