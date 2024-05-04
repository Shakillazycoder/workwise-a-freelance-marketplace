import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Main = () => {
  return (
    <div>
      <div className="container px-4 mx-auto">
        <div className="p-8">
          <Header></Header>
        </div>
        <div className="min-h-[55vh]">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Main;
