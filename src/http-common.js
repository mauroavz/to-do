import axios from "axios";

export default axios.create({
  baseURL: "https://mytareas.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});