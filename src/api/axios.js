import Axios from "axios";

// const instance = Axios.create(`${process.env.REACT_APP_DOMAIN}/admin/`);
const instance = Axios.create({baseURL: `http://localhost:8080/admin/`});

instance.interceptors.request.use(
  (req) => {
    req.headers.common["X-Tenant"] = "com.initializers.GrocceryStore";
    return req;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default instance;
