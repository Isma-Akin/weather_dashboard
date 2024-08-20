const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const axios = require('axios');

module.exports = {
    port,
    app,
    path,
    express,
    axios,
}