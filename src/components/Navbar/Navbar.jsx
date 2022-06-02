import "./Navbar.css";
import logo from "../../assets/logo.svg";
import { IoIosApps } from "react-icons/io";
import { IoBagAdd } from "react-icons/io5";

function Navbar({ createPaleta }) {
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
            className="Opcoes__Paleta Paleta"
            onClick={() => createPaleta()}
          >
            <IoIosApps
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
