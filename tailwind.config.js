module.exports = {
    purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            backgroundImage: {
                "custom-image": "url('../assets/img/gradient-1-9b41056b.jpg') ",
                "custom-image-1":
                    "url('../assets/img/gradient-2-1fb6f9e1.jpg') ",
                "custom-image-2":
                    "url('../assets/img/gradient-4-1d31869c.jpg') ",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
