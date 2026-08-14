export function ReviewBg() {
  return (
    <svg
      width="694"
      height="295"
      viewBox="0 0 694 295"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <g filter="url(#filter0_g_1853_5981)">
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="var(--color-accent)"
        />
      </g>
      <defs>
        <filter
          id="filter0_g_1853_5981"
          x="-100"
          y="-100"
          width="894"
          height="495"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.046511627733707428 0.046511627733707428"
            numOctaves="3"
            seed="5725"
          />
          <feDisplacementMap
            in="shape"
            scale="200"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacedImage"
            // width="100%"
            // height="100%"
          />
          <feMerge result="effect1_texture_1853_5981">
            <feMergeNode in="displacedImage" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

export function TickIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="var(--color-text-100)"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z" />
    </svg>
  );
}
