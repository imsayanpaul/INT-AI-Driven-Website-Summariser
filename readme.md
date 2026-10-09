# Website Summariser - Indus Net Technologies Limited assignment 1

Small app that takes a URL and gives you a short summary of the page. Built with React + Vite on the frontend, Node/Express on the backend, and Groq for the actual summarising.

## Running it locally

You'll need Node installed and a Groq API key (free at console.groq.com).

Clone it:

```bash
git clone https://github.com/imsayanpaul/INT-AI-Driven-Website-Summariser.git
cd INT-AI-Driven-Website-Summariser
```

**Backend**

```bash
cd server
npm install
```

Create a `.env` in `server folder`:

```
GROQ_API_KEY=your_key_here
```

then

```bash
npm run dev
```

**Frontend** (in a second terminal, from the project root)

```bash
cd client
npm install
npm run dev
```

Vite will print a local URL (usually http://localhost:5173), open that.

## how AI was used

The server fetches the page you give it, pulls out the readable text, and sends that to a model on Groq with a prompt asking for a short summary. Whatever comes back gets sent to the frontend and shown under the form.
