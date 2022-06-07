import "./PaletaLista.css";
import React, { useState, useEffect, useCallback } from "react";
import PaletaListaItem from "../PaletaListaItem/PaletaListaItem.jsx";
import { PaletaService } from "services/PaletaService.js";
import PaletaDetalhesModal from "../PaletaDetalhesModal/PaletaDetalhesModal.jsx";
import { ActionMode } from "constants/index";

function PaletaLista({
  paletaCriada,
  mode,
  updatePaleta,
  deletePaleta,
  paletaEditada,
}) {
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
    // função para buscar as paletas
    const res = await PaletaService.getLista();
    setPaletas(res);
  };

  useEffect(() => {
    // função para buscar as paletas
    getLista();
  }, [paletaEditada]);

  const getPaletaById = async (paletaId) => {
    //define o estado que o elemento estara com base em hooks anteriores
    const response = await PaletaService.getById(paletaId);

    const mapper = {
      [ActionMode.NORMAL]: () => setPaletaModal(response),
      [ActionMode.ATUALIZAR]: () => updatePaleta(response),
      [ActionMode.DELETAR]: () => deletePaleta(response),
    };

    mapper[mode](); // chama a função que define o estado
  };

  const adicionaPaletaNaLista = useCallback(
    // função para adicionar a paleta na lista
    (paleta) => {
      const lista = [...paletas, paleta]; // adiciona a paleta na lista
      setPaletas(lista);
    },
    [paletas]
  );

  useEffect(() => {
    if (
      paletaCriada &&
      !paletas.map(({ id }) => id).includes(paletaCriada.id)
    ) {
      adicionaPaletaNaLista(paletaCriada);
    }
  }, [adicionaPaletaNaLista, paletaCriada, paletas]);

  useEffect(() => {
    getLista();
  }, []);

  return (
    <div className="PaletaLista">
      {paletas.map((paleta, index) => (
        <PaletaListaItem
          mode={mode}
          paleta={paleta}
          key={`PaletaListaItem-${index}`}
          quantidadeSelecionada={paletaSelecionada[index]}
          index={index}
          onRemove={(index) => removerItem(index)}
          onAdd={(index) => adicionarItem(index)}
          clickItem={(paletaId) => getPaletaById(paletaId)}
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
