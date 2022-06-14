import "./AdicionaEditaPaletaModal.css";
import { useState, useEffect } from "react";
import Modal from "components/Modal/Modal";
import { PaletaService } from "services/PaletaService";
import { ActionMode } from "constants/index";

function AdicionaEditaPaletaModal({
  closeModal,
  onCreatePaleta,
  mode,
  paletaToUpdate,
  onUpdatePaleta,
}) {
  const form = {
    preco: paletaToUpdate?.preco ?? "",
    sabor: paletaToUpdate?.sabor ?? "",
    recheio: paletaToUpdate?.recheio ?? "",
    descricao: paletaToUpdate?.descricao ?? "",
    foto: paletaToUpdate?.foto ?? "",
  };
  const [state, setState] = useState(form);

  const handleChange = (e, name) => {
    setState({ ...state, [name]: e.target.value });
  };

  const [canDisable, setCanDisable] = useState(true);

  const canDisableSendButton = () => {
    const res = !Boolean(
      state.descricao.length &&
        state.foto.length &&
        state.sabor.length &&
        String(state.preco).length
    );
    setCanDisable(res);
  };

  useEffect(() => {
    canDisableSendButton();
  });

  const handleSand = async () => {
    const renomeiaCaminhoFoto = (fotoPath) => fotoPath.split(/\\|\//).pop(); // analisa o tipo de "barra" que o arquivo está sendo salvo

    const { sabor, recheio, descricao, preco, foto } = state;

    const titulo = sabor + (recheio && " com " + recheio);

    const paleta = {
      ...(paletaToUpdate && { _id: paletaToUpdate.id }),
      sabor: titulo,
      descricao,
      preco,
      foto: `assets/images/${renomeiaCaminhoFoto(foto)}`,
    };

    const serviceCall ={
      [ActionMode.NORMAL]: () => PaletaService.create(paleta),
      [ActionMode.ATUALIZAR]: () =>
        PaletaService.updateById(paletaToUpdate?.id, paleta),
    };

    const res = await serviceCall[mode]();

    const actionResponse = {
      [ActionMode.NORMAL]: () => onCreatePaleta(res),
      [ActionMode.ATUALIZAR]: () => onUpdatePaleta(res),
    };

    actionResponse[mode]();

    const reset = {
      preco: "",
      sabor: "",
      recheio: "",
      descricao: "",
      foto: "",
    };

    setState(reset);

    closeModal();
  };

  return (
    <Modal closeModal={closeModal}>
      <div className="AdicionaPaletaModal">
        <form autoComplete="off">
          <h2>
            {" "}
            {ActionMode.ATUALIZAR === mode ? "Atualizar" : "Adicionar ao"}{" "}
            Cardápio{" "}
          </h2>
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
              required
              onChange={(e) => handleChange(e, "foto")}
            />
          </div>
          <button
            type="button"
            disabled={canDisable}
            onClick={handleSand}
            className="AdicionaPaletaModal__enviar"
          >
            {ActionMode.NORMAL === mode ? "Enviar" : "Atualizar"}
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AdicionaEditaPaletaModal;
