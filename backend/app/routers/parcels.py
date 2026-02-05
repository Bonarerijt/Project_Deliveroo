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

@router.post("/", response_model=ParcelResponse)
def create_parcel(
    parcel: ParcelCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Calculate distance and duration
    origin = (parcel.pickup_lat, parcel.pickup_lng)
    destination = (parcel.destination_lat, parcel.destination_lng)

    distance_info = maps_service.calculate_distance_matrix(origin, destination)

    if not distance_info:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not calculate route information"
        )
    
    distance_km = distance_info['distance']['value'] / 1000  # Convert to kilometers
    duration_mins = int(distance_info['duration']['value'] / 60)  # Convert to minutes as an integer

    # Calculate quote
    quote_amount = maps_service.calculate_quote(parcel.weight_category, distance_km)

    # Create parcel
    db_parcel = Parcel(
        user_id=current_user.id,
        pickup_address=parcel.pickup_address,
        destination_address=parcel.destination_address,
        pickup_lat=parcel.pickup_lat,
        pickup_lng=parcel.pickup_lng,
        destination_lat=parcel.destination_lat,
        destination_lng=parcel.destination_lng,
        weight_category=parcel.weight_category,
        quote_amount=quote_amount,
        distance_km=distance_km,
        duration_mins=duration_mins
    )

    db.add(db_parcel)
    db.commit()
    db.refresh(db_parcel)
    return db_parcel


@router.get("/")
def get_user_parcels(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    parcels = db.query(Parcel).filter(Parcel.user_id == current_user.id).all()


    # Convert to dict format to handle enum serialization
    result = []
    for parcel in parcels:
        result.append({
            "id": parcel.id,
            "user_id": parcel.user_id,
            "pickup_address": parcel.pickup_address,
            "destination_address": parcel.destination_address,
            "pickup_lat": parcel.pickup_lat,
            "pickup_lng": parcel.pickup_lng,
            "destination_lat": parcel.destination_lat,
            "destination_lng": parcel.destination_lng,
            "weight_category": parcel.weight_category.value if hasattr(parcel.weight_category, 'value') else str(parcel.weight_category),
            "quote_amount": parcel.quote_amount,
            "status": parcel.status.value if hasattr(parcel.status, 'value') else str(parcel.status),
            "present_location": parcel.present_location,
            "distance_km": parcel.distance_km,
            "duration_mins": parcel.duration_mins,
            "created_at": parcel.created_at.isoformat() if parcel.created_at else None,
            "updated_at": parcel.updated_at.isoformat() if parcel.updated_at else None
        })
    
    return result