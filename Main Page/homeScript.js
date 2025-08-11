
// Prayer API Integration
// This script fetches prayer times for a specified city and updates the UI accordingly.
const locationAnnouncer = document.querySelector(".prayerlocation");
const fajrTime = document.querySelector(".fajr-prayer-time");
const dhuhrTime = document.querySelector(".dhuhr-prayer-time");
const asrTime = document.querySelector(".asr-prayer-time");
const maghribTime = document.querySelector(".maghrib-prayer-time");
const ishaTime = document.querySelector(".isha-prayer-time");
const prayerTimesElements = [fajrTime, dhuhrTime, asrTime, maghribTime, ishaTime];
const prayerTimes = [
    {fajr: "00:00"},
    {dhuhr: "00:00"},
    {asr: "00:00"},
    {maghrib: "00:00"},
    {isha: "00:00"}
];
const updatePrayerTimes = function(city = "Minneapolis", state = "Minnesota", ...times) {
    locationAnnouncer.textContent = `Prayer times for ${city}, ${state}`;
    prayerTimesElements.forEach((time, index) => {
        time.textContent = times[index] || "00:00";

    });
}

console.log(prayerTimes);
const getPrayerTimes = function(city = "Minneapolis", state = "Minnesota", country = "GB") {

    axios.get(`https://api.aladhan.com/v1/timingsByCity/01-01-2025?city=${city}&country=${country}&state=${state}&method=3&shafaq=general&tune=5%2C3%2C5%2C7%2C9%2C-1%2C0%2C8%2C-6&timezonestring=UTC&calendarMethod=UAQ`)
    .then(response => {
        console.log("Prayer times fetched successfully:", response.data);
        const timings = response.data.data.timings;
        console.log("Fetched timings:", timings);
        updatePrayerTimes("Minneapolis", "Minnesota", 
            timings.Fajr, 
            timings.Dhuhr, 
            timings.Asr, 
            timings.Maghrib, 
            timings.Isha
        );
    })
    
}
getPrayerTimes("Minneapolis", "Minnesota", "GB");

//Quran API Integration
const surahName = document.querySelector(".surahName");
const verse = document.querySelector(".verse-text");
let ayahNumber = 1;

const getQuranVerse = function() {
    ayahNumber = Math.floor(Math.random() * 600) + 1;
    console.log(ayahNumber); // Random ayah number between 1 and 600
    axios.get(`https://api.alquran.cloud/v1/ayah/${ayahNumber}`)
    .then(response => {
        console.log("Quran verse fetched successfully:", response.data);
        verse.textContent = response.data.data.text;
        surahName.textContent = `From Surah ${response.data.data.surah.englishName}`;
    })
    .catch(error => {
        console.error("Error fetching Quran verse:", error);
    });
}

getQuranVerse();
