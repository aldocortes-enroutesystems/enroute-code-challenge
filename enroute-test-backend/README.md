# Back end

## Main requirements:

- Docker
- NPM v16(to  work with Apple m1)

***

In order to run mysql using docker:

Get the docker instance up and running by executing:
```
docker run -p 3306:3306 --name enroute-mysql -e MYSQL_ROOT_PASSWORD=pass -e MYSQL_DATABASE=example -d mysql:5.7
```

Clone the test_db
```
git clone https://github.com/datacharmer/test_db.git
```

Delete the .git file inside the test_db
```
cd test_db && rm -rf ./.git && cd ./../
```
Execute the testing db script
```
docker exec -i enroute-mysql mysql -u root --password=pass < ./test_db/employees.sql
```

*** 

## MySql setup with mock data
In order to use the cloned data we must to handle Docker to copy the files on the Dockekr instance and running the sql files from there following this steps:

1) Get the instance ID
```
docker ps
```

2) Copy the test_db folder into the instance by using the instance ID acquired in the step above:
```
docker cp test_db DOCKER_ID:/ 
```

3) Run the bash of the instance by running:
```
docker container exec -it enroute-mysql bash
```

4) Navigate to the copied folder:
```
cd test_db
```
5) Execute the sql  file
```
mysql -u root -p < employees.sql
```
6) Verify information:
```
mysql -u root -p < test_employees_md5.sql 
```

And that's it. The mock data will have to be available at the localhost:3306 when the docker instance is running.
*** 

The final step for getting the backend up and running is just to run:

```
npm install
```

And then:
```
npm run start
```


*****
If you want control the instance through the terminal:
```
docker container exec -it enroute-mysql bash
```

And then
```
mysql -u root -p
````

Type the password that setup previously, in this case, "pass".



For any comments, you can reach me at [aldo.cortes@enroutesystems.com](mailto:aldo.cortes@enroutesystems.com).


## THANKS!