// Flash message page: displays a flashing message
export default function FlashPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black">
    
     <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <style>{`
        @keyframes colorPulse {
          0% {
            color: #fff;
            font-size: min(6vw, 6vh);
          }
          50% {
            color: #ff0000;
            font-size: min(16vw, 16vh);
          }
          100% {
            color: #fff;
            font-size: min(6vw, 6vh);
          }
        }
      `}</style>
      <h1
        className="font-bold"
        style={{
          margin: '6rem 0',
          lineHeight: 1.1,
          letterSpacing: '0.05em',
          textAlign: 'center',
          animation: 'colorPulse 1.2s infinite',
        }}
      >
        Time's Up!
      </h1>
     
     
     
      
 </div>
  <a href="/" className="mt-8 underline text-blue-400">Back to Start</a>

    </main>
     
  
  );
}
