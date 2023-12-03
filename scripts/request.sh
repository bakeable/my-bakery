curl -X POST http://localhost:4040/api/customer \
     -H 'Content-Type: application/json' \
     -d '{"name": "Customer Name", "relation_number": 2}'

curl -X GET http://localhost:4040/api/customer  \
     -H 'Content-Type: application/json'

curl -X POST http://localhost:4040/api/project \
     -H 'Content-Type: application/json' \
     -d '{"name": "Project Name", "customer_id": 1, "wage": 75, "description": "Project description"}'

curl -X GET http://localhost:4040/api/project  \
     -H 'Content-Type: application/json'