import Header from "../components/Header";
import Welcome from "../components/Welcome";
import Events from "../components/Events";

const Home = () => {

    return (
        <div className="m-auto max-w-[50rem]">
            <Header/>
            <Welcome/>
            <Events/>
            <div className="flex justify-center mt-[3rem]">
                <button className="border border-black px-4 rounded">Create account</button>
            </div>
        </div>
    );
}
 
export default Home;