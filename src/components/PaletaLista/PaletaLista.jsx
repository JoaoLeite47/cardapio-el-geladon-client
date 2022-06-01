import "./PaletaLista.css";
import React, { useState, useEffect } from "react";
import PaletaListaItem from "../PaletaListaItem/PaletaListaItem.jsx";
import { PaletaService } from "services/PaletaService.js";
import PaletaDetalhesModal from "../PaletaDetalhesModal/PaletaDetalhesModal.jsx";

function PaletaLista() {
  // lista as paletas
  const [paletas, setPaletas] = useState([]); // array de paletas

  const [paletaSelecionada, setPaletaSelecionada] = useState({}); // modificar a quatidade de paletas

  const [paletaModal, setPaletaModal] = useState(false); // modal da paleta

  const adicionarItem = (paletaIndex) => {
    const paleta = {
      [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) + 1,
    }; // adicionar um item
    setPaletaSelecionada({ ...paletaSelecionada, ...paleta }); // atualizar o estado
  }; // função para mudar o estado da paleta

  const removerItem = (paletaIndex) => {
    const paleta = {
      [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) - 1,
    }; // adicionar um item
    setPaletaSelecionada({ ...paletaSelecionada, ...paleta }); // atualizar o estado
  }; // função para mudar o estado da paleta

  const getLista = async () => {
    const res = await PaletaService.getLista();
    setPaletas(res);
  };

  useEffect(() => {
    getLista();
  }, []);

  return (
    <div className="PaletaLista">
      {paletas.map((paleta, index) => (
        <PaletaListaItem
          paleta={paleta}
          key={`PaletaListaItem-${index}`}
          quantidadeSelecionada={paletaSelecionada[index]}
          index={index}
          onRemove={(index) => removerItem(index)}
          onAdd={(index) => adicionarItem(index)}
          clickItem={(paletaId) => setPaletaModal(paleta)}
        />
      ))}
      {paletaModal && (
        <PaletaDetalhesModal
          paleta={paletaModal}
          closeModal={() => setPaletaModal(false)} // fechar o modal de paletas
        />
      )}
    </div>
  );
}

export default PaletaLista;
