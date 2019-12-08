# mini-wp

## **Deploy**
```
http://pressina.ayusudi.com/
```

---
## **Fitur** 
1. Search Title
2. Search Tag
3. Settings :
    - Edit Profile
    - Forgot Password
    - Delete All Article
4. Forgot Password Before Sign In

---

### **.env.template**
```
JWT_KEY=
DEFAULT_PS=
MONGOO_ATLAS=
PORT=
CLOUD_BUCKET=
GCLOUD_PROJECT=
KEYFILE_PATH=
PVKEY=
GOOGLE_CLIENT_ID=
SENDGRID_API_KEY= 
```

#  List of Routes API

## **Users Routes**
| HTTP   | Routes              | Headers  | Body                           | Description                       |
| ---    | -----               | ---      | ---                            | ---                               |
| POST   | /users/create       | none     | name,email, password           | Register new user                 |
| POST   | /users/login        | none     | email, password                | For login                         |
| POST   | /users/signGoogle   | none     | googleToken                    | For login with google signin      |
| GET    | /users/             | token    | none                           | Get user data (authentication)    |
| PUT    | /users/             | token    | name,email, image              | Update user data (authentication) |
| GET    | /users/forgotps     | none     | passsword                      | Get code to email                 |
| PATCH  | /users/forgotps     | none     | passsword                      | Edit password                     |
| PATCH  | /users/             | token    | passsword                      | Edit password (authentication)    |

## **Articles Routes**
- **all routes of articles require authentication exception upload**  

| HTTP   | Routes              | Headers  | Body                           | Description                         |
| ------ | ------------------- | ---      | ------------------------------ | ----------------------------------- |
| GET    | /articles/          | token    | none                           | To get all of user articles         |
| GET    | /articles/:id       | token    | none                           | Get one article  (authorization)    |
| POST   | /articles/          | token    | title,content,image(jpg),tags  | Create an article                   |
| POST   | /articles/upload    | none     | image(file.jpeg)               | For upload to google storage        |
| POST   | /articles/tag       | token    | tags                           | Get articles by tags                |
| POST   | /articles/search    | token    | title                          | Get article by title                |
| PUT    | /articles/:id       | token    | title,content,image(jpg),tags  | Edit one article   (authorization)  |
| DELETE | /articles/:id       | token    | none                           | Deleta one article (authorization)  |
| DELETE | /articles/          | token    | none                           | Delete all articles (authorization) |




---
# User Routes
## Register
- URL:  `/users/register`
- HTTP: `POST`
- Status Code:  **`200`**

Request (Example): 
```
{
	name : "Luffy Cat",
	email : "admin@mail.com"
	password : "12345678",
}
```

Respond (Example):
```
{
    "message": "Success Create",
    "user": {
        "_id": "5d7ed4b151c2590c1a35df25",
        "name": "Luffy Cat",
        "email": "admin@mail.com",
        "imasge": 'https://img.pngio.com/blank-avatarpng-avatar-png-486_489.png'
        "password": "$2a$10$CdMCLtFY2L3I5cbUx7//UuAbZXAoXDHWpCT6VYTQKy00kEgjTjXSO",
        "createdAt": "2019-09-16T00:17:54.136Z",
        "updatedAt": "2019-09-16T00:17:54.136Z",
    }
}
```

## Login
- URL:  `/users/login`
- HTTP: `POST`
- Status Code:  **`200`**

```
Request (Example): 
{
	email : "admin@mail.com",
	password : "12345678"
}
```

```
Respond (Example):
{
    "token": "eyJhbGciOiJIUzI1Ni,IsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDdlZDRiMTUxYzI1OTBjMWEzN"
}
```
## Get User
- URL:  `/users/`
- HTTP: `GET`
- Status Code:  **`200`**
```
Headers : 
{
     "token": "eyJhbGciOiJIUzI1Ni,IsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDdlZDRiMTUxYzI1OTBjMWEzN"
}
```
```
Respond (Example):
{
     "user": {
        "_id": "5d7ed4b151c2590c1a35df25",
        "name": "Luffy Cat",
        "email": "admin@mail.com",
        "image": 'https://img.pngio.com/blank-avatarpng-avatar-png-486_489.png'
        "password": "$2a$10$CdMCLtFY2L3I5cbUx7//UuAbZXAoXDHWpCT6VYTQKy00kEgjTjXSO",
        "createdAt": "2019-09-16T00:17:54.136Z",
        "updatedAt": "2019-09-16T00:17:54.136Z",
    }
}
```
## Update User
- URL:  `/users/`
- HTTP: `PUT`
- Status Code:  **`200`**
```
Headers : 
{
     "token": "eyJhbGciOiJIUzI1Ni,IsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDdlZDRiMTUxYzI1OTBjMWEzN"
}
```
```
Request :
{
    "name": "Luff Cat",
    "email": "admin@mail.com",
    "image": ***image file***
}
```
```
Respond (Example):
{
    message : 'Done edit'
}
```

