# Lumen Finance

Lumen Finance is a household expense app focused on receipt ingestion, review, and budget visibility.

This repository starts with a monorepo structure for the first end-to-end user journey:

- mobile app for receipt upload and review
- Kotlin API for workflow orchestration
- Python extraction worker for OCR and AI integration
- PostgreSQL-ready migrations
- Docker Compose topology for local development

## Repository layout

```text
apps/
  api/
  extraction-worker/
  mobile/
infra/
```

## First implemented slice

The current codebase includes:

- a React Native + Expo mobile shell with the first receipt journey screens
- a Spring Boot Kotlin API with initial receipt and budget endpoints
- a FastAPI worker stub for receipt extraction
- initial SQL migrations for receipts and receipt items

## Next milestones

1. Replace in-memory API persistence with PostgreSQL repositories
2. Connect mobile upload and processing flow to the API
3. Replace mocked extraction with EasyOCR + local LLM orchestration
4. Add authentication and households later
