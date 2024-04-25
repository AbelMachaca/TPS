import { useState, useEffect, useRef } from "react";

export default function SelectAdrres() {
  const url = "https://apis.datos.gob.ar/georef/api";
  const [provincias, setProvincias] = useState([]);
  const [idProvincias, setIdProvincias] = useState("");
  const [municipios, setMunicipios] = useState([]);
  const selectProvincia = useRef();

  const stopSend = (e) => {
    e.preventDefault();
    console.log("Detuve el submit");
  };

  const updateIdProvincia = () => {
    setIdProvincias(selectProvincia.current.value);
  };

  useEffect(() => {
    const getProvincias = async () => {
      const responde = await fetch(`${url}/provincias?orden=nombre`);
      const prov = await responde.json();
      console.log(prov.provincias);
      
      setProvincias(prov.provincias);
    };

    getProvincias();
  }, []);

  useEffect(() => {
    const getMunicipios = async () => {
      const responde = await fetch(
        `${url}/municipios?provincia=${idProvincias}`
      );
      const muni = await responde.json();
      console.log(muni.municipios);
      setMunicipios(muni.municipios);
    };
    if (idProvincias != "") {
      getMunicipios();
    }
  }, [idProvincias]);

  return (
    <div>
      {provincias.length >= 1 ? (
        <form action="" method="" onSubmit={stopSend}>
          <div>
            <label htmlFor="provincias">Provincias</label>
            <select
              name="provincias"
              id="provincias"
              ref={selectProvincia}
              onChange={updateIdProvincia}
            >
              <option value="" disabled selected>Elegir</option>
              {provincias.map(({ nombre, id }, i) => {
                return (
                  <option key={`${i}+${nombre}`} value={id}>
                    {nombre}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="municipios">Municipios</label>
            <select name="municipios" id="municipios">
              {municipios.length > 0 &&
                municipios.map((municipio, i) => {
                  return (
                    <option
                      key={`${i}+${municipio.nombre}`}
                      value={municipio.id}
                    >
                      {municipio.nombre}
                    </option>
                  );
                })}
            </select>
          </div>

          <button>registro</button>
        </form>
      ) : (
        <h1>Cargando</h1>
      )}
    </div>
  );
}
