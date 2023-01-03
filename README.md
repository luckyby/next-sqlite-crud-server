# This is sqlite db server based on Next.js


### Database "users.db" has table "person" that contains informaition in the following form:

![](public/user-db.png)


### CRUD server has the next endpoints:

| Method  |  Endpoint   |    Description | request with:                                                                                                                                                                                                                                       |
|:--------|-----|-----|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| CREATE  | /api/person/restore   | Restore table "person" to original state | url: 'http://localhost:4003/api/person/restore' ;<br/>method:'POST';<br/>headers: 'Content-Type', 'application/json';<br/>body: JSON.stringify({<br/>&nbsp; &nbsp; 'login': 'admin',<br/>&nbsp; &nbsp; 'password': '5678'});<br/>redirect: 'follow' |
| CREATE  | /api/person    | Create one person with<br/> firstname, lastname, and role | url: 'http://localhost:4003/api/person' ;<br/>method:'POST';<br/>headers: 'Content-Type', 'application/x-www-form-urlencoded';<br/>body: '{'firstName':'Ben','lastName':'Rogers','role':'captain'}'<br/>redirect: 'follow'                          |
| READ    | /api/person    | Read all persons    | URL: 'http://localhost:4003/api/person' ;<br/>method:'GET';<br/>redirect: 'follow'                                                                                                                                                                  |
| READ    | /api/person/id/[id]   | Read one person by id | URL: 'http://localhost:4003/api/person/id/1' ;<br/>method:'GET';<br/>redirect: 'follow'""                                                                                                                                                           |
| UPDATE  | /api/person/id/[id]   | Update one person by id | URL: 'http://localhost:4003/api/person/id/1' ;<br/>method:'PATCH';<br/>headers: 'Content-Type':['application/x-www-form-urlencoded']};<br/>body: "{"firstName":"Peter","lastName":"Parker","role":"spider-man"}"<br/>redirect: 'follow'""           |
| DELETE  | /api/person/id/[id]   | Delete one person by id | URL: 'http://localhost:4003/api/person/id/1' ;<br/>method:'DELETE';<br/>redirect: 'follow'""                                                                                                                                                        |
| DELETE  | /api/person    | Delete all persons    | URL: 'http://localhost:4003/api/person' ;<br/>method:'DELETE';<br/>redirect: 'follow'""                                                                                                                                                             |

