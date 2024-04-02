// import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";

const ProtectAdmin = ({ children }) => {
  const navigate = useNavigate();

  // const { role } = useSelector((state) => state.auth);
  const role = localStorage.getItem("r");

  useEffect(() => {
    if (role !== "1") {
      navigate("/");
    }
  }, [role, navigate]);

  return children ? children : <Outlet />;
};

export default ProtectAdmin;
ProtectAdmin.propTypes = {
  children: PropTypes.node,
};
