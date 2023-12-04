curl -X POST http://localhost:4040/api/customer \
     -H 'Content-Type: application/json' \
     -d '{"name": "BakeAble", "relation_number": 0}'

printf "\n\n"
curl -X GET http://localhost:4040/api/customer  \
     -H 'Content-Type: application/json'

printf "\n\n"
curl -X POST http://localhost:4040/api/project \
     -H 'Content-Type: application/json' \
     -d '{"name": "Administratie", "customer_id": 1, "wage": 0.00, "status":"active", "description": "De administratie rondom BakeAble"}'

printf "\n\n"
curl -X GET http://localhost:4040/api/project  \
     -H 'Content-Type: application/json'


printf "\n\n"
curl -X GET http://localhost:4040/api/project/1  \
     -H 'Content-Type: application/json'

printf "\n\n"
curl -X POST http://localhost:4040/api/work_session \
     -H 'Content-Type: application/json' \
     -d '{"start_time": "09:00", "started_timestamp": "2023-12-04 09:00:00", "project_id": 1, "finish_time": null, "finished_timestamp": "1970-01-01 00:00:00", "hours": null }'

printf "\n\n"
curl -X GET http://localhost:4040/api/work_session \
     -H 'Content-Type: application/json' \
