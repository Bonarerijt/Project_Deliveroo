def test_create_parcel(client, auth_headers):
    response = client.post(
        "/parcels/",
        json={
            "pickup_address": "123 Start St",
            "destination_address": "456 End Ave",
            "weight_category": "medium"
        },
        headers=auth_headers
    )
    assert response.status_code == 200
    assert response.json()["status"] == "pending"

def test_get_user_parcels(client, auth_headers):
    response = client.get("/parcels/", headers=auth_headers)
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_all_parcels_admin_only(client, auth_headers, admin_headers):
    # Regular user should get 403
    response = client.get("/parcels/all", headers=auth_headers)
    assert response.status_code == 403
    
    # Admin should succeed
    response = client.get("/parcels/all", headers=admin_headers)
    assert response.status_code == 200
