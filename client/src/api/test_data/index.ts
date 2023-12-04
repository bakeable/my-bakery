export const testData = {
    '/customer': [{"id":1,"created_timestamp":"2023-12-04 15:40:10","name":"BakeAble","relation_number":0}],
    '/project': [{"id":1,"created_timestamp":"2023-12-04 15:40:10","customer_id":1,"customer_name":"BakeAble","description":"De administratie rondom BakeAble","name":"Administratie","progress":0,"status":"active","wage":0}],
    '/work_session': [{"id":1,"created_timestamp":"2023-12-04 15:00:00","earned_amount":0,"finished_timestamp":"2023-12-04 17:00:00","finish_time":"","hours":2,"project_id":1,"project_name":"Administratie","started_timestamp":"2023-12-04 09:00:00","start_time":"09:00"}],
    '/work_session/1': {"id":1,"created_timestamp":"2023-12-04 15:00:00","earned_amount":0,"finished_timestamp":"2023-12-04 17:00:00","finish_time":"","hours":2,"project_id":1,"project_name":"Administratie","started_timestamp":"2023-12-04 09:00:00","start_time":"09:00"},
    '/project/1/tasks': [{"title": "BTW Aangifte", "started_timestamp": "2023-12-04 09:00:00", "project_id": 1, "finished_timestamp": "2023-12-05 10:00:00", "hours": 1, "priority": 10, "status": "done", "description": "De BTW aangifte van BakeAble"}]
}