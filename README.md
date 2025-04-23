# 🎵 Amby Music
[🔗 Visit Live Website](https://ambymusic-ni9u.onrender.com)

**Amby Music** is a modern, responsive web app to showcase music videos, receive contact form submissions, and manage them via a secure admin dashboard.

This full-stack project uses:
- **Frontend**: React (hosted on Render)
- **Backend**: Node.js with Express, deployed to **AWS Lambda**
- **Database**: AWS DynamoDB
- **CI/CD**: GitHub Actions for automatic Lambda deployment

---

## 🚀 Features

- 🎬 **YouTube Gallery** – Browse and view music links in a responsive grid
- 📬 **Contact Form** – Visitors can send messages that get saved to DynamoDB
- 🔐 **Admin Panel** – Password-protected dashboard to:
  - Add or delete YouTube links
  - View and delete contact form responses

---

## 📦 Tech Stack

| Area        | Tech Used                     |
|-------------|-------------------------------|
| Frontend    | React, HTML/CSS, Render       |
| Backend     | Node.js, Express, serverless-http |
| Authentication | bcryptjs, jsonwebtoken     |
| Storage     | AWS DynamoDB                  |
| Deployment  | AWS Lambda (via GitHub Actions) |

---

## 🔑 Environment Variables

### For Lambda (`backend`)
These are set in the AWS Lambda console:

```
ADMIN_USERNAME=your_username
ADMIN_PASSWORD_HASh=your_Hashed_passowrd   
JWT_SECRET=your_secret_key
LINKS_TABLE=YourDynamoDBLinksTable
MESSAGES_TABLE=YourDynamoDBMessagesTable
AWS_REGION=us-east-2
```

### For React (`frontend`)
These are set on Render:
```
REACT_APP_API_URL=https://your-lambda-function-url.on.aws
```

---

## 🔐 Admin Credentials

To generate a hashed password for your admin panel:

```bash
node -e "console.log(require('bcryptjs').hashSync('your_password', 10))"
```

Copy the output and set it as `ADMIN_PASSWORD_HASH` in Lambda.

---

## 📤 Deployment

### 🔁 Frontend
- Automatically deployed to **Render** on push to `main`.

### ⚙️ Backend
- Packaged as a `zip` and deployed via **GitHub Actions** to AWS Lambda.
- The `deploy-lambda.yml` workflow runs on every push to `main`.

---

## 📄 License

MIT © 2025 [ravneet0628](https://github.com/ravneet0628)
