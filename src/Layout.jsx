import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        
        * {
          font-family: 'Nunito Sans', sans-serif;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        :root {
          --primary-teal: #0f766e;
          --primary-blue: #1e40af;
          --accent-teal: #14b8a6;
          --accent-blue: #3b82f6;
        }
      `}</style>
      {children}
    </div>
  );
}