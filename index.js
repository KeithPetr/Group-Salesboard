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
    revenue.textContent = totalRevenue.length > 0 ? totalRevenue.reduce((a, b) => (a + b)) : 0;
  totalCommission.length === 0 ?
    commission.textContent = "" :
    commission.textContent = totalCommission.length > 0 ? totalCommission.reduce((a, b) => (a + b)) : 0;
}

function addStar() {
    // totalSales++; changed this to below - sales now push to totalSales array
  totalSales.push(productStar.emoji);
  // salesCount.textContent += productStar.emoji; moved this to function renderPage()
  // salesTitle.textContent = `Live Sales - ${totalSales}`; moved this to function renderPage()
  // totalRevenue += productStar.revenue; changed this to below - revenue now pushes to revenue array
  totalRevenue.push(productStar.revenue);
  // totalCommission += productStar.commission; changed this to below - commission now pushes to commission array
  totalCommission.push(productStar.commission);
  // revenue.textContent = totalRevenue; moved this to function renderPage()
  // commission.textContent = totalCommission; moved this to function renderPage()
  checkForAchievements();
}

function addFire() {
    // totalSales++; changed this to below - sales now push to totalSales array
    totalSales.push(productFire.emoji);
  // salesCount.textContent += productFire.emoji;  moved this to function renderPage()
  // salesTitle.textContent = `Live Sales - ${totalSales}`; moved this to function renderPage()
  // totalRevenue += productFire.revenue; changed this to below - revenue now pushes to revenue array
  totalRevenue.push(productFire.revenue);
  // totalCommission += productFire.commission; changed this to below - commission now pushes to commission a
  totalCommission.push(productFire.commission);
  // revenue.textContent = totalRevenue; moved this to function renderPage()
  // commission.textContent = totalCommission; moved this to function renderPage()
  checkForAchievements();
}

function checkForAchievements() {
  if (totalSales.length === 1) {
    totalAchievements.push(achievementsArr[0]);
  } 
  // if (productStar.revenue === 200 || productFire.revenue === 300) {
  //   achievementsCount.textContent = achievementsArr[0];
  // }

  if (totalRevenue.reduce((a, b) => (a + b)) >= 2500 && !totalAchievements.includes(achievementsArr[1])) {
    totalAchievements.push(achievementsArr[1]);
  }
  // if (totalRevenue > 2500) {
  //   achievementsCount.textContent += achievementsArr[1];
  // }

  if (totalSales.length === 15) {
    totalAchievements.push(achievementsArr[2]);
  }
  // if (totalSales > 15) {
  //   achievementsCount.textContent += achievementsArr[2];
  // }
  renderPage();
  saveToLocal();
}

function resetSales() {
  window.localStorage.clear();
  salesTitle.textContent = `Live Sales`;
  salesCount.textContent = "";
  achievementsTitle.textContent = `Live Achievements`;
  achievementsCount.textContent = "";
  revenue.textContent = "";
  commission.textContent = "";
  // totalSales = 0; this gets set to zero when the items are removed from localStorage
  totalSales = [];
  //totalAchievements was added to this code
  totalAchievements = [];
  // totalRevenue = 0; this gets set to zero when the items are removed from localStorage
  totalRevenue = [];
  // totalCommission = 0; this gets set to zero when the items are removed from localStorage
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

// this function runs when the page reloads or when it refreshes
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

const darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.addEventListener("click", toggleDarkMode);