import { useState } from "react";
import { summariseWebsite } from "./services/api";

function Spinner() {
  return (
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
  );
}

function SummaryCard({ data }) {
  return (
    <section className="mt-10 border-t border-slate-200 pt-8">
      <h2 className="text-xl font-bold">{data.title}</h2>
      <a
        href={data.url}
        target="_blank"
        rel="noreferrer"
        className="block break-all text-sm text-slate-500 hover:underline"
      >
        {data.url}
      </a>


      <p className="mt-5 whitespace-pre-line leading-7 text-slate-700">
        {data.summary.replace(/\*\*/g, "")}
      </p>
    </section>
  );
}

export default function App() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setErr("");
    setSummary(null);

    try {
      const res = await summariseWebsite(url.trim());
      setSummary(res);
    } catch (error) {
      console.error(error);
      setErr(error.message || "Couldn't summarise that page, try another link");
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-800">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">Website Summariser</h1>
          <p className="mt-2 text-slate-500">
            Paste a link and get a short summary of the page.
          </p>
        </header>

        <form onSubmit={handleSubmit}>
          <label htmlFor="url" className="mb-2 block text-sm font-medium">
            Website URL
          </label>

          <div className="flex gap-2">
            <input
              id="url"
              type="url"
              required
              placeholder="paste a website link"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-slate-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-md bg-slate-800 px-4 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-60"
            >
              {loading && <Spinner />}
              {loading ? "Working..." : "Summarise"}
            </button>
          </div>

          {err && <p className="mt-3 text-sm text-red-600">{err}</p>}
        </form>

        {loading && (
          <p className="mt-6 text-center text-sm text-slate-500">
            Reading the page, give it a few seconds...
          </p>
        )}

        {summary && <SummaryCard data={summary} />}


        <footer className="mt-10 text-center text-sm text-slate-400">
          INT Global First Flush Assignment · Sayan Paul · sayanpaul717@gmail.com
        </footer>
      </div>
    </main>
  );
}