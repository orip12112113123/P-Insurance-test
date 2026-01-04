export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>P-Insurance Test App</h1>
      <p>Database and Prisma are connected!</p>
      <p>Deployment successful - minimal version running</p>
      <hr />
      <p style={{ color: '#666', fontSize: '0.9rem' }}>
        This is a simplified version without WhatsApp/Twilio dependencies.
      </p>
    </div>
  );
}
