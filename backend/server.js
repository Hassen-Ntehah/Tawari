const express = require('express');
const fs = require('fs').promises;
const cors = require('cors');
const path = require('path');
const { spawn } = require('child_process'); 

const app = express();
const PORT = 3001;
const FILE_PATH = path.join(__dirname, 'users.json');
const corsOptions = {
  origin: 'http://localhost:5173',

}
app.use(cors(corsOptions));
app.use(express.json());

// --- Database Initialization ---
async function initializeDB() {
  try {
    await fs.access(FILE_PATH);
  } catch (error) {
    await fs.writeFile(FILE_PATH, '[]');
    console.log('Created new users_db.json file.');
  }
}
initializeDB();

// --- GET: Read Users ---
app.get('/api/users', async (req, res) => {
  try {
    const data = await fs.readFile(FILE_PATH, 'utf8');
    res.json(JSON.parse(data || '[]'));
  } catch (error) {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

// --- POST: Save Users ---
app.post('/api/users', async (req, res) => {
  try {
    const users = req.body;
    await fs.writeFile(FILE_PATH, JSON.stringify(users, null, 2));
    res.json({ message: 'Users database updated successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save to database' });
  }
});

// --- POST: Run Python Script ---
app.post('/api/run-news-report', (req, res) => {
   // 1. Extract the currentUser from the request body sent by React
  const { currentUser } = req.body; 

  if (!currentUser) {
    return res.status(400).json({ error: 'No user data provided' });
  }

  // 2. Convert the user object into a string so it can safely pass through the command line
  const userString = JSON.stringify(currentUser);
  const scriptPath = path.join(__dirname, 'GetUserCustomNews.py');
   // 3. Pass the user string as the argument to the Python script
  const pythonProcess = spawn('python3', [scriptPath, userString]);

  let pythonOutput = '';
  let pythonError = '';

  pythonProcess.stdout.on('data', (data) => {
    pythonOutput += data.toString();
  });
 
  pythonProcess.stderr.on('data', (data) => {
    pythonError += data.toString();
  });

  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`Python Error: ${pythonError}`);
      return res.status(500).json({ error: 'Python script failed to execute' });
     }
    
    res.json({ 
    message: 'Python script finished', 
      result: pythonOutput.trim() 
    });
  });
});


app.listen(PORT, () => {
  console.log(`Backend server is running at http://localhost:${PORT}`);
});