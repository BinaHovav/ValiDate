'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const cors_1 = __importDefault(require('cors'));
const db_1 = require('./config/db');
const users_1 = require('./routes/users');
const app = (0, express_1.default)();
const PORT = 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/users', users_1.router);
(0, db_1.connectDB)();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
