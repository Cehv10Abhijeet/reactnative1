import React from "react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert
import axios from "axios";
import "./Loader.css"
import cardImage from "../images/Card 1 (1).png";
import { useAuth } from "../context/AuthContext";
const Pay = () => {
  const { user } = useAuth();
  const [balance, setbalance] = useState({});
  const [amount, SetAmount] = useState("");
  const [pin, SetPin] = useState("123456");
  const [type, setType] = useState("IMPS");
  const [loading, setLoading] = useState(false);
  const Payout = async () => {
    setLoading(true);
    const rawData = {
      merchantId: user.merchantId,
      merchantSecret: user.merchantSecret,
      merchantTransactionAmount: amount,
      merchantUserName: user.UserName,
      merchantTPin: pin,
      serviceType: type,
    };

    try {
      const response = await axios.post(
        `https://cubexis.in/api/merchantSettlement.php`,
        rawData
      );

      if (response.status === 200) {
        BalanceApi();
        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: "Please try again",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: "Please try again",
      });
    } finally {
      setLoading(false); // Set loading to false when API call completes (success or failure)
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    Payout();
  };

  const BalanceApi = async () => {
  
    const rawData = {
      merchantId: user.merchantId,
    };

    try {
      const response = await axios.post(
        `https://cubexis.in/api/merchantWalletBalance.php`,
        rawData
      );
      // setbalance(response.data);
      if (response.data.status === "00") {
        console.log(response.data.data);
        setbalance(response.data.data); // Assuming the data property holds the report data
      } else {
      }
    } catch (error) {
      console.error("Error fetching report data:", error);
    } 
  };

  // Call the API on page load
  useEffect(() => {
    BalanceApi();
  }, []);

  console.log(type);

  return (
    <div
      className="p-lg-4 my-lg-0 my-2 "
      style={{
        backgroundColor: "#F1EFEF",
        fontFamily: "poppins",
        height: "93vh",
      }}
    >
     {loading && (
        <div className="loader-container">
          <div className="loader"></div>
          <div className="loader-text">Please wait...</div>
        </div>
      )}

      <div
        className="full-width-container text-dark p-3 m-3 bg-success  "
        style={{
         // backgroundColor: "rgba(90, 0, 206, 1)",
          border: "0px solid #000000",
          borderTop: "0px solid #000000",
          borderRadius: "15px 15px 15px 15px",
        }}
      >
        <div className="row p-0 p-lg-5">
          <div className="col-12 col-lg-8 my-2 m-lg-0 ">
            <div
              className=" row d-flex align-items-center justify-content-center "
              style={{ height: "100%" }}
            >
              <div
                className="col-12 col-lg-5 p-lg-4  p-0"
                style={{
                  borderRadius: "10px",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                }}
              >
                <img
                  src={cardImage}
                  className="shadow"
                  alt="Card"
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
                <div
                  style={{
                    zIndex: 1,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    color: "#ffff",
                    fontFamily: "Poppins",
                    padding: "40px",
                  }}
                >
                  <div style={{ fontSize: "20px" }}>Wallet Balance</div>
                  <div style={{ fontSize: "32px" }}>
                    ₹ {balance.unsettledAmount?balance.unsettledAmount:"0.00"}
                  </div>
                  <div className="mt-5" style={{ fontSize: "20px" }}>
                    {user.BusinessName}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 p-4 bg-white" style={{ borderRadius: "10px" }}>
            <form onSubmit={handleSubmit} className="row  ">
              <div className="mb-3 col-12  d-flex align-items-center justify-content-center text-center">
                <div
                  className=""
                  style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    fontFamily: "poppins",
                  }}
                >
                  {" "}
                  PayOut
                </div>
              </div>
              <div className="mb-3 col-12 ">
                <label className="form-label">Type</label>
                <select
                  className="form-select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                >
                  <option value="IMPS">IMPS</option>
                  <option value="NEFT">NEFT</option>
                </select>
              </div>

              <div className="mb-3 col-12 ">
                <label className="form-label">Amount</label>
                <input
                  type="number"
                  className="form-control"
                  value={amount}
                  placeholder="Enter Amount"
                  onChange={(e) => SetAmount(e.target.value)}
                  required
                />
              </div>
              {/* <div className="mb-3 col-12 ">
          <label className="form-label">M-Pin</label>
          <input
            type="password"
            className="form-control"
            placeholder='Enter M-Pin'
            value={pin}
            onChange={(e) => SetPin(e.target.value)}
            required
          />
        </div> */}
              <div className="mt-4 col-12 ">
                <button
                  className=" btn btn-lg btn-block text-white bg-success"
                  style={{
                    width: "100%",
                   
                  }}
                >
                  Pay
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
