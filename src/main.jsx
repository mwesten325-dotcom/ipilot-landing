import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
const CONTACT_EMAIL = "tempi2732@gmail.com";
const DEMO_MAILTO =
  "mailto:" +
  CONTACT_EMAIL +
  "?subject=" +
  encodeURIComponent("Solicitud de demo IPilot") +
  "&body=" +
  encodeURIComponent("Hola, quiero solicitar una demo de IPilot. Me interesa conocer la plataforma para organizar, proteger y monetizar activos de propiedad intelectual.");
const DIAGNOSTIC_MAILTO =
  "mailto:" +
  CONTACT_EMAIL +
  "?subject=" +
  encodeURIComponent("Inicio de diagnóstico IPilot") +
  "&body=" +
  encodeURIComponent("Hola, quiero iniciar un diagnóstico preliminar con IPilot para identificar y priorizar activos de propiedad intelectual.");
const moduleStatuses = ["Todos", "MVP", "Add-on", "Advanced", "Future"];
const statusLabels = {
  Todos: "Todos",
  MVP: "MVP",
  "Add-on": "Complemento",
  Advanced: "Avanzado",
  Future: "Expansión futura",
};

const modules = [
  {
    letter: "A",
    title: "Formación, onboarding y simulaciones",
    status: "MVP",
    value: "Acelera la comprensión de PI para usuarios no expertos y guía cada flujo con contexto práctico.",
    output: "Ruta de aprendizaje, onboarding por módulo y simulaciones por perfil.",
    details: [
      "Formación transversal en PI.",
      "Onboarding guiado por módulo.",
      "Simulaciones para startups, empresas, universidades, áreas legales y áreas financieras.",
    ],
  },
  {
    letter: "B",
    title: "Gobernanza de PI",
    status: "Add-on",
    value: "Convierte decisiones dispersas en políticas, procedimientos, comités y trazabilidad interna.",
    output: "Política de PI, matriz RACI, comité, disclosures y evidencia para secretos empresariales.",
    details: [
      "Políticas de titularidad, IA generativa y software open source.",
      "Procedimientos de disclosure y protección de secretos.",
      "Actas, aprobaciones y flujos internos de decisión.",
    ],
  },
  {
    letter: "C",
    title: "Inventario vivo de activos de PI",
    status: "MVP",
    value: "Construye el mapa real de marcas, invenciones, software, datos, diseños, contenido, know-how y activos de IA.",
    output: "Fichas de activos, cadena de titularidad, documentos soporte y estado del portafolio.",
    details: [
      "Carga documental y evidencia por activo.",
      "Identificación de derechos posibles y existentes.",
      "Mapa de titularidad por empleados, contratistas, socios y financiadores.",
    ],
  },
  {
    letter: "D",
    title: "Motor de evaluación y priorización",
    status: "MVP",
    value: "Ayuda a decidir qué proteger, mantener, renovar, abandonar, valorar, monetizar o escalar.",
    output: "Índice de prioridad, score de mantenimiento, análisis de anualidades y renovación marcaria.",
    details: [
      "Priority score y maintenance score.",
      "Decisión de anualidades de patentes.",
      "Decisión de renovación de marcas y recomendación de ruta de protección.",
    ],
  },
  {
    letter: "E",
    title: "Protección, preparación documental y presupuesto",
    status: "MVP",
    value: "Prepara checklists, tareas, riesgos, jurisdicciones, presupuesto y documentos base antes de escalar.",
    output: "Checklist de protección, presupuesto por jurisdicción y brief para experto.",
    details: [
      "Marcas, patentes, modelos de utilidad, software, secretos y diseños.",
      "Tareas, responsables, vencimientos y documentos faltantes.",
      "Presupuesto de PI a 3, 6 y 12 meses.",
    ],
  },
  {
    letter: "F",
    title: "Gestión, mantenimiento y cuadro de control",
    status: "Advanced",
    value: "Transforma el portafolio de PI en un sistema operativo con tablero, alertas y responsables.",
    output: "Dashboard operativo, vencimientos, contratos, licencias, renovaciones y exportes ejecutivos.",
    details: [
      "Control de tareas, responsables y vencimientos.",
      "Seguimiento de contratos, licencias, renovaciones y anualidades.",
      "Reportes para comité, junta, inversionistas y áreas internas.",
    ],
  },
  {
    letter: "G",
    title: "Vigilancia e inteligencia competitiva",
    status: "Future",
    value: "Monitorea marcas, patentes, competidores, tecnologías, mercados y posibles licenciatarios.",
    output: "Alertas de vigilancia marcaria, tecnológica, competitiva y de mercado.",
    details: [
      "Fuentes como SIC, USPTO, WIPO, EPO, Google Patents, TMview, Madrid Monitor y Lens.",
      "Integraciones con bases públicas o premium.",
      "Señales de riesgo, oportunidad y movimientos competitivos.",
    ],
  },
  {
    letter: "H",
    title: "Monetización y valoración del portafolio",
    status: "Advanced",
    value: "Identifica rutas de monetización y prepara activos para valoración preliminar o especializada con Valip.",
    output: "Estimación express, paquete de transferencia y recomendación de valoración con Valip.",
    details: [
      "Licenciamiento, venta, spin-off, joint venture, franquicia, SaaS y transferencia.",
      "Valoración estratégica, técnica documentada y formal especializada.",
      "Datos faltantes, preparación del activo y brief de valoración.",
    ],
  },
];

const problems = [
  "Activos de PI dispersos.",
  "Falta de claridad sobre qué proteger primero.",
  "Riesgos de titularidad.",
  "Vencimientos, renovaciones y anualidades sin control.",
  "Presupuesto de PI poco claro.",
  "Falta de gobernanza interna.",
  "Riesgo de divulgación de invenciones, secretos o software.",
  "Dependencia de asesorías externas puntuales sin sistema operativo interno.",
  "Falta de ruta para valorar o monetizar activos.",
];

const steps = [
  "Diagnostica tu madurez de PI.",
  "Aprende y recibe orientación contextual.",
  "Inventaría tus activos intangibles.",
  "Evalúa titularidad, protegibilidad, riesgo, costo y valor.",
  "Prioriza protección, mantenimiento, renovación, valoración o monetización.",
  "Presupuesta acciones a 3, 6 y 12 meses.",
  "Gestiona tareas, alertas, responsables y vencimientos.",
  "Escala a expertos cuando el caso lo requiere.",
];

