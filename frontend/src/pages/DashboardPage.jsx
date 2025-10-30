import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import apiClient from '../utils/apiClient.js';
import NavBar from '../components/NavBar.jsx';

function DashboardPage() {
  const [stats, setStats] = useState({ activeUsers: 0, messageCount: 0 });
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;
    apiClient.get('/api/analytics/overview').then(({ data }) => setStats(data));
  }, [token]);

  return (
    <div>
      <NavBar />
      <section className="dashboard">
        <h2>Weekly Overview</h2>
        <div className="cards">
          <article>
            <strong>{stats.activeUsers}</strong>
            <span>Active Users</span>
          </article>
          <article>
            <strong>{stats.messageCount}</strong>
            <span>Messages</span>
          </article>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
