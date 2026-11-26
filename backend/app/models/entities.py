from datetime import date, datetime
from decimal import Decimal
from sqlalchemy import Date, DateTime, ForeignKey, Numeric, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from app.database.session import Base


class Department(Base):
    __tablename__ = "departments"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), unique=True)


class Province(Base):
    __tablename__ = "provinces"
    id: Mapped[int] = mapped_column(primary_key=True)
    department_id: Mapped[int] = mapped_column(ForeignKey("departments.id", ondelete="RESTRICT"))
    name: Mapped[str] = mapped_column(String(100))


class District(Base):
    __tablename__ = "districts"
    id: Mapped[int] = mapped_column(primary_key=True)
    province_id: Mapped[int] = mapped_column(ForeignKey("provinces.id", ondelete="RESTRICT"))
    name: Mapped[str] = mapped_column(String(100))


class WeatherStation(Base):
    __tablename__ = "weather_stations"
    id: Mapped[int] = mapped_column(primary_key=True)
    district_id: Mapped[int] = mapped_column(ForeignKey("districts.id", ondelete="RESTRICT"))
    code: Mapped[str] = mapped_column(String(50), unique=True)
    name: Mapped[str] = mapped_column(String(150))
    source: Mapped[str] = mapped_column(String(100))


class ClimateRecord(Base):
    __tablename__ = "climate_records"
    id: Mapped[int] = mapped_column(primary_key=True)
    station_id: Mapped[int] = mapped_column(ForeignKey("weather_stations.id", ondelete="RESTRICT"))
    observed_at: Mapped[date] = mapped_column(Date)
    temperature_min: Mapped[Decimal | None] = mapped_column(Numeric(5, 2))
    temperature_max: Mapped[Decimal | None] = mapped_column(Numeric(5, 2))
    precipitation: Mapped[Decimal | None] = mapped_column(Numeric(8, 2))


class Crop(Base):
    __tablename__ = "crops"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), unique=True)


class AgriculturalStatistic(Base):
    __tablename__ = "agricultural_statistics"
    id: Mapped[int] = mapped_column(primary_key=True)
    district_id: Mapped[int] = mapped_column(ForeignKey("districts.id", ondelete="RESTRICT"))
    crop_id: Mapped[int] = mapped_column(ForeignKey("crops.id", ondelete="RESTRICT"))
    campaign: Mapped[str] = mapped_column(String(20))
    planted_area: Mapped[Decimal | None] = mapped_column(Numeric(12, 2))
    harvested_area: Mapped[Decimal | None] = mapped_column(Numeric(12, 2))
    production: Mapped[Decimal | None] = mapped_column(Numeric(12, 2))
    yield_value: Mapped[Decimal | None] = mapped_column(Numeric(12, 2))


class DatasetImport(Base):
    __tablename__ = "dataset_imports"
    id: Mapped[int] = mapped_column(primary_key=True)
    original_filename: Mapped[str] = mapped_column(String(255))
    stored_path: Mapped[str] = mapped_column(String(500))
    source_name: Mapped[str] = mapped_column(String(100))
    status: Mapped[str] = mapped_column(String(30))
    imported_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))


class DataQualityReport(Base):
    __tablename__ = "data_quality_reports"
    id: Mapped[int] = mapped_column(primary_key=True)
    import_id: Mapped[int] = mapped_column(ForeignKey("dataset_imports.id", ondelete="CASCADE"))
    duplicate_count: Mapped[int]
    missing_count: Mapped[int]
    inconsistency_count: Mapped[int]
    details: Mapped[str] = mapped_column(Text)


class AgroclimateAlert(Base):
    __tablename__ = "agroclimate_alerts"
    id: Mapped[int] = mapped_column(primary_key=True)
    district_id: Mapped[int] = mapped_column(ForeignKey("districts.id", ondelete="RESTRICT"))
    alert_type: Mapped[str] = mapped_column(String(50))
    risk_level: Mapped[str] = mapped_column(String(20))
    status: Mapped[str] = mapped_column(String(20))
    generated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))


class ModelVersion(Base):
    __tablename__ = "model_versions"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    version: Mapped[str] = mapped_column(String(30))
    artifact_path: Mapped[str] = mapped_column(String(500))
    metrics: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    __table_args__ = (UniqueConstraint("name", "version", name="uq_model_name_version"),)


class Recommendation(Base):
    __tablename__ = "recommendations"
    id: Mapped[int] = mapped_column(primary_key=True)
    alert_id: Mapped[int] = mapped_column(ForeignKey("agroclimate_alerts.id", ondelete="CASCADE"))
    crop_id: Mapped[int] = mapped_column(ForeignKey("crops.id", ondelete="RESTRICT"))
    action: Mapped[str] = mapped_column(Text)
    justification: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
