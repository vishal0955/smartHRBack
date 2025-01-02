import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB  from "./config/DB.js";


import EmployeeRoute from "./routes/EmployeeRoute.js";

// import userRoutes from "./routes/userRoutes.js";
// import errorHandling from "./middlewares/errorHandler.js";
// import createEmployeeTable from "./data/createEmployeeTable.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
// app.use("/api", userRoutes);

// Error handling middleware
// app.use(errorHandling);

//Create table before starting server
// createEmployeeTable();
const sequelize = connectDB();

app.use("/",EmployeeRoute)

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
// Testing POSTGRES Connection
const PORT = process.env.PORT || 3000;

sequelize.sync({ force: true })
    .then(() => {
        console.log('Database synced successfully!');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to sync database:', err);
    });



app.listen(port, () => {
  console.log(`Server is running on http:localhost:${port}`);
});