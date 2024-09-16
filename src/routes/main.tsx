import * as React from "react";
import { useEffect, useMemo } from "react";
import {
  BookingPage,
  ConfirmationPage,
  LandingPage,
  NotFoundPage,
  EventTypeListPage,
} from "../features/Public";
import { SignInPage, SignUpPage } from "../features/Authentication";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { Footer, Navbar } from "~src/components";
import { DashboardPage, CreateEventTypesPage } from "~src/features/User";

function AuthenticationLayout() {
  const { user } = useAuthContext();
  const [navigation, setNavigation] = React.useState([
    { name: "Dashboard", href: "/dashboard", current: true },
    { name: "Create Event", href: "/create-event-types", current: false },
    { name: "Logout", href: "/logout", current: false },
  ]);
  const updatedNavItems = useMemo(() => {
    return navigation.map((item) => ({
      ...item,
      current: item.href === location.pathname,
    }));
  }, [location.pathname, navigation]);

  useEffect(() => {
    setNavigation(updatedNavItems);
  }, []);

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
    { name: "Login", href: "/sign-in", current: false },
  ]);
  const updatedNavItems = useMemo(() => {
    return navigation.map((item) => ({
      ...item,
      current: item.href === location.pathname,
    }));
  }, [location.pathname, navigation]);

  useEffect(() => {
    setNavigation(updatedNavItems);
  }, []);
  
  return (
    <div className="flex flex-col h-screen">
      <Navbar navigation={navigation} />
      <Outlet />
      <Footer />
    </div>
  );
}

function ProtectedRoute({ element }: { element: React.ReactElement }) {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [user]);

  return element;
}

export const mainRoutes = [
  {
    path: "/",
    element: <NonAuthenticatedRoutes />,
    children: [
      {
        element: <EventTypeListPage />,
        index: true,
      },
      {
        path: "/book/:eventTypeId",
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
        element: <ProtectedRoute element={<DashboardPage />} />,
      },
      {
        path: "/create-event-types",
        element: <ProtectedRoute element={<CreateEventTypesPage />} />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
