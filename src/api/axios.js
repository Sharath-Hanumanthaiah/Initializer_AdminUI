import Axios from "axios";

// const instance = Axios.create(`${process.env.REACT_APP_DOMAIN}/admin/`);
// const instance = Axios.create({baseURL: `http://localhost:8080/admin/`});
// const instance = Axios.create({baseURL: `http://localhost:5000/admin/`});
const instance = Axios.create({baseURL: `http://ec2-13-232-86-114.ap-south-1.compute.amazonaws.com:5000/admin/`});

instance.interceptors.request.use(
  (req) => {
    req.headers.common["X-Tenant"] = "com.initializers.groccerystore1kavf";
    return req;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default instance;