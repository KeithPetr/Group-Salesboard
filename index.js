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
const achievementsCount = document.getElementById("achievements");

const revenue = document.getElementById("total-revenue");
const commission = document.getElementById("total-commission");

const resetSalesBtn = document.getElementById("btn-reset");

let totalSales = 0;
let totalAchievement = 0;
let totalRevenue = 0;
let totalCommission = 0;

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

/* EVENT LISTENERS */
starBtn.addEventListener("click", function () {
  totalSales++;
  salesCount.textContent += productStar.emoji;
  salesTitle.textContent = `Live Sales - ${totalSales}`;

  totalRevenue += productStar.revenue;
  totalCommission += productStar.commission;

  revenue.textContent = totalRevenue;
  commission.textContent = totalCommission;
  checkForAchievements();
});

fireBtn.addEventListener("click", function () {
  totalSales++;
  salesCount.textContent += productFire.emoji;
  salesTitle.textContent = `Live Sales - ${totalSales}`;

  totalRevenue += productFire.revenue;
  totalCommission += productFire.commission;

  revenue.textContent = totalRevenue;
  commission.textContent = totalCommission;
  checkForAchievements();
});

resetSalesBtn.addEventListener("click", function () {
  salesTitle.textContent = `Live Sales`;
  salesCount.textContent = "";
  achievementsCount.textContent = "";
  revenue.textContent = "";
  commission.textContent = "";
  totalSales = 0;
  totalRevenue = 0;
  totalCommission = 0;
});

/* LOGGING ACHIEVEMENTS FUNCTION */
function checkForAchievements() {
  if (productStar.revenue === 200 || productFire.revenue === 300) {
    achievementsCount.textContent = achievementsArr[0];
  }

  if (totalRevenue > 2500) {
    achievementsCount.textContent += achievementsArr[1];
  }
  //note: put greater than 15 instead of === 15 or it will provide the trophy at the count of 14
  if (totalSales > 15) {
    achievementsCount.textContent += achievementsArr[2];
  }
}
