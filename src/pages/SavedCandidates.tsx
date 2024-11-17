import { useSavedCandidates } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const { savedCandidates, removeCandidate } = useSavedCandidates();

  return (
    <div>
      <h1>Saved Candidates</h1>
      {savedCandidates.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Username</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={candidate.avatar_url}
                    alt={`${candidate.login}'s avatar`}
                    className="avatar"
                  />
                </td>
                <td>{candidate.login}</td>
                <td>{candidate.location}</td>
                <td>{candidate.email}</td>
                <td>{candidate.company || "No company available"}</td>
                <td>{candidate.bio || "No bio available"}</td>
                <td>
                  <button
                    onClick={() => removeCandidate(candidate.login)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No candidates saved yet.</p>
      )}
    </div>
  );
};

export default SavedCandidates;
