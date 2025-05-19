# 🌟 Social Synth

**AI-powered social media automation platform that intelligently crafts, schedules, and posts platform-specific content.**

---

## 🚀 Overview

Social Synth is a generative AI SaaS product designed to revolutionize how creators, businesses, and marketers manage their social media presence. It uses ChatGPT to automatically generate platform-specific, tone-adaptive captions and intelligently schedule posts based on audience activity patterns — all from one unified dashboard.

---

## ❟ Problem Statement

Social media teams and solopreneurs often face:

* ⏳ Time-consuming, repetitive caption writing across platforms (Instagram, LinkedIn, Twitter/X)
* 🛌 Static and non-personalized post scheduling tools
* 🤖 Lack of intelligent insights or automation before/after publishing content

---

## 💡 Solution

Social Synth automates the content lifecycle using AI:

* ✅ Tone-aware caption generation tailored to each platform
* ✅ Predictive scheduling based on audience activity and platform trends
* ✅ Smart hashtag suggestions using contextual relevance
* ✅ One-click publishing and scheduling to multiple platforms
* ✅ Future: Pre-post performance prediction and analytics dashboard

---

## 🧱 Architecture & Tech Stack

* **Frontend**: Next.js (deployed via Vercel)
* **Backend**: Node.js + Express
* **Database**: PostgreSQL with Prisma ORM
* **AI Engine**: OpenAI GPT-4 (via API)
* **Queue System**: BullMQ for scheduling
* **Authentication**: LinkedIn (OAuth)
* **Integrations**: Slack, LinkedIn API, and other social media endpoints

---

## 🔧 Features in Progress

* [x] Project Setup and GitHub Integration
* [x] Slack App: Event listener & message ingestion
* [x] DB Models and Prisma setup
* [x] LinkedIn integration (underway)
* [ ] AI Embeddings + Vector Search (via Hugging Face)
* [ ] Caption Engine MVP
* [ ] Scheduler and BullMQ integration

---

## 📦 Installation (Local Setup)

```bash
git clone https://github.com/YOUR_USERNAME/social-synth.git
cd social-synth
npm install
npx prisma generate
npm run dev
```

Update `.env` with:

```
DATABASE_URL=
OPENAI_API_KEY=
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
SLACK_BOT_TOKEN=
```

---

## 📈 Roadmap

* 🔜 Platform-Adaptive Tone Tuning
* 🔜 HashtagAI Module
* 🔜 Post Timing Predictor
* 🔜 Unified Analytics Dashboard
* 🔜 Auto A/B testing
* 🔜 Browser Extension

---

## 🤝 Contributing

Coming soon! We’ll add open contribution guidelines after the MVP launch.

---

## 📄 License

This project is currently closed-source while in active development.

---

## 🧠 Built With ❤️ by Abdullah Basarvi
