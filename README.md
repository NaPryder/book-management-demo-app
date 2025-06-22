# book-management-demo-app
Book management web app.



## Folder Structure
There're 2 application, 
1. **/frontend**, created by Nuxt Js
2. **/server**, created by Nest Js + Prisma and connect with Postgres database

Use __docker-compose.yml__ to run apps while development

___


## Start With Docker Compose
```shell
docker compose up -d --build
```
Make sure that container name "_server_" has run prisma migrate, if it not there's log display

1. Open bash execution in server container
```shell
docker exec -it server bash
```
2. run prisma migrate
```shell
$ npx prisma migrate
```

I've prepared some mockup initial book data as sql statement in `./server/initial-data/books.sql`
After database is ready, you can run that sql statement in _book_ table


### Backend Server
Implement under hexagonal architecture concept in `./server`

#### Explain ./server/src structure
```shell
src
├── books
│   ├── # Place books core concept
│   ├── adapter
│   │   ├── # Inbound adapter
│   │   ├── book.controllers.ts
│   │   ├── book.dto.ts
│   │   ├── # Outbound adapter
│   │   ├── book.prisma.repository.ts   # interact with prisma 
│   ├── domain
│   │   ├── book.model.ts       # Book entities, interfaces, types
│   │   ├── book.repository.ts  # Interface for repository
│   │   ├── book.usecases.ts    # Handle all book usecase
│   ├── book.module.ts      
├── cores
│   ├── # Place app configuration and settings
app.controller.ts   # Health check
app.module.ts      
main.ts             
```
