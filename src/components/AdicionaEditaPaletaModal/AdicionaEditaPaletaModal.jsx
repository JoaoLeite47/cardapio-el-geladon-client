import "./AdicionaEditaPaletaModal.css";
import { useState, useEffect } from "react";
import Modal from "components/Modal/Modal";
import { PaletaService } from "services/PaletaService";

function AdicionaEditaPaletaModal({ closeModal, oneCreatePaleta }) {
  const form = {
    preco: "",
    sabor: "",
    recheio: "",
    descricao: "",
    foto: "",
  };
  const [state, setState] = useState(form);

  const handleChange = (e, name) => {
    setState({ ...state, [name]: e.target.value });
  };

  const [canDisable, setCanDisable] = useState(true);

  const canDisableSendButton = () => {
    const res = !Boolean(
      state.foto.length &&
        state.foto.length &&
        state.sabor.length &&
        state.preco.length
    );
    setCanDisable(res);
  };

  useEffect(() => {
    canDisableSendButton();
  });

  const createPaleta = async () => {
    const renomeiaCaminhoFoto = (fotoPath) => fotoPath.split("\\").pop();

    const { sabor, recheio, descricao, preco, foto } = state;

    const titulo = sabor + (recheio && " com " + recheio);

    const paleta = {
      sabor: titulo,
      descricao,
      preco,
      foto: `assets/images/${renomeiaCaminhoFoto(foto)}`,
    };

    const res = await PaletaService.create(paleta);

    oneCreatePaleta(res);

    closeModal();
  };

  return (
    <Modal closeModal={closeModal}>
      <div className="AdicionaPaletaModal">
        <form autoComplete="off">
          <h2>Adicionar ao Cardápio</h2>
          <div>
            <label className="AdicionarPaletaModal__Text" htmlFor="preco">
              Preço:
            </label>
            <input
              type="text"
              id="preco"
              placeholder="R$ 10,00"
              value={state.preco}
              required
              onChange={(e) => handleChange(e, "preco")}
            />
          </div>
          <div>
            <label className="AdicionaPaletaModal__Text" htmlFor="sabor">
              Sabor:
            </label>
            <input
              type="sabor"
              id="preco"
              placeholder="Maracujá"
              value={state.sabor}
              required
              onChange={(e) => handleChange(e, "sabor")}
            />
          </div>
          <div>
            <label className="AdicionaPaletaModal__Text" htmlFor="recheio">
              Recheio:
            </label>
            <input
              type="text"
              id="recheio"
              placeholder="Leite Condensado"
              value={state.recheio}
              onChange={(e) => handleChange(e, "recheio")}
            />
          </div>
          <div>
            <label className="AdicionaPaletaModal__Text" htmlFor="descricao">
              Descrição:
            </label>
            <input
              type="text"
              id="descricao"
              placeholder="Detalhe o produto!"
              value={state.descricao}
              required
              onChange={(e) => handleChange(e, "descricao")}
            />
          </div>
          <div>
            <label
              className="AdicionaPaletaModal__Text AdicionaPaletaModal__foto-label"
              htmlFor="foto"
            >
              {!state.foto.length ? "Selecionar Imagem" : state.foto}
            </label>

            <input
              className="AdicionaPaletaModal__foto"
              type="file"
              id="foto"
              accept="image/png, image/jpeg, image/jpg, image/gif, "
              value={state.foto}
              required
              onChange={(e) => handleChange(e, "foto")}
            />
          </div>
          <button
            type="button"
            disabled={canDisable}
            onClick={createPaleta}
            className="AdicionaPaletaModal__enviar"
          >
            Enviar
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AdicionaEditaPaletaModal;
