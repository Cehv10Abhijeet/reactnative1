import React from "react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Loader.css"
import { Button } from "react-bootstrap";
const SettlementProcess = () => {
  const { user } = useAuth();
  const [allMerchantList, setallMerchantList] = useState([]);
  const [loading, setLoading] = useState(false);
  const AllMerchentListAPi = async () => {
    setLoading(true);
    const rawData = {
      merchantId: user.merchantId,
    };

    try {
      const response = await axios.post(
        `https://cubexis.in/api/sdkClientGetAllMerchants.php`,
        rawData
      );

      if (response.status === 200) {
        setallMerchantList(response.data.data); // Assuming the data property holds the report data
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
    AllMerchentListAPi();
  }, []);

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
        className="full-width-container text-dark p-3 mt-4 shadow  "
        style={{
          backgroundColor: "#fff",
          border: "0px solid #000000",
          borderTop: "0px solid #000000",
          borderRadius: "15px 15px 15px 15px",
        }}
      >
        <div className="mb-3  d-flex align-items-center justify-content-center text-center">
          <div className="" style={{ fontSize: "32px" }}>
            {" "}
            Settlement Process
          </div>
        </div>
      </div>

      <div className="pt-5 ">
        <div
          className=" bg-white shadow"
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
                  Business Name
                </th>

                <th
                  style={{ borderRadius: "0px 15px 0px 0px" }}
                  className="bg-success text-center py-3 text-white "
                >
                  Pay
                </th>
              </tr>
            </thead>

            <tbody>
              {allMerchantList.map((item, index) => (
                <>
                <tr className="shadow" key={item._id}>
                  <td className="text-center py-3" style={{ backgroundColor: "" }}>
                    {index + 1}
                  </td>
                  <td className="text-center py-3" style={{ backgroundColor: "" }}>
                    {item.BusinessName}{" "}
                  </td>
                  <td className="text-center py-3" style={{ backgroundColor: "" }}>
                    <Link
                      to={`/SettlementPay?InternalMerchentID=${item.merchantId}&&InternalMerchentName=${item.BusinessName}`}
                    >
                      <Button
                      className="shadow"
                        style={{
                          backgroundColor: "rgba(43, 193, 85, 0.1)",
                          borderColor: "rgba(43, 193, 85, 1)",
                          color: "rgba(43, 193, 85, 1)",
                        }}
                      >
                        Settlement <span> {"➜"}</span>
                      </Button>
                    </Link>
                  </td>
                </tr>
                <td colSpan={6} style={{height:"15px"}}></td>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SettlementProcess;
