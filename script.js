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
    initMusicPlayer();
    initMerch();
});

// Merch Logic
const merchItems = [
    {
        title: "Endless Winter Tee",
        price: "$35.00",
        image: "merch.jpg",
        isSoldOut: false,
        causeText: "❤️ Supports School Lunches",
        overlay: "Limited Edition"
    },
    {
        title: "Retro Cassette Tape",
        price: "$15.00",
        image: null, // null implies placeholder
        isSoldOut: true,
        causeText: "History in your hands",
        overlay: "SOLD OUT"
    }
];

function initMerch() {
    const merchContainer = document.getElementById('merch-grid');
    if (!merchContainer) return;

    merchContainer.innerHTML = '';

    merchItems.forEach(item => {
        const card = document.createElement('div');
        card.className = `merch-card ${item.isSoldOut ? 'sold-out' : ''}`;

        // Image Area Logic
        let imageHTML = '';
        if (item.image) {
            imageHTML = `<img src="${item.image}" alt="${item.title}" class="merch-image">`;
        } else {
            imageHTML = `
                <div class="merch-image-placeholder">
                    <span class="tshirt-graphic">SNOW<br>JAMS<br>'25</span>
                </div>
            `;
        }

        card.innerHTML = `
            <div class="merch-image-container">
                ${imageHTML}
                <div class="merch-overlay">${item.overlay}</div>
            </div>
            <div class="merch-info">
                <h3>${item.title}</h3>
                <div class="price-tag">${item.price}</div>
                <p class="cause-text">${item.causeText}</p>
                <button class="buy-button" ${item.isSoldOut ? 'disabled' : ''}>
                    ${item.isSoldOut ? 'OUT OF STOCK' : 'ADD TO CART'}
                </button>
            </div>
        `;

        merchContainer.appendChild(card);
    });
}

