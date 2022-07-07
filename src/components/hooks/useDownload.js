import axios from "axios";

const downloadFile = (data, fileName) => {
  const blobUrl = URL.createObjectURL(data);
  const link = document.createElement("a");
  link.target = "_blank";
  link.href = blobUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(blobUrl);
};

export const useDownload = () => {
  const fileDownloadHandler = (route, fileName) => {
    const fetchFile = async () => {
      let token = localStorage.getItem("auth_token");
      const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/${route}`,
        headers: { authorization: `Bearer ${token}` },
        responseType: "blob",
      });
      downloadFile(response.data, fileName + "-" + Date.now());
    };
    fetchFile();
  };
  return { fileDownloadHandler };
};

// import axios from "axios";

// const MIME_TYPE_MAP = {
//   "application/pdf": ".pdf",
//   "application/msword": ".doc",
//   "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
//     ".docx",
//   "text/csv": ".csv",
// };

// const downloadFile = (data, mimeType, fileName) => {
//   // const blob = new Blob([data], {
//   //   type: mimeType,
//   // });
//   const blobUrl = URL.createObjectURL(data);
//   // const link = Object.assign(document.createElement("a"), {
//   //   href: blobUrl,
//   //   style: { display: "none" },
//   //   download: fileName,
//   // });
//   // document.body.appendChild(link);
//   // link.click();
//   // link.remove();
//   const link = document.createElement("a");
//   link.target = "_blank";
//   link.href = blobUrl;
//   link.download = fileName;
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);

//   URL.revokeObjectURL(blobUrl);
// };

// export const useDownload = () => {
//   const fileDownloadHandler = (route, fileName) => {
//     const fetchFile = async () => {
//       const response = await axios({
//         method: "GET",
//         url: `${process.env.REACT_APP_API_URL}/${route}`,
//         // headers: { authorization: `Bearer ${token}` },
//         responseType: "blob",
//       });
//       console.log("response aditya", response);
//       downloadFile(
//         response.data,
//         response.data.type,
//         fileName + "-" + Date.now() + MIME_TYPE_MAP[response.data.type]
//       );

//       // const link = document.createElement("a");
//       // link.target = "_blank";
//       // link.href = filePath;
//       // document.body.appendChild(link);
//       // link.click();
//       // document.body.removeChild(link);
//     };
//     fetchFile();
//   };
//   return { fileDownloadHandler };
// };
