const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// ミドルウェア
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// メモリ内に投稿を保存（簡易実装）
let posts = [];
let postIdCounter = 1;

// 投稿一覧を取得
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// 新しい投稿を作成
app.post('/api/posts', (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: '名前とメッセージは必須です' });
  }

  const newPost = {
    id: postIdCounter++,
    name: name.trim(),
    message: message.trim(),
    date: new Date().toISOString(),
    createdAt: new Date().toISOString()
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`サーバーが起動しました: http://localhost:${PORT}`);
});

