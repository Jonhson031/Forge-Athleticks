import dotenv from 'dotenv';
dotenv.config({ path: './config.env' }); 
import connectDB from './config/db.js';
process.on('uncaughtException', (err) => {
    console.error("💥 UNHANDLED EXCEPTION:", err);
    process.exit(1);
})
import app from './app.js';

connectDB();


const PORT = process.env.PORT || 3000; 
const server = app.listen(PORT, () => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`http://localhost:${PORT}`);
    }
});

process.on("unhandledRejection", (err) => {
    console.error("💥 UNHANDLED REJECTION:", err);

    server.close(() => {
        process.exit(1);
    });
});

