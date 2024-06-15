/** @type {import('tailwindcss').Config} */

const flowbite = require("flowbite-react/tailwind");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    screens: {
      /* =================== */
      "1536max": { max: "1536px" },
      "1536min": { min: "1536px" },

      /* =================== */
      "1290max": { max: "1290px" },
      "1290min": { min: "1290px" },

      /* =================== */
      "1024max": { max: "1024px" },
      "1024min": { min: "1024px" },

      /* =================== */
      "992max": { max: "992px" },
      "992min": { min: "992px" },

      /* =================== */
      "768max": { max: "768px" },
      "768min": { min: "768px" },

      /* =================== */
      "640max": { max: "640px" },
      "640min": { min: "640px" },

      /* =================== */
      "560max": { max: "560px" },
      "560min": { min: "560px" },

      /* =================== */
      "480max": { max: "480px" },
      "480min": { min: "480px" },

      /* =================== */
      "420max": { max: "420px" },
      "420min": { min: "420px" },

      /* =================== */
      "380max": { max: "380px" },
      "380min": { min: "380px" },

      /* =================== */
      "320max": { max: "320px" },
      "320min": { min: "320px" },
    },
  },
  plugins: [flowbite.plugin()],
};
