let ageInterval;

function startAgeCalculation() {
    clearInterval(ageInterval); // Clear any existing interval to prevent duplicates
    calculateAge();
}

function calculateAge() {
    const dobInput = document.getElementById("dob").value;
    if (!dobInput) return alert("Please enter a valid date");

    // Set the DOB to midnight on the selected day
    const dob = new Date(dobInput);
    dob.setHours(0, 0, 0, 0);  // Set time to midnight

    ageInterval = setInterval(() => {
        const now = new Date();

        let years = now.getFullYear() - dob.getFullYear();
        let months = now.getMonth() - dob.getMonth();
        let days = now.getDate() - dob.getDate();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();

        // Adjust for negative values by "borrowing" from the next largest unit
        if (seconds < 0) {
            seconds += 60;
            minutes--;
        }
        if (minutes < 0) {
            minutes += 60;
            hours--;
        }
        if (hours < 0) {
            hours += 24;
            days--;
        }
        if (days < 0) {
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
            months--;
        }
        if (months < 0) {
            months += 12;
            years--;
        }

        document.getElementById("output").innerText =
            `Age = ${years} years, ${months} months, ${days} days, ` +
            `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    }, 1000);
}
