

import { get } from 'axios';

const prayerTimes = [
    {fajr: "00:00"},
    {dhuhr: "00:00"},
    {asr: "00:00"},
    {maghrib: "00:00"},
    {isha: "00:00"}
];
const updatePrayerTimes = function(...times) {
    prayerTimes.forEach((time, index) => {
        time[Object.keys(time)[0]] = times[index];
    });
}
console.log(updatePrayerTimes("05:00", "12:30", "15:45", "18:30", "20:00"));
console.log(prayerTimes);
const getPrayerTimes = function(city = "London", country = "UK") {
    
    get(`https://api.aladhan.com/timingsByAddress?address=${city},%20${country}&method=99&methodSettings=18.5,null,17.5`)
    .then(response => {
        console.log("Prayer times fetched successfully:", response.data);
        const times = response.data.data.timings;
        updatePrayerTimes(times.fajr, times.dhuhr, times.asr, times.maghrib, times.isha);
    })
    .catch(error => {
        console.error("Error fetching prayer times:", error);
    });
}
getPrayerTimes("Minneapolis", "USA");