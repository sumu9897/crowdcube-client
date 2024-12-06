import { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../providers/AuthProvider";

const Register = () => {
    const { createUser } = useContext(AuthContext);
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const photo = e.target.photo.value;
        const password = e.target.password.value;

        createUser(email, password)
            .then((result) => {
                const createdAt = result.user.metadata?.creationTime;
                const newUser = { name, email, photo, createdAt };

                // Save new user info to the database
                fetch('http://localhost:3530/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log('User created in DB: ', data);
                        navigate('/myCampaign'); // Navigate to MyCampaign page
                    });
            })
            .catch((error) => {
                console.log('Error: ', error);
                setError(error.message); // Optionally display error to the user
            });
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h1 className="text-5xl font-bold">Sign Up now!</h1>
                    <form onSubmit={handleSignUp} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Your Name"
                                name="name"
                                className="input input-bordered"
                                required
                            />
                        </div>
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
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Input photo Link"
                                name="photo"
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
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                    <div>
                        <p>Already Have An Account?</p>
                        <Link to={'/signin'}>
                            <span>Login</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
