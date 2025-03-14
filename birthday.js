function getNumberOfDaysFromNow(date) {
  const today = new Date();
  // const dateUTC = date.getUTCDate();
  // const todayUTC = today.getUTCDate();
  // const diffTime = todayUTC - dateUTC;
  // return diffTime;
  const diffTime = date - today;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

function getDateString(date) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${monthNames[monthIndex]} ${day}, ${year}`;
}

function addDays(date, days) {
  const innerDate = new Date(date);
  innerDate.setDate(innerDate.getDate() + days);
  return new Date(innerDate);
}

function getHalfBirthday(birthday) {
  const day = birthday.getDate();
  const monthIndex = birthday.getMonth();
  const year = birthday.getFullYear();
  let lastBirthday = new Date(year, monthIndex, day);

  return addDays(lastBirthday, 182);
}

const year = new Date().getFullYear();
document.getElementById("date").setAttribute("min", year + "-01-01");
document.getElementById("date").setAttribute("max", year + "-12-31");

const datePickerElement = document.getElementById("date-picker");
const dateElement = document.getElementById("date");
const birthdayDateElement = document.getElementById("birthday-date");
const birthdayRowGroupElement = document.getElementById("birthday-row-group");
const daysFromNowElement = document.getElementById("days-from-now");
const daysFromNowBirthdayElement = document.getElementById(
  "days-from-now-birthday",
);

const daysFromNowBirthdayFlavorElement = document.getElementById(
  "days-from-now-birthday-flavor",
);
const halfBirthdayLabel = document.getElementById("half-birthday-label");

datePickerElement.addEventListener("change", () => {
  const birthday = datePickerElement.value;
  const birthdayDate = new Date(`${birthday}T00:00:00.000-08:00`);

  datePickerElement.classList.remove("hidden");
  dateElement.classList.remove("hidden");
  birthdayDateElement.classList.remove("hidden");
  birthdayRowGroupElement.classList.remove("row-group");
  daysFromNowElement.classList.remove("hidden");
  daysFromNowBirthdayElement.classList.remove("hidden");
  daysFromNowBirthdayFlavorElement.classList.remove("hidden");
  halfBirthdayLabel.classList.remove("hidden");

  const daysFromNowBirthday = getNumberOfDaysFromNow(birthdayDate);
  if (daysFromNowBirthday === 0) {
    daysFromNowBirthdayElement.innerText = `Today! 🎉`;
    daysFromNowBirthdayFlavorElement.innerText = "";
  } else if (daysFromNowBirthday === -1) {
    daysFromNowBirthdayElement.innerText = `${-daysFromNowBirthday}`;
    daysFromNowBirthdayFlavorElement.innerText = " day ago";
  } else if (daysFromNowBirthday === 1) {
    daysFromNowBirthdayElement.innerText = `${daysFromNowBirthday}`;
    daysFromNowBirthdayFlavorElement.innerText = " day from now";
  } else if (daysFromNowBirthday < 0) {
    daysFromNowBirthdayElement.innerText = `${-daysFromNowBirthday}`;
    daysFromNowBirthdayFlavorElement.innerText = " days ago";
  } else {
    daysFromNowBirthdayElement.innerText = `${daysFromNowBirthday}`;
    daysFromNowBirthdayFlavorElement.innerText = " days from now";
  }

  const birthdayString = getDateString(birthdayDate);
  birthdayDateElement.innerText = birthdayString;

  const halfBirthday = getHalfBirthday(birthdayDate);
  let halfBirthdayString = getDateString(halfBirthday);
  let daysFromNow = getNumberOfDaysFromNow(halfBirthday);
  if (daysFromNow >= 365) {
    daysFromNow -= 365;
    halfBirthdayString = getDateString(addDays(halfBirthday, -365));
  }
  dateElement.innerText = halfBirthdayString;
  daysFromNowElement.innerText = `${daysFromNow} days from now`;
  if (daysFromNow === 1) {
    daysFromNowElement.innerText = `${daysFromNow} day from now`;
  }
});
