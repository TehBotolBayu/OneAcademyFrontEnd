import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/Auth/ResetPassword";
import SendReset from "./pages/Auth/SendReset";
import RegisterOtp from "./pages/Auth/RegisterOtp";
import KelasDetail from "./pages/Detail/KelasDetail";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
// import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Notification from "./pages/profile/Notification";
import { Toaster } from "react-hot-toast";
import Protect from "./components/Auth/Protect";
import Account from "./pages/profile/Account";
import Class from "./pages/Course/Class";
import Payment from "./pages/Payment/Payment";
// import ProtectedProfile from "./components/Auth/ProtectedProfile";
import KelolaChapter from "./pages/Admin/KelolaChapter";
import ProtectAdmin from "./components/Auth/ProtectAdmin";
import Footer from "./components/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_CLIENT_ID}>
          <BrowserRouter>
            <Toaster
              position="bottom-center"
              reverseOrder={false}
              className="custom-toaster"
            />
            <Navbar />
            <Routes>
              {/* Guest routes */}
              <Route path="/" element={<Home />} />
              <Route path="/details/:id" element={<KelasDetail />} />
              <Route path="/class" element={<Class />} />

              {/* Profile routes, Check if user is not login */}
              {/* <Route element={<ProtectedProfile />}> */}
              <Route path="/notification" element={<Notification />} />
              <Route path="/account" element={<Account />} />
              <Route path="/payment/:id" element={<Payment />} />
              {/* </Route> */}

              {/* User Authorization */}
              <Route element={<Protect />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/validate" element={<RegisterOtp />} />

                {/* Reset Password */}
                <Route path="/reset" element={<SendReset />} />
                <Route path="/forgot/:id" element={<ResetPassword />} />
              </Route>

              {/* Admin Authorization */}
              <Route element={<ProtectAdmin />}>
                {/* <Route path="/admin" element={<AdminLogin />} /> use the same login as user */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/chapter/:id" element={<KelolaChapter />} />

                {/* Handle Pages Not Found */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
            <Footer />
          </BrowserRouter>
        </GoogleOAuthProvider>
      </Provider>
    </>
  );
}

export default App;
