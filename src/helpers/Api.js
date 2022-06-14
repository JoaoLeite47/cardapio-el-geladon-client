const PaletaContext = {
  paletaEndpoint: () => `${Api.baseUrl}/paletas`,
  paletaLista: () => `${PaletaContext.paletaEndpoint()}/all-paletas`,
  paletaById: (id) => `${PaletaContext.paletaEndpoint()}/paleta/${id}`,
  createPaleta: () => `${PaletaContext.paletaEndpoint()}/create`,
  updatePaletaById: (id) => `${PaletaContext.paletaEndpoint()}/update/${id}`,
  deletePaletaById: (id) => `${PaletaContext.paletaEndpoint()}/delete/${id}`,
};

export const Api = {
  baseUrl: "https://elgeladonbackend.herokuapp.com",
  ...PaletaContext,
};
