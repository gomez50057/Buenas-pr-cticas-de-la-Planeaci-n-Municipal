/* React */
import React, { useState, useMemo, useRef } from "react";
import { createRoot } from 'react-dom/client';

/* Muuri-react */
import { MuuriComponent, AutoScroller, useData } from "muuri-react";
/* Utils & components */
import { Demo, Documents, BackgroundHome, AboutUs, CenteredButton , Select, Input, Switch, CardContent, Foouter } from "./components";
import { datosBibliotecaDigital, useFilter } from "./utils";
/* Style */
import "./style.css";
/* animate */
import WOW from 'wow.js';
import 'animate.css/animate.min.css';

const wow = new WOW();
wow.init();

const rootElement = document.getElementById('app');
const root = createRoot(rootElement);

// App.
const App = () => {
  // Estado del filtro.
  const [filter, setFilter] = useState({
    name: "",
    type: ""
  });


  // Añadir un nuevo estado para la clasificación
  const [sort, setSort] = useState({
    value: "type",
    options: { descending: true },
  });



  // Método de filtrado.
  const filterFunction = useFilter(filter.name, filter.type, );

  // Función para manejar el cambio en la categoría
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFilter({ ...filter, type: category });
    // Restablecer la subcategoría cuando se cambia la categoría
  };





  // Restablecer la subcategoría cuando se cambia el filtro de nombre
  const handleNameFilterChange = (e) => {
    setFilter({ ...filter, name: e.target.value });
  };

  
  // Memorice a los children para mejorar su rendimiento.
  const children = useMemo(
    () =>
      datosBibliotecaDigital.cards.map(bookCard => (
        <BookCard
          key={bookCard.projectsIndex}
          name={bookCard.name}
          description={bookCard.description}
          municipio={bookCard.municipio}
          año={bookCard.año}
          pdfSrc={bookCard.pdfSrc}
          projectsIndex={bookCard.projectsIndex}
        />
      )),
    []
  );

  // Scroll container ref.
  const scrollElemRef = useRef();

  // Render.
  return (
    <div>
      <BackgroundHome></BackgroundHome>
      <AboutUs></AboutUs>
      <Demo>
        {/* Documents */}
        <Documents>
          {/* Name input */}
          {/* <Input onKeyUp={e => setFilter({ ...filter, name: e.target.value })} /> */}
          <Input onKeyUp={handleNameFilterChange} />
          {/* Categoría */}
          <Select
            values={datosBibliotecaDigital.category_mun}
            onChange={handleCategoryChange}
            icon="&#xE164;"
          />
          {/* A-Z, Año */}
          <Select
            values={["Ordenar Por", ...datosBibliotecaDigital.cardInfo]}
            onChange={(e) => {
              const newClassification = e.target.value;
              if (newClassification !== "default") {
                handleClassificationChange(newClassification);
              }
            }}
            icon="&#xe8d5;" 
          />
        </Documents>
        
        {/* Switch */}
        <Switch ref={scrollElemRef}>
          <MuuriComponent

            // dragEnabled
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
            {children}
          </MuuriComponent>
        </Switch>


      </Demo>

      <CenteredButton link="https://www.ejemplo.com" text="REVISA LAS BASES DE LA CONVOCATORIA"></CenteredButton>

      <Foouter></Foouter>
    </div>
  );
};

const BookCard = props => {
  const { municipio, año, name } = props;
  // Combina los tipos en un solo string (si hay dos tipos)
  const type = `${municipio[0]} ${municipio[1] || ""}`;
  // Estos datos se utilizarán para ordenar y filtrar.
  useData({ name, type, año });
  // Renderiza el componente `CardContent` y pasa todas las propiedades a este componente hijo
  return <CardContent {...props} />;
};

root.render(<App />);