import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

function Login() {
    const { signInUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignIn = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        signInUser(email, password)
            .then((result) => {
                console.log(result.user);
                navigate('/myCampaign'); // Navigate to MyCampaign page
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h1 className="text-5xl font-bold">Sign In now!</h1>
                    <form onSubmit={handleSignIn} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                name="email"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                name="password"
                                className="input input-bordered"
                                required
                            />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">
                                    Forgot password?
                                </a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign In</button>
                        </div>
                    </form>
                    <div>
                        <p>Don't Have An Account?</p>
                        <Link to={'/signup'}>
                            <span>Register</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
