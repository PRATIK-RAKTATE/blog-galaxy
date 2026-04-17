export function Logo({ className = "", label = "BlogGalaxy" }) {
  return (
    <span className={`inline-flex items-center justify-center ${className}`} aria-label={label}>
      <svg viewBox="0 0 84 84" className="h-full w-full" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="logoBlue" x1="18" y1="12" x2="52" y2="72" gradientUnits="userSpaceOnUse">
            <stop stopColor="#B8F1FF" />
            <stop offset="0.52" stopColor="#66B9E7" />
            <stop offset="1" stopColor="#2A7BB0" />
          </linearGradient>
          <linearGradient id="logoGreen" x1="26" y1="16" x2="58" y2="70" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D5FFB8" />
            <stop offset="0.56" stopColor="#9AE576" />
            <stop offset="1" stopColor="#3A8A4C" />
          </linearGradient>
        </defs>
        <path d="M15 20L35 32V74L15 62V20Z" fill="url(#logoBlue)" fillOpacity="0.88" />
        <path d="M36 13L56 25V67L36 55V13Z" fill="url(#logoGreen)" fillOpacity="0.9" />
        <path d="M47 7L69 20V61L47 48V7Z" fill="url(#logoBlue)" fillOpacity="0.82" />
        <path d="M15 20L35 32L56 25L36 13L15 20Z" fill="#D7FCFF" fillOpacity="0.58" />
        <path d="M36 13L56 25L69 20L47 7L36 13Z" fill="#DDFDF1" fillOpacity="0.54" />
      </svg>
    </span>
  );
}
