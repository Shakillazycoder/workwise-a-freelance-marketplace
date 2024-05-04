import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddJob from "../Pages/JobRelatedPages/AddJob";
import PostedJobs from "../Pages/JobRelatedPages/PostedJobs";
import MyBids from "../Pages/JobRelatedPages/MyBids";
import BidRequests from "../Pages/JobRelatedPages/BidRequests";
import JobDetails from "../Pages/JobRelatedPages/JobDetails";
import UpdateJob from "../Pages/JobRelatedPages/UpdateJob";
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: "/",
            element: <Home></Home>,
          },
          {
            path: "/login",
            element: <Login></Login>,
          },
          {
            path: "/register",
            element: <Register></Register>,
          },
          {
            path: "/addJob",
            element: <AddJob></AddJob>,
          },
          {
            path: "/postJob",
            element: <PostedJobs></PostedJobs>,
          },
          {
            path: "/bids",
            element: <MyBids></MyBids>,
          },
          {
            path: "/bidRequest",
            element: <BidRequests></BidRequests>,
          },
          {
            path: "/jobDetails/:id",
            element: <JobDetails></JobDetails>,
            loader: ({params}) => fetch(`http://localhost:3000/jobs/${params.id}`)
          },
          {
            path: "/UpdateJob/:id",
            element: <UpdateJob></UpdateJob>,
            loader: ({params}) => fetch(`http://localhost:3000/jobs/${params.id}`)
          }
      ]
    },
  ]);

  export default router;