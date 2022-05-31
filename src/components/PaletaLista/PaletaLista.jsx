import "./PaletaLista.css";
import React, { useState, useEffect } from "react";
import PaletaListaItem from "../PaletaListaItem/PaletaListaItem.jsx";
import { PaletaService } from "services/PaletaService.js";

function PaletaLista() {
  // lista as paletas
  const [paletas, setPaletas] = useState([]);

  const [paletaSelecionada, setPaletaSelecionada] = useState({}); // modificar a quatidade de paletas

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
        />
      ))}
    </div>
  );
}

export default PaletaLista;
