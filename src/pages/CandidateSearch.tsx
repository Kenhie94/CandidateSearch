import { useState } from "react";
import { searchGithubUser } from "../api/API";

const CandidateSearch = () => {
  const [query, setQuery] = useState(""); // Search query
  const [userData, setUserData] = useState<any | null>(null); // User data
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Loading state

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Handle search
  const handleSearch = async () => {
    try {
      const data = await searchGithubUser(query);
      setUserData(data); // Set the user data
    } catch (err) {
      setError("Unable to fetch user data. Please try again."); // Handle error
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div>
      {/* Header */}
      <h1>Candidate Search</h1>

      {/* Search Section */}
      <div>
        <div>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search GitHub username..."
          />
          <button onClick={handleSearch} disabled={!query || loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
        {error && <p>{error}</p>}
      </div>

      {/* Results Section */}
      {userData && (
        <div>
          <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} />
          <div>
            <h2>{userData.login}</h2>
            <p>
              <strong>Location: {userData.location}</strong>
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
                {userData.login}@github.com
              </a>
            </p>
            <p>
              <strong>Company: {userData.company}</strong>
            </p>
          </div>
        </div>
      )}
      <button>-</button>
      <button>+</button>
    </div>
  );
};

export default CandidateSearch;