// Music Player Logic
const tracks = [
    {
        title: "7am I'm calling You",
        src: "https://cdn1.suno.ai/256a73a9-6752-4717-9a54-31614b0228e7.mp3",
        sunoUrl: "https://suno.com/s/5qTV3NhRk1CxJajE",
        lyrics: `[INTRO] (Fingerpicked guitar, soft kick)
Good morning parents, guardians too
This is Wayne Eberly, got some news for you
It's Friday, December twelfth, you were finally asleep
But at seven AM your phone buzzed... and you started to weep
[VERSE 1] (Full band—driving acoustic, pedal steel)
Yesterday I said two-hour delay
Woke up this morning and I ruined your day
Picked up the phone like I always do
Nobody knows my job title—but I'm calling YOU
No school today, sounds like a dream
But your kids are awake and they're starting to scream
Cabin fever's hitting hard by 9 AM
And you're wondering how you'll survive 'til night again
[CHORUS] (Anthemic, big vocals)
It's a snow day in Watauga today
You're starting to fray
Your patience is thinner than the ice outside
Three days unwashed and you're losing your mind
Snow in some corners—but which ones? Who knows?
Not YOUR corner, some OTHER corner, that's how it goes
And who is Wayne Eberly? What does he DO?
He calls every twelve hours to remind you... you're through
[VERSE 2] (Slightly softer, storytelling)
Let's recap this week, it's been quite a ride
You've said "maybe later" forty-seven times
Screen time report came in—deleted it fast
Your kids think that lunch is just breakfast that lasts
Remote instruction means you're teaching too
Fractions and spelling and "Mom, what's a coup?"
You used to have hobbies, you used to have dreams
Now you're negotiating with a five-year-old's screams
[CHORUS]
It's a snow day in Watauga, hold tight
Put on a movie at eight, still playing at two
And somewhere out there Wayne Eberly's dialing YOU
Snow in some corners—but which ones? Who knows?
Not YOUR corner, some OTHER corner, that's how it goes
We've dropped a song with every single call
A soundtrack to your slow domestic downfall
[BRIDGE] (Piano and vocals only)
I know you're tired—no, exhausted's the word
You've answered "why" so many times your voice is slurred
The dog needs walking but you can't find your shoes
They're under the couch with last Tuesday's news
(Beat drops out)
Nobody knows what I do for a living
I'm not the superintendent... I just appear
A voice on your phone every twelve hours
Whispering snow delays into your ear
(Spoken, soft)
What IS my job? I couldn't tell you. I just... appear when the weather turns. Like a frost phantom. You'll never know.
[FINAL CHORUS] (Full production, soaring)
It's a snow day in Watauga—we're alive!
Your kids had popcorn for dinner and they're doing FINE
From delays to remote days to "just survive the night"
This is Wayne Eberly—
(Slows, bittersweet)
And you're doing alright
You're doing alright
The wine is gone but you're doing alright
[OUTRO] (Acoustic fade, warm tone)
(Spoken)
See you in twelve hours. Stay safe, Watauga. Drink some water. Your kids will remember this fondly... in therapy.
Who am I? Some questions don't have answers.
I simply... call.
(Guitar fades)
[END]`
    },
    {
        title: "It’s been a long week",
        src: "https://cdn1.suno.ai/ca0f2ce7-a720-4333-b963-eff20cb85af7.mp3",
        sunoUrl: "https://suno.com/s/Oc0zpaFxGONaubVr",
        lyrics: `# This Is Wayne Eberly (The School Delay Gospel)

**[Intro - Spoken over soft piano]**
Yeah… it’s been a long week, y’all
Some of y’all stopped answering…
But I keep calling anyway…

**[Verse 1 - R&B style with light beat]**
*This is Wayne Eberly* (Wayne Eberly!)
Calling once again (here we go!)
Know you see my number
And you let it ring, my friend
Monday was a delay
Tuesday, cancelled too
Wednesday we went remote
Your boss stopped believing you (No he don’t!)

**[Chorus - Full gospel choir comes in]**
*It’s been a long, long week* (So long!)
*Delays and cancellations* (Every day!)
*Your kids are tired of you* (It’s true!)
*You’re tired of them too* (Lord help!)
*Got nowhere to hide* (Nowhere!)
*Tomorrow’s a two-hour delay* (Here we go!)
*But it might change, who can say?* (Check at 5 AM!)
*We’ll get through it together*
*Or go insane!* (Too late!)

**[Verse 2 - Smooth delivery]**
*This is Wayne Eberly* (That’s right!)
Check your phone at 5 AM (So nice!)
When you see that snow fall down
Everything can change again (Always does!)
Your work thinks you’re lying (No really!)
Your PTO is dried up (All gone!)
Kids think it’s Christmas
But you’re just trying to survive, yup!

**[Bridge - Gospel breakdown]**
*But here’s the good news!* (Tell us, Wayne!)
*Saturday belongs to you!* (Finally!)
*You won’t hear my voice* (Not on Saturday!)
*One whole day to make it through!* (One day!)

*Sunday, now Sunday…* (Oh no…)
*I might call again* (Of course!)
*Getting ready for that Monday*
*This cycle never ends!* (Never!)

**[Final Chorus - Full production]**
*Who knows when you’ll get that snow?* (Meteorologists don’t!)
*Sunday I might let you know* (Probably will!)
*But Saturday you’re free* (You’re free!)
*No calls from Wayne Eberly* (Thank you, Jesus!)

**[Outro - Choir fading]**
*This is Wayne Eberly…* (Wayne Eberly…)
*Saturday’s yours though…* (Finally!)
*Unless there’s ice Sunday night…* (Don’t say it!)
Stay warm, Watauga County
*I’ll be back…*

-----

*[Key ad-libs: “Not again!” “My boss stopped believing me!” “The kids are feral!” “What day is it?” “5 AM?!” “One more delay!” “Saturday… please!”]*`
    },
    {
        title: "Calling you every 12-hours",
        src: "https://cdn1.suno.ai/f57c646a-4c15-4f59-8162-d26239caf15b.mp3",
        sunoUrl: "https://suno.com/s/DDDs2V71sPiYZf7Z",
        lyrics: `[Intro]
Good morning parents, guardians too
Wayne Eberly here with some news for you
From the Watauga County school system, I regret to say
Your children will be learning remotely today
That means they're home with you, in case that wasn't clear
it'll be a long day, grab yourself a beer

[Chorus]
This is Wayne Eberly, calling every 12 hours
This is Wayne Eberly, bringing joy and sorrow
Kids are doing backflips, they think snow days are great
While you cancel three meetings and accept your fate

[Verse 2]
Thursday, December 11th, the snow came overnight
Temperature's nineteen degrees, won't break freezing all day
Black ice on every backroad, the plows can't keep pace
So fire up that Chromebook, your kid's got Zoom at eight

[Chorus]

[Bridge]
Last night I called it, said two hours delayed
Thought I had it figured, thought the call was made
But the snow kept falling while I was asleep
Now the roads are frozen and the drifts are three feet deep
How was I to know the sky would just betray me so?
I stared at all the models, I watched the radars glow
Forgive me, Watauga, I did the best I could
Now pour yourself some coffee and pray your Wi-Fi's good

[Outro]
This is Wayne Eberly, signing off for now
But I'll be back tonight, you know I will somehow

[Outro]
This is Wayne Eberly, signing off for now
But I'll be back tonight, you know I will somehow`
    },
    {
        title: "The Pied Piper of 2-Hour Delays",
        src: "https://cdn1.suno.ai/2828fadb-c5f5-486a-9bf2-aa73e65db9a2.mp3",
        sunoUrl: "https://suno.com/s/9h1lGwCMy3GgW9Aa",
        lyrics: `Good Evening parents, guardians too
Wayne Eberly here with some news for you
From the Watauga County school system, if I might,
The rain is raining but it will freeze tonight
[Chorus]
This is Wayne Eberly, calling to ruin your tomorrow
This is Wayne Eberly, bringing joy and sorrow
Kids are cheering while you're rearranging your day
'Cause we've got ourselves a two-hour delay
[Verse 2]
Thursday, December 10th, hear what I say
Back to the usual disruption in every way
It's Eberly with a B, not a V, get it right
I'm the Pied Piper of delays—kids' delight
[Chorus]
This is Wayne Eberly, calling to ruin your tomorrow
This is Wayne Eberly, bringing joy and sorrow
Kids are cheering while you're rearranging your day
'Cause we've got ourselves a two-hour delay
[Verse 3]
Now if things change—more snow, heaven forbid
I'll let you know by 8 AM, no need to flip your lid
But for now, two hours is what we've got in store
Check your phone in the morning, just to be sure
[Bridge]
Now here's the thing that makes it all so meta
Our first song made the cut—couldn't get any better
I contain multitudes, I'm more than just this voice
Parents would love me if they knew me more—that's my choice
[Final Chorus]
This is Wayne Eberly, your friendly neighborhood caller
Making mornings chaos, but the kids think I'm a baller
Drop 'em at Hardin Park if you need care today
But for now—enjoy your two-hour delay!`
    },
    {
        title: "Wayne's Three-hour Delay",
        src: "https://cdn1.suno.ai/17af47af-a6f0-4ce2-868f-1a7f957f6f1e.mp3",
        sunoUrl: "https://suno.com/s/81ciwKbK5vEqZGD2",
        lyrics: `[Verse 1]
Good evening parents, guardians too
Wayne Everly's back—oh, you knew I'd call you
From Watauga County schools, your favorite voice
Here to destroy your schedule—you have no choice

[Chorus]
This is Wayne Everly, calling to ruin your tomorrow
This is Wayne Everly, bringing joy and sorrow
Rearrange your meetings, push your deadlines away
This is Wayne Everly—three-hour delay

[Verse 2]
Wednesday, December 10th, here's the fun
Three-hour delay—what time does school even run?
Not two hours, that would be too clean
Three hours of limbo, if you know what I mean
Too late for the sitter, too early to work
Too late for the sitter, too early to work

[Chorus]

[Verse 3]
Buses will travel limited A routes, it's true
With exceptions of course—check what applies to you
Visit the transportation website, that's the rule
It's updated by eight from your friends at the school

[Bridge]
Should this decision need to be changed, my friend
We'll let you know by 8 a.m.
And parents, a reminder while you rework your day
Teen drivers need caution on roads icy and gray
This is Wayne Everly, bringing just a little sorrow
Thank you, be safe, we'll get through come what may
This is Wayne Everly—three-hour delay!`
    },
    {
        title: "Three Hour Delay",
        src: "https://cdn1.suno.ai/47cbfeb0-a59d-4d3b-a126-dfc24e1cc5d4.mp3",
        sunoUrl: "https://suno.com/s/oGbvqBx9uceAtIVM",
        lyrics: `[Verse 1]
Good evening parents, guardians too
Wayne Everly's back—oh, you knew I'd call you
From Watauga County schools, your favorite voice
Here to destroy your schedule—you have no choice

[Chorus]
This is Wayne Everly, calling to ruin your tomorrow
This is Wayne Everly, bringing joy and sorrow
Rearrange your meetings, push your deadlines away
This is Wayne Everly—three-hour delay

[Verse 2]
Wednesday, December 10th, here's the fun
Three-hour delay—what time does school even run?
Not two hours, that would be too clean
Three hours of limbo, if you know what I mean
Too late for the sitter, too early to work
Too late for the sitter, too early to work

[Final Chorus]
This is Wayne Everly, calling to ruin your tomorrow
This is Wayne Everly, bringing just a little sorrow
Thank you, be safe, we'll get through come what may
This is Wayne Everly—three-hour delay!

[Verse 3]
Buses will travel limited A routes, it's true
With exceptions of course—check what applies to you
Visit the transportation website, that's the rule
It's updated by eight from your friends at the school

[Bridge]
Should this decision need to be changed, my friend
We'll let you know by 8 a.m.
And parents, a reminder while you rework your day
Teen drivers need caution on roads icy and gray

[Final Chorus]
This is Wayne Everly, calling to ruin your tomorrow
This is Wayne Everly, bringing just a little sorrow
Thank you, be safe, we'll get through come what may
This is Wayne Everly—three-hour delay!`
    },
    {
        title: "Calling to ruin your tomorrow.",
        src: "https://cdn1.suno.ai/9c70d933-45e1-4316-bd4c-eaa2df20f26b.mp3",
        sunoUrl: "https://suno.com/s/Vk5kA8wIgnLSx74l",
        lyrics: `ng parents, guardians too
Wayne Everly here with some news for you
From the Watauga County school system, I say
The snow keeps falling, won't be stopping today

[Chorus]
This is Wayne Everly, calling to ruin your tomorrow
This is Wayne Everly, bringing joy and sorrow
Schools are closed, kids are home to stay
This is Wayne Everly—it's a snow day

[Verse 2]
Tuesday, December 9th, hear what I say
Watauga County schools are closed for the day
It's optional for teachers if they want to work
No remote instruction, students get the perk

[Chorus]

[Verse 3]
To ensure safe travels through the ice and snow
Staff may report on a two-hour delay, nice and slow
Again I tell you, let it be known
There will be no school, kids can stay home

[Bridge]
But if you need somewhere for your little ones to go
Hardin Park School has got you—don't you know
The holiday snow day program opens up at nine
Drop 'em off, they'll be just fine
This is Wayne Everly, bringing you the news
Thank you, be safe, bundle up and everyone say
This is Wayne Everly—it's a snow day!
This is Wayne Everly—it's a snow day!`
    }
];

