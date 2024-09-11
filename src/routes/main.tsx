import * as React from "react";
import { useEffect } from "react";
import {
  BookingPage,
  ConfirmationPage,
  LandingPage,
  NotFoundPage,
} from "../features/Public";
import { SignInPage, SignUpPage } from "../features/Authentication";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { Footer, Navbar } from "~src/components";

function AuthenticationLayout() {
  const { user } = useAuthContext();
  const [navigation, setNavigation] = React.useState([
    { name: "Home", href: "/", current: true },
    { name: "Booking", href: "/booking", current: false },
    { name: "Sign In", href: "/sign-in", current: false },
  ]);
  useEffect(() => {
    const updatedNavItems = navigation.map((item) => ({
      ...item,
      current: item.href === location.pathname,
    }));
    setNavigation(updatedNavItems);
  }, [location, navigation]);
  return (
    <>
      {user !== null && <Navbar navigation={navigation} />}
      <Outlet />
    </>
  );
}

function NonAuthenticatedRoutes() {
  const [navigation, setNavigation] = React.useState([
    { name: "Home", href: "/", current: true },
    { name: "Booking", href: "/booking", current: false },
    { name: "Sign In", href: "/sign-in", current: false },
  ]);
  useEffect(() => {
    const updatedNavItems = navigation.map((item) => ({
      ...item,
      current: item.href === location.pathname,
    }));
    setNavigation(updatedNavItems);
  }, [location, navigation]);
  return (
    <>
      <Navbar navigation={navigation} />
      <Outlet />
      <Footer />
    </>
  );
}

function ProtectedRoute({ element }: { element: React.ReactElement }) {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [user, navigate]);

  return element;
}

export const mainRoutes = [
  {
    path: "/",
    element: <NonAuthenticatedRoutes />,
    children: [
      {
        element: <LandingPage />,
        index: true,
      },
      {
        path: "/booking",
        element: <BookingPage />,
      },
      {
        path: "/confirmation",
        element: <ConfirmationPage />,
      },
      {
        path: "/sign-in",
        element: <SignInPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
    ],
  },
  {
    element: <AuthenticationLayout />,
    children: [
      {
        path: "/dashboard",
        element: <div className="">Dashboard</div>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
