
const express = require('express');
const { sendResponse } = require('../middleware/errorHandler');

const router = express.Router();

router.get('/', (req, res) => {
  const healthData = {
    status: 'healthy',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  };

  // Keep JSON responses for API clients and monitoring services.
  const acceptsHtml = req.accepts('html');

  if (!acceptsHtml) {
    return sendResponse(res, 200, healthData);
  }

  const uptime = healthData.uptime;
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = uptime % 60;

  const formattedUptime = `${hours}h ${minutes}m ${seconds}s`;

  return res.status(200).type('html').send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#080d1b" />
  <title>System Health | StoreRate API</title>

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      min-height: 100vh;
      padding: 30px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #080d1b;
      color: #f8fafc;
      font-family: Arial, sans-serif;
    }

    .welcome {
      position: fixed;
      inset: 0;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #080d1b;
      animation: welcomeExit 0.8s ease 2s forwards;
    }

    .welcome h1 {
      font-size: clamp(30px, 6vw, 58px);
      text-align: center;
      animation: welcomeText 1.2s ease both;
    }

    .welcome h1 span {
      color: #38bdf8;
    }

    .welcome p {
      margin-top: 15px;
      color: #94a3b8;
      font-size: 12px;
      letter-spacing: 4px;
      animation: fadeIn 1s ease 0.5s both;
    }

    @keyframes welcomeText {
      from {
        opacity: 0;
        transform: translateY(25px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
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
      margin-bottom: 35px;
      text-align: center;
    }

    .badge {
      display: inline-block;
      margin-bottom: 20px;
      padding: 8px 15px;
      border: 1px solid #164e63;
      border-radius: 30px;
      background: #0c263b;
      color: #38bdf8;
      font-size: 12px;
    }

    h2 {
      margin-bottom: 12px;
      font-size: clamp(30px, 5vw, 46px);
    }

    .subtitle {
      color: #94a3b8;
      line-height: 1.7;
    }

    .panel {
      margin-bottom: 18px;
      padding: 25px;
      border: 1px solid #26344d;
      border-radius: 16px;
      background: #111a2d;
    }

    .panel h3 {
      margin-bottom: 20px;
      font-size: 17px;
    }

    .status {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #4ade80;
      font-weight: bold;
    }

    .status-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #4ade80;
      box-shadow: 0 0 12px #4ade80;
      animation: pulse 1.8s infinite;
    }

    @keyframes pulse {
      50% { opacity: 0.4; }
    }

    .details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }

    .detail-label {
      margin-bottom: 8px;
      color: #94a3b8;
      font-size: 12px;
    }

    .detail-value {
      font-size: 16px;
      font-weight: 600;
      overflow-wrap: anywhere;
    }

    .endpoint {
      display: flex;
      justify-content: space-between;
      gap: 15px;
      padding: 14px 0;
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
      margin-top: 30px;
      color: #64748b;
      font-size: 12px;
      line-height: 1.8;
      text-align: center;
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
    <p>SYSTEM HEALTH MONITORING</p>
  </section>

  <main class="container">

    <header class="header">
      <div class="badge">✦ LIVE SYSTEM MONITORING</div>

      <h2>System Health</h2>

      <p class="subtitle">
        Store Rating Management System<br />
        Real-time backend service health information.
      </p>
    </header>

    <section class="panel">
      <h3>System Status</h3>

      <div class="details">

        <div>
          <p class="detail-label">CURRENT STATUS</p>
          <p class="status">
            <span class="status-dot"></span>
            Healthy
          </p>
        </div>

        <div>
          <p class="detail-label">SERVER UPTIME</p>
          <p class="detail-value">${formattedUptime}</p>
        </div>

        <div>
          <p class="detail-label">LAST CHECKED (UTC)</p>
          <p class="detail-value">${healthData.timestamp}</p>
        </div>

        <div>
          <p class="detail-label">SERVICE</p>
          <p class="detail-value">StoreRate API</p>
        </div>

      </div>
    </section>

    <section class="panel">
      <h3>Service Information</h3>

      <div class="details">
        <div>
          <p class="detail-label">API ENDPOINT</p>
          <p class="detail-value">/api/health</p>
        </div>

        <div>
          <p class="detail-label">HTTP RESPONSE</p>
          <p class="detail-value">200 OK</p>
        </div>

        <div>
          <p class="detail-label">DEVELOPER</p>
          <p class="detail-value">Sumit Panchal</p>
        </div>

        <div>
          <p class="detail-label">API TYPE</p>
          <p class="detail-value">REST API</p>
        </div>
      </div>
    </section>

    <section class="panel">
      <h3>Related Endpoints</h3>

      <div class="endpoint">
        <code>/</code>
        <span class="method">API HOME</span>
      </div>

      <div class="endpoint">
        <code>/api/health</code>
        <span class="method">GET</span>
      </div>
    </section>

    <footer class="footer">
      <p>Developed by Sumit Panchal</p>
      <p>StoreRate API · Health Monitoring</p>
    </footer>

  </main>

</body>
</html>
  `);
});

router.get('/init-db', async (req, res, next) => {
  try {
    const autoInitDb = require('../config/initDb');
    const force = req.query.force === 'true';
    const result = await autoInitDb(force);
    return sendResponse(res, 200, result, 'Database initialized successfully');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
