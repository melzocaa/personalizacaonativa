# TaskMaster ✨

**Organize. Planeje. Conquiste.**

O TaskMaster é um aplicativo mobile de gerenciamento de tarefas, desenvolvido para ajudar na organização da rotina, no acompanhamento de atividades e no planejamento do dia a dia.

Com uma interface moderna e delicada, o aplicativo busca tornar a produtividade mais simples e agradável.

---

## 🌸 Identidade Visual

O TaskMaster possui uma identidade visual baseada em tons suaves de rosa e lilás, transmitindo leveza, organização e simplicidade.

- Ícone personalizado para o aplicativo.
- Splash Screen com a identidade visual da marca.
- Interface adaptada para dispositivos móveis.
  <img width="875" height="664" alt="Captura de tela 2026-11-13 135013" src="https://github.com/user-attachments/assets/04ebda31-2bbc-4652-8fd2-61b8aef7b869" />
  <img width="664" height="661" alt="Captura de tela 2026-11-13 135139" src="https://github.com/user-attachments/assets/36ca123f-ea06-4064-ba86-bede1336d60a" />

## 🚀 Tecnologias utilizadas

- React
- Vite
- Tailwind CSS
- Capacitor
- JavaScript
- Android
- GitHub Actions

## 📱 Recursos

- Interface mobile.
- Organização e gerenciamento de tarefas.
- Identidade visual personalizada.
- Ícone e tela de abertura nativos para Android.
- Geração automatizada do APK utilizando GitHub Actions.

## ⚙️ Como executar o projeto

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta:

```bash
cd taskmaster-tailwind
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

## 📦 Gerar o aplicativo Android

Compile o projeto:

```bash
npm run build
```

Sincronize com o Android:

```bash
npx cap sync android
```

Gere os recursos nativos:

```bash
npx capacitor-assets generate --android
```

## 🤖 Build automatizado

O projeto utiliza GitHub Actions para automatizar a compilação do aplicativo Android.

Após enviar as alterações ao GitHub, o workflow executa o processo de build e disponibiliza o APK como artefato para download.

## 🎯 Objetivo do projeto

O objetivo do TaskMaster é desenvolver uma aplicação mobile que una organização, praticidade e uma experiência visual agradável, aplicando conhecimentos de desenvolvimento React, integração com Capacitor e personalização nativa Android.

---

**TaskMaster — Sua rotina, mais organizada.** 💗
