import LoginForm from "../components/LoginForm";
import LightRays from "../components/ui/LightRays";
import "../styles/ketsiyo.css";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center md:px-20 px-0">
      {/* MAIN FLEX CONTAINER */}
      <div className="flex flex-col md:flex-row w-full items-center justify-center relative">
        <div className="absolute inset-0 top-[12%]  min-h-screen rounded-3xl md:hidden block">
          <LightRays
            raysOrigin="top-right"
            rayAngle={150}
            raysColor="#56ADFF"
            raysSpeed={0.35}
            lightSpread={2.15}
            rayLength={4.25}
            fadeDistance={3.2}
            saturation={1}
            pulsating={false}
            followMouse={true}
            mouseInfluence={0.02}
            noiseAmount={0.08}
            distortion={0.04}
          />
        </div>
        {/* TOP (MOBILE) / LEFT (DESKTOP): VIDEO */}
        <div className="relative w-full md:flex-1 flex justify-center md:mt-20 mt-0 z-10">
          <div
            className="
              overflow-hidden
              shadow-2xl
              w-[100%] h-[210px]
              rounded-br-[100px]
              md:rounded-xl
              md:w-[750px] md:h-[422px]
            "
          >
            <video
              src="/videos/Dashboard-final.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Text overlay – desktop only */}
            <div className="hidden md:block absolute -top-28 left-[20%] z-10 text-white">
              <h1
                className="text-6xl leading-tight"
                style={{ fontFamily: "Ketsiyo" }}
              >
                Clinch
              </h1>
              <h1
                className="text-6xl leading-tight ml-32"
                style={{ fontFamily: "Ketsiyo" }}
              >
                the Star
              </h1>
            </div>
          </div>
        </div>

        {/* BOTTOM (MOBILE) / RIGHT (DESKTOP): FORM */}
        <div className="w-full md:flex-1 flex justify-center -mt-8 md:mt-0">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
