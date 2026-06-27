# IPilot Landing Website

Landing comercial responsive para IPilot, una plataforma SaaS con IA asistiva para inventariar, priorizar, presupuestar, proteger y monetizar activos de propiedad intelectual.

## Tech stack

- Vite
- React
- CSS modular sin backend
- Assets locales de marca IPilot

## Instalación local

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Build de producción

```bash
npm run build
```

La salida de producción se genera en `dist`.

## Preview local

```bash
npm run preview
```

## Deployment recomendado

### Opción 1: Vercel

```bash
npm install
npm run build
npx vercel --prod
```

Configuración:

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`

### Opción 2: Netlify

```bash
npm install
npm run build
npx netlify deploy --prod --dir=dist
```

Configuración:

- Build command: `npm run build`
- Publish directory: `dist`

### Opción 3: GitHub Pages

```bash
npm install
npm run build
npm run deploy:gh-pages
```

También puedes publicar manualmente la carpeta `dist` desde la configuración de Pages del repositorio.

## Variables de entorno

No se requieren variables de entorno. La landing es frontend-only y no usa API keys privadas.

## Assets de marca

Los logos de IPilot se encuentran en `public/assets`. Provienen del ZIP de marca suministrado por el usuario.

## Botones de contacto

Los botones de demo, diagnóstico y portal son placeholders de navegación/contacto. Pueden conectarse posteriormente a un formulario, CRM o portal real.

## Disclaimer de IA responsable

IPilot presenta recomendaciones preliminares con IA asistiva. No reemplaza abogados, agentes de patentes, expertos técnicos, contadores, valoradores ni asesores financieros. Las decisiones sensibles deben revisarse con expertos competentes según jurisdicción, evidencia disponible y nivel de riesgo.
