import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Loader.css";
import axios from "axios";

const ReportSettlement = () => {
  const { user } = useAuth();
  const [reportData, setReportData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [type, setType] = useState("1");

  const dateFormatter = (d) => {
    const date = new Date(d);
    return `${date.getFullYear()}-${
      date.getMonth() > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)
    }-${date.getDate() > 9 ? date.getDate() : "0" + date.getDate()}`;
  };

  const reportApi2 = async () => {
    setLoading(true);
    const rawData = {
      transactionTypeId: "12",
      transactionType: "1",
      fromDate: dateFormatter(startDate),
      toDate: dateFormatter(endDate),
      merchantId: user.merchantId,
    };

    try {
      const response = await axios.post(
        `https://cubexis.in/api/getAllMerchantReport.php`,
        rawData
      );

      if (response.status === 200) {
        setReportData(response.data.data); // Assuming the data property holds the report data
      } else {
      }
    } catch (error) {
      console.error("Error fetching report data:", error);
    } finally {
      setLoading(false);
    }
  };

  const reportApi = async () => {
    try {
      setLoading(true);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        transactionTypeId: "12",
        transactionType: "1",
        fromDate: dateFormatter(startDate),
        toDate: dateFormatter(endDate),
        merchantId: user.merchantId,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const res = await fetch(
        `https://cubexis.in/api/getAllMerchantReport.php`,
        requestOptions
      );

      const data = await res.json();
      if (data.status =="00") {
        setReportData(data.data); // Assuming the data property holds the report data
      } else {
        setReportData([])
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
     // swal("Failed", "Error From Server", "error");
    }
  };

  // Call the API on page load

  useEffect(() => {
    if (reportData.length === 0) {
        reportApi();
    }
    // reportApi();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the API with the selected date range
    reportApi();
  };

  return (
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
        className="full-width-container text-dark p-3 mt-4  "
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
              Pay Out Report
            </div>
          </div>
          {/* <div className="mb-3 col-12 col-lg-2">
  <label className="form-label">Debit/Credit</label>
  <select
    className="form-select"
    value={type}
    onChange={(e) => setType(e.target.value)}
    required
  >
    <option value="1">Debit</option>
    <option value="2">Credit</option>
  </select>
</div> */}

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

      <div className="pt-5 ">
        <div
          className=" bg-white "
          style={{ border: "1px solid rgba(0,0,0,1)", borderRadius: "15px" }}
        >
          <table className="table" style={{ fontFamily: "poppins" }}>
            <thead>
              <tr>
                <th
                  style={{ borderRadius: "15px 0px 0px 0px" }}
                  className=" text-white text-center py-3 bg-success"
                >
                  Sr
                </th>
                <th className="bg-success text-white text-center py-3">
                  Payment ID
                </th>
                <th className="bg-success text-white text-center py-3 ">
                  Date
                </th>
                <th className="bg-success text-white text-center py-3 ">
                  Fund ID
                </th>
                <th className="bg-success text-white text-center py-3">
                  Amount
                </th>

                <th className="bg-success text-white text-center py-3">CGST</th>
                <th className="bg-success text-white text-center py-3">SGST</th>

                <th
                  style={{ borderRadius: "0px 15px 0px 0px" }}
                  className="bg-success text-center py-3 text-white text-center py-3"
                >
                  Charges Amount
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
                      {item.paymenttransactionid}
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
                      {item.fundId}{" "}
                    </td>
                    <td
                      className="text-center py-3"
                      style={{ backgroundColor: "" }}
                    >
                      {item.TransactionAmount}
                    </td>

                    <td
                      className="text-center py-3"
                      style={{ backgroundColor: "" }}
                    >
                      {item.CGST}{" "}
                    </td>

                    <td
                      className="text-center py-3"
                      style={{ backgroundColor: "" }}
                    >
                      {item.SGST}{" "}
                    </td>

                    <td
                      className="text-center py-3"
                      style={{ backgroundColor: "" }}
                    >
                      {item.ChargesAmount}
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
  );
};

export default ReportSettlement;
