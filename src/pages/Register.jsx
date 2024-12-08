import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSignUp = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      setError("Password must be at least 6 characters long, contain an uppercase and a lowercase letter.");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const newUser = {
          name,
          email,
          photo,
        };

        fetch("https://crowdcube-server-lemon.vercel.app/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then(() => {
            // Show success toast
            Swal.fire({
              icon: "success",
              title: "Registration Successful",
              text: "Welcome to Crowdcube!",
              showConfirmButton: false,
              timer: 1500,
            });

            // Redirect to All Campaign page after 1.5 seconds
            setTimeout(() => {
              navigate("/allCampaign");
            }, 1500);
          });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen flex items-center justify-center m-2">
      <div className="card w-full max-w-md bg-white shadow-xl rounded-lg p-6">
        <div className="flex justify-center mb-4">
          <img
            src="https://i.ibb.co/RBGH63q/crowdcube.webp"
            alt="Crowdcube"
            className="w-40"
          />
        </div>
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>
        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}
        <form onSubmit={handleSignUp}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Enter photo URL"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter a secure password"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control mt-4">
            <button className="btn btn-primary w-full">Sign Up</button>
          </div>
        </form>
        <p className="text-center font-semibold mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
