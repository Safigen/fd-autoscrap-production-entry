import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.SITE_PASSWORD + '-jwt-secret';

app.use(cors({ origin: true }));
app.use(express.json());

app.post('/api/verify', (req, res) => {
  const { password } = req.body;

  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Password is required' });
  }

  if (password !== process.env.SITE_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const token = jwt.sign({ verified: true }, JWT_SECRET, { expiresIn: '7d' });
  return res.json({ token });
});

app.get('/api/check', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ valid: false });
  }

  try {
    jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    return res.json({ valid: true });
  } catch {
    return res.status(401).json({ valid: false });
  }
});

app.listen(PORT, () => {
  // Server ready
});
