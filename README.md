<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Tiny Store

## Summary

## Description

This API was created in NestJS and it works like a product store, it as two user types and depending of the role, the use has some access.

## Installation

* Clone this repository.
* Read dependencies section.
* Install every dependency running `npm install`.
* Create a *dotenv* file with the variables specficied in enverionment section.

## Dependencies

Listed on [packages.json](./package.json)

## Environment

This API needs the next environment variables. 

| Variable |
|---|
| JWT_SECRET |
| SALT |
| DATABASE_URL |

## Entities

The base of the API are **users** and **products** so, these are the schemas that are handled

### User schema

```
model User {
  id            Int     @id                       @default(autoincrement())
  email         String  @unique
  password      String
  role          Role    @default(CLIENT)

  recovery      String?  @db.Uuid

  cart          Cart?
  cartId        Int?

  favorites     Favorites[]

  orders        Order[]
}

```

### Product schema

```
model Product {
  SKU           Int       @id                   @default(autoincrement())
  name          String    @db.VarChar(50)
  description   String    @db.VarChar(150)
  stock         Int
  image         String?
  available     Boolean   @default(true)
  price         Int
  category      String    @default("UNCATEGORIZED")

  cart          ProductsOnCarts[]
  favorites     Favorites[]
  orders        ProductsOnOrders[]
}

```

There are another schemas that you can follow in [prisma schemas](./prisma/schema.prisma)

## Endpoints

Endpoints are documented in [Insomnia](https://insomnia.rest/download) client, you can see the endpoint in our [docs](./docs/ravn-challenge.json) and in swagger
