Testing Salt on a mock user server
----------------------------------

To make user passwords more secure than typical dictionary pw
with - sha256 cryptographic hashing algorithm
Using npm js-sha256 module

- when user inputs a name and password + hits register, the server gives the user a random salt value
- users password is hashed on the server database with the random salt generated
- the users password + salt applied is all hashed and stored as a hashed value on the server
- with our mockTestServer everything is happening on frontend for test purpose - of course normally backend handles this

To reinstall this test file
---------------------------
- run npm install in this directory
- start the Wookie server - server needs to be running
