import requests
import json

# Test backend authentication
def test_auth():
    base_url = "http://localhost:8000"
    
    print("Testing Deliveroo Backend Authentication...")

    # Test health endpoint
    try:
        response = requests.get(f"{base_url}/health")
        if response.status_code == 200:
            print("✅ Health check passed")
        else:
            print("❌ Health check failed")
            return
    except Exception as e:
        print(f"❌ Cannot connect to backend: {e}")
        return