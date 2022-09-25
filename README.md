# phone-react 
Client server app based on React, Apollo and MongoDB

**WARNING:** This project is not intended fot production. This is a PoC, a proficiency test. Due to the deadlines, some shortcuts have been made that should not be used in a production application:
- In MongoDB the name is used as the identifier, not the OID or a numeric identifier.
- The REACT application makes many requests on the server.
- An exhaustive error study has not been carried out. This application could contain errors
- No load tests have been performed on the server.
- The efficiency of the REACT app has not been analysed.
- The web application layout has not been prioritised. 
- Responsive design has not been tested

## Technical stack
- Docker and Docker-compose
- MongoDB
- Apollo
- GraphQL (Queries and Mutations)
- React
  - React-query
  - Material UI (React)


## Usage

**FIRST:** change .env file located in react directory so it points to Apollo server IP, if needed.

$ docker-compose build

$ docker-compose up
