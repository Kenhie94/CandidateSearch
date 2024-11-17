import { useSavedCandidates } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const { savedCandidates } = useSavedCandidates();

  return (
    <div>
      <h1>Saved Candidates</h1>
      {savedCandidates.length > 0 ? (
        <ul>
          {savedCandidates.map((candidate, index) => (
            <li key={index}>
              <img src={candidate.avatar_url} alt={`${candidate.login}'s avatar`} />
              <div>
                <h2>{candidate.login}</h2>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No candidates saved yet.</p>
      )}
    </div>
  );
};

export default SavedCandidates;
