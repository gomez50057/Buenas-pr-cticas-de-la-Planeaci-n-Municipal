import React, { useState, useMemo, useRef } from "react";
import { createRoot } from 'react-dom/client';
import { MuuriComponent, AutoScroller, useData } from "muuri-react";
import { Demo, Documents, BackgroundHome, AboutUs, SeccionBar, CenteredButton, Select, Input, Switch, CardContent, Foouter } from "./components";
import { datosBibliotecaDigital, useFilter } from "./utils";
import "./style.css";
import WOW from 'wow.js';
import 'animate.css/animate.min.css';

const wow = new WOW();
wow.init();

const rootElement = document.getElementById('app');
const root = createRoot(rootElement);

const App = () => {
  // Estado para el filtro de búsqueda
  const [filter, setFilter] = useState({ name: "", type: "" });
  // Estado para la clasificación
  const [sort, setSort] = useState({ value: "type", options: { descending: true }, });
  // Función de filtrado
  const filterFunction = useFilter(filter.name, filter.type);

  // Manejador de cambio de categoría
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFilter({ ...filter, type: category });
  };

  // Manejador de cambio de filtro por nombre
  const handleNameFilterChange = (e) => {
    setFilter({ ...filter, name: e.target.value });
  };

  // Manejador de cambio de clasificación
  const handleSortChange = (newSort) => {
    setSort({ value: newSort, options: { descending: true } });
  };

  // Renderizado de los hijos
  const children = useMemo(() =>
      datosBibliotecaDigital.cards.map(bookCard => (
        <BookCard
          key={bookCard.projectsIndex}
          name={bookCard.name}
          description={bookCard.description}
          municipio={bookCard.municipio}
          año={bookCard.año}
          ftSrc={bookCard.ftSrc}
          peSrc={bookCard.peSrc}
          projectsIndex={bookCard.projectsIndex}
        />
      )),
    []
  );

  // Referencia para el contenedor de desplazamiento
  const scrollElemRef = useRef();

  return (
    <div>
      <BackgroundHome />
      <AboutUs />
      <SeccionBar />
      <Demo>
        <Documents>
          {/* Entrada de texto para filtrar por nombre */}
          <Input onKeyUp={handleNameFilterChange} />
          {/* Selección de categoría */}
          <Select
            values={datosBibliotecaDigital.category_mun}
            onChange={handleCategoryChange}
            icon="&#xE164;"
          />
          {/* Selección de clasificación */}
          <Select
            values={["Ordenar Por", "A-Z", "Año"]}
            onChange={(e) => handleSortChange(e.target.value)}
            icon="&#xe8d5;"
          />
        </Documents>
        <Switch ref={scrollElemRef}>
          {/* Componente Muuri para la disposición de elementos */}
          <MuuriComponent
            dragFixed
            sort={sort.value}
            sortOptions={sort.options}
            filter={filterFunction}
            layoutDuration={300}
            layoutEasing={"ease-out"}
            dragAutoScroll={{
              sortDuringScroll: false,
              targets: [
                {
                  element: scrollElemRef,
                  axis: AutoScroller.AXIS_Y
                }
              ]
            }}
          >
            {/* Renderizado de los hijos */}
            {children}
          </MuuriComponent>
        </Switch>
      </Demo>
      {/* Botón centrado */}
      <CenteredButton link="http://tenemosunacuerdo.hidalgo.gob.mx/pdf/15SEP23_CONVOCATORIA.pdf" text="CONSULTA LAS BASES DE LA CONVOCATORIA 2023" />
      {/* Pie de página */}
      <Foouter />
    </div>
  );
};

// Componente para cada tarjeta de libro
const BookCard = props => {
  const { municipio, año, name } = props;
  const type = `${municipio[0]} ${municipio[1] || ""}`;
  // Uso de datos para filtrar y ordenar
  useData({ name, type, año });
  return <CardContent {...props} />;
};

// Renderizado de la aplicación en el elemento raíz
root.render(<App />);
