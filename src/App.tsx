import NavBar from "./components/NavBar";
import Features from "./components/FeaturesSection";
import Footer from "./components/Footer";
import { Link } from "react-router";

function App() {
  return (
    <>
      <div className="w-full h-[90vh] bg-gradient-to-b from-[#FEFEFE] from-10% to-[#A0D495] to-90% rounded-b-[30%]">
        <NavBar />
        <div className="grid md:grid-cols-2 grid-cols-1 md:h-[60%]">
          <div className="flex items-center justify-start flex-col gap-4 pt-[8vw] ">
            <div className="md:text-[2.5vw] md:leading-[2.5vw] text-2xl text-[#344634] font-bold w-[60%] md:text-left text-center">
              Don't worry teams Now its easy
            </div>
            <div className="w-[60%] xl:text-[18px] md:text-[16px] text-[18px] text-[#344634] md:text-left text-center">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi,
              ipsum omnis veritatis corporis fuga impedit dolor inventore
              laborum ut molestiae repudiandae, dolorem illum doloremque
              possimus quidem voluptatem velit necessitatibus harum modi
              nostrum! Ex placeat nostrum atque.
            </div>
            <div className="w-[60%] flex items-center md:justify-start justify-center">
              <Link to={"/dashboard"}>
              <button className="px-5 py-2 bg-[#FB6201] text-white rounded-2xl text-xl font-semibold cursor-pointer hover:bg-[#FB6201]/70 transition-all">
                Let's Start
              </button>              
              </Link>
            </div>
          </div>
          <div className="relative items-start justify-center md:flex hidden">
            <img src="TeamImage.png" className="h-[70%] object-cover" alt="" />
          </div>
        </div>
      </div>
      <div>
        <Features />
      </div>
      <Footer/>
    </>
  );
}

export default App;
