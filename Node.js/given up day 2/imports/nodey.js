// index.js
// tiny habit tracker api
// made with node + express
// feels human, simple, clean

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

const DB_FILE = path.join(__dirname, 'habits.json');

function readHabits() {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveHabits(habits) {
  fs.writeFileSync(DB_FILE, JSON.stringify(habits, null, 2));
}

// homepage
app.get('/', (req, res) => {
  res.json({
    message: 'Habit Tracker API is running 🚀',
    routes: {
      getHabits: 'GET /habits',
      addHabit: 'POST /habits',
      completeHabit: 'PATCH /habits/:id',
      deleteHabit: 'DELETE /habits/:id'
    }
  });
});

// get all habits
app.get('/habits', (req, res) => {
  const habits = readHabits();
  res.json(habits);
});

// create a habit
app.post('/habits', (req, res) => {
  const habits = readHabits();

  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      error: 'Habit title is required'
    });
  }

  const newHabit = {
    id: Date.now(),
    title,
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString()
  };

  habits.push(newHabit);
  saveHabits(habits);

  res.status(201).json({
    message: 'Habit created',
    data: newHabit
  });
});

// mark habit complete
app.patch('/habits/:id', (req, res) => {
  const habits = readHabits();

  const habit = habits.find(h => h.id == req.params.id);

  if (!habit) {
    return res.status(404).json({
      error: 'Habit not found'
    });
  }

  habit.completed = true;
  habit.streak += 1;

  saveHabits(habits);

  res.json({
    message: 'Habit completed 🎉',
    data: habit
  });
});

// delete habit
app.delete('/habits/:id', (req, res) => {
  const habits = readHabits();

  const filtered = habits.filter(h => h.id != req.params.id);

  saveHabits(filtered);

  res.json({
    message: 'Habit deleted'
  });
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
