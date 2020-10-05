/// <reference types="cypress" />
const resetUrl = 'http://localhost:3003/api/testing/reset'
const localUrl = 'http://localhost:3000'

Cypress.Commands.add('createBlog', ({ title, url, author, likes }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { author, title, url, likes },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
    }
  })
  cy.visit(localUrl)
})

Cypress.Commands.add('login',({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login',{
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedUser',JSON.stringify(body))
    cy.visit(localUrl)
  })
})

Cypress.Commands.add('createUser',({ username, name, password }) => {
  cy.request('POST', 'http://localhost:3003/api/users',{ username, name, password
  })
})

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', resetUrl)
    cy.createUser({ username: 'test123', name: 'testeri', password: 'test123' })
    cy.visit(localUrl)
  })

  it('Login from is shown', function() {
    cy.contains('Login')
  })

  describe('Login',function(){
    it('Test succesfull login',function(){
      cy.get('#username').type('test123')
      cy.get('#password').type('test123')
      cy.get('input:last').click()
    })

    it('Test invalid login',function(){
      cy.get('#logout-button').click()
      cy.get('#username').type('väärin')
      cy.get('#password').type('väärin')
      cy.get('input:last').click()
      cy.contains('invalid username or password')
    })
  })
  describe('When logged in', function(){
    beforeEach(function(){
      cy.login({ username: 'test123', password: 'test123' })
    })

    it('A blog can be created', function(){
      cy.contains('New Blog').click()
      cy.get('#author').type('test')
      cy.get('#url').type('test')
      cy.get('#title').type('test')
      cy.get('input:last').click()
      cy.contains('test test')
    })

    describe('and a blog exists', function(){
      beforeEach(function(){
        cy.createBlog({ author: 'test', url: 'test.com', title: 'testaamista' })
      })
      it('A blog can be liked',function(){
        cy.contains('Show').click()
        cy.contains('Like').click()
        cy.contains('Likes: 1')
      })

      it('A blog can be removed',function(){
        cy.contains('Show').click()
        cy.contains('remove').click()
        cy.contains('Blog Deleted!')
      })
    })

    describe('multiple blogs exist',function(){
      beforeEach(function(){
        cy.createBlog({ author: 'test', url: 'test.com', title: 'testaamista osa 1', likes: 10 })
        cy.createBlog({ author: 'test', url: 'test.com', title: 'testaamista osa 2', likes: 5 })
        cy.createBlog({ author: 'test', url: 'test.com', title: 'testaamista osa 3', likes: 300 })
      })
      it('check if blogs are in like order',function(){
        cy.get('#blogs').then(($test) => {
          cy.wrap($test).get('#'+$test.attr('id')+'>div').eq(0).contains('Show').click()
          cy.contains('Likes: 300')
          cy.wrap($test).get('#'+$test.attr('id')+'>div').eq(1).contains('Show').click()
          cy.contains('Likes: 10')
        })
        //cy.contains('testaamista osa 2').contains('Show').click()
        //cy.contains('testaamista osa 3').contains('Show').click()
      })
    })

  })

})



