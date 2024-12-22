import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import Login from './routes/Login';
import Signup from './routes/Signup';
import Dashboard from './routes/Dashboard';
import CreateBlogPost from './routes/CreateBlogPost';
import BlogPostDetailView from './routes/BlogPostDetailView';

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
  {
    path: "/create-blog-post",
    element: <CreateBlogPost />,
  },
  {
    path: "/blog-post-detail-view/:id",
    element: <BlogPostDetailView />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);
