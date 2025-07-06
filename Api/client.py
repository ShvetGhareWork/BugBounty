import requests

# API endpoint
url = "http://127.0.0.1:8000/targets/"

# Data to send
data = {
    "name": "Laptop",
    "description": "High performance gaming laptop",
    "price": 125000.50
}

# POST request
response = requests.post(url, json=data)

# Output response
print("Status Code:", response.status_code)
print("Response JSON:", response.json())
