import Translation from '../models/translationModel.js';
import catchAsync from '../utils/catchAsync.js';

export const getSitemap = catchAsync(async (req, res) => {
  const translations = await Translation.find();

  const urls = translations
    .map((word) => {
      return `
        <url>
          <loc>
           https://witcher-elder-speech-translator.vercel.app/word/${word.elderWord}
          </loc>
        </url>
      `;
    })
    .join('');

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>

    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

      <url>
        <loc>https://witcher-elder-speech-translator.vercel.app/</loc>
      </url>

      ${urls}

    </urlset>
  `;

  res.header('Content-Type', 'application/xml');
  res.send(sitemap);
});