const flows = [
  "Flujo de startup tecnológica",
  "Flujo de empresa con marcas y patentes",
  "Flujo de universidad / OTRI",
  "Flujo de secretos empresariales",
  "Flujo de valoración y monetización",
  "Flujo de vigilancia competitiva",
];

const useCases = [
  {
    title: "Startup tecnológica",
    situation: "Tiene marca, software, algoritmo, base de datos y know-how, pero no sabe qué proteger primero.",
    result: "Inventario, detección de riesgos de titularidad, ruta de protección, presupuesto 3/6/12 meses y brief para Valip o experto si aplica.",
  },
  {
    title: "Empresa con marcas y patentes",
    situation: "Gestiona marcas, derechos de patente activos, renovaciones y anualidades próximas.",
    result: "Dashboard de mantenimiento, análisis de renovación marcaria, decisión de anualidades, presupuesto y alertas.",
  },
  {
    title: "Universidad / OTRI",
    situation: "Un grupo de investigación reporta una tecnología con potencial de protección y transferencia.",
    result: "Disclosure, riesgo de publicación, score de protección, preparación para transferencia y recomendación de valoración con Valip.",
  },
  {
    title: "Empresa con secretos empresariales",
    situation: "Tiene procesos, datos y know-how sin documentación ni medidas razonables de protección.",
    result: "Mapa de secretos, score de riesgo, checklist de medidas razonables, presupuesto y evidencia trazable.",
  },
  {
    title: "Área legal / PI",
    situation: "Necesita organizar documentos, cadena de titularidad, trámites, contratos, vencimientos y expertos externos.",
    result: "Dashboard operativo, vacíos documentales, workflows, briefs para expertos y reportes ejecutivos.",
  },
  {
    title: "Área financiera / directiva",
    situation: "Necesita entender presupuesto de PI, costos próximos, activos monetizables y valor estratégico.",
    result: "Presupuesto por activo, jurisdicción y horizonte, candidatos a valoración y reportes listos para junta.",
  },
];

const trustChecklist = [
  "Jurisdicción considerada.",
  "Supuestos usados.",
  "Nivel de confianza.",
  "Información faltante.",
  "Riesgos.",
  "Recomendación de escalamiento.",
  "Registro de decisiones.",
  "Disclaimer de uso preliminar.",
];

const experts = [
  "Abogado de marcas",
  "Abogado de contratos",
  "Agente de patentes",
  "Experto en secretos empresariales",
  "Valorador Valip",
  "Consultor de transferencia tecnológica",
  "Experto técnico",
  "Traductor técnico",
  "Especialista en ciberseguridad o protección de secretos",
];

const securityItems = [
  "Roles y permisos",
  "MFA",
  "Cifrado",
  "Registro de accesos",
  "Separación por organización",
  "Control documental",
  "Logs de decisiones",
  "Retención y borrado de datos",
  "Seguridad reforzada para Enterprise",
];

const portalNavItems = [
  { label: "Dashboard", helper: "Resumen operativo del portafolio" },
  { label: "Diagnóstico", helper: "Perfil inicial y madurez de PI" },
  { label: "Formación y simulaciones", helper: "Módulo A" },
  { label: "Gobernanza", helper: "Módulo B" },
  { label: "Inventario", helper: "Módulo C" },
  { label: "Evaluación", helper: "Módulo D" },
  { label: "Protección y documentos", helper: "Módulo E" },
  { label: "Presupuesto", helper: "Módulo E" },
  { label: "Gestión y alertas", helper: "Módulo F" },
  { label: "Vigilancia", helper: "Módulo G" },
  { label: "Valoración y monetización", helper: "Módulo H" },
  { label: "Expertos", helper: "Escalamiento especializado" },
  { label: "Reportes", helper: "Exportes ejecutivos" },
  { label: "Configuración", helper: "Organización, roles y seguridad" },
];

const portalModules = [
  { code: "A", title: "Formación, onboarding y simulaciones", status: "Base activa", progress: 64 },
  { code: "B", title: "Gobernanza de PI", status: "Requiere diagnóstico", progress: 38 },
  { code: "C", title: "Inventario vivo de activos", status: "En construcción", progress: 52 },
  { code: "D", title: "Evaluación y priorización", status: "Listo para configurar", progress: 47 },
  { code: "E", title: "Protección, documentos y presupuesto", status: "Pendiente de datos", progress: 41 },
  { code: "F", title: "Gestión, mantenimiento y alertas", status: "Borrador operativo", progress: 35 },
  { code: "G", title: "Vigilancia competitiva", status: "Plan avanzado", progress: 24 },
  { code: "H", title: "Valoración y monetización", status: "Ruta Valip sugerida", progress: 31 },
];

const portalNavModuleCode = {
  "Formación y simulaciones": "A",
  Gobernanza: "B",
  Inventario: "C",
  Evaluación: "D",
  "Protección y documentos": "E",
  Presupuesto: "E",
  "Gestión y alertas": "F",
  Vigilancia: "G",
  "Valoración y monetización": "H",
};

const portalSearchIndex = [
  { title: "Plataforma SaaS de IA para gestión de PI", type: "Activo", module: "Inventario" },
  { title: "Contrato de cesión con desarrolladores", type: "Documento", module: "Gobernanza" },
  { title: "Renovación de marca IPilot", type: "Tarea", module: "Gestión y alertas" },
  { title: "Reporte ejecutivo de madurez de PI", type: "Reporte", module: "Reportes" },
  { title: "Brief para abogado de marcas", type: "Experto", module: "Expertos" },
];

const portalNotifications = [
  "Completar perfil de jurisdicción antes de priorizar activos.",
  "Hay 3 documentos de titularidad pendientes de cargar.",
  "La ruta recomendada sugiere revisar secretos empresariales esta semana.",
];

const copilotActions = [
  "Priorizar activos críticos",
  "Generar reporte ejecutivo",
  "Crear tareas desde alertas",
  "Preparar brief para experto",
  "Revisar presupuesto trimestral",
  "Detectar vacíos de titularidad",
  "Sugerir ruta de valoración",
];