## Update Password 
- URL:  `/users/`
- HTTP: `PATCH`
- Status Code:  **`200`**
```
Headers : 
{
     "token": "eyJhbGciOiJIUzI1Ni,IsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDdlZDRiMTUxYzI1OTBjMWEzN"
}
```
```
Request :
{
    password : **new password**
}
```
```
Respond (Example):
{
    message : 'Done edit'
}
```

## Update Password (unauthentication)
- URL:  `/users/forgotps`
- HTTP: `PATCH`
- Status Code:  **`200`**
```
Request :
{
    password : **new password**
}
```
```
Respond (Example):
{
    message : 'Done edit'
}
```

## Send Email Code Forgot Password
- URL:  `/users/forgotps`
- HTTP: `POST`
- Status Code:  **`200`**
```
Request :
{
    email : 'ayusudi.abc@gmail.com',
    html : **HTML send to email**
}
```
```
Respond (Example):
{
   message : `Pressina Sending Code To ayusudi.abc@gmail.com, please don't close this page`
}
```

---
# Article Routes

## Create Article
- URL: `/articles/`
- HTTP: 'POST'
- Status Code: **200**
- Authentication required
```
Headers : 
{
     "token": "eyJhbGciOiJIUzI1Ni,IsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDdlZDRiMTUxYzI1OTBjMWEzN"
}
```
```
Data : 
{
    "title": "rapunzel lay down your hair",
    "content": "stay up in the tower to keep her safe and sound dear, mother knows best!",
    "featured_image": "https://www.celebrationspress.com/wp-content/uploads/2017/12/120417Rapunzel-1024x576.jpg",
    "tags": ["disney","lover","mother"]
}

