import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAxios } from "./components/hooks/useAxios";

function Pagination({
  responseObject,
  setUserData,
  setIsLoading,
  setPagingCounter,
  searchTerm,
  postsPerPage,
  setPostsPerPage,
}) {
  const { /* limit, */ totalDocs, totalPages, page } = responseObject;
  // const [postsPerPage, setPostsPerPage] = useState(limit);
  const [currentPage, setCurrentPage] = useState(page);
  const [numberOfPages, setNumberOfPages] = useState(totalPages);
  const { callApi } = useAxios();

  //read token only once
  let token;
  if (localStorage.getItem("auth_token")) {
    token = localStorage.getItem("auth_token");
  }
  useEffect(async () => {
    setIsLoading(true);
    const response = await callApi(
      `${process.env.REACT_APP_API_URL}/api/v1/users/getUsersData?limit=${
        postsPerPage ? postsPerPage : 10
      }&page=${currentPage}&search=${searchTerm}`,
      "get",
      { headers: { authorization: `Bearer ${token}` } }
    );
    setUserData((prev) => response.data.data.docs);
    //execute below code only when posts per page changes
    setNumberOfPages((prev) => response.data.data.totalPages);
    setPagingCounter((prev) => response.data.data.pagingCounter);
    setIsLoading(false);
    // return () => {

    // }
  }, [currentPage, postsPerPage]);

  useEffect(() => {
    setNumberOfPages((prev) => totalPages);
  }, [totalPages]);

  // console.log("responseObject: ", responseObject);
  return (
    <div>
      <div className="label-container">
        <label className="post-label" htmlFor="postsCount">
          Posts per page:
        </label>
        <select
          onChange={(e) => {
            setPostsPerPage((prev) => e.target.value);
            setCurrentPage(1);
          }}
          defaultValue="10"
          name="postsCount"
          id="postsCount"
          className="postCount ml-5"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
      </div>

      <div className="pageNavigation">
        {[...Array.from({ length: numberOfPages }, (v, i) => i + 1)].map(
          (num) => (
            <a
              href="#!"
              key={num}
              onClick={() => setCurrentPage((prev) => num)}
              className=" btn btn-outline-dark"
            >
              {num}
            </a>
          )
        )}
      </div>
    </div>
  );
}

export default Pagination;
