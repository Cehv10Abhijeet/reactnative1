import React from "react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2"; // Import SweetAlert
import axios from "axios";
import cardImage from "../images/Card 1 (1).png";
import "./Loader.css";
import { useAuth } from "../context/AuthContext";
const Home = () => {
  const { user } = useAuth();
  const [balance, setbalance] = useState({ unsettledAmount: "0.00" });

  const [reportData, setReportData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [endDate, setEndDate] = useState(new Date());

  const dateFormatter = (d) => {
    const date = new Date(d);
    return `${date.getFullYear()}-${
      date.getMonth() > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)
    }-${date.getDate() > 9 ? date.getDate() : "0" + date.getDate()}`;
  };
  //Show Balance
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

  const reportApi = async () => {
    setLoading(true);
    const rawData = {
      // transactionTypeId: "13",
      // transactionType: type,
      // fromDate: dateFormatter(startDate),
      // toDate: dateFormatter(endDate),
      //  merchantId: "1003",

      fromDate: dateFormatter(startDate),
      toDate: dateFormatter(endDate),
      merchantId: user.merchantId,
    };

    try {
      const response = await axios.post(
        ` https://cubexis.in/api/getAllUPIReport.php`,
        rawData
      );

      if (response.status === 200) {
        setReportData(response.data.data); // Assuming the data property holds the report data
      } else {
      }
    } catch (error) {
      console.error("Error fetching report data:", error);
    } finally {
      setLoading(false); // Set loading to false when API call completes (success or failure)
    }
  };

  // Call the API on page load
  useEffect(() => {
    reportApi();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the API with the selected date range
    reportApi();
  };

  return (
    <div
      className=" p-0 p-lg-5"
      style={{
        backgroundColor: "#F1EFEF",
        fontFamily: "poppins",
      }}
    >
      <div
        className="full-width-container text-dark bg-white shadow p-3 m-3  "
        style={{ borderRadius: "15px" }}
      >
        <div className="row p-4 d-flex justify-content-between">
          <div className="col-12 col-lg-7 ">
            <div
              className="shadow p-4 bg-light "
              style={{ borderRadius: "15px", width: "100%" }}
            >
              <div style={{ fontSize: "32px" }}>Profile Information</div>
              <div style={{ fontSize: "22px" }}>User ID : {user.UserId}</div>
              <div style={{ fontSize: "22px" }}>Name : {user.Name}</div>
              <div style={{ fontSize: "22px" }}>Email : {user.Email}</div>
              <div style={{ fontSize: "22px" }}>
                Mobile No. : {user.PhoneNumber}
              </div>
            </div>
          </div>
          <div
            className="col-12 col-lg-4   p-0"
            style={{
              borderRadius: "15px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ height: "210px" }}>
              <img
                src={cardImage}
                className="shadow"
                alt="Card"
                style={{
                  //width: "93%",
                  // height:"50%",
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
                  ₹ {balance.unsettledAmount}
                </div>
                <div className="mt-5" style={{ fontSize: "20px" }}>
                  {user.BusinessName}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className=" p-4"
        style={{ backgroundColor: "#F1EFEF", fontFamily: "poppins" }}
      >
        {loading && (
          <div className="loader-container">
            <div className="loader"></div>
            <div className="loader-text">Please wait...</div>
          </div>
        )}

        <div
          className="full-width-container text-dark p-3 mt-4 shadow  "
          style={{
            backgroundColor: "#fff",
            border: "0px solid #000000",
            borderTop: "0px solid #000000",
            borderRadius: "15px 15px 15px 15px",
          }}
        >
          <form onSubmit={handleSubmit} className="row  ">
            <div className="mb-3 col-12 col-lg-6 d-flex align-items-center justify-content-center text-center">
              <div className="" style={{ fontSize: "32px" }}>
                {" "}
                Pay In Report
              </div>
            </div>

            <div className="mb-3 col-12 col-lg-2">
              <label className="form-label">Start Date</label>
              <DatePicker
                className="p-1 "
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="mb-3 col-12 col-lg-2">
              <label className="form-label">End Date</label>
              <DatePicker
                className="p-1 "
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
            <div className="mt-4 col-12 col-lg-2">
              <button
                type="submit"
                className=" btn btn-lg btn-block btn-success"
                style={{ width: "100%" }}
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="pt-4">
          <div
            className="bg-white"
            style={{
              border: "1px solid rgba(0,0,0,1)",
              borderRadius: "15px",
              overflowX: "auto", // Enable horizontal scrolling on smaller screens
            }}
          >
            <table className="table" style={{ fontFamily: "poppins" }}>
              <thead>
                <tr>
                  <th
                    style={{ borderRadius: "15px 0px 0px 0px" }}
                    className="text-white text-center py-3 bg-success"
                  >
                    Sr
                  </th>
                  <th className="bg-success text-white text-center py-3">
                    Reference ID
                  </th>
                  <th className="bg-success text-white text-center py-3">
                    UTR No.
                  </th>
                  <th className="bg-success text-white text-center py-3">
                    Date
                  </th>
                  <th className="bg-success text-white text-center py-3">
                    Amount
                  </th>

                  <th
                    style={{ borderRadius: "0px 15px 0px 0px" }}
                    className="bg-success text-center py-3 text-white text-center"
                  >
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {reportData.map((item, index) => (
                  <>
                    <tr className="shadow" key={item._id}>
                      <td
                        className="text-center py-3"
                        style={{ backgroundColor: "" }}
                      >
                        {index + 1}
                      </td>

                      <td
                        className="text-center py-3"
                        style={{ backgroundColor: "" }}
                      >
                        {item.ref_id}
                      </td>
                      <td
                        className="text-center py-3"
                        style={{ backgroundColor: "" }}
                      >
                        {item.Response.ApprovalRefNo}
                      </td>

                      <td
                        className="text-center py-3"
                        style={{ backgroundColor: "" }}
                      >
                        {item.CreatedOn}{" "}
                      </td>
                      <td
                        className="text-center py-3"
                        style={{ backgroundColor: "" }}
                      >
                        {item.rch_amount}
                      </td>

                      <td
                        className="text-center py-3"
                        style={{ backgroundColor: "" }}
                      >
                        {item.Response.Status === "FAILED" ? (
                          <span
                            style={{
                              borderRadius: "5px",
                              padding: "5px",
                              margin: "5px",
                              border: "1px solid rgba(255, 46, 46, 1)",
                              backgroundColor: "rgba(255, 46, 46, 0.1)",
                              color: "rgba(255, 46, 46, 1)",
                            }}
                          >
                            Failed
                          </span>
                        ) : item.Response.Status === "SUCCESS" ? (
                          <span
                            style={{
                              borderRadius: "5px",
                              padding: "5px",
                              margin: "5px",
                              border: "1px solid rgba(43, 193, 85, 1)",
                              backgroundColor: "rgba(43, 193, 85, 0.1)",
                              color: "rgba(43, 193, 85, 1)",
                            }}
                          >
                            Success
                          </span>
                        ) : (
                          item.settlement
                        )}
                      </td>
                    </tr>
                    <td colSpan={6} style={{ height: "15px" }}></td>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
