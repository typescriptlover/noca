const withBundleAnalyzer = require('@next/bundle-analyzer')({
   enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
   swcMinify: true,
   poweredByHeader: false,
   trailingSlash: false,
});
