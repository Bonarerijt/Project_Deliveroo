from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database.database import get_db
from app.models.parcel import Parcel
from app.models.user import User
from app.schemas.parcel import (
    ParcelCreate, ParcelResponse, ParcelUpdate, MapRoute
)
from app.services.auth import get_current_user, get_current_admin
from app.services.maps import maps_service
from app.services.email import email_service

router = APIRouter(prefix="/parcels", tags=["parcels"])

# @router.post("/", response_model=ParcelResponse)