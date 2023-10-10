## User Signup API

**Route**: `POST /signup`

**Description**: Register a new user with user_name, user_email, and user_password.

**Request Body**:
```json
{
  "user_name": "string",
  "user_email": "string",
  "user_password": "string"
}
Responses:

200 OK: User registered successfully
json
Copy code
{
  "msg": "New user has been registered Successfully"
}
400 Bad Request: Registration failed
json
Copy code
{
  "error": "Error message"
}
500 Internal Server Error: Internal server error
json
Copy code
{
  "error": "Error message"
}
User Login API
Route: POST /login

Description: Authenticate a user by checking their email and password.

Request Body:

json
Copy code
{
  "user_email": "string",
  "user_password": "string"
}
Responses:

200 OK: Login successful
json
Copy code
{
  "msg": "Login Succesfull",
  "AcessToken": "string",
  "username": "string"
}
400 Bad Request: Login failed
json
Copy code
{
  "msg": "Password is incorrect"
}
404 Not Found: Email does not exist
json
Copy code
{
  "msg": "Email does not exist"
}
500 Internal Server Error: Internal server error
json
Copy code
{
  "error": "Error message"
}
Insert User Data API
Route: POST /insert

Description: Insert a new user's data with user_name, user_email, user_password, and user_image.

Request Body:

json
Copy code
{
  "user_name": "string",
  "user_email": "string",
  "user_password": "string",
  "user_image": "string"
}
Responses:

200 OK: New user data has been added Successfully
json
Copy code
{
  "msg": "New user data has been added Successfully"
}
400 Bad Request: Data insertion failed
json
Copy code
{
  "error": "Error message"
}
500 Internal Server Error: Internal server error
json
Copy code
{
  "error": "Error message"
}
Get All User Data API
Route: GET /allData

Description: Retrieve all user data from the database.

Responses:

200 OK: Successfully retrieved all user data
json
Copy code
{
  "msg": []
}
400 Bad Request: Data retrieval failed
json
Copy code
{
  "error": "Error message"
}
500 Internal Server Error: Internal server error
json
Copy code
{
  "error": "Error message"
}
Get User Details by User ID API
Route: GET /details/:user_id

Description: Retrieve user details by providing the user ID as a parameter.

Responses:

200 OK: Successfully retrieved user details
json
Copy code
{
  "user_data": {}
}
404 Not Found: User not found
json
Copy code
{
  "error": "User not found"
}
500 Internal Server Error: Internal server error
json
Copy code
{
  "error": "Error message"
}
Get User Image by User ID API
Route: GET /image/:user_id

Description: Retrieve the user image URL by providing the user ID as a parameter.

Responses:

200 OK: Successfully retrieved user image URL
json
Copy code
{
  "user_data": "string"
}
404 Not Found: User not found
json
Copy code
{
  "error": "User not found"
}
500 Internal Server Error: Internal server error
json
Copy code
{
  "error": "Error message"
}
Update User Data by User ID API
Route: PUT /update/:user_id

Description: Update user data by providing the user ID as a parameter and the new data in the request body.

Request Body:

json
Copy code
{
  // Updated user data fields
}
Responses:

200 OK: User data updated successfully
json
Copy code
{
  "msg": "User data has been updated from the database"
}
500 Internal Server Error: Internal server error
json
Copy code
{
  "error": "Error message"
}
Delete User by User ID API
Route: DELETE /delete/:user_id

Description: Delete a user by providing the user ID as a parameter.

Responses:

200 OK: User deleted successfully
json
Copy code
{
  "msg": "User deleted from database"
}
500 Internal Server Error: Internal server error
json
Copy code
{
  "error": "Error message"
}
User Login API (Session Update)
Route: POST /userLogin

Description: Authenticate a user by checking their email and password and update the last login timestamp.

Request Body:

json
Copy code
{
  "user_email": "string",
  "user_password": "string"
}
Responses:

200 OK: Login successful
json
Copy code
{
  "msg": "Login successfull"
}
400 Bad Request: Login failed
json
Copy code
{
  "msg": "Password is incorrect"
}