const dashboardSummaryCards = [
  {
    label: "Total de activos",
    value: "86",
    helper: "Marcas, software, invenciones, datos y know-how inventariados.",
    icon: "AT",
    tone: "blue",
  },
  {
    label: "Activos prioritarios",
    value: "14",
    helper: "Requieren decisión de protección, presupuesto o escalamiento.",
    icon: "PR",
    tone: "green",
  },
  {
    label: "Activos con riesgo de titularidad",
    value: "9",
    helper: "Faltan cesiones, contratos o evidencia de creación.",
    icon: "RT",
    tone: "amber",
  },
  {
    label: "Próximos vencimientos",
    value: "7",
    helper: "Eventos críticos en los próximos 120 días.",
    icon: "VE",
    tone: "red",
  },
  {
    label: "Presupuesto estimado 12 meses",
    value: "USD 48k",
    helper: "Incluye tasas oficiales, honorarios y vigilancia básica.",
    icon: "PB",
    tone: "blue",
  },
  {
    label: "Activos con potencial de monetización",
    value: "11",
    helper: "Candidatos a valoración, licencia, transferencia o spin-off.",
    icon: "MO",
    tone: "green",
  },
  {
    label: "Alertas críticas",
    value: "6",
    helper: "Riesgo legal, documental, presupuestal o competitivo.",
    icon: "AL",
    tone: "red",
  },
  {
    label: "Solicitudes expertas abiertas",
    value: "4",
    helper: "Briefs pendientes de cotización o revisión especializada.",
    icon: "EX",
    tone: "amber",
  },
];

const portfolioOverview = [
  {
    title: "Activos por tipo",
    metric: "86 activos",
    items: [
      ["Marcas", 28],
      ["Software", 18],
      ["Invenciones", 14],
      ["Datos", 10],
      ["Know-how", 16],
    ],
  },
  {
    title: "Estado de protección",
    metric: "57% con cobertura formal",
    items: [
      ["Registrado", 36],
      ["En trámite", 18],
      ["Por evaluar", 21],
      ["Secreto documentado", 11],
    ],
  },
  {
    title: "Nivel de riesgo",
    metric: "15 activos en riesgo alto",
    items: [
      ["Alto", 15],
      ["Medio", 31],
      ["Bajo", 40],
    ],
  },
  {
    title: "Horizonte presupuestal",
    metric: "USD 48k / 12 meses",
    items: [
      ["3 meses", 18],
      ["6 meses", 31],
      ["12 meses", 48],
    ],
  },
  {
    title: "Claridad de titularidad",
    metric: "74% documentada",
    items: [
      ["Clara", 64],
      ["Parcial", 13],
      ["Crítica", 9],
    ],
  },
  {
    title: "Potencial de monetización",
    metric: "11 candidatos",
    items: [
      ["Alto", 11],
      ["Medio", 24],
      ["Interno", 31],
      ["Bajo actual", 20],
    ],
  },
];

const dashboardModuleStatus = [
  { module: "Formación y simulaciones", progress: 72, action: "Asignar ruta a equipo de I+D", status: "En curso", tone: "green" },
  { module: "Gobernanza", progress: 38, action: "Completar matriz RACI de PI", status: "Pendiente", tone: "amber" },
  { module: "Inventario", progress: 58, action: "Cargar documentos de titularidad", status: "En curso", tone: "green" },
  { module: "Evaluación", progress: 46, action: "Evaluar 6 activos prioritarios", status: "Atención", tone: "amber" },
  { module: "Protección y presupuesto", progress: 41, action: "Validar presupuesto por jurisdicción", status: "Pendiente", tone: "amber" },
  { module: "Gestión operativa", progress: 52, action: "Crear tareas desde vencimientos", status: "En curso", tone: "green" },
  { module: "Vigilancia", progress: 24, action: "Configurar competidores y clases clave", status: "Inicial", tone: "blue" },
  { module: "Valoración y monetización", progress: 31, action: "Seleccionar activos para ruta Valip", status: "Inicial", tone: "blue" },
];

const criticalAlerts = [
  { text: "Marca principal vence en 86 días.", context: "Renovación marcaria", severity: "Crítica" },
  { text: "Software crítico sin cesiones documentadas.", context: "Titularidad", severity: "Alta" },
  { text: "Invención con riesgo de divulgación antes de evaluación.", context: "Patentes", severity: "Alta" },
  { text: "Activo estratégico sin presupuesto asignado.", context: "Presupuesto", severity: "Media" },
  { text: "Patente con anualidad próxima.", context: "Mantenimiento", severity: "Alta" },
  { text: "Competidor solicitó una marca similar.", context: "Vigilancia", severity: "Crítica" },
  { text: "Tecnología con potencial de transferencia requiere valoración.", context: "Valip", severity: "Media" },
];

const upcomingTasks = [
  { name: "Revisar uso de marca antes de renovar", module: "Gestión y alertas", owner: "Legal", due: "18 jul", priority: "Alta", status: "Pendiente" },
  { name: "Cargar contrato de cesión de desarrolladores", module: "Gobernanza", owner: "María Legal", due: "22 jul", priority: "Crítica", status: "En revisión" },
  { name: "Evaluar anualidad de patente MX-112", module: "Evaluación", owner: "Comité PI", due: "29 jul", priority: "Alta", status: "Pendiente" },
  { name: "Preparar brief para Valip", module: "Valoración", owner: "Finanzas", due: "04 ago", priority: "Media", status: "En ejecución" },
  { name: "Configurar vigilancia de competidor", module: "Vigilancia", owner: "Innovación", due: "08 ago", priority: "Media", status: "Pendiente" },
];

const assetChecklist = ["Marcas", "Invenciones", "Software", "Datos", "Diseños", "Know-how", "Documentos contractuales"];
const filingChecklist = ["Marcas registradas", "Solicitudes de patente", "Derechos de autor", "Contratos de licencia", "Ningún trámite formal"];
const documentChecklist = ["Cesiones", "NDAs", "Contratos laborales", "Contratos con proveedores", "Disclosures", "Evidencia técnica"];

const plans = [
  {
    name: "Descubre",
    client: "Público general / emprendedores",
    price: "Gratis",
    scope: "Formación, diagnóstico básico, hasta 3-5 activos y recomendaciones generales.",
    cta: "Iniciar diagnóstico",
    limits: ["1 usuario", "3-5 activos", "1 jurisdicción", "IA limitada", "Reporte básico"],
  },
  {
    name: "Organiza",
    client: "Emprendedores y startups",
    price: "USD 29-99/mes",
    scope: "Inventario, fichas de activos, motor de análisis y priorización básica, recordatorios y plantillas simples.",
    cta: "Organizar portafolio",
    limits: ["Hasta 25 activos", "1-2 usuarios", "Recordatorios", "Plantillas", "Documentos básicos"],
    featured: true,
  },
  {
    name: "Protege",
    client: "Startups y pymes",
    price: "USD 149-399/mes",
    scope: "Workflows, presupuesto, checklists, dashboard, IA ampliada, marcas, software y secretos.",
    cta: "Proteger activos",
    limits: ["Hasta 100 activos", "Multiusuario", "3 jurisdicciones", "Briefs expertos", "Dashboard"],
  },
  {
    name: "Estratega",
    client: "Empresas medianas / universidades",
    price: "USD 599-1.500/mes",
    scope: "Gobernanza, comités, vigilancia, transferencia, valoración, reportes, multiusuario y expertos.",
    cta: "Diseñar piloto",
    limits: ["Usuarios ampliados", "Comités", "Vigilancia", "Conexión Valip", "Reportes ejecutivos"],
  },
  {
    name: "Enterprise / Institucional",
    client: "Corporaciones, grupos empresariales, universidades grandes",
    price: "A medida",
    scope: "SSO, SLA, integraciones, jurisdicciones avanzadas, seguridad reforzada, ZDR y soporte premium.",
    cta: "Hablar con ventas",
    limits: ["SSO", "SLA", "Integraciones", "ZDR", "Soporte premium"],
  },
];

