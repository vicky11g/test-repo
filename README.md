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
  "username": "demo1",
  "password": "qwerty",
  "email": "vicky11g@gmail.com",
  "mobile": "9087654321"
}

###
GET http://localhost:3000/user/demo1/get

###

POST http://localhost:3000/user/demo1/group/create
Content-Type: application/json

{
  "name": "group5"
}

###
GET http://localhost:3000/user/group1/groups

###
GET http://localhost:3000/user/groups

###
GET http://localhost:3000/user/add/vicky33g/groups/group5

###
POST http://localhost:3000/transaction/demo1/group5/group
Content-Type: application/json

{ 
  "groupname": "group5",
  "username": "vicky33g",
  "amount": 1800,
  "participants": {
  },
  "isAll": true
}

###
GET http://localhost:3000/transaction/demo1/group5/group

###
POST http://localhost:3000/transaction/settel/vicky11g/group5
Content-Type: application/json

{ 
  "groupname": "group5",
  "username": "vicky11g",
  "amount": 1000
}

###
GET http://localhost:3000/transaction/settel/vicky11g/group2

###
GET http://localhost:3000/transaction/list/vicky11g/group5