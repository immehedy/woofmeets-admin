import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import UsersDetails from "./pages/UsersDetails";
import SittersDetails from "./pages/SittersDetails";
import Sitters from "./pages/Sitters";
import Subscriptions from "./pages/Subscriptions";
import Appointments from "./pages/Appointments";
import AppointmentDetails from "./pages/AppointmentDetails";
import Transactions from "./pages/Transactions";
import TransactionDetails from "./pages/TransactionDetails";
import UserSubscriptionLists from "./pages/UserSubscriptionLists";
import UserApplicationVersion from "./pages/UserApplicationVersion";
import DashboardLayout from "./layouts/dashboardLayout";
import Login from "./pages/Login";
import RequireAuth from "./components/Authentication/RequireAuth";
import { useState, useEffect } from "react";
import { AuthProvider } from "./components/Authentication/auth";
import "@tremor/react/dist/esm/tremor.css";
import { getHompageData } from "./components/Charts/lib/hooks/useGetHomePageData";
import UserCouponLists from "./pages/coupon/UserCouponLists";
import UserCouponCreate from "./pages/coupon/UserCouponCreate";
import UserCouponEdit from "./pages/coupon/UserCouponEdit";
import UserBadgeLists from "./pages/badge/UserBadgeLists";
import UserBadgeCreate from "./pages/badge/UserBadgeCreate";
import UserBadgeEdit from "./pages/badge/UserBadgeEdit";
function App() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    getHompageData()
      .then((res) => {
        console.log({ res });
      })
      .catch((err) => {
        if (err?.data?.statusCode === 401) {
          localStorage.removeItem("user");
          localStorage.removeItem("auth-token");
        }
      });
  }, []);
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <DashboardLayout>
                <Home />
              </DashboardLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/users"
          element={
            <RequireAuth>
              <DashboardLayout>
                <Users />
              </DashboardLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/users/:userId"
          element={
            <RequireAuth>
              <DashboardLayout>
                <UsersDetails />
              </DashboardLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/sitters"
          element={
            <RequireAuth>
              <DashboardLayout>
                <Sitters />
              </DashboardLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/sitters/:sitterId"
          element={
            <RequireAuth>
              <DashboardLayout>
                <SittersDetails />
              </DashboardLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/subscriptions"
          element={
            <RequireAuth>
              <DashboardLayout>
                <Subscriptions />
              </DashboardLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/appointments"
          element={
            <RequireAuth>
              <DashboardLayout>
                <Appointments />
              </DashboardLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/appointments/:appointmentId"
          element={
            <RequireAuth>
              <DashboardLayout>
                <AppointmentDetails />
              </DashboardLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/transactions"
          element={
            <RequireAuth>
              <DashboardLayout>
                <Transactions />
              </DashboardLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/transactions/:transactionId"
          element={
            <RequireAuth>
              <DashboardLayout>
                <TransactionDetails />
              </DashboardLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/user-subscription-lists"
          element={
            <RequireAuth>
              <DashboardLayout>
                <UserSubscriptionLists />
              </DashboardLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/user-coupon-lists"
          element={
            <RequireAuth>
              <DashboardLayout>
                <UserCouponLists/>
              </DashboardLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/user-coupon-create"
          element={
            <RequireAuth>
              <DashboardLayout>
                <UserCouponCreate />
              </DashboardLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/user-coupon-edit/:couponCode"
          element={
            <RequireAuth>
              <DashboardLayout>
                <UserCouponEdit/>
              </DashboardLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/user-badge-lists"
          element={
            <RequireAuth>
              <DashboardLayout>
                <UserBadgeLists/>
              </DashboardLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/user-badge-create"
          element={
            <RequireAuth>
              <DashboardLayout>
                <UserBadgeCreate />
              </DashboardLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/user-badge-edit/:badgeId"
          element={
            <RequireAuth>
              <DashboardLayout>
                <UserBadgeEdit/>
              </DashboardLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/user-application-version"
          element={
            <RequireAuth>
              <DashboardLayout>
                <UserApplicationVersion />
              </DashboardLayout>
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
