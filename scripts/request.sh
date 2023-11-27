curl -X POST http://localhost:4040/client \
     -H 'Content-Type: application/json' \
     -d '{"name": "Client Name", "relation_number": 2}'

curl -X GET http://localhost:4040/client  \
     -H 'Content-Type: application/json'

curl -X POST http://localhost:4040/project \
     -H 'Content-Type: application/json' \
     -d '{"name": "Project Name", "description": "Project description"}'

curl -X GET http://localhost:4040/project  \
     -H 'Content-Type: application/json'