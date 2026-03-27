# Vionex Flow

Modern project management platform built with React and TanStack ecosystem.

Vionex Flow è una piattaforma SaaS-style per la gestione di workspace, progetti e task, progettata per simulare un'applicazione reale con architettura moderna, autenticazione basata su JWT e gestione avanzata dello stato.

Il progetto è sviluppato come applicazione full-stack, con separazione tra frontend e backend e comunicazione tramite API.

---

## Overview

Vionex Flow consente agli utenti autenticati di:

- registrarsi e autenticarsi
- gestire l’accesso alle risorse tramite token JWT
- creare e gestire workspace
- organizzare progetti all’interno di workspace
- gestire task in modo strutturato

L'applicazione simula un contesto reale SaaS, includendo autenticazione, protezione delle risorse e sincronizzazione client-server.

---

## Tech Stack

Lo stack è stato scelto per simulare un’architettura SaaS reale, con una chiara separazione tra frontend e backend e un focus su performance e gestione consistente dei dati.

**Frontend**  
React con TypeScript per lo sviluppo di un’interfaccia mantenibile e fortemente tipizzata.

**Routing & Data Layer**  
TanStack Router per una gestione del routing type-safe e scalabile.  
TanStack Query per la gestione del server state, caching e sincronizzazione dei dati con il backend.

**Backend**  
Node.js ed Express utilizzati per la costruzione di API REST, con gestione della logica applicativa e della comunicazione client-server.

**Database**  
Supabase come database relazionale, utilizzato tramite Prisma ORM per garantire type safety e una gestione strutturata dei modelli.

**Validazione**  
Zod per la validazione runtime dei dati e la coerenza degli schemi applicativi.

**Styling & UI**  
Tailwind CSS per la creazione di interfacce responsive e consistenti.

**Tooling**  
ESLint e Prettier per la qualità del codice, Git e GitHub per il versionamento.

---

## Architettura

L'applicazione segue un'architettura modulare e scalabile:

- separazione tra frontend e backend
- comunicazione tramite API REST
- gestione del server state con TanStack Query
- routing type-safe con TanStack Router
- autenticazione basata su JWT
- protezione delle route lato client e server

---

## Features principali

- autenticazione utenti (login / register)
- gestione autenticazione tramite access token e refresh token
- refresh automatico dei token
- protezione delle route
- gestione workspace
- gestione progetti
- CRUD completo dei task
- data fetching ottimizzato con caching
- aggiornamenti reattivi dell’interfaccia
- interfaccia responsive

---

## Autenticazione & Sicurezza

Il sistema di autenticazione è progettato per simulare un ambiente reale:

- utilizzo di JWT access token per autorizzare le richieste API
- utilizzo di refresh token per mantenere l’utente autenticato
- meccanismo di refresh automatico alla scadenza dell’access token
- gestione centralizzata dei token lato client
- protezione delle route basata sullo stato di autenticazione

---

## Performance & UX

Particolare attenzione è stata data a:

- riduzione delle chiamate API tramite caching
- gestione degli stati di loading
- gestione degli errori lato client
- ottimizzazione del rendering React

---

## Scelte tecniche

TanStack Router  
Per un sistema di routing scalabile e type-safe.

TanStack Query  
Per gestire il server state e la sincronizzazione dei dati.

Architettura API REST  
Per separare frontend e backend e simulare un contesto reale.

Autenticazione JWT con refresh token  
Per gestire in modo sicuro e scalabile l’accesso alle risorse.

TypeScript  
Per migliorare robustezza e manutenibilità del codice.

---

## Contatti

LinkedIn: https://www.linkedin.com/in/federicomigliore  
GitHub: https://github.com/MrRobot-fm  
Email: federicomiglioredev@gmail.com
