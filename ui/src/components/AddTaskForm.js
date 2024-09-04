import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { API_URL } from "../utils";

function AddTaskForm(fetchTasks) {
  const [newTask, setNewTask] = useState("");

  const addNewTask = async () => {
    try {
      await axios.post(API_URL, {
        name: newTask,
        completed: false,
      });

      await fetchTasks();

      setNewTask("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Typography align="center" variant="h2" paddingTop={2} paddingBottom={2}>
        My Task List
      </Typography>
      <div className="addTaskForm">
        <TextField
          size="small"
          variant="outlined"
          label="task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button disabled={!newTask} variant="outlined" onClick={addNewTask}>
          <AddIcon />
        </Button>
      </div>
    </div>
  );
}

export default AddTaskForm;
