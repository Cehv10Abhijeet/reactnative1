import React from "react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import "./Loader.css"
import axios from "axios";
const SettlementPay = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const [endDate, setEndDate] = useState(new Date());
  const [settlementButton, setsettlementButton] = useState(false);

  const location = useLocation();
  const InternalMerchentID = new URLSearchParams(location.search).get(
    "InternalMerchentID"
  );
  const InternalMerchentName = new URLSearchParams(location.search).get(
    "InternalMerchentName"
  );

  const dateFormatter = (d) => {
    const date = new Date(d);
    return `${date.getFullYear()}-${
      date.getMonth() > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)
    }-${date.getDate() > 9 ? date.getDate() : "0" + date.getDate()}`;
  };

  //Settlement Report of Client
  const reportApi = async () => {
    setLoading(true);
    const rawData = {
      //"merchantId": "2",
      merchantId: InternalMerchentID,
      fromDate: dateFormatter(startDate),
      toDate: dateFormatter(endDate),
    };

    try {
      const response = await axios.post(
        `https://cubexis.in/api/sdkClientSettlementRecords.php`,
        rawData
      );

      if (response.data.status === "00") {
        setReportData(response.data.data); // Assuming the data property holds the report data
        setsettlementButton("true");
      } else {
      }
    } catch (error) {
      console.error("Error fetching report data:", error);
    } finally {
      setLoading(false); // Set loading to false when API call completes (success or failure)
    }
  };
  useEffect(() => {
    // reportApi();
  }, []);

  //Pay All Settlement Api
  const PayAllApi = async () => {
    setLoading(true);
    const rawData = {
   //   merchantId: "2",
       "merchantId": InternalMerchentID,
      fromDate: dateFormatter(startDate),
      toDate: dateFormatter(endDate),
    };

    try {
      const response = await axios.post(
        ` https://cubexis.in/api/sdkClientSettlementAdmin.php`,
        rawData
      );

      if (response.data.status === "00") {
        setReportData(response.data.data); // Assuming the data property holds the report data
      } else {
      }
    } catch (error) {
      console.error("Error fetching report data:", error);
    } finally {
      setLoading(false); // Set loading to false when API call completes (success or failure)
    }
  };

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
        className="full-width-container text-dark p-3 mt-4 shadow "
        style={{
          backgroundColor: "#fff",
          border: "0px solid #000000",
          borderTop: "0px solid #000000",
          borderRadius: "15px 15px 15px 15px",
        }}
      >
        <form onSubmit={handleSubmit} className="row  ">
          <div className="mb-3 col-12 col-lg-6 d-flex align-items-center justify-content-center text-center">
            <div className="" style={{ fontSize: "28px" }}>
              {" "}
              Settlement Pay : <span className="text-success">{InternalMerchentName}</span>
            </div>
          </div>

          <div className="mb-3 col-12 col-lg-2">
            <label className="form-label">Start Date</label>
            <DatePicker  className="p-1 "   selected={startDate} onChange={(date) => setStartDate(date)} />
          </div>
          <div className="mb-3 col-12 col-lg-2">
            <label className="form-label">End Date</label>
            <DatePicker  className="p-1 "   selected={endDate} onChange={(date) => setEndDate(date)} />
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
          {settlementButton && (
            <>
              <div className="mt-4 col-12 col-lg-2">
                <button
                  onClick={PayAllApi()}
                  className=" btn btn-lg btn-block btn-danger"
                  style={{ width: "100%" }}
                >
                  All Settlement
                </button>
              </div>
            </>
          )}
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
                  className=" text-white text-center bg-success"
                >
                  Sr
                </th>
                <th className="bg-success text-white text-center ">Date</th>
                <th className="bg-success text-white text-center">
                  Payment ID
                </th>
                <th className="bg-success text-white text-center">Amount</th>

                <th className="bg-success text-white text-center">Type</th>

                {/* <th className='bg-success text-white text-center'>CGST</th>
             <th className='bg-success text-white text-center'>SGST</th>
             <th className='bg-success text-white text-center'>Charges Amount</th> */}
                <th
                  style={{ borderRadius: "0px 15px 0px 0px" }}
                  className="bg-success text-center text-white text-center"
                >
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {reportData.map((item, index) => (
                <tr key={item._id}>
                  <td className="text-center" style={{ backgroundColor: "" }}>
                    {index + 1}
                  </td>
                  <td className="text-center" style={{ backgroundColor: "" }}>
                    {item.CreatedOn}{" "}
                  </td>
                  <td className="text-center" style={{ backgroundColor: "" }}>
                    {item.paymenttransactionid}
                  </td>
                  <td className="text-center" style={{ backgroundColor: "" }}>
                    {item.TransactionAmount}
                  </td>

                  <td className="text-center" style={{ backgroundColor: "" }}>
                    {item.type === "Dr" ? (
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
                        Debit
                      </span>
                    ) : item.type === "Cr" ? (
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
                        Credit
                      </span>
                    ) : (
                      item.type
                    )}
                  </td>

                  {/* <td className="text-center"style={{backgroundColor:""}}>{item.CGST} </td> 
              
              <td className="text-center" style={{backgroundColor:""}}>{item.SGST}{" "}</td>
         
              
              <td className="text-center"style={{backgroundColor:""}}>{item.ChargesAmount}</td>  */}
                  <td className="text-center" style={{ backgroundColor: "" }}>
                    {item.settlement === "N" ? (
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
                        Not Settled
                      </span>
                    ) : item.settlement === "Y" ? (
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
                        Settled
                      </span>
                    ) : (
                      item.settlement
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SettlementPay;
