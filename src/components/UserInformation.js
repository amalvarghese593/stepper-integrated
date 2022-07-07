import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import useToken from "./hooks/useToken";
import Tab from "./Tab";

function UserInformation() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const token = useToken();
  useEffect(() => {
    console.log(token);
  }, [token]);
  useEffect(() => {
    console.log(id);
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/users/getUser/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data.data);
        console.log(" aditya data", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      <Tab data={data} />
    </div>
  );
}

export default UserInformation;
