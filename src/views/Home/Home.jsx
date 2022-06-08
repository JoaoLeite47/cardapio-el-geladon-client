import "./Home.css";
import PaletaLista from "../../components/PaletaLista/PaletaLista";
import Navbar from "../../components/Navbar/Navbar";
import AdicionaEditaPaletaModal from "components/AdicionaEditaPaletaModal/AdicionaEditaPaletaModal";
import { useState } from "react";
import { ActionMode } from "constants/index";
import DeletaPaletaModal from "components/DeletaPaletaModal/DeletaPaletaModal";
// import Modal from "components/Modal/Modal";

function Home() {
  const [paletaEditada, setPaletaEditada] = useState();

  const [canShowAdicionaPaletaModal, setCanShowAdicionaPaletaModal] =
    useState(false);

  const [paletasParaAdicionar, setPaletasParaAdicionar] = useState();

  const [paletaRemovida, setPaletaRemovida] = useState();

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
    setModoAtual(ActionMode.NORMAL);
  };
  return (
    <div className="Home">
      <Navbar
        mode={ModoAtual}
        createPaleta={() => setCanShowAdicionaPaletaModal(true)}
        updatePaleta={() => handleActions(ActionMode.ATUALIZAR)}
        deletePaleta={() => handleActions(ActionMode.DELETAR)}
      />
      <div className="Home__Container">
        <PaletaLista
          mode={ModoAtual}
          paletaCriada={paletasParaAdicionar}
          paletaEditada={paletaEditada}
          deletePaleta={handleDeletePaleta}
          updatePaleta={handleUpdatePaleta}
          paletaRemovida={paletaRemovida}
        />
        {canShowAdicionaPaletaModal && (
          <AdicionaEditaPaletaModal
            mode={ModoAtual}
            paletaToUpdate={PaletaParaEditar}
            onUpdatePaleta={(paleta) => setPaletaEditada(paleta)}
            closeModal={() => handleCloseModal()}
            oneCreatePaleta={(paleta) => setPaletasParaAdicionar(paleta)}
          />
        )}
        {PaletaParaDeletar && (
          <DeletaPaletaModal
            paletaParaDeletar={PaletaParaDeletar}
            closeModal={handleCloseModal}
            onDeletePaleta={(paleta) => setPaletaRemovida(paleta)}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
