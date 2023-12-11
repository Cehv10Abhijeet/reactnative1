import React from "react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert
import axios from "axios";
import "./Loader.css"
import { useAuth } from "../context/AuthContext";
const LoadRequest = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [bankOption, setBankOption] = useState([]);
  const [selectedBank, setSelectedBank] = useState({ _id: "", name: "" });
  const [amount, SetAmount] = useState("");
  const [transactionID, SetTransactionID] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [remark, setRemark] = useState("");

  //Date Formatter
  const dateFormatter = (d) => {
    const date = new Date(d)
    return `${date.getFullYear()}-${date.getMonth() > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)
        }-${date.getDate() > 9 ? date.getDate() : "0" + date.getDate()}`;
};
  const AddLoadRequest = async () => {
    setLoading(true);
    const rawData = {
      merchantId: user.merchantId,
      type: "1",
      amount: amount,
      description: remark,
      priority: "1",
      userType: "2",
      bnkid: selectedBank._id,
      utrno: transactionID,
      paymode: type,
      paySlip: "img",
      payDate: dateFormatter(date),
    };

    try {
      const response = await axios.post(
        `https://cubexis.in/api/sdkClientLoadRequestSubmit.php`,
        rawData
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.msg,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Load Request Failed",
          text: response.msg,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Load Request Failed",
        text: "Please try again",
      });
    }finally {
      setLoading(false); // Set loading to false when API call completes (success or failure)
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    AddLoadRequest();
  };

  const Banklist = async () => {
    const rawData = {
      merchantId: user.merchantId,
    };

    try {
      const response = await axios.post(
        `https://cubexis.in/api/sdkClientLoadRequestBanks.php`,
        rawData
      );

      if (response.data.status === "00") {
        console.log(response.data.data);
        setBankOption(response.data.data);
      } else {
      }
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };

  // Call the API on page load
  useEffect(() => {
    Banklist();
  }, []);

  const handleSelectBank = (e) => {
    const selectedBankValue = e.target.value;
    const selectedBankName = e.target.options[e.target.selectedIndex].text;

    setSelectedBank({ _id: selectedBankValue, name: selectedBankName });
  };
  return (
    <div
      className=" p-0 p-lg-5"
      style={{
        backgroundColor: "#F1EFEF",
        fontFamily: "poppins",
        height: "93vh",
      }}
    >
      <div
        className="full-width-container text-dark bg -light p-3 m-3  "
        style={{
          border: "0px solid #000000",
          borderTop: "0px solid #000000",
          borderRadius: "15px 15px 15px 15px",
        }}
      >
        <div className="row p-0  p-lg-5">
          <div className="col-3"></div>
          <div
            className="col-12 p-3 p-lg-4 col-lg-6 bg-white shadow"
            style={{ borderRadius: "10px" }}
          >
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
                  Add Load Request
                </div>
              </div>

              <div className="mb-3 col-12 col-lg-6 ">
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
              <div className="mb-3 col-12 col-lg-6 ">
                <label className="form-label">Transaction ID</label>
                <input
                  type="number"
                  className="form-control"
                  value={transactionID}
                  placeholder="Enter Transaction ID"
                  onChange={(e) => SetTransactionID(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 col-12 col-lg-6 ">
                <label className="form-label">Select Bank</label>
                <select
                  className="form-select"
                  id="product"
                  value={selectedBank._id}
                  onChange={handleSelectBank}
                  required
                >
                  <option value="">Select Bank</option>
                  {bankOption.map((bank) => (
                    <option
                      key={bank._id}
                      value={bank.bankId}
                      className="bg-white"
                    >
                      {bank.bank_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3 col-12 col-lg-6 ">
                <label className="form-label">Type</label>
                <select
                  className="form-select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                >
                  <option value="3">Cash Deposit</option>
                  <option value="2">UPI/IMPS</option>
                  <option value="5">NEFT/RTGS</option>
                  <option value="9">CDM</option>
                  <option value="8">Fund Transfer</option>
                  <option value="10">CHEQUE</option>
                </select>
              </div>
              <div className="mb-3 col-12 col-lg-6 ">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  placeholder="Enter date"
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 col-12 col-lg-6 ">
                <label className="form-label">Remarks</label>
                <input
                  type="text"
                  className="form-control"
                  value={remark}
                  placeholder="Enter Remarks"
                  onChange={(e) => setRemark(e.target.value)}
                  required
                />
              </div>
              

              <div className="mt-4 col-12 d-flex justify-content-center">
                <button
                  className=" btn btn-lg btn-block text-white bg-success"
                  style={{
                    width: "30%",
                  
                  }}
                >
                 Submit
                </button>
              </div>
            </form>
          </div>
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadRequest;
