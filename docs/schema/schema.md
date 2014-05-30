# API description
## Instance
schema for one instance

### Attributes
<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
    <th>Example</th>
  </tr>
  <tr>
    <td><strong>createTime</strong></td>
    <td><em>uuid</em></td>
    <td>when instance was created</td>
    <td><code>"2012-01-01T12:00:00Z"</code></td>
  </tr>
  <tr>
    <td><strong>database</strong></td>
    <td><em>uuid</em></td>
    <td>database name of instance</td>
    <td><code>"db-name"</code></td>
  </tr>
  <tr>
    <td><strong>description</strong></td>
    <td><em>uuid</em></td>
    <td>description of instance</td>
    <td><code>"Basic: Dedicate server, shared VM, 256MB memory, 2560MB storage, 30 connections"</code></td>
  </tr>
  <tr>
    <td><strong>id</strong></td>
    <td><em>uuid</em></td>
    <td>unique identifier of instance</td>
    <td><code>"01234567-89ab-cdef-0123-456789abcdef"</code></td>
  </tr>
  <tr>
    <td><strong>password</strong></td>
    <td><em>uuid</em></td>
    <td>user password of instance</td>
    <td><code>"12345678"</code></td>
  </tr>
  <tr>
    <td><strong>type</strong></td>
    <td><em>uuid</em></td>
    <td>MSSQL 2012</td>
    <td><code>""</code></td>
  </tr>
</table>

### Instance Create
Create a new instance.

```
POST /instances
```


#### Curl Example
```term
$ curl -n -X POST https://api.hello.com/instances
```

#### Response Example
```
HTTP/1.1 201 Created
```
```javascript```
{
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "type": "",
  "description": "Basic: Dedicate server, shared VM, 256MB memory, 2560MB storage, 30 connections",
  "database": "db-name",
  "password": "12345678",
  "createTime": "2012-01-01T12:00:00Z"
}
```
### Instance Delete
Delete an existing instance.

```
DELETE /instances/{instance_id}
```


#### Curl Example
```term
$ curl -n -X DELETE https://api.hello.com/instances/$INSTANCE_ID
```

#### Response Example
```
HTTP/1.1 200 OK
```
```javascript```
{
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "type": "",
  "description": "Basic: Dedicate server, shared VM, 256MB memory, 2560MB storage, 30 connections",
  "database": "db-name",
  "password": "12345678",
  "createTime": "2012-01-01T12:00:00Z"
}
```
### Instance Info
Info for existing instance.

```
GET /instances/{instance_id}
```


#### Curl Example
```term
$ curl -n -X GET https://api.hello.com/instances/$INSTANCE_ID
```

#### Response Example
```
HTTP/1.1 200 OK
```
```javascript```
{
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "type": "",
  "description": "Basic: Dedicate server, shared VM, 256MB memory, 2560MB storage, 30 connections",
  "database": "db-name",
  "password": "12345678",
  "createTime": "2012-01-01T12:00:00Z"
}
```
### Instance List
List existing instances.

```
GET /instances
```


#### Curl Example
```term
$ curl -n -X GET https://api.hello.com/instances
```

#### Response Example
```
HTTP/1.1 200 OK
```
```javascript```
[
  {
    "id": "01234567-89ab-cdef-0123-456789abcdef",
    "type": "",
    "description": "Basic: Dedicate server, shared VM, 256MB memory, 2560MB storage, 30 connections",
    "database": "db-name",
    "password": "12345678",
    "createTime": "2012-01-01T12:00:00Z"
  }
]
```
### Instance Update
Update an existing instance.

```
PATCH /instances/{instance_id}
```


#### Curl Example
```term
$ curl -n -X PATCH https://api.hello.com/instances/$INSTANCE_ID
```

#### Response Example
```
HTTP/1.1 200 OK
```
```javascript```
{
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "type": "",
  "description": "Basic: Dedicate server, shared VM, 256MB memory, 2560MB storage, 30 connections",
  "database": "db-name",
  "password": "12345678",
  "createTime": "2012-01-01T12:00:00Z"
}
```

## User
Schema for one user

### Attributes
<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
    <th>Example</th>
  </tr>
  <tr>
    <td><strong>created_at</strong></td>
    <td><em>string</em></td>
    <td>when user was created</td>
    <td><code>"2012-01-01T12:00:00Z"</code></td>
  </tr>
  <tr>
    <td><strong>id</strong></td>
    <td><em>string</em></td>
    <td>unique identifier of user</td>
    <td><code>"01234567-89ab-cdef-0123-456789abcdef"</code></td>
  </tr>
  <tr>
    <td><strong>updated_at</strong></td>
    <td><em>string</em></td>
    <td>when user was updated</td>
    <td><code>"2012-01-01T12:00:00Z"</code></td>
  </tr>
</table>

### User Create
Create a new user.

```
POST /users
```


#### Curl Example
```term
$ curl -n -X POST https://api.hello.com/users
```

#### Response Example
```
HTTP/1.1 201 Created
```
```javascript```
{
  "created_at": "2012-01-01T12:00:00Z",
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "updated_at": "2012-01-01T12:00:00Z"
}
```
### User Delete
Delete an existing user.

```
DELETE /users/{user_id}
```


#### Curl Example
```term
$ curl -n -X DELETE https://api.hello.com/users/$USER_ID
```

#### Response Example
```
HTTP/1.1 200 OK
```
```javascript```
{
  "created_at": "2012-01-01T12:00:00Z",
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "updated_at": "2012-01-01T12:00:00Z"
}
```
### User Info
Info for existing user.

```
GET /users/{user_id}
```


#### Curl Example
```term
$ curl -n -X GET https://api.hello.com/users/$USER_ID
```

#### Response Example
```
HTTP/1.1 200 OK
```
```javascript```
{
  "created_at": "2012-01-01T12:00:00Z",
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "updated_at": "2012-01-01T12:00:00Z"
}
```
### User List
List existing users.

```
GET /users
```


#### Curl Example
```term
$ curl -n -X GET https://api.hello.com/users
```

#### Response Example
```
HTTP/1.1 200 OK
```
```javascript```
[
  {
    "created_at": "2012-01-01T12:00:00Z",
    "id": "01234567-89ab-cdef-0123-456789abcdef",
    "updated_at": "2012-01-01T12:00:00Z"
  }
]
```
### User Update
Update an existing user.

```
PATCH /users/{user_id}
```


#### Curl Example
```term
$ curl -n -X PATCH https://api.hello.com/users/$USER_ID
```

#### Response Example
```
HTTP/1.1 200 OK
```
```javascript```
{
  "created_at": "2012-01-01T12:00:00Z",
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "updated_at": "2012-01-01T12:00:00Z"
}
```


