import "./Home.css";
import PaletaLista from "../../components/PaletaLista/PaletaLista.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx"


function Home() {
  return (
    <div className="Home">
    <Navbar />
      <div className="Home__Container">
        {" "}
        <PaletaLista />{" "}
      </div>
    </div>
  );
}

export default Home;
