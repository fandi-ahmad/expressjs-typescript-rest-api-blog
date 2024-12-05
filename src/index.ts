import { register } from 'tsconfig-paths'
import express, { Request, Response } from "express";
import createError from "http-errors"
import { errorHandler } from "./middlewares/errorHandler";
import routes from "./routes/routes"

register()    // <-- for import @
const app = express()
app.use(express.json())

// Routes
app.use(routes)

// handle 404 error
app.use((req: Request, res: Response, next: Function) => {
  next(createError(404))
})

// Error handling middleware
app.use(errorHandler);

app.listen(8888, () =>
  console.log(`⚡️[server]: Server is running at https://localhost:8888`)
)