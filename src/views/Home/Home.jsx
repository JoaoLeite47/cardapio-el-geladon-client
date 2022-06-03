import "./Home.css";
import PaletaLista from "../../components/PaletaLista/PaletaLista";
import Navbar from "../../components/Navbar/Navbar";
import AdicionaEditaPaletaModal from "components/AdicionaEditaPaletaModal/AdicionaEditaPaletaModal";
import { useState } from "react";

function Home() {
  const [canShowAdicionaPaletaModal, setCanShowAdicionaPaletaModal] =
    useState(false);

  const [paletasParaAdicionar, setPaletasParaAdicionar] = useState();

  return (
    <div className="Home">
      <Navbar createPaleta={() => setCanShowAdicionaPaletaModal(true)} />
      <div className="Home__Container">
        <PaletaLista paletaCriada={paletasParaAdicionar} />
        {canShowAdicionaPaletaModal && 
          <AdicionaEditaPaletaModal
            closeModal={() => setCanShowAdicionaPaletaModal(false)}
            oneCreatePaleta={(paleta) => setPaletasParaAdicionar(paleta)}
          />
        }
      </div>
    </div>
  );
}

export default Home;
