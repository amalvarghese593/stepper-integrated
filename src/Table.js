import React, { useState } from "react";
import Pagination from "./Pagination";
function Table({
  columns,
  data,
  isLoading,
  setIsLoading,
  responseObject,
  setUserData,
  searchTerm,
  postsPerPage,
  setPostsPerPage,
  pagingCounter,
  setPagingCounter,
}) {
  //   const [postsPerPage, setPostsPerPage] = useState(10);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const lastIndex = currentPage * postsPerPage;
  //   const [userData, setUserData] = useState([]);
  //   const firstIndex = lastIndex - postsPerPage;
  //   const currentPosts = userData.slice(firstIndex, lastIndex);

  //   const totalPages = Math.ceil(userData.length / postsPerPage);
  //   let numArr = [];
  //   for (let i = 1; i < totalPages + 1; i++) {
  //     numArr.push(i);
  //   }
  // console.log("table data: ", data);
  // const [pagingCounter, setPagingCounter] = useState(1);

  return (
    <div>
      <div className="table-responsive-xl">
        <table className="table table-striped table-hover table-bordered w-100">
          <thead>
            <tr>
              {columns?.map((column, idx) => {
                return <th key={idx}>{column.label}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan="8">Data is Loading...</td>
              </tr>
            )}
            {!isLoading &&
              data.map((row, index) => (
                <tr key={index}>
                  {columns?.map((column, idx) => {
                    return column.hasOwnProperty("cell") ? (
                      column.cell(row, idx)
                    ) : !(column.accessor === "slNo") ? (
                      <td key={idx}>{row[column.accessor]}</td>
                    ) : (
                      <td key={idx}>{index + pagingCounter}</td>
                    );
                  })}
                </tr>
              ))}
          </tbody>
        </table>
        {responseObject && (
          <Pagination
            responseObject={responseObject}
            setUserData={setUserData}
            setIsLoading={setIsLoading}
            setPagingCounter={setPagingCounter}
            searchTerm={searchTerm}
            setPostsPerPage={setPostsPerPage}
            postsPerPage={postsPerPage}
          />
        )}
      </div>
    </div>
  );
}

export default Table;
