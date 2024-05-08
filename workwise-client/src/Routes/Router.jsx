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
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import AllJobs from "../Pages/JobRelatedPages/AllJobs";
  
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
            element: <PrivateRoutes><AddJob></AddJob></PrivateRoutes>,
          },
          {
            path: "/postJob",
            element: <PrivateRoutes><PostedJobs></PostedJobs></PrivateRoutes>,
          },
          {
            path: "/bids",
            element: <PrivateRoutes><MyBids></MyBids></PrivateRoutes>,
          },
          {
            path: "/bidRequest",
            element: <PrivateRoutes><BidRequests></BidRequests></PrivateRoutes>,
          },
          {
            path: "/jobDetails/:id",
            element: <PrivateRoutes><JobDetails></JobDetails></PrivateRoutes>,
            loader: ({params}) => fetch(`https://workwise-server.vercel.app/jobs/${params.id}`)
          },
          {
            path: "/UpdateJob/:id",
            element: <PrivateRoutes><UpdateJob></UpdateJob></PrivateRoutes>,
            loader: ({params}) => fetch(`https://workwise-server.vercel.app/jobs/${params.id}`)
          },
          {
            path: "/allJobs",
            element: <AllJobs/>,
          }
      ]
    },
  ]);

  export default router;