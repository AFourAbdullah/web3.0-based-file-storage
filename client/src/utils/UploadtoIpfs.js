// const JWT = `Bearer ${import.meta.env.VITE_JWT}`;
const JWT = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2ZTM4N2IxOC0yMzc3LTRkYjQtYTdiMS03ZGFhYzBjNmViYTIiLCJlbWFpbCI6ImFiZHVsbGFoYXplZXM0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI4OWJjZWZmMTQ3ZjJjNzVhYjA0YiIsInNjb3BlZEtleVNlY3JldCI6ImM2YzFlYTA1Y2Y3ZjJlNzQ2OTdjYzJmZjY1NzRkZDNjOWRmZmM4NWM5NzcxYmQzZGE0NzQ2YzAxNjc2NGNlNzIiLCJpYXQiOjE2OTMwNDYwMjN9.nzU3K8UafYcS9begIVeMWKQ3vTLJGRW8AJt31FelFdU`;

import axios from "axios";

export const uploadMetadata = async ({
  name,
  description,
  external_url,
  file,
}) => {
  try {
    const data = JSON.stringify({
      pinataContent: {
        name: name, // Use the 'name' provided
        description: description,
        external_url: external_url,
        file: `ipfs://${file}`, // Use the 'imageUri' directly
      },
      pinataMetadata: {
        name: name, // Use the 'name' provided
      },
    });

    const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: JWT,
      },
      body: data,
    });
    const resData = await res.json();
    console.log("Metadata uploaded, CID:", resData.IpfsHash);

    return resData.IpfsHash;
  } catch (error) {
    console.log(error);
  }
};

export const uploadFileToIPFS = async (file, name) => {
  const formData = new FormData();

  formData.append("file", file);

  const metadata = JSON.stringify({
    name: name,
  });
  formData.append("pinataMetadata", metadata);

  const options = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", options);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: JWT,
        },
      }
    );
    console.log("pin res issss", res.data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
