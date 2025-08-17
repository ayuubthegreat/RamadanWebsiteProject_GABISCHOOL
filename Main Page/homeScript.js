
// Prayer API Integration
// This script fetches prayer times for a specified city and updates the UI accordingly.
const locationAnnouncer = document.querySelector(".prayerlocation");
const fajrTime = document.querySelector(".fajr-prayer-time");
const dhuhrTime = document.querySelector(".dhuhr-prayer-time");
const asrTime = document.querySelector(".asr-prayer-time");
const maghribTime = document.querySelector(".maghrib-prayer-time");
const ishaTime = document.querySelector(".isha-prayer-time");
const timerForPrayerIntervals = document.querySelector(".next-prayer-time");
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
const darkModeBTN = document.querySelectorAll(".dark-mode-toggle");
darkModeBTN.forEach((btn) => {

    btn.addEventListener("click", () => {
        console.log("Dark mode toggled");
        document.querySelectorAll(".startNav, .endNav, .mainSection, body, .featureSection, .navLinks, .nav-link, .welcomeText, .masjidImg").forEach(nav => {
            nav.classList.toggle("dark-mode");
        });
    });
});

const getPrayerTimes = function(city = "Minneapolis", state = "Minnesota", country = "US") {

    const currentDate = new Date().toISOString().split("T")[0];
    const [year, month, day] = currentDate.split("-");
    console.log(currentDate);
    axios.get(`https://api.aladhan.com/v1/timingsByCity/${day}-${month}-${year}?city=${city}&country=${country}&state=${state}&method=3&shafaq=general&tune=5%2C3%2C5%2C7%2C9%2C-1%2C0%2C8%2C-6&timezonestring=UTC&calendarMethod=UAQ`)
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
const verseNumber = document.querySelector(".verse-number");
let ayahNumber = 1;

const getQuranVerse = function() {
    ayahNumber = Math.floor(Math.random() * 6236) + 1;
    console.log(ayahNumber); // Random ayah number between 1 and 6236
    axios.get(`https://api.alquran.cloud/v1/ayah/${ayahNumber}`)
    .then(response => {
        console.log("Quran verse fetched successfully:", response.data);
        verse.textContent = response.data.data.text;
        surahName.textContent = `From Surah ${response.data.data.surah.englishName}`;
        verseNumber.textContent = `${response.data.data.surah.number}:${response.data.data.numberInSurah}`;
    })
    .catch(error => {
        console.error("Error fetching Quran verse:", error);
    });
}

getQuranVerse();
// GitHub Image Integration
const cardContainer = document.querySelector(".cards");
const cardTemplate = document.querySelector(".team-member-card");
const teamMembers = [
    {
        name: "Ayuub Yusuf",
        username: "ayuubthegreat",
        role: "Team Leader",
        image: "team_member_1.jpg"
    },
    {
        name: "Umm Anzal",
        username: "ummanzal",
        role: "Developer",
        image: "team_member_2.jpg"
    },
    {
        name: "Mohamed",
        username: "mohamed",
        role: "Developer",
        image: "team_member_3.jpg"
    },
    {
        name: "Hamza",
        username: "hamza",
        role: "Developer",
        image: "team_member_4.jpg"
    }
];
const createTeamCards = function(name, role, username) {
    const newCard = document.createElement("div");
    newCard.classList.add("teamMemberCard");
    const newImage = document.createElement("div");
    newImage.classList.add("teamMemberImage");
    const avatarImage = document.createElement("img");
    avatarImage.alt = `${name}'s avatar`;
    avatarImage.width = 100;
    // Set a placeholder image initially
    avatarImage.src = "https://avatars.githubusercontent.com/u/583231?v=4"; // GitHub's default Octocat
    // Fetch the actual GitHub avatar asynchronously
    fetchGitHubImage(username).then(avatarUrl => {
        if (avatarUrl) {
            avatarImage.src = avatarUrl;
        }
    });
    newImage.appendChild(avatarImage);
    newCard.appendChild(newImage);
    const newInfo = document.createElement("div");
    newInfo.classList.add("teamMemberInfo");
    newInfo.innerHTML = `<h3>${name}</h3><p>${role}</p>`;
    newCard.appendChild(newInfo);
    cardContainer.appendChild(newCard);
}
const fetchGitHubImage = function(username) {
    return axios.get(`https://api.github.com/users/${username}`)
    .then(response => {
        const user = response.data;
        const avatar = response.data.avatar_url;
        console.log(avatar);
        console.log("Fetched GitHub user:", user);
        return response.data.avatar_url;
    })
    .catch(error => {
        console.error("Error fetching GitHub user:", error);
        return null;
    });
}
// Remove the following line as it will log a Promise, not the avatar URL
// console.log(fetchGitHubImage("ayuubthegreat"));
teamMembers.forEach(member => {
    console.log(member.username);
    createTeamCards(member.name, member.role, member.username);
});

// Dark Mode (Website-Wide)


