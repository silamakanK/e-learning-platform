interface Props {
  minimumScore: number;
  questionCount: number;
}

export const QuizCallout = ({ minimumScore, questionCount }: Props) => (
  <section
    className="card"
    style={{
      background: 'rgba(34,197,94,0.12)',
      border: '1px solid rgba(34,197,94,0.4)',
      color: '#14532d'
    }}
  >
    <h3 style={{ marginTop: 0 }}>Quiz interactif</h3>
    <p style={{ marginBottom: '0.5rem' }}>
      {questionCount} questions adaptatives. Score minimal attendu : {minimumScore} % pour débloquer le badge de
      chapitre.
    </p>
    <p style={{ margin: 0, fontSize: '0.9rem' }}>Les réponses sont corrigées via une fonction RPC Supabase.</p>
  </section>
);
