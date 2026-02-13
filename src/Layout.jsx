import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      {/* Facebook Pixel */}
      <script dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '822229636864741');
          fbq('track', 'PageView');
        `
      }} />
      <noscript dangerouslySetInnerHTML={{
        __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=822229636864741&ev=PageView&noscript=1" />`
      }} />

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