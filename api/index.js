import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import { createTasks, deleteTasks, fetchTasks, updateTasks } from "./task.js";
const app = express();
const port = 3001;

app.use(express.json()); // middleware - grab the body of the request

if (process.env.DEVELOPMENT) {
  app.use(cors());
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/task", async (req, res) => {
  try {
    const tasks = await fetchTasks();
    res.send(tasks.Items);
  } catch (err) {
    res.status(400).send(`Error fetching tasks: ${err}`);
  }
});

app.post("/task", async (req, res) => {
  try {
    const tasks = req.body;
    const response = await createTasks(tasks);
    res.send(response);
  } catch (err) {
    res.status(400).send(`Error creating tasks: ${err}`);
  }
});

app.put("/task", async (req, res) => {
  try {
    const tasks = req.body;
    const response = await updateTasks(tasks);
    res.send(response);
  } catch (err) {
    res.status(400).send(`Error updating tasks: ${err}`);
  }
});

app.delete("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteTasks(id);
    res.send(response);
  } catch (err) {
    res.status(400).send(`Error deleting tasks: ${err}`);
  }
});

if (process.env.DEVELOPMENT) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

export const handler = serverless(app);