let currentAudio = null;
let currentTrackIndex = -1;

function initMusicPlayer() {
    const playlistEl = document.getElementById('playlist-container');
    if (!playlistEl) return;

    playlistEl.innerHTML = ''; // Clear fallback

    tracks.forEach((track, index) => {
        const item = document.createElement('div');
        item.className = 'track-item';
        item.id = `track-${index}`; // Add ID for easier selection
        item.onclick = () => playTrack(index);

        // Check if liked
        const liked = localStorage.getItem(`liked_${index}`) === 'true';
        const heartChar = liked ? '❤' : '♡'; // Use simple chars for now

        item.innerHTML = `
            <span class="track-number">${(index + 1).toString().padStart(2, '0')}</span>
            <div class="track-content-wrapper">
                <span class="track-name">${track.title}</span>
                <div class="track-actions">
                    <!-- Actions available in sticky player primarily now, but keeping for list view utility if desired -->
                </div>
            </div>
            <button class="play-btn" id="list-play-btn-${index}">▶</button>
        `;

        playlistEl.appendChild(item);
    });
}

// Global state for drag operations
let isDraggingProgress = false;

function playTrack(index) {
    if (currentTrackIndex === index && currentAudio) {
        togglePlay();
        return;
    }

    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }

    currentTrackIndex = index;
    const track = tracks[index];

    // Update UI text
    document.getElementById('player-title').innerText = track.title;

    // Update Like Button State
    updatePlayerLikeState(index);

    // Highlight in playlist
    document.querySelectorAll('.track-item').forEach(el => el.classList.remove('playing'));
    const trackEl = document.getElementById(`track-${index}`);
    if (trackEl) trackEl.classList.add('playing');

    // Update List Play Buttons
    document.querySelectorAll('.play-btn').forEach(btn => btn.innerText = '▶');
    document.getElementById(`list-play-btn-${index}`).innerText = '⏸';

    // Update Lyrics
    const lyricsContainer = document.getElementById('lyrics-display');
    const lyricsContent = document.getElementById('lyrics-content');
    lyricsContent.innerText = track.lyrics;
    lyricsContent.scrollTop = 0; // Reset scroll
    lyricsContainer.classList.add('active');

    // Create and Play Audio
    currentAudio = new Audio(track.src);
    currentAudio.volume = document.getElementById('volume-slider').value;

    currentAudio.addEventListener('timeupdate', updateProgress);
    currentAudio.addEventListener('loadedmetadata', () => {
        document.getElementById('total-time').innerText = formatTime(currentAudio.duration);
    });

    currentAudio.onended = () => nextTrack();

    currentAudio.play().then(() => {
        updatePlayButtonState(true);
    }).catch(e => console.error("Playback failed:", e));
}

