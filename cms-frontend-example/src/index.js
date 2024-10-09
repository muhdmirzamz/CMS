import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import Login from './routes/Login';
import Signup from './routes/Signup';
import Dashboard from './routes/Dashboard';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);
