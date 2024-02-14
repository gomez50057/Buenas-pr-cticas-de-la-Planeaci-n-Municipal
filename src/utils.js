import { useCallback } from "react";

export function useFilter(name, type) {
  // Normalize 'name', 'type', to lowercase or set them to an empty string if they're null or undefined.
  // This ensures consistent comparison and avoids potential errors with toLowerCase().
  name = (name ?? '').toLowerCase();
  type = (type ?? '').toLowerCase();

  return useCallback(
    function (data) {
      const isNameMatch = !name || data.name.toLowerCase().includes(name);
      const isTypeMatch = type === 'categorías' || data.type.includes(type);
      return isNameMatch && isTypeMatch;
    },
    [name, type]
  );
}


// Lista de libros
export const datosBibliotecaDigital = {
  cardInfo: ["A-Z", "Año"],

  cardInfo2: ["Especial", "Municipal", "Sectorial", "Estatal", "Institucional"],
  category_mun: [
    "Categorías",
    "Mineral de la Reforma",
    "Pachuca de Soto",
    "Villa de Tezontepec",
    "Alfajayucan",
    "Tizayuca",
  ],
  cards: [
    {
      "name": "Comités vecinales - Visión plural para el desarrollo municipal",
      "municipio": ["mineral de la reforma"],
      "description": "El proyecto consiste en un órgano de representación vecinal electo democraticamente por los demás vecinos con el objetivo de fortelecer el proceso de planeación democrática y participativa en la toma de decisiones del desarrollo municipal.",
      "año": "2024",
      "pdfSrc": "http://tenemosunacuerdo.hidalgo.gob.mx/pdf/PROGRAMAS_ESPECIALES/DESPACHO_DEL_GOBERNADOR.pdf",
      "projectsIndex": "1"
    },
    {
      "name": "Plataformas de participación ciudadana para la\nconstrucción y actualización del Plan Municipal de\nDesarrollo 2020-2024 de Pachuca de Soto, Hgo.",
      "municipio": ["pachuca de soto"],
      "description": "Creación y desarrollo de una plataforma alineada a los Planes Nacional y Estatal de Desarrollo derivado de un análisis profundo de las problemáticas relacionadas con la\nparticipación ciudadana, con la finalidad de recaudar las propuestas por parte de la ciudadanía y poder consultar y visualizar la informaciónde una manera mas dinámica.",
      "año": "2024",
      "pdfSrc": "http://tenemosunacuerdo.hidalgo.gob.mx/pdf/PROGRAMAS_ESPECIALES/DESPACHO_DEL_GOBERNADOR.pdf",
      "projectsIndex": "2"
    },
    {
      "name": "Matriz de indicadores resultados (MIR) “3 1” Transparente, transformadora, transversal.",
      "municipio": ["villa de tezontepec"],
      "description": "Creación de una Matriz de Indicadores de Resultados (MIR) de mejora continua, con el objetivo de crear programas presupuestales eficientes, optimizar el presupuesto y satisfacer las necesidades reales y actuales de la Ciudadanía.",
      "año": "2024",
      "pdfSrc": "http://tenemosunacuerdo.hidalgo.gob.mx/pdf/PROGRAMAS_ESPECIALES/DESPACHO_DEL_GOBERNADOR.pdf",
      "projectsIndex": "3"
    },
    {
      "name": "Observatorio de Políticas Públicas",
      "municipio": ["alfajayucan"],
      "description": "El proyecto consiste en un módulo de Observatorio de Políticas Públicas  que brinda información estratégica sobre el avance en la atención de problemas públicos con temáticas alineadas al Plan Municipal de Desarrollo y con dos componentes Diagnóstico y Acciones y Resultados, con el objetivo de mejorar la transparencia y rendición de cuentas del ejercicio del gasto público.",
      "año": "2024",
      "pdfSrc": "http://tenemosunacuerdo.hidalgo.gob.mx/pdf/PROGRAMAS_ESPECIALES/DESPACHO_DEL_GOBERNADOR.pdf",
      "projectsIndex": "4"
    },
    {
      "name": "Sistema de Evaluación del Desempeño ",
      "municipio": ["tizayuca"],
      "description": "El Sistema de Evaluación de Desempeño del municipio es un instrumento utilizado para conocer el grado de cumplimiento de los resultados de los programas presupuestarios ejecutados por las unidades administrativas de la administración pública municipal, y tiene como finalidad lograr el cumplimiento de objetivos institucionales a través del seguimiento, monitoreo y evaluación de los indicadores estratégicos y de gestión, de los programas, planes y políticas públicas ejecutadas por la administración pública municipal.",
      "año": "2024",
      "pdfSrc": "http://tenemosunacuerdo.hidalgo.gob.mx/pdf/PROGRAMAS_ESPECIALES/DESPACHO_DEL_GOBERNADOR.pdf",
      "projectsIndex": "5"
    }  
  ]
};

