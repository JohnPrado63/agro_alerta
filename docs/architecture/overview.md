# Arquitectura inicial

## Responsabilidades

- `frontend`: presentación, navegación y consumo de la API.
- `backend/app/api`: contratos HTTP y OpenAPI.
- `backend/app/core`: configuración, errores y reglas transversales.
- `backend/app/database`: sesión SQLAlchemy y base declarativa.
- `backend/app/models`: entidades persistentes.
- `backend/app/schemas`: contratos Pydantic adicionales de cada módulo.
- `backend/app/repositories`: acceso especializado a datos.
- `backend/app/services`: casos de uso y lógica de aplicación.
- `intelligence`: experimentación, preparación y evaluación de modelos.
- `data`: almacenamiento por etapas del pipeline ETL.

## Decisiones

- PostgreSQL se ejecuta con la imagen PostGIS desde el inicio para permitir evolución geoespacial.
- La API expone `/api/v1/health` y se documenta automáticamente con Swagger.
- El dashboard inicial usa datos demostrativos y no afirma procedencia real.
- Los modelos SQLAlchemy modelan solo entidades base; las coordenadas reales no se inventan.
- Los secretos y URLs se toman de variables de entorno.
