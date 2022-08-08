# Simple REST API
This is a simple REST API setup with CRUD functionality. It is build with node and express and the data is persisted on mongodb database.
This setup is an introductory project to REST APIs in general and does not have a lot of security and 
authentication setup.

The project is a simple User management system, where you can create, read, update and delete records of user. The project uses MVC architecture, thought the view is missing.(Will add it later)


# Before you start
Before you download and run the server, a few thing to keep in mind

## 1) Create a .env file
Create a .env file in the root directory of this project. Inside the .env file set up two variables, like so:
<br/>
<table>
    <tr>
        <td>PORT=3000</td>
        <td>Use port 3000 or any of your choosing</td>
    </tr>
    <tr>
        <td>MONGO_URI=mongodb://<br/>localhost:27017/YOUR_DB_NAME</td>
        <td>Give the name of your database OR set up a link to Mongodb atlas</td>
    </tr>
</table>

## 2) Install all the dependencies
Run the following command before you start the server
<table>
    <tr>
        <td>npm install</td>
        <td>To install the required dependencies</td>
    </tr>
    <tr>
        <td>npm run seed</td>
        <td>(OPTIONAL) If you want to populate the database before creating the server.</td>
    </tr>
    <tr>
        <td>npm start</td>
        <td>To start the server</td>
    </tr>
</table>

<br/>

## API END-POINTS

<table>
    <thead>
        <th>Path</th>
        <th>Method</th>
        <th>Body</th>
        <th>Result</th>
    </thead>
    <tbody>
        <tr>
            <td>/</td>
            <td>GET</td>
            <td></td>
            <td>Home Page</td>
        </tr>
        <tr>
            <td>/users</td>
            <td>GET</td>
            <td></td>
            <td>List of all the users.</td>
        </tr>
        <tr>
            <td>/users</td>
            <td>POST</td>
            <td>
                <p>{</p>
                    <p>name: "string",</p>
                    <p>email: "string@mail.com"</p>
                    <p>password: "string"</p>
                <p>}</p>
            </td>
            <td>Creates a new user.</td>
        </tr>
        <tr>
            <td>/users/:id</td>
            <td>GET</td>
            <td></td>
            <td>Get the user with the matching id.</td>
        </tr>
        <tr>
            <td>/users/:id</td>
            <td>PATCH</td>
            <td>
                <p>{</p>
                    <p>name: "string",</p>
                    <p>email: "string@mail.com"</p>
                    <p>password: "string"</p>
                <p>}</p>
            </td>
            <td>Updates the user info of the user with the matching id.</td>
        </tr>
        <tr>
            <td>/users/:id</td>
            <td>DELETE</td>
            <td></td>
            <td>Delets the user with the matching id.</td>
        </tr>
    </tbody>
</table>

                    
### More Info
[@Prajwal Gautam](https://github.com/prajwal18) (Author)


