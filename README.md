The frontend part is done using angular and the backend part is done using ExpressJS.
Follow these steps to get the Db , FE and BE up and running:

1. First, ensure Docker Desktop is installed. Then pull the official postgres image using the command `docker pull postgres`. Run Postgres in docker with the following command:
    `$ docker run --name postgres_db -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres`

2. Node needs be installed in the machine which will be running frontend or backend. So before going to the next steps, ensure that node is installed.

3. If the DB is up and running, create the required tables and dummy data using the commands stored in the file in `backend/sql/script.ps1`. Alternatively, you can just right click the file and choose 'run with powershell'. IF you copy paste the commands in the terminal, please make sure that you change your cd to `{project folder}/backend/sql/`

4. Then, backend API server needs to be started. HEad over to `/backend` and run `npm i`. After the dependencies are installed properly, run `npm run start:dev`

5. After the DB and backend API server is running, start the front end server by heading over to `/disaster-management-fe` folder and executing `npm i`. Then, if you don't have angular cli installed, install angular cli first using `npm install -g @angular/cli`. Finally, execute `ng serve` to run the front end. You should be able to access the app in localhost:4200


If you have followed step 3, then you can login as an admin using the following credentials:
phone : 01818793261
password : mysecretpassword

and you can login as a volunteer with the following credentials:
phone : 01626123456
password : turhaana