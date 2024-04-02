import { Link } from "react-router-dom";
import CardCategori from "../components/Card/CardCategori";
import CardCourse from "../components/Card/CardCourse";

const Home = () => {
  return (
    <>
      <div className="mx-auto flex flex-col lg:flex-row bg-darkblue relative">
        <div className="lg:w-[60%] relative">
          <img
            src="/people_dasboard.png"
            className="hidden w-full lg:w-full lg:block"
            alt="People Dashboard"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-darkblue via-white to-transparent opacity-80"></div>
        </div>
        <div className="flex container justify-center p-4 lg:w-[40%]">
          <div className="flex flex-col justify-center gap-4">
            <div className="flex flex-col justify-center font-Montserrat font-bold lg:text-2xl text-white gap-3">
              <h1 className="text-[24px] font-bold">
                Belajar <br /> dari Praktisi Terbaik!
              </h1>
            </div>
            <Link
              to="/class"
              className="btn bg-white text-darkblue font-Montserrat font-bold text-base rounded-[10px] py-2 w-[100%]"
            >
              IKUTI KELAS
            </Link>
          </div>
        </div>
      </div>

      <CardCategori />
      <CardCourse />
    </>
  );
};

export default Home;
