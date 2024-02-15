import express from 'express';
import './db/server.js';
import authRouter from './routes/authRouter.js';
import postsRouter from './routes/postRouter.js';
import { errorHandler } from './middlewares/ErrorHandler.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 8000;

// app.use(cors()); // Enable Cross-Origin-Resource Sharing
// app.use(cors({ origin: ['https://website.com', 'https://anotherwebsite.com'] }));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json()); // Parse incomming requests with JSON payloads
app.use(cookieParser()); // cookie-parser

// ROUTES
app.use('/auth', authRouter);
app.use('/posts', postsRouter);

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
