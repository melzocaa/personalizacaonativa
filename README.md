# Taskflow — React + Tailwind CSS

Aplicativo de organização de tarefas com identidade visual em lavanda, rosa blush e tons claros.

## Executar

```bash
npm install
npm run dev
```

## Gerar build

```bash
npm run build
```

## Capacitor (Android)

O projeto já inclui `@capacitor/core`. Para adicionar Android depois de instalar as dependências:

```bash
npm install @capacitor/cli @capacitor/android
npx cap init Taskflow com.taskflow.app --web-dir=dist
npm run build
npx cap add android
npx cap sync android
npx cap open android
```

A interface usa Tailwind CSS v4 pelo plugin oficial do Vite. As tarefas são salvas no `localStorage` do dispositivo/navegador, então continuam disponíveis ao reabrir o app no mesmo dispositivo.
