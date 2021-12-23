const router = require('express').Router()
const emailController = require('./email.controller')


router.post('/' , emailController.collectEmail)

router.post('/confirm/:id',emailController.confirmEmail)

module.exports =router;