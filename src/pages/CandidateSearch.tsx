import { useState } from "react";
import { searchGithubUser } from "../api/API";
import { useSavedCandidates } from "../interfaces/Candidate.interface"

const CandidateSearch = () => {
  const [query, setQuery] = useState(""); // Search query
  const [userData, setUserData] = useState<any | null>(null); // User data
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Loading state
  const { addCandidate } = useSavedCandidates(); // Access the addCandidate function


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

  const handleAddCandidate = () => {
    if (userData) {
      addCandidate(userData);
    }
  };


  return (
    <div>
      <h1>Candidate Search</h1>
      <div>
        <input type="text" value={query} onChange={handleInputChange} placeholder="Search GitHub username..." />
        <button onClick={handleSearch} disabled={!query || loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      {error && <p>{error}</p>}
      {userData && (
        <div>
          <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} />
          <div>
            <h2>{userData.login}</h2>
            <p>
              <strong>Location:</strong> {userData.location || "Not specified"}
            </p>
            <p>
              <strong>Email:</strong> {userData.email ? <a href={`mailto:${userData.email}`}>{userData.email}</a> : `${userData.login}@github.com`}
            </p>
            <p>
              <strong>Company:</strong> {userData.company || "Not specified"}
            </p>
            <p>
              <strong>Bio: </strong> {userData.bio || "Not specified"}
            </p>
          </div>
        </div>
      )}
        <button onClick={handleAddCandidate}>+</button>
    </div>
  );
};

export default CandidateSearch;
