curl -X POST http://localhost:4040/api/customer \
     -H 'Content-Type: application/json' \
     -d '{"name": "Bordex", "relation_number": 2}'

printf "\n\n"
curl -X GET http://localhost:4040/api/customer  \
     -H 'Content-Type: application/json'

printf "\n\n"
curl -X POST http://localhost:4040/api/project \
     -H 'Content-Type: application/json' \
     -d '{"name": "rEvent", "customer_id": 1, "wage": 75.00, "status":"concept", "description": "A web app for recyclement planning"}'

printf "\n\n"
curl -X GET http://localhost:4040/api/project  \
     -H 'Content-Type: application/json'


printf "\n\n"
curl -X GET http://localhost:4040/api/project/1  \
     -H 'Content-Type: application/json'
printf "\n\n"