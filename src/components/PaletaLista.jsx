import "./PaletaLista.css";
import React, { useState } from "react";
import { paletas } from "../mocks/paletas";

function PaletaLista() {
  // lista as paletas
  const [paletaSelecionada, setPaletaSelecionada] = useState({}); // modificar a quatidade de paletas
  const adicionarItem = (paletaIndex) => {
    const paleta = {
      [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) + 1,
    }; // adicionar um item
    setPaletaSelecionada({ ...paletaSelecionada, ...paleta }); // atualizar o estado
  }; // função para mudar o estado da paleta

  return (
    <div className="PaletaLista">
      {paletas.map((paleta, index) => (
        <div className="PaletaListaItem" key={`PaletaListaItem-${index}`}>
            <span className="PaletaListaItem__badge"> {paletaSelecionada[index] || 0} </span>
          <div>
            <div className="PaletaListaItem__titulo">{paleta.titulo}</div>
            <div className="PaletaListaItem__preco">
              {paleta.preco.toFixed(2)}
            </div>
            <div className="PaletaListaItem__descricao">{paleta.descricao}</div>
            <div className="PaletaListaItem__acoes Acoes">
              <button onClick={() => adicionarItem(index)} className="Acoes__adicionar Acoes__adicionar--preencher">
                Adicionar
              </button>
            </div>
          </div>
          <img
            className="PaletaListaItem__foto"
            src={paleta.foto}
            alt={paleta.sabor}
          />
        </div>
      ))}
    </div>
  );
}

export default PaletaLista;
