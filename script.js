// Points System Logic
let userPoints = 0;

// Load points from local storage if available
if (localStorage.getItem('snowJamsPoints')) {
    userPoints = parseInt(localStorage.getItem('snowJamsPoints'));
    updatePointsDisplay();
}

function updatePointsDisplay() {
    const pointsEl = document.getElementById('user-points');
    if (pointsEl) {
        // Animate the number
        pointsEl.classList.add('pulse');
        pointsEl.innerText = userPoints;
        setTimeout(() => pointsEl.classList.remove('pulse'), 500);
    }
}

function addPoints(amount) {
    userPoints += amount;
    localStorage.setItem('snowJamsPoints', userPoints);
    updatePointsDisplay();

    // Play sound or show visual feedback (mock)
    console.log(`Added ${amount} points! Total: ${userPoints}`);
}

function buyTicket() {
    // In a real app, this would open Stripe/PayPal
    const confirmed = confirm("Purchase a Raffle Ticket for $5 to support Hardin Park PTA?");
    if (confirmed) {
        addPoints(10);
        alert("Thank you for your support! +10 Entries added.");
    }
}

// Countdown Timer
function updateTimer() {
    // Set the date we're counting down to: Jan 31, 2026
    const countDownDate = new Date("Jan 31, 2026 23:59:59").getTime();

    // Update the count down every 1 second
    const x = setInterval(function () {

        // Get today's date and time
        const now = new Date().getTime();

        // Find the distance between now and the count down date
        const distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="timer"
        const daysEl = document.getElementById("days");
        if (daysEl) {
            daysEl.innerHTML = (days < 10 ? "0" : "") + days;
            document.getElementById("hours").innerHTML = (hours < 10 ? "0" : "") + hours;
            document.getElementById("minutes").innerHTML = (minutes < 10 ? "0" : "") + minutes;
            document.getElementById("seconds").innerHTML = (seconds < 10 ? "0" : "") + seconds;
        }

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            const timerEl = document.getElementById("timer");
            if (timerEl) timerEl.innerHTML = "WINNER ANNOUNCED";
        }
    }, 1000);
}

// Share Functionality
function share(platform) {
    const text = "I just entered the Snow Jams Raffle to win the custom 'Endless Winter' Jacket! Support Hardin Park PTA! #SnowJams #HardinPark";
    const url = window.location.href;
    let shareUrl = "";

    switch (platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'instagram':
            alert("Open Instagram to share! (+5 Points awarded)");
            addPoints(5);
            return;
        case 'tiktok':
            alert("Open TikTok to share! (+5 Points awarded)");
            addPoints(5);
            return;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank');
        // Assume they shared for functionality demo
        addPoints(5);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateTimer();
    updatePointsDisplay();
});
