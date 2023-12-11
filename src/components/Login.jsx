import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.css";
import "./Login.css";
import "./Loader.css";
import image4 from "../images/Group 3 (1).png";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useHistory();
  const { login } = useAuth();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [image4, image4, image4];
  const headings = ["", "", ""];
  const descriptions = [" ", " ", " "];

  useEffect(() => {
    const changeImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const interval = setInterval(changeImage, 3000); // Change image every 3 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, []);

  const formValidation = () => {
    if (!email && !password) {
      setEmailError("* Please enter a valid Email ID");
      setPasswordError("* Please Enter Password.");
      return;
    } else if (!email) {
      setEmailError("* Please enter a valid Email ID");
      return;
    } else if (!password) {
      setPasswordError("* Please Enter Password");
      return;
    }

    handleLogin();
  };

  const handleLogin = async () => {
    setLoading(true);
    //  const hash =  crypto.createHash("md5").update(password).digest("hex");
    try {
      const response = await axios.post(
        "https://cubexis.in/api/merchantLogin.php",
        {
          merchantUserName: email,
          merchantPassword: password,
          ipaddress: "12",
          latitude: "346346",
          longitude: "457457",
          device: "WEB",
        }
      );

      if (response.data.status === "00") {
        // Successful login
        const userData = response.data.data;
        login(userData);
        navigate.push("/Home");
        //  navigate('/Pay');
      } else {
        // Failed login
        Swal.fire({
          icon: "error",
          title: "Failed Login",
          text: "Please check your Email and Password.",
        });
      }
    } catch (error) {
      // Handle login error and display a SweetAlert popup
      Swal.fire({
        icon: "error",
        title: "Failed Login",
        text: "Please check your Email and Password.",
      });
    } finally {
      setLoading(false); // Set loading to false when API call completes (success or failure)
    }
  };

  return (
    <div
      className="container-fluid  px-0"
      style={{ fontFamily: "Nunito, sans-serif", width: "100%" }}
    >
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
          <div className="loader-text">Please wait...</div>
        </div>
      )}
      <div className="row m-0 p-0" style={{ height: "100vh" }}>
        <div
          className="col-12 col-lg-8 p-5 col-sm-"
          style={{
            background:
              "linear-gradient(to right, rgba(58, 216, 143, 1), rgba(25, 135, 84, 1))",
          }}
        >
          <img
            src={images[currentImageIndex]}
            alt={`Image`}
            style={{ width: "100%" }}
          />
        </div>

        <div
          className="col-12 col-lg-4 p-5 d-flex justify-content-center align-items-center"
          style={{ borderLeft: "1px solid #000000" }}
        >
          <div>
            <div style={{ fontSize: "22px", fontFamily: "Nunito, sans-serif" }}>
              Hello!
            </div>
            <div
              className="text-success"
              style={{ fontSize: "28px", fontWeight: "bold" }}
            >
              Welcome Back
            </div>
            <div className="py-4" style={{ fontSize: "16px" }}>
              You are just a step away from experiencing fast transaction.
            </div>
            <div
              className="pb-4"
              style={{
                fontSize: "22px",
                fontFamily: "Nunito, sans-serif",
                fontWeight: "bold",
              }}
            >
              Login
            </div>
            <div className="mb-3">
              <label htmlFor="">E-mail ID</label>
              <input
                type="email"
                className="form-control"
                style={{ fontSize: "14px" }}
                placeholder="Enter your E-mail ID"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
              />
              {emailError && <p style={{ color: "#C00A10" }}>{emailError}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor=""> Password</label>
              <input
                type="password"
                className="form-control"
                style={{ fontSize: "14px" }}
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
              />
              {passwordError && (
                <p style={{ color: "#C00A10" }}>{passwordError}</p>
              )}
            </div>

            <button
              className="p-2 pb-2 w-50 border-none  text-white bg-success"
              style={{ borderRadius: "10px", border: "0px" }}
              onClick={formValidation}
            >
              Login
            </button>
            <div className="py-4 my-4">
              Protected by reCAPTCHA. Google{" "}
              <span className="text-success">Privacy policy</span> &{" "}
              <span className="text-success">Terms of Service</span> apply
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default Login;
