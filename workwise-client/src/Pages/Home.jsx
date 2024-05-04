import Banner from "../Components/Banner";
import Categories from "../Components/Categories";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className="my-20">
                <Categories></Categories>
            </div>
        </div>
    );
};

export default Home;