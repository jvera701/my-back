const express = require("express");
const app =  express.Router()
import {login, register} from "./user.controller"

app.get("/login", login)
app.post("/register", register)
export  {app}