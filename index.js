/* SALESBOARD ACHIEVEMENTS AND GOALS */
// ⭐️ = $200 in revenue | $50 in commission
// 🔥 = $300 in revenue | $75 in commission>
// 🔔 = When user gets first sale
// 💰 = When user exceeds $2500 in revenue
// 🏆 = When user gets 15 sales

/* VARIABLES */

const starBtn = document.getElementById("btn-star");
const fireBtn = document.getElementById("btn-fire");
const salesTitle = document.getElementById("sales-text");
const salesCount = document.getElementById("sales");
const achievementsTitle = document.getElementById('achievements-text')
const achievementsCount = document.getElementById("achievements");
const revenue = document.getElementById("total-revenue");
const commission = document.getElementById("total-commission");
const resetSalesBtn = document.getElementById("btn-reset");
const darkModeToggle = document.getElementById("dark-mode-toggle");

// let totalSales = 0;
let totalSales = JSON.parse(window.localStorage.getItem('sales')) || [];
// let totalAchievement = 0;
let totalAchievements = JSON.parse(window.localStorage.getItem('achievements')) || [];
// let totalRevenue = 0;
let totalRevenue = JSON.parse(window.localStorage.getItem('revenue')) || [];
// let totalCommission = 0;
let totalCommission = JSON.parse(window.localStorage.getItem('commission')) || [];



/* ARRAY FOR ACHIEVEMENT EMOJIS */
const achievementsArr = ["🔔", "💰", "🏆"];

/* PRODUCT STAR OBJECT */
const productStar = {
  emoji: "⭐",
  revenue: 200,
  commission: 50,
};

/* PRODUCT FIRE OBJECT */
const productFire = {
  emoji: "🔥",
  revenue: 300,
  commission: 75,
};

/* FUNCTIONS */
// this function renders HTML and value to the DOM
function renderPage() { 
  totalSales.length === 0 ?
    salesTitle.textContent = "Live Sales" :
    salesTitle.textContent = `Live Sales - ${totalSales.length}`;
  salesCount.textContent = totalSales.join('');
  totalAchievements.length === 0 ? 
    achievementsTitle.textContent = "Live Achievements" :
    achievementsTitle.textContent = `Live Achievements - ${totalAchievements.length}`;
  achievementsCount.textContent = totalAchievements.join('');
  totalRevenue.length === 0 ?
    revenue.textContent = "" :
    revenue.textContent = totalRevenue.length > 0 ? "$" + totalRevenue.reduce((a, b) => (a + b)).toLocaleString() : 0;
  totalCommission.length === 0 ?
    commission.textContent = "" :
    commission.textContent = totalCommission.length > 0 ? "$" + totalCommission.reduce((a, b) => (a + b)).toLocaleString() : 0;
}

// this function adds a star to the sales array, and the appropriate revenue/commission to revenue/commission arrays, then checks for achievements
function addStar() {
  totalSales.push(productStar.emoji);
  totalRevenue.push(productStar.revenue);
  totalCommission.push(productStar.commission);
  checkForAchievements();
}

// this function adds a fire to the sales array, and the appropriate revenue/commission to revenue/commission arrays, then checks for achievements
function addFire() {
  totalSales.push(productFire.emoji);
  totalRevenue.push(productFire.revenue);
  totalCommission.push(productFire.commission);
  checkForAchievements();
}

//this function runs logics for the achievements array, renders to the DOM and saves value to local storage
function checkForAchievements() {
  if (totalSales.length === 1) {
    totalAchievements.push(achievementsArr[0]);
  } 

  if (totalRevenue.reduce((a, b) => (a + b)) >= 2500 && !totalAchievements.includes(achievementsArr[1])) {
    totalAchievements.push(achievementsArr[1]);
  }

  if (totalSales.length === 15) {
    totalAchievements.push(achievementsArr[2]);
  }

  renderPage();
  saveToLocal();
}

// this function clears local storage and resets the values on the page 
function resetSales() {
  window.localStorage.clear();
  salesTitle.textContent = `Live Sales`;
  salesCount.textContent = "";
  achievementsTitle.textContent = `Live Achievements`;
  achievementsCount.textContent = "";
  revenue.textContent = "";
  commission.textContent = "";
  totalSales = [];
  totalAchievements = [];
  totalRevenue = [];
  totalCommission = [];
}

//Functions for Working with Local Storage
//this function saves a key and a value to local storage
function saveToLocal() {
  localStorage.setItem('sales', JSON.stringify(totalSales)); //this saves 'sales' as a key and totalSales(the array we created) as a variable of "sales" in local storage
  localStorage.setItem('achievements', JSON.stringify(totalAchievements));
  localStorage.setItem('revenue', JSON.stringify(totalRevenue));
  localStorage.setItem('commission', JSON.stringify(totalCommission));
}

// this function retrieves a key and a value from local storage
function getLocalStorage() {
  JSON.parse(window.localStorage.getItem('sales')); //this retrieve totalSales(the array we created) from local storage thru the key name of 'sales'
  JSON.parse(window.localStorage.getItem('achievements'));
  JSON.parse(window.localStorage.getItem('revenue'));
  JSON.parse(window.localStorage.getItem('commission'));
}

/* EVENT LISTENERS */
starBtn.addEventListener("click", addStar);

fireBtn.addEventListener("click", addFire);

resetSalesBtn.addEventListener("click", resetSales);

// this function runs when the page reloads/refreshes
window.onload = function() {
  renderPage()
};

// ------------Dark Mode -----------------------

const toggleDarkMode = () => {
  const toggleButton = document.getElementById("dark-mode-toggle");
  
  container.classList.toggle("dark-mode");
  if (container.classList.contains("dark-mode")) {
    toggleButton.textContent = "🌞"; // Change to moon icon when dark mode is on
    document.body.style.backgroundColor = "#111827"
    document.getElementById('container').style.backgroundColor = "#8ecae6"
  } else {
    toggleButton.textContent = "🌜"; // Change to sun icon when dark mode is off
    document.body.style.backgroundColor = "#8ecae6";
    document.getElementById('container').style.backgroundColor = "#111827"
  }
}


darkModeToggle.addEventListener("click", toggleDarkMode);