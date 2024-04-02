import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { logout } from "../../redux/actions/authActions";

const ProtectedProfile = ({ children }) => {
    // const { idUser } = useSelector((state) => state.auth);
    // const { id } = useSelector((state) => state.profile.profileData);

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     if (idUser !== id) {
    //         dispatch(logout());
    //     }
    // }, [dispatch, idUser, id]);

    return children ? children : <Outlet />;
};

export default ProtectedProfile;
ProtectedProfile.propTypes = {
    children: PropTypes.node,
};
