import * as React from "react";
import {
  BookingPage,
  ConfirmationPage,
  LandingPage,
  NotFoundPage,
} from "../features/Public";
import { SignInPage, SignUpPage } from "../features/Authentication";

export const mainRoutes = [
  {
    path: "/",
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
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