function Badge({ children, tone = "blue" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function SectionHeading({ eyebrow, title, text, align = "center" }) {
  return (
    <div className={`section-heading ${align === "left" ? "align-left" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moduleFilter, setModuleFilter] = useState("Todos");
  const [activeCase, setActiveCase] = useState(0);

  const filteredModules = useMemo(() => {
    if (moduleFilter === "Todos") return modules;
    return modules.filter((module) => module.status === moduleFilter);
  }, [moduleFilter]);

  const navLinks = [
    ["Plataforma", "#plataforma"],
    ["Módulos", "#modulos"],
    ["Flujos", "#funciona"],
    ["Confianza", "#confianza"],
    ["Planes", "#planes"],
  ];

  return (
    <>
      {/* Header / navigation */}
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Ir al inicio de IPilot" onClick={() => setMenuOpen(false)}>
          <img src="./assets/logo-horizontal.png" alt="IPilot" />
        </a>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
          <span className="sr-only">Abrir navegación</span>
        </button>
        <nav className={`primary-nav ${menuOpen ? "is-open" : ""}`} id="primary-navigation" aria-label="Navegación principal">
          {navLinks.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <a className="button button-small button-primary header-cta" href="#cta-final">
          Solicitar demo
        </a>
      </header>

      <main>
        {/* Hero */}
        <section className="hero section-dark" id="inicio">
          <div className="section-inner hero-grid">
            <div className="hero-copy">
              <Badge tone="green">SaaS estratégico de propiedad intelectual</Badge>
              <h1>Convierte tus activos intangibles en un portafolio de propiedad intelectual organizado, priorizado, presupuestado y accionable.</h1>
              <p className="lead">
                IPilot ayuda a organizaciones a identificar, organizar, proteger, gestionar, presupuestar, valorar y monetizar activos de PI con un copiloto de IA, workflows, evidencia, alertas y escalamiento experto.
              </p>
              <div className="button-row">
                <a className="button button-primary" href="#cta-final">Solicitar demo</a>
                <a className="button button-secondary" href={DIAGNOSTIC_MAILTO}>Iniciar diagnóstico</a>
              </div>
              <div className="metrics-row" aria-label="Indicadores de valor">
                <article className="metric-card">
                  <strong>8 módulos</strong>
                  <span>gestión de PI de punta a punta</span>
                </article>
                <article className="metric-card">
                  <strong>3/6/12 meses</strong>
                  <span>visión presupuestal por horizonte</span>
                </article>
                <article className="metric-card">
                  <strong>IA + experto</strong>
                  <span>recomendaciones con límites claros</span>
                </article>
              </div>
            </div>
            <div className="dashboard-preview" aria-label="Vista previa simulada del dashboard IPilot">
              <div className="preview-header">
                <img src="./assets/logo-icon.png" alt="" />
                <div>
                  <span>Portafolio vivo</span>
                  <strong>Vista ejecutiva de PI</strong>
                </div>
                <Badge tone="green">Activo</Badge>
              </div>
              <div className="preview-grid">
                <article className="preview-card">
                  <span className="micro-label">Activos</span>
                  <strong>86</strong>
                  <small>Marcas, software, secretos, datos y patentes</small>
                </article>
                <article className="preview-card">
                  <span className="micro-label">Riesgo</span>
                  <strong>Medio</strong>
                  <small>7 decisiones requieren acción</small>
                </article>
                <article className="preview-chart" aria-label="Gráfico de presupuesto por horizonte">
                  <span style={{ height: "43%" }} />
                  <span style={{ height: "72%" }} />
                  <span style={{ height: "55%" }} />
                  <span style={{ height: "86%" }} />
                </article>
                <article className="preview-card accent">
                  <span className="micro-label">Alerta</span>
                  <strong>Renovación</strong>
                  <small>Marca en Colombia, 45 días</small>
                </article>
              </div>
              <div className="ai-panel">
                <span>Recomendación preliminar</span>
                <p>Priorizar titularidad y evidencia antes de iniciar protección internacional.</p>
                <div>
                  <Badge>MVP</Badge>
                  <Badge tone="green">Confianza media</Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="section" id="problema">
          <div className="section-inner">
            <SectionHeading
              eyebrow="Problema"
              title="La propiedad intelectual suele estar dispersa, subpresupuestada y sin dueño operativo."
              text="Muchos equipos saben que tienen activos valiosos, pero no tienen un sistema para decidir qué proteger, mantener, renovar, valorar, monetizar o escalar."
            />
            <div className="problem-grid">
              {problems.map((problem, index) => (
                <article className="problem-card" key={problem}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{problem}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="section section-muted" id="solucion">
          <div className="section-inner split-layout">
            <SectionHeading
              align="left"
              eyebrow="Solución"
              title="Una plataforma SaaS para operar la PI como un portafolio vivo."
              text="IPilot integra inventario, gobernanza, evaluación, presupuesto, alertas, valoración preliminar y briefs expertos en una experiencia modular, trazable y accionable."
            />
            <div className="transformation-card">
              <div>
                <span>Antes</span>
                <p>No sabemos qué activos tenemos, qué proteger, qué mantener, cuánto presupuestar ni cuándo escalar a expertos.</p>
              </div>
              <div>
                <span>Después</span>
                <p>Tenemos un portafolio vivo con inventario, gobernanza, prioridades, presupuesto, tareas, alertas, valoración preliminar y expertos cuando se requiere.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Full modular platform overview */}
        <section className="section" id="plataforma">
          <div className="section-inner">
            <SectionHeading
              eyebrow="Plataforma modular"
              title="Una plataforma modular para operar la propiedad intelectual de punta a punta"
              text="IPilot organiza la gestión estratégica de PI en ocho módulos conectados: educación, gobernanza, inventario, evaluación, protección, gestión, vigilancia y monetización."
            />
            <div className="module-filters" aria-label="Filtro de módulos">
              {moduleStatuses.map((status) => (
                <button
                  className={moduleFilter === status ? "filter-button active" : "filter-button"}
                  key={status}
                  type="button"
                  onClick={() => setModuleFilter(status)}
                >
                  {statusLabels[status]}
                </button>
              ))}
            </div>
            <div className="module-grid" id="modulos">
              {filteredModules.map((module) => (
                <article className="module-card" key={module.letter} id={`modulo-${module.letter.toLowerCase()}`}>
                  <div className="module-topline">
                    <span className="module-letter">{module.letter}</span>
                    <Badge tone={module.status === "MVP" ? "green" : "blue"}>{statusLabels[module.status]}</Badge>
                  </div>
                  <h3>{module.title}</h3>
                  <p>{module.value}</p>
                  <div className="example-output">
                    <span>Salida ejemplo</span>
                    <strong>{module.output}</strong>
                  </div>
                  <ul>
                    {module.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Module A-H detail */}
        <section className="section section-muted" id="detalle-modulos">
          <div className="section-inner">
            <SectionHeading
              eyebrow="Cobertura A-H"
              title="Cada módulo aporta una decisión, evidencia o acción concreta."
              text="La arquitectura presenta IPilot como una capa operativa para decisiones de PI, presupuesto, mantenimiento, vigilancia y monetización."
            />
            <div className="detail-grid">
              {modules.map((module) => (
                <article className="detail-card" key={`detail-${module.letter}`}>
                  <span>{module.letter}</span>
                  <h3>{module.title}</h3>
                  <p>{module.output}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="section" id="funciona">
          <div className="section-inner">
            <SectionHeading
              eyebrow="Cómo funciona IPilot"
              title="De diagnóstico a decisiones ejecutables, con presupuesto y escalamiento experto."
              text="El flujo está diseñado para equipos legales, innovación, I+D, finanzas, universidades y directivos que necesitan claridad sin perder trazabilidad."
            />
            <div className="steps-grid">
              {steps.map((step, index) => (
                <article className="step-card" key={step} id={index === 0 ? "diagnostico" : undefined}>
                  <span>{index + 1}</span>
                  <p>{step}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Core flows */}
        <section className="section section-muted" id="flujos">
          <div className="section-inner">
            <SectionHeading
              eyebrow="Flujos principales"
              title="Recorridos por perfil, activo y decisión de negocio."
              text="Cada flujo combina preguntas guiadas, evidencia documental, score, presupuesto, tareas y recomendaciones con límites claros."
            />
            <div className="flow-grid">
              {flows.map((flow) => (
                <article className="flow-card" key={flow}>
                  <span />
                  <h3>{flow}</h3>
                  <p>Diagnóstico, inventario, evaluación, presupuesto, alertas y brief experto cuando aplica.</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="section" id="casos">
          <div className="section-inner">
            <SectionHeading
              eyebrow="Casos de uso"
              title="Diseñado para startups, empresas, universidades, áreas legales y equipos financieros."
              text="Los casos muestran cómo IPilot convierte información dispersa en decisiones priorizadas y reportables."
            />
            <div className="use-case-shell">
              <div className="case-tabs" role="tablist" aria-label="Casos de uso">
                {useCases.map((useCase, index) => (
                  <button
                    key={useCase.title}
                    className={activeCase === index ? "case-tab active" : "case-tab"}
                    type="button"
                    role="tab"
                    aria-selected={activeCase === index}
                    onClick={() => setActiveCase(index)}
                  >
                    {useCase.title}
                  </button>
                ))}
              </div>
              <article className="case-panel">
                <Badge tone="green">{useCases[activeCase].title}</Badge>
                <div className="case-columns">
                  <div>
                    <span>Situación</span>
                    <p>{useCases[activeCase].situation}</p>
                  </div>
                  <div>
                    <span>Resultado esperado</span>
                    <p>{useCases[activeCase].result}</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Responsible AI and trust */}
        <section className="section section-dark" id="confianza">
          <div className="section-inner">
            <div className="trust-hero">
              <SectionHeading
                align="left"
                eyebrow="IA responsable, confianza y expertos"
                title="IA asistiva con límites claros, trazabilidad y escalamiento cuando el riesgo lo exige."
                text="IPilot no reemplaza abogados, agentes de patentes, expertos técnicos, contadores, valoradores ni asesores financieros. Sus recomendaciones son preliminares y deben revisarse cuando el asunto tenga complejidad legal, técnica, financiera o estratégica."
              />
              <div className="disclaimer-card">
                <strong>Mensaje de responsabilidad</strong>
                <p>Las salidas de IA son apoyo inicial para estructurar información, no opiniones definitivas ni garantía de registro, patentabilidad, libertad de operación, litigio o valoración formal.</p>
              </div>
            </div>
            <div className="trust-grid">
              <article className="trust-panel">
                <h3>Recomendaciones sensibles incluyen</h3>
                <ul>
                  {trustChecklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="trust-panel">
                <h3>Briefs para expertos</h3>
                <div className="tag-cloud">
                  {experts.map((expert) => (
                    <span key={expert}>{expert}</span>
                  ))}
                </div>
              </article>
              <article className="trust-panel">
                <h3>Seguridad y confidencialidad</h3>
                <p>Diseñado para activos sensibles como invenciones no publicadas, secretos empresariales, software, datos, contratos, estrategia comercial, documentos de valoración e información financiera.</p>
                <div className="tag-cloud">
                  {securityItems.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="section" id="planes">
          <div className="section-inner">
            <SectionHeading
              eyebrow="Planes y modelo comercial"
              title="SaaS por suscripción mensual/anual + créditos de IA + add-ons + marketplace de expertos."
              text="Planes preliminares para validar disposición de pago, costo real de IA, datos, soporte y alcance por jurisdicción."
            />
            <div className="pricing-grid">
              {plans.map((plan) => (
                <article className={`price-card ${plan.featured ? "featured" : ""}`} key={plan.name}>
                  {plan.featured ? <Badge tone="green">Recomendado</Badge> : <Badge>{plan.client}</Badge>}
                  <h3>{plan.name}</h3>
                  <strong className="price">{plan.price}</strong>
                  <p>{plan.scope}</p>
                  <ul>
                    {plan.limits.map((limit) => (
                      <li key={limit}>{limit}</li>
                    ))}
                  </ul>
                  <a className={plan.featured ? "button button-primary" : "button button-outline"} href="#cta-final">
                    {plan.cta}
                  </a>
                </article>
              ))}
            </div>
            <p className="pricing-note">
              Precios preliminares sujetos a validación comercial, costo real de IA, datos, soporte y alcance por jurisdicción.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section final-cta" id="cta-final">
          <div className="section-inner cta-center">
            <Badge tone="green">Portafolio vivo de PI</Badge>
            <h2>Empieza a construir tu portafolio vivo de propiedad intelectual.</h2>
            <p>
              Lleva tus activos intangibles desde el diagnóstico hasta decisiones priorizadas, presupuestadas y listas para revisión experta.
            </p>
            <div className="button-row centered">
              <a className="button button-primary" href="mailto:tempi2732@gmail.com">Solicitar demo</a>
              <a className="button button-secondary" href={DIAGNOSTIC_MAILTO}>Iniciar diagnóstico</a>
              <a className="button button-outline" href="#plataforma">Ver plataforma</a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-inner">
          <a className="footer-brand" href="#inicio" aria-label="IPilot">
            <img src="./assets/logo-horizontal.png" alt="IPilot" />
          </a>
          <p>Plataforma SaaS con IA asistiva para inventariar, priorizar, presupuestar, proteger y monetizar activos de propiedad intelectual.</p>
          <nav aria-label="Navegación secundaria">
            <a href="#plataforma">Plataforma</a>
            <a href="#modulos">Módulos</a>
            <a href="#casos">Casos</a>
            <a href="#confianza">Confianza</a>
            <a href="#planes">Planes</a>
          </nav>
        </div>
      </footer>
    </>
  );
}

function App() {
  const isPortal = window.location.pathname.replace(/\/$/, "") === "/portal";
  return isPortal ? <PortalMockup /> : <LandingPage />;
}

function PortalMockup() {
  const [hasAccess, setHasAccess] = useState(false);
  const [activeNav, setActiveNav] = useState("Diagnóstico");
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [organization, setOrganization] = useState("IPilot Labs");

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    return portalSearchIndex.filter((item) =>
      [item.title, item.type, item.module].join(" ").toLowerCase().includes(query)
    );
  }, [searchQuery]);

  if (!hasAccess) {
    return <PortalLoginScreen onLogin={() => setHasAccess(true)} />;
  }

  return (
    <div className="portal-shell">
      <aside className="portal-sidebar" aria-label="Navegación del portal IPilot">
        <a className="portal-brand" href="/" aria-label="Volver a la landing de IPilot">
          <img src="/assets/logo-horizontal.png" alt="IPilot" />
        </a>
        <nav className="portal-nav">
          {portalNavItems.map((item) => (
            <button
              className={activeNav === item.label ? "portal-nav-item active" : "portal-nav-item"}
              key={item.label}
              type="button"
              onClick={() => setActiveNav(item.label)}
            >
              <span>{item.label}</span>
              <small>{item.helper}</small>
            </button>
          ))}
        </nav>
      </aside>

      <div className="portal-workspace">
        <header className="portal-topbar">
          <div className="portal-search">
            <span aria-hidden>⌕</span>
            <label className="sr-only" htmlFor="portal-search">Buscar en IPilot</label>
            <input
              id="portal-search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Buscar activos, documentos, tareas y reportes"
            />
            {searchResults.length > 0 && (
              <div className="portal-search-results" role="listbox" aria-label="Resultados de búsqueda simulados">
                {searchResults.map((result) => (
                  <button key={`${result.type}-${result.title}`} type="button">
                    <strong>{result.title}</strong>
                    <span>{result.type} · {result.module}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="portal-topbar-actions">
            <label className="portal-org-selector">
              <span>Organización</span>
              <select value={organization} onChange={(event) => setOrganization(event.target.value)}>
                <option>IPilot Labs</option>
                <option>Universidad Andes OTRI</option>
                <option>BioNova Startup</option>
              </select>
            </label>
            <button className="portal-action-button" type="button" onClick={() => setCopilotOpen((value) => !value)}>
              Copiloto IPilot
            </button>
            <div className="portal-notifications">
              <button
                className="portal-icon-button"
                type="button"
                aria-expanded={notificationsOpen}
                onClick={() => setNotificationsOpen((value) => !value)}
              >
                Alertas <strong>{portalNotifications.length}</strong>
              </button>
              {notificationsOpen && (
                <div className="portal-popover">
                  <strong>Centro de notificaciones</strong>
                  {portalNotifications.map((notification) => (
                    <p key={notification}>{notification}</p>
                  ))}
                </div>
              )}
            </div>
            <details className="portal-user-menu">
              <summary>
                <span>ML</span>
                <strong>María Legal</strong>
              </summary>
              <div>
                <button type="button">Perfil</button>
                <button type="button">Preferencias</button>
                <button type="button" onClick={() => setHasAccess(false)}>Salir del mockup</button>
              </div>
            </details>
          </div>
        </header>

        <main className="portal-main">
          {activeNav === "Diagnóstico" ? (
            <DiagnosisFlow organization={organization} />
          ) : activeNav === "Dashboard" ? (
            <PortalDashboardPreview onOpenDiagnosis={() => setActiveNav("Diagnóstico")} />
          ) : (
            <PortalModuleScreen activeNav={activeNav} />
          )}
        </main>
      </div>

      {copilotOpen && (
        <aside className="portal-copilot-panel" aria-label="Acciones del copiloto IPilot">
          <div>
            <span className="eyebrow">Acciones contextuales</span>
            <h2>Copiloto IPilot</h2>
            <p>No es un chat genérico. Sugiere acciones operativas sobre activos, documentos, riesgos y presupuesto.</p>
          </div>
          <div className="portal-copilot-actions">
            {copilotActions.map((action) => (
              <button key={action} type="button">{action}</button>
            ))}
          </div>
          <p className="portal-disclaimer">Mockup interactivo. No conecta con servicios reales ni genera opiniones legales definitivas.</p>
        </aside>
      )}
    </div>
  );
}

function PortalLoginScreen({ onLogin }) {
  return (
    <main className="portal-login-screen">
      <section className="portal-login-card">
        <img src="/assets/logo-horizontal.png" alt="IPilot" />
        <div>
          <span className="eyebrow">Portal SaaS de PI</span>
          <h1>Accede a tu portafolio de PI</h1>
          <p>Explora una experiencia simulada para operar activos, riesgos, tareas y decisiones estratégicas de propiedad intelectual.</p>
        </div>
        <form
          className="portal-login-form"
          onSubmit={(event) => {
            event.preventDefault();
            onLogin();
          }}
        >
          <label>
            Email
            <input type="email" placeholder="maria@organizacion.com" defaultValue="maria@ipilot.example" />
          </label>
          <label>
            Contraseña
            <input type="password" placeholder="Contraseña de prueba" defaultValue="mockup" />
          </label>
          <button className="button button-primary" type="submit">Ingresar</button>
          <a className="button button-outline" href="/#cta-final">Solicitar demo</a>
        </form>
        <p className="portal-disclaimer">Mockup interactivo. No conecta con servicios reales.</p>
      </section>
      <section className="portal-login-preview" aria-label="Vista previa del portal IPilot">
        <div className="portal-mini-topbar" />
        <div className="portal-mini-grid">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="portal-mini-panel">
          <strong>Ruta recomendada</strong>
          <p>Diagnóstico, inventario, evaluación, presupuesto y escalamiento experto.</p>
        </div>
      </section>
    </main>
  );
}

function PortalDashboardPreview({ onOpenDiagnosis }) {
  return (
    <section className="portal-page portal-dashboard-page">
      <div className="portal-page-header dashboard-header">
        <div>
          <span className="eyebrow">Centro de control operativo</span>
          <h1>Dashboard ejecutivo del portafolio de PI</h1>
          <p>Vista integrada para priorizar activos, riesgos, presupuesto, vencimientos, vigilancia y escalamiento experto.</p>
        </div>
        <div className="dashboard-header-actions">
          <button className="button button-outline" type="button" onClick={onOpenDiagnosis}>
            Actualizar diagnóstico
          </button>
          <button className="button button-primary" type="button">
            Generar reporte ejecutivo
          </button>
        </div>
      </div>

      <div className="dashboard-summary-grid">
        {dashboardSummaryCards.map((card) => (
          <article className={`dashboard-kpi-card dashboard-tone-${card.tone}`} key={card.label}>
            <span className="dashboard-kpi-icon">{card.icon}</span>
            <div>
              <small>{card.label}</small>
              <strong>{card.value}</strong>
              <p>{card.helper}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="dashboard-main-layout">
        <section className="dashboard-panel portfolio-overview-panel">
          <div className="dashboard-panel-header">
            <div>
              <span className="eyebrow">Portafolio</span>
              <h2>Panorama general</h2>
            </div>
            <Badge tone="green">86 activos monitoreados</Badge>
          </div>
          <div className="portfolio-overview-grid">
            {portfolioOverview.map((group) => (
              <article className="portfolio-overview-card" key={group.title}>
                <div>
                  <h3>{group.title}</h3>
                  <strong>{group.metric}</strong>
                </div>
                <div className="portfolio-bars">
                  {group.items.map(([label, value]) => (
                    <div className="portfolio-bar-row" key={label}>
                      <span>{label}</span>
                      <div><i style={{ width: `${Math.min(value * 2, 100)}%` }} /></div>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="dashboard-panel dashboard-copilot-card">
          <span className="eyebrow">Copiloto IPilot</span>
          <h2>Acciones sugeridas</h2>
          <p>Panel contextual para convertir señales del portafolio en decisiones, tareas y briefs. No emite opiniones legales definitivas.</p>
          <div className="dashboard-copilot-actions">
            {copilotActions.map((action) => (
              <button type="button" key={action}>{action}</button>
            ))}
          </div>
        </aside>
      </div>

      <div className="dashboard-secondary-layout">
        <section className="dashboard-panel">
          <div className="dashboard-panel-header">
            <div>
              <span className="eyebrow">Módulos A-H</span>
              <h2>Estado modular</h2>
            </div>
          </div>
          <div className="module-status-list">
            {dashboardModuleStatus.map((item) => (
              <article className="module-status-row" key={item.module}>
                <div>
                  <h3>{item.module}</h3>
                  <p>{item.action}</p>
                </div>
                <div className="module-status-progress" aria-label={`Avance ${item.progress}%`}>
                  <span style={{ width: `${item.progress}%` }} />
                </div>
                <strong>{item.progress}%</strong>
                <span className={`risk-badge tone-${item.tone}`}>{item.status}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="dashboard-panel alert-control-panel">
          <div className="dashboard-panel-header">
            <div>
              <span className="eyebrow">Alertas críticas</span>
              <h2>Riesgos que requieren acción</h2>
            </div>
            <Badge tone="green">7 señales</Badge>
          </div>
          <div className="critical-alert-list">
            {criticalAlerts.map((alert) => (
              <article className="critical-alert-card" key={alert.text}>
                <span className={alert.severity === "Crítica" ? "alert-severity critical" : "alert-severity"}>
                  {alert.severity}
                </span>
                <div>
                  <strong>{alert.text}</strong>
                  <p>{alert.context}</p>
                </div>
                <button type="button">Crear tarea</button>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="dashboard-panel dashboard-task-panel">
        <div className="dashboard-panel-header">
          <div>
            <span className="eyebrow">Operación próxima</span>
            <h2>Tareas próximas</h2>
          </div>
          <button className="button button-outline" type="button">Ver calendario</button>
        </div>
        <div className="dashboard-task-table" role="table" aria-label="Tareas próximas del portafolio">
          <div className="dashboard-task-row dashboard-task-head" role="row">
            <span>Tarea</span>
            <span>Módulo</span>
            <span>Responsable</span>
            <span>Fecha límite</span>
            <span>Prioridad</span>
            <span>Estado</span>
          </div>
          {upcomingTasks.map((task) => (
            <div className="dashboard-task-row" role="row" key={task.name}>
              <strong>{task.name}</strong>
              <span>{task.module}</span>
              <span>{task.owner}</span>
              <span>{task.due}</span>
              <span className={task.priority === "Crítica" ? "risk-badge tone-red" : "risk-badge tone-amber"}>
                {task.priority}
              </span>
              <span>{task.status}</span>
            </div>
          ))}
        </div>
      </section>

      <p className="dashboard-responsible-note">
        Recomendaciones preliminares basadas en datos mock. Las decisiones legales, técnicas, financieras o de valoración deben revisarse con el experto competente.
      </p>
    </section>
  );
}

function DiagnosisFlow({ organization }) {
  const [step, setStep] = useState(0);
  const [orgType, setOrgType] = useState("Startup");
  const [country, setCountry] = useState("Colombia");
  const [industry, setIndustry] = useState("SaaS / inteligencia artificial");
  const [markets, setMarkets] = useState("Colombia, México, Estados Unidos");

  const steps = ["Perfil", "Activos", "Madurez", "Resultado"];

  return (
    <section className="portal-page">
      <div className="portal-page-header">
        <div>
          <span className="eyebrow">Onboarding estratégico</span>
          <h1>Diagnóstico inicial de propiedad intelectual</h1>
          <p>Configura el contexto de la organización para que IPilot recomiende módulos, tareas y rutas de escalamiento.</p>
        </div>
        <Badge tone="green">Organización: {organization}</Badge>
      </div>

      <div className="portal-stepper" role="tablist" aria-label="Pasos del diagnóstico">
        {steps.map((item, index) => (
          <button
            className={step === index ? "active" : ""}
            key={item}
            type="button"
            role="tab"
            aria-selected={step === index}
            onClick={() => setStep(index)}
          >
            <span>{index + 1}</span>
            {item}
          </button>
        ))}
      </div>

      {step === 0 && (
        <div className="portal-form-grid">
          <label>
            Perfil de organización
            <input defaultValue={organization} />
          </label>
          <label>
            Tipo de organización
            <select value={orgType} onChange={(event) => setOrgType(event.target.value)}>
              <option>Startup</option>
              <option>Empresa</option>
              <option>Universidad / OTRI</option>
              <option>Emprendedor</option>
              <option>Firma aliada</option>
            </select>
          </label>
          <label>
            País / jurisdicción
            <input value={country} onChange={(event) => setCountry(event.target.value)} />
          </label>
          <label>
            Industria
            <input value={industry} onChange={(event) => setIndustry(event.target.value)} />
          </label>
          <label className="wide-field">
            Mercados relevantes
            <input value={markets} onChange={(event) => setMarkets(event.target.value)} />
          </label>
        </div>
      )}

      {step === 1 && (
        <div className="portal-diagnosis-columns">
          <ChecklistPanel title="Activos existentes" items={assetChecklist} />
          <ChecklistPanel title="Trámites existentes" items={filingChecklist} />
          <ChecklistPanel title="Documentos disponibles" items={documentChecklist} />
        </div>
      )}

      {step === 2 && (
        <div className="portal-question-grid">
          {[
            "¿Existe una política interna de PI?",
            "¿La titularidad de empleados y contratistas está documentada?",
            "¿Hay inventario actualizado de marcas, software, datos e invenciones?",
            "¿Se revisan divulgaciones antes de publicar?",
            "¿El presupuesto de PI está proyectado a 12 meses?",
            "¿Hay reglas para uso de IA generativa y datos confidenciales?",
          ].map((question) => (
            <label key={question}>
              {question}
              <select defaultValue="Parcial">
                <option>No</option>
                <option>Parcial</option>
                <option>Sí</option>
              </select>
            </label>
          ))}
        </div>
      )}

      {step === 3 && (
        <div className="portal-result-layout">
          <article className="portal-result-card">
            <span className="eyebrow">Resultado simulado</span>
            <h2>Nivel de madurez: intermedio temprano</h2>
            <p>
              {orgType} con operación en {country} y mercados en {markets}. Hay activos relevantes, pero la evidencia de titularidad y el presupuesto requieren orden antes de escalar protección.
            </p>
            <div className="portal-score-row">
              <strong>62/100</strong>
              <span>Confianza media</span>
            </div>
          </article>
          <article className="portal-result-card">
            <h3>Riesgos iniciales</h3>
            <ul>
              <li>Software crítico sin cesiones completamente documentadas.</li>
              <li>Invención con posible divulgación antes de evaluar patentabilidad.</li>
              <li>Presupuesto de mantenimiento sin horizonte de 12 meses.</li>
            </ul>
          </article>
          <article className="portal-result-card">
            <h3>Ruta recomendada</h3>
            <ol>
              <li>Completar inventario vivo.</li>
              <li>Revisar titularidad y contratos.</li>
              <li>Evaluar prioridad de activos críticos.</li>
              <li>Preparar presupuesto y tareas.</li>
            </ol>
          </article>
          <article className="portal-result-card">
            <h3>Primeras tareas</h3>
            <ul>
              <li>Cargar contratos de cesión de desarrolladores.</li>
              <li>Crear disclosure de invención antes de publicar.</li>
              <li>Asignar responsable de presupuesto de PI.</li>
            </ul>
          </article>
          <article className="portal-result-card">
            <h3>Módulos recomendados</h3>
            <div className="portal-pill-list">
              <span>Inventario</span>
              <span>Gobernanza</span>
              <span>Evaluación</span>
              <span>Protección y documentos</span>
              <span>Presupuesto</span>
            </div>
          </article>
          <article className="portal-result-card">
            <h3>Cuándo escalar a experto</h3>
            <p>Escala cuando exista divulgación pública, conflicto marcario, presupuesto relevante, negociación de licencia, valoración formal o duda de titularidad.</p>
          </article>
        </div>
      )}

      <div className="portal-flow-actions">
        <button className="button button-outline" type="button" disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}>
          Volver
        </button>
        <button className="button button-primary" type="button" disabled={step === steps.length - 1} onClick={() => setStep((value) => Math.min(steps.length - 1, value + 1))}>
          Continuar
        </button>
      </div>
    </section>
  );
}

function ChecklistPanel({ title, items }) {
  return (
    <article className="portal-checklist-panel">
      <h3>{title}</h3>
      {items.map((item, index) => (
        <label key={item}>
          <input type="checkbox" defaultChecked={index < 3} />
          {item}
        </label>
      ))}
    </article>
  );
}

function PortalModuleScreen({ activeNav }) {
  const module = portalModules.find((item) => item.code === portalNavModuleCode[activeNav]);
  return (
    <section className="portal-page">
      <div className="portal-page-header">
        <div>
          <span className="eyebrow">Módulo preparado</span>
          <h1>{activeNav}</h1>
          <p>Esta sección queda conectada a la navegación principal para los siguientes subprompts. El contenido final se construirá sin reescribir el app shell.</p>
        </div>
      </div>
      <div className="portal-placeholder-grid">
        <article className="portal-placeholder-card">
          <h2>{module ? module.title : activeNav}</h2>
          <p>{module ? module.status : "Flujo base disponible para ampliar."}</p>
          <div className="portal-progress-bar"><span style={{ width: `${module?.progress ?? 28}%` }} /></div>
        </article>
        <article className="portal-placeholder-card">
          <h3>Próximas capacidades</h3>
          <ul>
            <li>Datos simulados por módulo.</li>
            <li>Acciones operativas conectadas al copiloto.</li>
            <li>Reportes, tareas y escalamiento experto.</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

createRoot(document.getElementById("root")).render(<App />);

