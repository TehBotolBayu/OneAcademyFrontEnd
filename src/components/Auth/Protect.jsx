import { useEffect } from "react";
// import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const Protect = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const idUser = localStorage.getItem("idUser");

  useEffect(() => {
    if (token && idUser) {
      navigate("/");
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("idUser");
    }
  }, []);

  return children ? children : <Outlet />;
};

export default Protect;

Protect.propTypes = {
  children: PropTypes.node,
};
