# Altica
[![Build Status](https://travis-ci.org/Diama1/Geeks-Avenue-Altica.svg?branch=develop)](https://travis-ci.org/Diama1/Geeks-Avenue-Altica)

**Altica** is an application which will help the users/clients to read and write blog post / articles in easy way.

#### Required Features

1. User can signup.
2. User can login.
3. User can create an article.
4. User can view a specific article.
5. User can update his/her own article.
6. User can delete his/her own article.
7. User can like a specific article.
8. User can unlike a specific article.
9. User can create a comment for specific article.
9. User can viewl all comments for a specific article.
10. User can update his/her own comment for a specific article.
11. User can delete a specific comment for a specific article.
12. User can view all likes for a specific article.
13. User can view all articles, he/she owns.
14. User can view a specific article ,he/she owns.
15. User can view a specific comment for a specific article

## Technologies

### Frontend
  - HTML
  - SASS , CSS
  - Javascript

### Backend
  - NodeJs
  - Express JS
  - Sequelize ORM
  - Mocha
  - Chai

## Endpoints

| HTTP Method | Endpoints                                       | Access  | Description                                                            |
|-------------|-------------------------------------------------|---------|------------------------------------------------------------------------|
| POST        | /api/v1/auth/signup                             | Public  | User will be able to create an account                                 |
| POST        | /api/v1/auth/signin                             | Public  | User will be able to make login                                        |
| POST        | /api/v1/articles                                | Private | User will be able to create a new article                              |
| GET         | /api/v1/articles/:id                            | Public  | User will be able to view a specific article                           |
| PATCH       | /api/v1/articles/:articleId                     | Private | User will be able to update his/her own article                        |
| DELETE      | /api/v1/articles/:articleId                     | Private | User will be able to delete his/her own article                        |
| PATCH       | /api/v1/articles/:articleId/like                | Private | User will be able to like a specific article                           |
| PATCH       | /api/v1/articles/:articleId/like                | Private | User will be able to unlike a specific article                         |
| POST        | /api/v1/articles/:id/comments                   | Private | User will be able to create a new comment for a specific article       |
| GET         | /api/v1/articles/:id/comments                   | Public  | User will be able to view all comments for a specific article          |
| PATCH       | /api/v1/articles/:articleId/comments/:commentId | Private | User will be able to update his/her own comment for a specific comment |
| GET         | /api/v1/articles/:id/comments/:commentId        | Public  | User will be able to view a specific comment for a specific article    |
| DELETE      | /api/v1/articles/:id/comments/:commentId        | Private | User will be able to delete his/her own comment for a specific comment |
| GET         | /api/v1/articles/:id/likes                      | Public  | User will be able to view all users who liked the articles             |
| GET         | /api/v1/articles/personal                       | Private | User will be able to view all story he/she owns                        |
| GET         | /api/v1/articles/personal/:articleId            | Private | User will be able to view a specific article he/she owns               |

#### Linter

* [ESLint](https://eslint.org/) - Linter Tool

#### Compiler

* [Babel](https://eslint.org/) - Compiler for Next Generation JavaScript.

## CONTRIBUTORS

- Elie Mugenzi
- Diane Mahoro
- Frank Mutabazi
- Audace Uhiriwe

