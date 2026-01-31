import React, { useState, useEffect } from 'react';

const resourceTypes = ['Tutorial Link', 'YouTube Link', 'PYQ', 'Notes', 'PYQ Book'];

function SubjectResources() {
  const [semester, setSemester] = useState('');
  const [branch, setBranch] = useState('');
  const [subject, setSubject] = useState('');
  const [resources, setResources] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    if (semester && branch && subject) {
      setLoading(true);
      setError(null);

      // 
      const url = `/api/resources?semester=${semester}&branch=${branch}&subject=${encodeURIComponent(subject)}`;

      fetch(url)
        .then(res => {
          if (!res.ok) throw new Error('Network response was not ok');
          return res.json();
        })
        .then(data => {
          
          setResources(data);
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to fetch resources');
          setLoading(false);
        });
    } else {
      setResources({});
    }
  }, [semester, branch, subject]);

  return (
    <div style={{ padding: 20, maxWidth: 800 }}>
      <h1>hello pagal</h1>
      <h2>Find Resources</h2>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <select value={semester} onChange={(e) => setSemester(e.target.value)}>
          <option value="">Select Semester</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
        <select value={branch} onChange={(e) => setBranch(e.target.value)}>
          <option value="">Select Branch</option>
          <option value="CS">CS</option>
          <option value="IT">IT</option>
          <option value="EE">EE</option>
          <option value="ME">ME</option>
        </select>
        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option value="">Select Subject</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
        </select>
      </div>

      {loading && <p>Loading resources...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && subject && (
        <div>
          {resourceTypes.map((type) => (
            <div key={type} style={{ marginBottom: 20 }}>
              <h3>{type}s</h3>
              {resources[type] && resources[type].length > 0 ? (
                <ul>
                  {resources[type].map((res) => (
                    <li key={res.id}>
                      <a href={res.url} target="_blank" rel="noopener noreferrer">{res.title}</a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No {type.toLowerCase()} available.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SubjectResources;