function togglePlay() {
    if (!currentAudio) {
        if (tracks.length > 0) playTrack(0);
        return;
    }

    if (currentAudio.paused) {
        currentAudio.play();
        updatePlayButtonState(true);
    } else {
        currentAudio.pause();
        updatePlayButtonState(false);
    }
}

function updatePlayButtonState(isPlaying) {
    const btn = document.getElementById('player-play-btn');
    btn.innerText = isPlaying ? '⏸' : '▶';

    // Update list button too if active
    if (currentTrackIndex !== -1) {
        const listBtn = document.getElementById(`list-play-btn-${currentTrackIndex}`);
        if (listBtn) listBtn.innerText = isPlaying ? '⏸' : '▶';
    }
}

function prevTrack() {
    if (currentTrackIndex === -1) return;
    let newIndex = currentTrackIndex - 1;
    if (newIndex < 0) newIndex = tracks.length - 1;
    playTrack(newIndex);
}

function nextTrack() {
    if (currentTrackIndex === -1) {
        playTrack(0);
        return;
    }
    let newIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack(newIndex);
}

function updateProgress() {
    if (isDraggingProgress || !currentAudio) return;

    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');

    const percent = (currentAudio.currentTime / currentAudio.duration) * 100;
    progressBar.value = percent || 0;

    currentTimeEl.innerText = formatTime(currentAudio.currentTime);
}

