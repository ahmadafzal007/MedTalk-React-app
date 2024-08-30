import "../App.css";
import ParticlesComponent from "../components/Landing/particles";
import Banner from "../components/Landing/Banner";
import Header from "../components/Landing/Navbar";
function Welcome() {
  return (
    <div className="App">
      <ParticlesComponent id="particles" />

      <div className="w-full h-screen bg-banner-bg bg-no-repeat bg-center bg-cover relative overflow-hidden">
        <div className=" mx-auto text-white">
          {/* Header */}
          <Header />
          <div className="  md:ml-20 ">
            {/* Banner */}
            <Banner />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
