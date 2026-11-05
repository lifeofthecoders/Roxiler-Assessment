
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const env = require('./config/env');
const healthRoute = require('./routes/health');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const storeOwnerRoutes = require('./routes/storeOwner');
const { errorHandler, sendResponse } = require('./middleware/errorHandler');

const app = express();

// ── Security ────────────────────────────────────
app.use(helmet());

const allowedOrigins = [
  env.clientUrl,
  'http://localhost:5173',
  'http://localhost:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);


// ── Body parsing ────────────────────────────────
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ── Logging ─────────────────────────────────────
if (env.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

// ── Routes (mounted on both /api/* and root /* for client flexibility) ──
app.use('/api/health', healthRoute);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/store-owner', storeOwnerRoutes);

// Fallback mounts in case client baseURL omits /api
app.use('/health', healthRoute);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/store-owner', storeOwnerRoutes);

// ── API Homepage ────────────────────────────────
app.get('/', (req, res) => {
  res.status(200).type('html').send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#080d1b" />
  <title>StoreRate API | Sumit Panchal</title>

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      min-height: 100vh;
      font-family: Arial, sans-serif;
      background: #080d1b;
      color: #f8fafc;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 30px 20px;
    }

    .welcome {
      position: fixed;
      inset: 0;
      z-index: 10;
      background: #080d1b;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      animation: welcomeExit 0.8s ease 2s forwards;
    }

    .welcome h1 {
      font-size: clamp(30px, 6vw, 58px);
      letter-spacing: 2px;
      text-align: center;
      animation: welcomeText 1.2s ease both;
    }

    .welcome p {
      color: #94a3b8;
      margin-top: 15px;
      letter-spacing: 4px;
      font-size: 12px;
      animation: fadeIn 1s ease 0.5s both;
    }

    .welcome span {
      color: #38bdf8;
    }

    @keyframes welcomeText {
      from { opacity: 0; transform: translateY(25px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes welcomeExit {
      to {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      }
    }

    .container {
      width: 100%;
      max-width: 850px;
      opacity: 0;
      transform: translateY(25px);
      animation: contentReveal 0.9s ease 2.4s forwards;
    }

    @keyframes contentReveal {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .header {
      text-align: center;
      margin-bottom: 35px;
    }

    .badge {
      display: inline-block;
      color: #38bdf8;
      background: #0c263b;
      border: 1px solid #164e63;
      padding: 8px 15px;
      border-radius: 30px;
      font-size: 12px;
      margin-bottom: 20px;
    }

    h2 {
      font-size: clamp(30px, 5vw, 46px);
      margin-bottom: 12px;
    }

    .subtitle {
      color: #94a3b8;
      line-height: 1.7;
    }

    .panel {
      background: #111a2d;
      border: 1px solid #26344d;
      border-radius: 16px;
      padding: 25px;
      margin-bottom: 18px;
    }

    .panel h3 {
      font-size: 17px;
      margin-bottom: 18px;
    }

    .status {
      color: #4ade80;
      font-weight: bold;
    }

    .status::before {
      content: "●";
      margin-right: 9px;
    }

    .details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .detail-label {
      color: #94a3b8;
      font-size: 12px;
      margin-bottom: 7px;
    }

    .detail-value {
      font-size: 15px;
      font-weight: 600;
      overflow-wrap: anywhere;
    }

    .endpoint {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
      padding: 13px 0;
      border-bottom: 1px solid #26344d;
    }

    .endpoint:last-child {
      border-bottom: none;
    }

    .endpoint code {
      color: #38bdf8;
      font-size: 13px;
      overflow-wrap: anywhere;
    }

    .method {
      color: #4ade80;
      font-size: 11px;
      font-weight: bold;
    }

    .footer {
      text-align: center;
      color: #64748b;
      font-size: 12px;
      margin-top: 30px;
      line-height: 1.8;
    }

    @media (max-width: 550px) {
      .details {
        grid-template-columns: 1fr;
      }

      .panel {
        padding: 20px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-delay: 0ms !important;
      }

      .container {
        opacity: 1;
        transform: none;
      }

      .welcome {
        display: none;
      }
    }
  </style>
</head>

<body>

  <section class="welcome">
    <h1>Welcome to <span>StoreRate API</span></h1>
    <p>STORE RATING MANAGEMENT SYSTEM</p>
  </section>

  <main class="container">

    <header class="header">
      <div class="badge">✦ BACKEND API SERVICES</div>
      <h2>StoreRate API</h2>
      <p class="subtitle">
        Store Rating Management System<br />
        Reliable REST API services for store ratings and management.
      </p>
    </header>

    <section class="panel">
      <h3>System Information</h3>

      <div class="details">
        <div>
          <p class="detail-label">API STATUS</p>
          <p class="detail-value status">Operational</p>
        </div>

        <div>
          <p class="detail-label">DEVELOPER</p>
          <p class="detail-value">Sumit Panchal</p>
        </div>

        <div>
          <p class="detail-label">APPLICATION</p>
          <p class="detail-value">Store Rating Management</p>
        </div>

        <div>
          <p class="detail-label">API TYPE</p>
          <p class="detail-value">REST API</p>
        </div>
      </div>
    </section>

    <section class="panel">
      <h3>Available API Endpoints</h3>

      <div class="endpoint">
        <code>/api/health</code>
        <span class="method">GET</span>
      </div>

      <div class="endpoint">
        <code>/api/auth</code>
        <span class="method">AUTH</span>
      </div>

      <div class="endpoint">
        <code>/api/admin</code>
        <span class="method">ADMIN</span>
      </div>

      <div class="endpoint">
        <code>/api/user</code>
        <span class="method">USER</span>
      </div>

      <div class="endpoint">
        <code>/api/store-owner</code>
        <span class="method">STORE OWNER</span>
      </div>
    </section>

    <footer class="footer">
      <p>Developed by Sumit Panchal</p>
      <p>StoreRate API · All systems operational</p>
    </footer>

  </main>

</body>
</html>
  `);
});


// ── 404 catch-all ───────────────────────────────
app.use((req, res) => {
  return sendResponse(res, 404, null, `Route not found: ${req.method} ${req.originalUrl}`);
});

// ── Global error handler (must be last) ─────────
app.use(errorHandler);

// ── Start server (only when executed directly) ──
if (require.main === module) {
  const autoInitDb = require('./config/initDb');

  autoInitDb()
    .catch((err) => {
      console.warn('⚠️ Non-fatal autoInitDb notice:', err.message);
    })
    .finally(() => {
      app.listen(env.port, () => {
        console.log(`\n🚀 Server running on http://localhost:${env.port}`);
        console.log(`   Environment: ${env.nodeEnv}`);
        console.log(`   Health check: http://localhost:${env.port}/api/health\n`);
      });
    });
}

module.exports = app;