function seekAudio() {
    if (!currentAudio) return;
    const progressBar = document.getElementById('progress-bar');
    const time = (progressBar.value / 100) * currentAudio.duration;
    currentAudio.currentTime = time;
}

// Ensure seek doesn't fight timeupdate
document.getElementById('progress-bar').addEventListener('mousedown', () => isDraggingProgress = true);
document.getElementById('progress-bar').addEventListener('mouseup', () => isDraggingProgress = false);
document.getElementById('progress-bar').addEventListener('touchstart', () => isDraggingProgress = true);
document.getElementById('progress-bar').addEventListener('touchend', () => isDraggingProgress = false);


function setVolume() {
    const slider = document.getElementById('volume-slider');
    if (currentAudio) {
        currentAudio.volume = slider.value;
    }
}

function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

// Like functionality for Sticky Player
function toggleLikeCurrent() {
    if (currentTrackIndex === -1) return;
    toggleLikeGeneric(currentTrackIndex, document.getElementById('player-like-btn'), null);
}

function toggleLikeGeneric(index, btnElement, iconId) {
    const isLiked = btnElement.classList.contains('active');

    if (isLiked) {
        btnElement.classList.remove('active');
        localStorage.setItem(`liked_${index}`, 'false');
        if (iconId) document.getElementById(iconId).innerText = '♡';
    } else {
        btnElement.classList.add('active');
        localStorage.setItem(`liked_${index}`, 'true');
        if (iconId) document.getElementById(iconId).innerText = '❤';

        // Pulse effect
        btnElement.classList.add('pulse');
        setTimeout(() => btnElement.classList.remove('pulse'), 500);
    }

    // Sync state if we are modifying the currently playing track via list view
    if (index === currentTrackIndex) {
        updatePlayerLikeState(index);
    }
}

function updatePlayerLikeState(index) {
    const liked = localStorage.getItem(`liked_${index}`) === 'true';
    const btn = document.getElementById('player-like-btn');
    if (liked) {
        btn.classList.add('active');
        btn.innerText = '❤';
    } else {
        btn.classList.remove('active');
        btn.innerText = '♡';
    }
}


function shareCurrentTrack() {
    if (currentTrackIndex === -1) return;
    shareTrackGeneric(currentTrackIndex);
}

function shareTrackGeneric(index) {
    const track = tracks[index];
    if (track && track.sunoUrl) {
        navigator.clipboard.writeText(track.sunoUrl).then(() => {
            alert(`Link to "${track.title}" copied to clipboard!`);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }
}

// Updated shareTrack for list view compatibility
function shareTrack(event, index) {
    shareTrackGeneric(index);
    const btn = event.currentTarget;
    const originalContent = btn.innerHTML;
    btn.innerHTML = '<span>OK</span>';
    setTimeout(() => btn.innerHTML = originalContent, 1000);
}

// Keep toggleLike for list compatibility
function toggleLike(event, index) {
    const btn = event.currentTarget;
    toggleLikeGeneric(index, btn, `like-icon-${index}`);
}
