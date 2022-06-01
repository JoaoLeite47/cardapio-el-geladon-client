import "./PaletaListaItem.css";

function PaletaListaItem({
  paleta,
  quantidadeSelecionada,
  index,
  onRemove,
  onAdd,
  clickItem
}) {
  const badgeCounter = (canRender, index) =>
    Boolean(canRender) && (
      <span className="PaletaListaItem__badge"> {quantidadeSelecionada} </span>
    ); // função para renderizar o badge

  const removeButton = (canRender, index) =>
    Boolean(canRender) && (
      <button
        className="Acoes__remover"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(index);
        }}
      >
        Remover
      </button>
    ); // função para renderizar o botão de remover

  return (
    <>
      <div className="PaletaListaItem" onClick={() => clickItem(paleta.id)}>
        {badgeCounter(quantidadeSelecionada, index)}
        <div>
          <div className="PaletaListaItem__titulo">{paleta.titulo}</div>
          <div className="PaletaListaItem__preco">
            {paleta.preco.toFixed(2)}
          </div>
          <div className="PaletaListaItem__descricao">{paleta.descricao}</div>
          <div className="PaletaListaItem__acoes Acoes">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAdd(index);
              }}
              className={`Acoes__adicionar ${
                !quantidadeSelecionada && "Acoes__adicionar--preencher"
              }`}
            >
              Adicionar
            </button>
            {removeButton(quantidadeSelecionada, index)}
          </div>
        </div>
        <img
          className="PaletaListaItem__foto"
          src={paleta.foto}
          alt={paleta.sabor}
        />
      </div>
    </>
  );
}

export default PaletaListaItem;
