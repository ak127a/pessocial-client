import axios from "axios";

export default axios.create({
  baseURL: "https://asia-east2-pessocial-a007f.cloudfunctions.net/api"
});
