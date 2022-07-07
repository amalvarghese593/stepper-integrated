import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Table from "../Table";
import { DUMMY_DATA } from "./DUMMY_DATA";
import { useAxios } from "./hooks/useAxios";
import { downloadFile, useDownload } from "./hooks/useDownload";

export default () => {
  const navigate = useNavigate();
  const { callApi } = useAxios();
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [responseObject, setResponseObject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [pagingCounter, setPagingCounter] = useState(1);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        let token;
        if (localStorage.getItem("auth_token")) {
          token = localStorage.getItem("auth_token");
        }
        // const response = await axios({
        //   method: "GET",
        //   // url: `${process.env.REACT_APP_API_URL}/api/v1/userRegistration/getUsersData`,
        //   url: `${process.env.REACT_APP_API_URL}/api/v1/users/getUsersData?limit=10`,
        //   // url: `${process.env.REACT_APP_API_URL}/api/v1/users/getUsersData?limit=${process.env.POSTS_PER_PAGE_ADMIN}`,
        //   headers: { authorization: `Bearer ${token}` },
        // });
        const response = await callApi(
          `${process.env.REACT_APP_API_URL}/api/v1/users/getUsersData?limit=10`,
          "get",
          { headers: { authorization: `Bearer ${token}` } }
        );
        if (response.data.error) navigate("/login");
        // else setUserData(response.data);
        if (Array.isArray(response.data.data.docs))
          setUserData(response.data.data.docs);
        setResponseObject(response.data.data);
        setIsLoading(false);
        // console.log("amal res: ", response);
      } catch (error) {
        setUserData(DUMMY_DATA);
        setIsLoading(false);
        setIsError(error.message);
        console.log("amal error: ", error);
      }
    };
    fetch();
    // console.log(process.env.REACT_APP_API_URL);
  }, [navigate]);
  // const [postsPerPage, setPostsPerPage] = useState(10);
  // const [currentPage, setCurrentPage] = useState(1);
  // const lastIndex = currentPage * postsPerPage;
  // const firstIndex = lastIndex - postsPerPage;
  // const currentPosts = userData.slice(firstIndex, lastIndex);
  // const no = Math.ceil(userData.length / postsPerPage);
  // let numArr = [];
  // for (let i = 1; i < no + 1; i++) {
  //   numArr.push(i);
  // }
  const { fileDownloadHandler } = useDownload();
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/login", { replace: true });
  };

  const debounce = (func, wait) => {
    let timeout;

    const later = () => {
      clearTimeout(timeout);
      func();
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };

  const searchHandler = (e) => {
    const typedData = e.target.value;
    setSearchTerm(typedData);
    setPagingCounter(1);
    console.log("search word: ", typedData);
    debounce(async function () {
      let token;
      if (localStorage.getItem("auth_token")) {
        token = localStorage.getItem("auth_token");
      }
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/api/v1/users/getUsersData?search=${typedData}&limit=${postsPerPage}`,
        headers: { authorization: `Bearer ${token}` },
      })
        .then((res) => {
          setUserData(res.data.data.docs);
          setResponseObject(res.data.data);
          console.log("response: ", res.data.data.docs);
        })
        .catch((err) => {
          console.error("Error: ", err);
        });
    }, 300);
  };

  // const slNo = columns.map((index, value) => (key = { index, _id }));
  const columns = [
    { label: "Sl.No", accessor: "slNo" },
    {
      label: "Name",
      accessor: "firstName",
      cell: (row, index) => (
        <td key={index}>
          <a
            href="!#"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/user/${row._id}`, {
                // state: row,
              });
            }}
          >
            {row.firstName}
          </a>
        </td>
      ),
    },
    { label: "Email", accessor: "primaryEmailId" },
    { label: "Phone", accessor: "primaryContactNumber" },
    { label: "Company", accessor: "currentCompanyName" },
    { label: "Role", accessor: "currentDesignation" },
    { label: "Location", accessor: "currentLocation" },
    {
      label: "Resume",
      accessor: "resume",
      cell: (row, index) => (
        <td key={index}>
          <a
            href={`${process.env.REACT_APP_S3_URL}/resumes/${row.resume}`}
            className="btn btn-dark"
          >
            Download
          </a>
        </td>
      ),
    },
  ];

  return (
    <div>
      {isError && (
        <div className="errorBanner">
          <span className="errorMessage">{isError}</span>
          <button onClick={() => setIsError(null)} className="closeBtn">
            X
          </button>
        </div>
      )}
      <div className="container p-3 my-5 rounded border w-75 card shadow admin">
        <div className="d-flex justify-content-end">
          <button onClick={handleLogout} className="log-out btn-light border">
            Logout
          </button>
        </div>
        <div className="card-body">
          <div className="">
            <div className="d-flex align-items-center text-start mb-3 post-count-new justify-content-between">
              {/* <div>
                <label className="post-label" htmlFor="postsCount">
                  Posts per page:
                </label>
                <select
                  onChange={(e) => setPostsPerPage(e.target.accessor)}
                  defaultaccessor="10"
                  name="postsCount"
                  id="postsCount"
                  className="postCount ml-5"
                >
                  <option accessor="5">5</option>
                  <option accessor="10">10</option>
                  <option accessor="20">20</option>
                  <option accessor="30">30</option>
                </select>
              </div> */}

              <div className="d-flex search-input flex-grow-1 search-bar">
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={searchHandler}
                ></input>
                <img src="/images/search-icon.svg" alt="Search Icon" />
              </div>

              <div className="d-flex">
                <button
                  className="export btn-success ms-3"
                  onClick={() =>
                    fileDownloadHandler(`api/v1/users/report`, "report")
                  }
                >
                  Export Data to Excel
                </button>
              </div>
            </div>
            <div className="table-responsive-xl">
              {/* <table className="table table-striped table-hover table-bordered w-100"> */}
              {/* <thead>
                  <tr>
                    <th scope="col">Sl.No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Company</th>
                    <th scope="col">Role</th>
                    <th scope="col">Location</th>
                    <th scope="col">Resume</th>
                  </tr>
                </thead> */}
              <Table
                columns={columns}
                data={userData || []}
                setUserData={setUserData}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                responseObject={responseObject}
                searchTerm={searchTerm}
                postsPerPage={postsPerPage}
                setPostsPerPage={setPostsPerPage}
                pagingCounter={pagingCounter}
                setPagingCounter={setPagingCounter}
              />
              {/* <tbody>
                  {isLoading && (
                    <tr>
                      <td colSpan="8">Data is Loading...</td>
                    </tr>
                  )}
                  {!isLoading &&
                    currentPosts.map((user, index) => (
                      <tr key={user._id}>
                        <th scope="row">{firstIndex + index + 1}</th>
                        <td>{user.firstName}</td>
                        <td>{user.primaryEmailId}</td>
                        <td>{user.primaryContactNumber}</td>
                        <td>{user.currentCompanyName}</td>
                        <td>{user.currentDesignation}</td>
                        <td>{user.currentLocation}</td>
                        <td>
                          {/* <button
                          className="btn btn-dark"
                          onClick={(e) => {
                            console.log(user.resume);
                            fileDownloadHandler(
                              `${process.env.REACT_APP_S3_URL}/resumes/${user.resume}`,
                              "resume"
                            );
                          }}
                        >
                          Download
                        </button> */}
              {/*  
                          <a
                            href={`${process.env.REACT_APP_S3_URL}/resumes/${user.resume}`}
                            className="btn btn-dark"
                          >
                            Download
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table> */}
            </div>
          </div>
          {/* <div className="pageNavigation">
            {[...Array(10).fill()].map((num, idx) => (
              <a
                href="#!"
                key={num}
                onClick={() => setCurrentPage(num)}
                className="btn btn-outline-dark"
              >
                {idx + 1}
              </a>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};