```
```
Response : 
{
    "message": "Success Create Article",
    "article": {
        "tags": [
            "disney",
            "lover",
            "mother"
        ],
        "_id": "5d9ac8dbb3a39b54c7791748",
        "title": "rapunzel lay down your hair",
        "content": "stay up in the tower to keep her safe and sound dear, mother knows best!",
        "author": "5d7e1536fd174e112977348b",
        "featured_image": "https://www.celebrationspress.com/wp-content/uploads/2017/12/120417Rapunzel-1024x576.jpg",
        "createdAt": "2019-10-07T05:10:52.000Z",
        "updatedAt": "2019-10-07T05:10:52.000Z"
    }
}
```

## Get Articles
- HTTP : 'GET'
- URL : '/articles/'
- Status Code: **200**
- Authentication required
```
Headers : 
{
     "token": "eyJhbGciOiJIUzI1Ni,IsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDdlZDRiMTUxYzI1OTBjMWEzN"
}
```
```
Response :
{
    "message": "List of Your Article",
    "articles": [
        {
            "tags": [
                "disney",
                "lover",
                "mother"
            ],
            "_id": "5d9ac8dbb3a39b54c7791748",
            "title": "rapunzel lay down your hair",
            "content": "stay up in the tower to keep her safe and sound dear, mother knows best!",
            "author": "5d7e1536fd174e112977348b",
            "featured_image": "https://www.celebrationspress.com/wp-content/uploads/2017/12/120417Rapunzel-1024x576.jpg",
            "createdAt": "2019-10-07T05:10:52.000Z",
            "updatedAt": "2019-10-07T05:10:52.000Z"
        }, ...
    ]
}
```

## Get One Article
- HTTP : 'GET'
- URL : '/articles/:id'
- Status Code: **200**
- Authentication required
```
Headers : 
{
     "token": "eyJhbGciOiJIUzI1Ni,IsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDdlZDRiMTUxYzI1OTBjMWEzN"
}
```
```
Response :
{
    "message": "Here is the article",
    "article": {
        "tags": [
            "disney",
            "lover",
            "mother"
        ],
        "_id": "5d9ac8dbb3a39b54c7791748",
        "title": "rapunzel lay down your hair",
        "content": "stay up in the tower to keep her safe and sound dear, mother knows best!",
        "author": "5d7e1536fd174e112977348b",
        "featured_image": "https://www.celebrationspress.com/wp-content/uploads/2017/12/120417Rapunzel-1024x576.jpg",
        "createdAt": "2019-10-07T05:10:52.000Z",
        "updatedAt": "2019-10-07T05:10:52.000Z"
    }
}
```

## Edit Article 
- HTTP : 'PUT'
- URL : '/articles/:id'
- Status Code: **200**
- Authentication required
```
Headers : 
{
     "token": "eyJhbGciOiJIUzI1Ni,IsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDdlZDRiMTUxYzI1OTBjMWEzN"
}
```
```
Data : 
{
    "title": "Tangled",
    "content": "stay up in the tower to keep her safe and sound dear, mother knows best!",
    "featured_image": "https://www.celebrationspress.com/wp-content/uploads/2017/12/120417Rapunzel-1024x576.jpg",
    "tags": ["disney"]
}
```
```
Response :
{
    "messange": "Success Updated"
}
```

## Get Tag Include
- HTTP : 'POST'
- URL : '/articles/tag'
- Status Code: **200**
- Authentication required
```
Headers : 
{
     "token": "eyJhbGciOiJIUzI1Ni,IsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDdlZDRiMTUxYzI1OTBjMWEzN"
}
```
```
Data :
{
    "tags": ["disney", "princess"]
}
```
```
Response :
[
    {
        "tags": [
            "disney",
            "lover",
            "mother",
            "princess"
        ],
        "_id": "5d9ac8dbb3a39b54c7791748",
        "title": "Tangled",
        "content": "stay up in the tower to keep her safe and sound dear, mother knows best!",
        "author": "5d7e1536fd174e112977348b",
        "featured_image": "https://www.celebrationspress.com/wp-content/uploads/2017/12/120417Rapunzel-1024x576.jpg",
        "createdAt": "2019-10-07T05:10:52.000Z",
        "updatedAt": "2019-10-07T06:01:01.088Z"
    },
    {
        "tags": [
            "disney",
            "princess"
        ],
        "_id": "5d9ad55ddc2ca157ef9c8837",
        "title": "I wish i have feet",
        "content": "so i can run and swimming too",
        "author": "5d7e1536fd174e112977348b",
        "featured_image": "https://www.celebrationspress.com/wp-content/uploads/2017/12/120417Rapunzel-1024x576.jpg",
        "createdAt": "2019-10-07T06:04:13.076Z",
        "updatedAt": "2019-10-07T06:04:13.076Z"
    }, ...
]
```


## Get Title
- HTTP : 'POST'
- URL : '/articles/search'
- Status Code: **200**
- Authentication required
```
Headers : 
{
     "token": "eyJhbGciOiJIUzI1Ni,IsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDdlZDRiMTUxYzI1OTBjMWEzN"
}
```
```
Data :
{
    "title": "Tangled"
}
```
```
Response :
[
    {
        "tags": [
            "disney",
            "lover",
            "mother",
            "princess"
        ],
        "_id": "5d9ac8dbb3a39b54c7791748",
        "title": "Tangled",
        "content": "stay up in the tower to keep her safe and sound dear, mother knows best!",
        "author": "5d7e1536fd174e112977348b",
        "featured_image": "https://www.celebrationspress.com/wp-content/uploads/2017/12/120417Rapunzel-1024x576.jpg",
        "createdAt": "2019-10-07T05:10:52.000Z",
        "updatedAt": "2019-10-07T06:01:01.088Z"
    }
]
```

## Delete One Article
- HTTP : 'DELETE'
- URL : '/articles/:id'
- Status Code: **200**
- Authentication required
```
Headers : 
{
     "token": "eyJhbGciOiJIUzI1Ni,IsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDdlZDRiMTUxYzI1OTBjMWEzN"
}
```

```
Response :
[
    {
        message: 'Success Deleted',
        _id : **id**
    }
]
```

## Delete All Articles
- HTTP : 'DELETE'
- URL : '/articles/'
- Status Code: **200**
- Authentication required
```
Headers : 
{
     "token": "eyJhbGciOiJIUzI1Ni,IsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDdlZDRiMTUxYzI1OTBjMWEzN"
}
```
```
Response :
[
    {
         message : 'Success Delete All Your Article'
    }
]
```

# Error List 
| Status  | Message               | Description                     |
| ---     | -----                 | ---                             |
| 400     | Bad Request           | Input invalid (**Validation**)  |
| 401     | Unauthorize           | Token invalid                   |
| 403     | Not Found             | Article/User id invalid         |
| 500     | Error Internal Server |                                 |

## Error Status 400
### User Validation
1. name is required
2. image is required
3. Email is required
4. Email must include @ and .
5. Email already exist (unique)
6. Password is required 
7. Password length minimum 6

## Article Validation
1. Title is required 
2. Title Maximum length is 35
3. Content is required
4. Content Minimal 12 characters
5. Author is required