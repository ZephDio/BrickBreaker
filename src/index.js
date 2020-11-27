// const http = require("http");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const Account = require("./Account.js");

const express = require("express");

const server = express();

//server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(express.static(path.join(__dirname, "..", "public")));

server.post("/register", (req, res) => {
  const contact = new Account(
    req.body.email,
    req.body.username,
    req.body.password,
    req.body.confirmPassword
  );
  console.log(contact);
  if (contact.isAccountValid()) {
    res.write("Account valided");
  } else {
    res.write("Account not valid");
  }
  res.end();
});

server.listen(8000);
