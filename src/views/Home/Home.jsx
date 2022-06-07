import "./Home.css";
import PaletaLista from "../../components/PaletaLista/PaletaLista";
import Navbar from "../../components/Navbar/Navbar";
import AdicionaEditaPaletaModal from "components/AdicionaEditaPaletaModal/AdicionaEditaPaletaModal";
import { useState } from "react";
import { ActionMode } from "constants/index";
import Modal from "components/Modal/Modal";

function Home() {
  const [canShowAdicionaPaletaModal, setCanShowAdicionaPaletaModal] =
    useState(false);

  const [paletasParaAdicionar, setPaletasParaAdicionar] = useState();

  const [ModoAtual, setModoAtual] = useState(ActionMode.NORMAL);

  const handleActions = (action) => {
    const novaAcao = ModoAtual === action ? ActionMode.NORMAL : action;
    setModoAtual(novaAcao);
  };

  const [PaletaParaEditar, setPaletaParaEditar] = useState();

  const [PaletaParaDeletar, setPaletaParaDeletar] = useState();

  const handleDeletePaleta = (paletaToDelete) => {
    setPaletaParaDeletar(paletaToDelete);
  };

  const handleUpdatePaleta = (paletaToUpdate) => {
    setPaletaParaEditar(paletaToUpdate);
    setCanShowAdicionaPaletaModal(true);
  };

  const handleCloseModal = () => {
    setCanShowAdicionaPaletaModal(false);
    setPaletasParaAdicionar();
    setPaletaParaDeletar();
    setPaletaParaEditar();
  };
  return (
    <div className="Home">
      <Navbar
        mode={ModoAtual}
        createPaleta={() => setCanShowAdicionaPaletaModal(true)}
        updatePaleta={() => handleActions(ActionMode.ATUALIZAR)}
      />
      <div className="Home__Container">
        <PaletaLista
          mode={ModoAtual}
          paletaCriada={paletasParaAdicionar}
          deletePaleta={handleDeletePaleta}
          updatePaleta={handleUpdatePaleta}
        />
        {canShowAdicionaPaletaModal && (
          <AdicionaEditaPaletaModal
            mode={ModoAtual}
            paletaToUpdate={PaletaParaEditar}
            closeModal={() => handleCloseModal()}
            oneCreatePaleta={(paleta) => setPaletasParaAdicionar(paleta)}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
