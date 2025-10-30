import { useEffect, useState } from 'react';
import apiClient from '../utils/apiClient.js';
import NavBar from '../components/NavBar.jsx';

function KnowledgePage() {
  const [term, setTerm] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      apiClient.get('/api/knowledge', { params: { term } }).then(({ data }) => setItems(data));
    }, 300);
    return () => clearTimeout(timeout);
  }, [term]);

  return (
    <div>
      <NavBar />
      <section className="knowledge">
        <h2>Knowledge Base</h2>
        <input placeholder="Search" value={term} onChange={(e) => setTerm(e.target.value)} />
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default KnowledgePage;
