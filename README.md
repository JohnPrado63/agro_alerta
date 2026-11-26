# AGROALERTA

Plataforma web modular para monitoreo climático, análisis agrícola y preparación de alertas agroclimáticas en la región Ayacucho, Perú.

> Esta primera etapa es una base técnica. Los indicadores visuales son DEMO/SIMULADOS y no representan datos reales ni alertas oficiales.

## Arquitectura

- Frontend: React 19, TypeScript, Vite, Tailwind CSS, Recharts, React Router y Axios.
- Backend: Python, FastAPI, Pydantic, SQLAlchemy y Alembic.
- Datos: PostgreSQL/PostGIS.
- Inteligencia: Pandas, NumPy y Scikit-learn preparados para etapas posteriores.
- Infraestructura: Docker Compose.
- Pruebas: Pytest y Vitest.

```text
AGROALERTA/
├── frontend/src/          # UI, rutas, layouts, páginas y servicios
├── backend/app/           # API, configuración, base de datos y modelos
├── backend/migrations/    # Migraciones Alembic
├── backend/tests/         # Pruebas del backend
├── data/                  # Etapas raw, staging, processed y external
├── intelligence/          # Notebooks y futuros pipelines predictivos
├── database/              # Scripts y documentación de base de datos
├── docs/                  # Arquitectura, API, base de datos y datasets
└── infrastructure/docker/ # Recursos adicionales de infraestructura
```

## Requisitos

- Node.js 22 o superior
- Python 3.13 o superior
- Docker Desktop
- PostgreSQL opcional si no se usa Docker

## Configuración

1. Copiar `.env.example` como `.env`.
2. Ajustar la URL de PostgreSQL y los orígenes CORS.
3. Instalar las dependencias:

```powershell
cd frontend
npm install
cd ..\backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## Ejecución local

Backend:

```powershell
cd backend
uvicorn app.main:app --reload
```

Frontend:

```powershell
cd frontend
npm run dev
```

Abrir `http://localhost:5173`. La documentación API estará en `http://localhost:8000/docs`.

## Docker Compose

```powershell
docker compose up --build
```

Servicios:

- Frontend: `http://localhost:5173`
- API: `http://localhost:8000`
- Swagger: `http://localhost:8000/docs`
- PostgreSQL/PostGIS: `localhost:5432`

## Migraciones

```powershell
cd backend
alembic upgrade head
alembic revision --autogenerate -m "descripcion"
```

## Pruebas

```powershell
cd backend
pytest

cd ..\frontend
npm test
npm run build
```

## Estado actual

Completado: estructura base, dashboard profesional con datos demostrativos, rutas modulares, API `/health`, configuración CORS, modelos iniciales SQLAlchemy, preparación Alembic/PostGIS y Docker Compose.

Pendiente: cargas de datos oficiales, ETL, coordenadas y capas reales, entrenamientos predictivos, motor prescriptivo, autenticación y reportes.
