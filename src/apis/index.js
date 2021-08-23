import axios from "axios";
require("dotenv").config();

// const apis = {
//     development: "http://localhost:4000",
//     production: "https://ironbeers-store.herokuapp.com",
//   };
// baseURL: apis[process.env.NODE_ENV],

const api = axios.create({
    baseURL: "http://localhost:4000",
  });


  api.interceptors.request.use((config) => {
    // fetch logged user data in localStorage 
    const storedUser = localStorage.getItem("loggedInUser");
  
    // Transforms a string into a json object
    const parsedStoredUser = JSON.parse(storedUser || '""');
  
    if (parsedStoredUser.token) {
      config.headers = {
        Authorization: `Bearer ${parsedStoredUser.token}`,
      };
    }
    return config;
  });

  export default api;