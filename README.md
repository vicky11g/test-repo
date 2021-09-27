# test-repo
  
  Built using express and mongodb.

# pre-requisite
 monogo 3.4 or greater
 node 14 or greater
 
# usage:
 run `npm install ` from the projet root
 run `npm run start` to start the server at port 3000.
  

# API

  POST http://localhost:3000/user/create
  Content-Type: application/json

  {
    "name": "akhilesh",
    "username": "vicky121g",
    "password": "qwerty",
    "email": "vicky11g@gmail.com",
    "mobile": "9087654321"
  }

###
GET http://localhost:3000/user/vicky33g/get

###

POST http://localhost:3000/user/vicky11g/group/create
Content-Type: application/json

{
  "name": "group2"
}

###
GET http://localhost:3000/user/group1/groups

###
GET http://localhost:3000/user/groups

###
GET http://localhost:3000/user/add/vicky121g/groups/group2

###
POST http://localhost:3000/transaction/vicky11g/group1/group
Content-Type: application/json

{ 
  "groupname": "group2",
  "username": "vicky33g",
  "amount": 1000,
  "participants": {
  },
  "isAll": true
}

###
GET http://localhost:3000/transaction/vicky11g/group1/group

###
POST http://localhost:3000/transaction/settel/vicky11g/group1
Content-Type: application/json

{ 
  "amount": 1000
}

###
GET http://localhost:3000/transaction/settel/vicky22g/group1

###
GET http://localhost:3000/transaction/list/vicky33g/group2