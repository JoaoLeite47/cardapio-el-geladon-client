import "./Navbar.css";
import logo from "../../assets/logo.svg";
import { CgAddR } from "react-icons/cg";
import { IoBagAdd } from "react-icons/io5";
import { FiShuffle } from "react-icons/fi";
import { MdDeleteSweep } from "react-icons/md";
import { ActionMode } from "constants/index";

function Navbar({ createPaleta, updatePaleta, mode, deletePaleta }) {
  return (
    <div className="Home__header Header">
      <div className="row">
        <div className="Header__logo Logo">
          <img
            src={logo}
            width="70px"
            alt="Logo El Geladon"
            className="Logo__icone"
          />
          <span className="Logo__titulo"> El Geladon </span>
        </div>
        <div className="Header__opcoes Opcoes">

          <button
            type="button"
            className={`Opcoes__paleta Paleta ${
              mode === ActionMode.ATUALIZAR && "Paleta--ativa"
            }`}
            onClick={() => updatePaleta()}
          >
            <FiShuffle
              size="2.5em"
              className="Paleta__icone"
              alt="Editar Paleta"
            />
          </button>

          <button
            type="button"
            className={`Opcoes__paleta Paleta ${
              mode === ActionMode.DELETAR && "Paleta--deletar"
            }`}
            onClick={() => deletePaleta()}
          >
            <MdDeleteSweep
              size="3.2em"
              className="Paleta__icone"
              alt="Deletar Paleta"
            />
          </button>

          <button
            type="button"
            className="Opcoes__Paleta Paleta"
            onClick={() => createPaleta()}
          >
            <CgAddR
              size="3em"
              className="Paleta__icone"
              alt="Adicionar Paleta"
            />
          </button>

          <div className="Opcoes__sacola Sacola">
            <IoBagAdd
              size="2.5em"
              className="Sacola__icone"
              alt="Sacola de compras"
            />

          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
