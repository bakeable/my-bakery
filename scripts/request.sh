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
curl -X PUT http://localhost:4040/api/project/1 \
     -H 'Content-Type: application/json' \
     -d '{"name": "Administratie", "customer_id": 1, "wage": 75.00, "status":"active", "description": "De administratie rondom BakeAble"}'

printf "\n\n"
curl -X GET http://localhost:4040/api/project  \
     -H 'Content-Type: application/json'


printf "\n\n"
curl -X GET http://localhost:4040/api/project/1  \
     -H 'Content-Type: application/json'

printf "\n\n"
curl -X POST http://localhost:4040/api/project/1/task \
     -H 'Content-Type: application/json' \
     -d '{"title": "BTW Aangifte", "started_timestamp": "2023-12-04 09:00:00", "project_id": 1, "finished_timestamp": "2023-12-04 10:00:00", "hours": 1, "priority": 10, "status": "done", "description": "De BTW aangifte van BakeAble"}'

printf "\n\n"
curl -X GET http://localhost:4040/api/project/1/task \
     -H 'Content-Type: application/json' \

printf "\n\n"
curl -X POST http://localhost:4040/api/work_session \
     -H 'Content-Type: application/json' \
     -d '{"start_time": "09:00", "started_timestamp": "2023-12-04 09:00:00", "project_id": 1, "finish_time": null, "finished_timestamp": "2023-12-04 17:00:00", "hours": 8 }'

printf "\n\n"
curl -X GET http://localhost:4040/api/work_session \
     -H 'Content-Type: application/json' \

printf "\n\n"
curl -X GET http://localhost:4040/api/metrics/dashboard \
     -H 'Content-Type: application/json' \
