# task_management

to start the container: docker-compose up --build
to start the api in dev mode: npm run dev

api is live on: https://task-management-5kxk.onrender.com

# AUTH

signUp: POST /api/v1/auth/signup

{
    "name": "user 5",
    "email": "user5@gmail.com",
    "password": "123456",
    "confirm_password": "123456"
}


login: POST /api/v1/auth/login

{
    "email": "user3@gmail.com",
    "password": "123"
}

# Task

auth token: 
    Authorization: Bearer token

get all tasks: GET /api/v1/task/list

get task: GET /api/v1/task/:id

delete task: DELETE /api/v1/task/:id

update task: PATCH /api/v1/task/:id

{
    "title": "updated 65df93d359f3ea563f1b1ebd",
    "description": "updated 65df93d359f3ea563f1b1ebd",
    "due_date": "2024-09-09",
    "status": "COMPLETED"
}


add task: POST /api/v1/task/new

{
    "title": "task 16",
    "description": "description 16",
    "status": "LOW_PRIORITY",
    "due_date": "2024-09-09"
}

get task status: /api/v1/task/status

output: [
        "TO_DO",
        "TOP_PRIORITY",
        "LOW_PRIORITY",
        "HOLD",
        "CANCELLED",
        "COMPLETED"
    ]