import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import "./Home.css";

function Home() {

  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get("/admin/stats")
      .then(response => setStats(response.data))
      .catch(() => setStats(null));   // dashboard stats are a bonus, not required for the page to work
  }, []);

  return (
    <div>

      {/* ---- HERO ---- */}
      <section className="hero">
        <div className="hero-eyebrow">Daily Wage Labour Platform</div>
        <h1>
          Every worker logged.<br />
          Every rupee <span>accounted for.</span>
        </h1>
        <p className="sub">
          Replace the paper attendance register with a system that marks attendance,
          calculates wages, and tracks payments — automatically, for every site you run.
        </p>
        <div className="hero-actions">
          <Link to="/signup" className="btn-primary">Get Started</Link>
          <Link to="/Worker" className="btn-secondary">Find a Worker</Link>
        </div>
      </section>

      {/* ---- LIVE LEDGER STRIP ---- */}
      <div className="ledger">
        <div className="ledger-cell">
          <div className="ledger-label">Registered Workers</div>
          <div className="ledger-value">{stats ? stats.totalWorkers : "—"}</div>
        </div>
        <div className="ledger-cell">
          <div className="ledger-label">Present Today</div>
          <div className="ledger-value">{stats ? stats.presentToday : "—"}</div>
        </div>
        <div className="ledger-cell">
          <div className="ledger-label">Half Day Today</div>
          <div className="ledger-value">{stats ? stats.halfDayToday : "—"}</div>
        </div>
        <div className="ledger-cell">
          <div className="ledger-label">Wages Pending</div>
          <div className="ledger-value pending">
            {stats ? `₹${stats.totalWageDue}` : "—"}
          </div>
        </div>
      </div>

      {/* ---- THE PROBLEM (dark section, matching the real site) ---- */}
      <section className="section problem-section">
        <div className="section-heading">
          <span className="eyebrow problem-eyebrow">The Problem</span>
          <h2 className="problem-heading">The paper register breaks down fast</h2>
        </div>

        <div className="problem-grid">
          <div className="problem-card">
            <span className="problem-icon">📝</span>
            <h3>Manual errors</h3>
            <p>Attendance marked by hand leads to mistakes that are hard to catch or correct later.</p>
          </div>
          <div className="problem-card">
            <span className="problem-icon">🧮</span>
            <h3>Slow wage math</h3>
            <p>Calculating wages across many workers and days by hand takes time and invites mistakes.</p>
          </div>
          <div className="problem-card">
            <span className="problem-icon">🔍</span>
            <h3>No transparency</h3>
            <p>Workers and contractors can't easily agree on what's owed — leading to disputes.</p>
          </div>
          <div className="problem-card">
            <span className="problem-icon">🏗️</span>
            <h3>Multiple sites</h3>
            <p>Tracking the same worker across different sites and dates is hard on paper.</p>
          </div>
        </div>
      </section>

      {/* ---- TOOLBELT: what the platform does ---- */}
      <section className="section">
        <div className="section-heading">
          <span className="eyebrow">The Toolbelt</span>
          <h2>Everything a contractor needs on site</h2>
        </div>

        <div className="toolbelt">

          <div className="tool-card">
            <span className="tool-icon">📋</span>
            <h3>Attendance</h3>
            <p>Mark Present, Absent, or Half Day for every worker, every day — no more paper registers.</p>
            <Link to="/attendance">Mark attendance →</Link>
          </div>

          <div className="tool-card">
            <span className="tool-icon">🧮</span>
            <h3>Wage Calculation</h3>
            <p>Wages are calculated automatically from attendance and each worker's daily rate.</p>
            <Link to="/wages">Check wages →</Link>
          </div>

          <div className="tool-card">
            <span className="tool-icon">💵</span>
            <h3>Payment Tracking</h3>
            <p>Record every payout and always know exactly what's still pending per worker.</p>
            <Link to="/payments">Track payments →</Link>
          </div>

          <div className="tool-card">
            <span className="tool-icon">📊</span>
            <h3>Dashboard</h3>
            <p>See totals across every worker and every site — attendance, wages, and payments at a glance.</p>
            <Link to="/dashboard">Open dashboard →</Link>
          </div>

          <div className="tool-card">
            <span className="tool-icon">👷</span>
            <h3>Worker Directory</h3>
            <p>Add skilled and unskilled workers with their trade, rate, and contact details.</p>
            <Link to="/Worker">Browse workers →</Link>
          </div>

          <div className="tool-card">
            <span className="tool-icon">🤝</span>
            <h3>Hire on Demand</h3>
            <p>Customers can find and hire available workers directly — no phone calls needed.</p>
            <Link to="/Register">List a worker →</Link>
          </div>

        </div>
      </section>

      {/* ---- JOURNEYS ---- */}
      <section className="section">
        <div className="section-heading">
          <span className="eyebrow">How It Works</span>
          <h2>Two logins, one shared record</h2>
        </div>

        <div className="journeys">

          <div className="journey">
            <h3>👷 For Contractors</h3>
            <ol>
              <li>Sign up and add your workers with their trade and daily wage.</li>
              <li>Mark attendance each day — Present, Absent, or Half Day.</li>
              <li>Record payments as you make them and always see what's pending.</li>
            </ol>
          </div>

          <div className="journey">
            <h3>🧑‍🔧 For Customers</h3>
            <ol>
              <li>Browse available workers by trade — mason, electrician, plumber, carpenter.</li>
              <li>Check experience, daily rate, and availability on their profile.</li>
              <li>Contact directly by phone or WhatsApp, or send a hire request.</li>
            </ol>
          </div>

        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="home-cta">
        <h2>Start keeping a real record today</h2>
        <p>No paper. No disputes. Just an accurate account of every day worked.</p>
        <Link to="/signup" className="btn-primary">Create your account</Link>
      </section>

    </div>
  );
}

export default Home;
