import { Api } from "helpers/Api";

const parseResponse = (res) => res.json();

const transformPaleta = (paleta) => {
  const [sabor, recheio] = paleta.sabor.split(" com ");

  return {
    ...paleta,
    id: paleta._id,
    titulo: paleta.sabor,
    sabor,
    ...(recheio && { recheio }),
    possuiRecheio: Boolean(recheio),
  };
};

const parseTransformLista = (res) =>
  parseResponse(res).then((paletas) => paletas.map(transformPaleta));

const parseTransformItem = (res) => parseResponse(res).then(transformPaleta);

export const PaletaService = {
  getLista: () =>
    fetch(Api.paletaLista(), {
      method: "GET",
    }).then(parseTransformLista),

  getById: (id) =>
    fetch(Api.paletaById(id), {
      method: "GET",
    }).then(parseTransformItem),

  create: (paleta) =>
    fetch(Api.createPaleta(), {
      method: "POST",
      body: JSON.stringify(paleta),
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    }).then(parseTransformItem),

  updateById: (id, paleta) =>
    fetch(Api.updatePaletaById(id), {
      method: "PUT",
      body: JSON.stringify(paleta), 
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(parseResponse),

  deleteById: (id) =>
    fetch(Api.deletePaletaById(id), {
      method: "DELETE",
    }).then(parseResponse),
};
