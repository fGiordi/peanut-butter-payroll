# Technical Assignment

Build a RESTAPI and a Front end that can CRUD Employees.
We want to be ablet to view the data using React JS and Node Backend.

## Criteria:

- [ ] Should be able to view all employees
- [ ] Should be able to select a record from the employees
- [ ] Should be able to add/update employee information
- [ ] Should be able to auto populate Gender and Full Name.
- [ ] Should be able to DELETE employee

## How to run the application:
- [ ] clone this repo
- [ ] run yarn to install the dependencies
- [ ] run yarn dev to run the server
- [ ] ** Ensure that you have the ENV variables in the backend, I have a sample file for you to see the example **
- [ ] Once the server is running, you can test the endpoints by pinging these routes
  - /api/v1/ -> GET
  - /api/v1/employees -> GET
  - / -> GET
- Once you have tested these endpoints using either your browswer or an HTTP client tool, you can spin up the client server found here [https://github.com/fGiordi/peanut-frontend]


## How to test the application:

- run yarn test to test the intergration tests.
- I am testing the following intergration test cases in my application
  - should get all employees/or can get all employees
  - should create /or can create an employee
  - should return an error when invalid or incomplete details is sent to the application.
- I am also testing
  - general route that does not exist
  - base / endpoint to make sure its all fine and returns a success.
- Intergration test is using in memory db for test cases to ensure integrity and consistency with my data and not interfere with real users information
  

## Technologies Used:

- Javascript
- Typescript
- Node JS
- Mongo DB

# By:

Giordi Fungula
