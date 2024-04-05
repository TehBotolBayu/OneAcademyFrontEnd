import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { loginWithGoogle } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

const GoogleOAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const loginWithGoogles = useGoogleLogin({
  //   onSuccess: async (responseGoogle) => {
  //     await dispatch(loginWithGoogle(responseGoogle.access_token, navigate));
  //   },
  //   onError: (errorResponse) => {
  //     alert(errorResponse.error_description);
  //   },
  // });

  return (
    <>
      <button onClick={()=> {}} className="btn bg-white shadow-md">
        <div className="flex gap-1 items-center">
          <FcGoogle size={22} /> Sign in with Google
        </div>
      </button>
    </>
  );
};

export default GoogleOAuth;
