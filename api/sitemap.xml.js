export default function handler(req, res) {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Core Pages -->
  <url>
    <loc>https://www.livformor.com/</loc>
    <lastmod>2026-03-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.livformor.com/Blog</loc>
    <lastmod>2026-03-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.livformor.com/services</loc>
    <lastmod>2026-03-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.livformor.com/cash-offer</loc>
    <lastmod>2026-03-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.livformor.com/qualified-lead</loc>
    <lastmod>2026-03-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Blog Posts -->
  <url>
    <loc>https://www.livformor.com/BlogPost?slug=7-marketing-mistakes-ketamine-clinic-growth</loc>
    <lastmod>2026-02-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.livformor.com/BlogPost?slug=google-ads-mental-health-clinic-complete-guide</loc>
    <lastmod>2026-02-21</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.livformor.com/BlogPost?slug=kap-marketing-mistakes-iv-drip-differentiation</loc>
    <lastmod>2026-02-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.livformor.com/BlogPost?slug=integration-guide-care-coordinator-ketamine-clinic</loc>
    <lastmod>2026-02-26</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.livformor.com/BlogPost?slug=ketamine-consultation-vulnerability-window-speed-to-lead</loc>
    <lastmod>2026-03-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.livformor.com/BlogPost?slug=ketamine-clinic-google-maps-local-seo-guide</loc>
    <lastmod>2026-03-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.livformor.com/BlogPost?slug=integration-first-content-strategy-psychedelic-therapists</loc>
    <lastmod>2026-03-06</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.livformor.com/BlogPost?slug=ketamine-therapy-cost-objection-sales-script</loc>
    <lastmod>2026-03-09</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.livformor.com/BlogPost?slug=ketamine-clinic-dea-inspection-compliance-checklist</loc>
    <lastmod>2026-03-12</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.livformor.com/BlogPost?slug=ketamine-spravato-tms-clinic-revenue-service-mix</loc>
    <lastmod>2026-03-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    return res.status(200).send(sitemap);
}
