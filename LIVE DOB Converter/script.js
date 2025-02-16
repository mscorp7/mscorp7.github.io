function calculateAge() {
    const dob = new Date(document.getElementById("dob").value);
    if (isNaN(dob)) return alert("Please enter a valid date");

    setInterval(() => {
        const now = new Date();
        const elapsed = now - dob;

        const seconds = Math.floor(elapsed / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30.44);
        const years = Math.floor(days / 365.25);

        document.getElementById("years").innerText = `Years: ${years}`;
        document.getElementById("months").innerText = `Months: ${months}`;
        document.getElementById("days").innerText = `Days: ${days}`;
        document.getElementById("hours").innerText = `Hours: ${hours}`;
        document.getElementById("minutes").innerText = `Minutes: ${minutes}`;
        document.getElementById("seconds").innerText = `Seconds: ${seconds}`;
    }, 1000);
}
