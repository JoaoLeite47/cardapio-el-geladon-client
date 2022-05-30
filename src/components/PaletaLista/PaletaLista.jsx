import "./PaletaLista.css";
import React, { useState } from "react";
import { paletas } from "mocks/paletas.js";
import PaletaListaItem from "../PaletaListaItem/PaletaListaItem.jsx";

function PaletaLista() {
  // lista as paletas
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
