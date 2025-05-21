import express from 'express';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import users from './routes/users.js';

const app = express();

// Middleware: parse josn bodies
app.use(express.json());

// routers
app.use('/', indexRouter);
app.use('/users', usersRouter);

//error handler
app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({ error: err.message || 'Internal Server Error' });
});

//post - add a user
app.post('/add-users', (req, res) => {
    const { name } = req.body;
    if (!name) {
        const error = new Error('Name is required');
        error.status = 400;
        return next(error);
    }
    const newUser = {
        id: users.length + 1,
        name
    };
    users.push(newUser);

    res.json({ message: 'User created successfully', users })
}

);

//search a user by id
app.get('/users/:id', (req, res) => {
    res.json({ message: `User with id ${req.params.id} found` })
})

//search a user by name
app.get('/users/:name', (req, res) => {
    res.json({ message: `User found` })
})


app.listen(8080, () => {
    console.log('Server running at http://127.0.0.1:8080');
});
