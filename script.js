document.addEventListener("DOMContentLoaded", function () {
  
  let interviewCount = 0;
  let rejectedCount = 0;
  let activeTab = "all";

  const totalStatDisplay = document.getElementById("stat-total-count");
  const interviewStatDisplay = document.getElementById("stat-interview-count");
  const rejectedStatDisplay = document.getElementById("stat-rejected-count");
  
  const jobsBadge = document.getElementById("active-jobs-badge");
  const jobListGrid = document.getElementById("job-list-grid");
  const emptyState = document.getElementById("empty-state-container");

  
  let jobCards = Array.from(document.querySelectorAll(".job-card"));


  const filterAllBtn = document.getElementById("filter-all-btn");
  const filterInterviewBtn = document.getElementById("filter-interview-btn");
  const filterRejectedBtn = document.getElementById("filter-rejected-btn");
  const allFilterButtons = [filterAllBtn, filterInterviewBtn, filterRejectedBtn];

 
  function applyFilter() {
    jobCards.forEach((card) => {
      const state = card.dataset.state;

      if (activeTab === "all") {
        card.classList.remove("hidden");
      } else if (activeTab === "interview") {
        state === "interview" ? card.classList.remove("hidden") : card.classList.add("hidden");
      } else if (activeTab === "rejected") {
        state === "rejected" ? card.classList.remove("hidden") : card.classList.add("hidden");
      }
    });
    updateCounts();
  }

  function updateCounts() {
    const visibleCards = jobCards.filter((card) => !card.classList.contains("hidden"));
    
    
    totalStatDisplay.innerText = jobCards.length;
    interviewStatDisplay.innerText = interviewCount;
    rejectedStatDisplay.innerText = rejectedCount;

    
    jobsBadge.innerText = visibleCards.length;

    
    if (visibleCards.length === 0) {
      emptyState.classList.remove("hidden");
      jobListGrid.classList.add("hidden");
    } else {
      emptyState.classList.add("hidden");
      jobListGrid.classList.remove("hidden");
    }
  }


  function updateFilterButtonStyles(clickedBtn) {
    allFilterButtons.forEach(btn => {
        btn.classList.add("btn-outline");
        btn.classList.remove("bg-blue-400", "text-white");
    });
    
    clickedBtn.classList.remove("btn-outline");
    clickedBtn.classList.add("bg-blue-400", "text-white");
  }

  
  jobListGrid.addEventListener("click", function (event) {
    const target = event.target;
    const card = target.closest(".job-card");
    if (!card) return;

    const statusBadge = card.querySelector(".application-status-btn");
    const previousState = card.dataset.state || "not-applied";

   
    if (target.classList.contains("mark-interview-btn")) {
      if (previousState === "interview") return;

      if (previousState === "rejected") rejectedCount--;
      
      interviewCount++;
      card.dataset.state = "interview";
      statusBadge.innerText = "Status: Interviewing";
      statusBadge.className = "application-status-btn btn btn-sm mb-3 btn-info text-white";
      applyFilter();
    }

    
    if (target.classList.contains("mark-rejected-btn")) {
      if (previousState === "rejected") return;

      if (previousState === "interview") interviewCount--;

      rejectedCount++;
      card.dataset.state = "rejected";
      statusBadge.innerText = "Status: Rejected";
      statusBadge.className = "application-status-btn btn btn-sm mb-3 btn-error text-white";
      applyFilter();
    }

    
    if (target.closest(".delete-job-btn")) {
      if (previousState === "interview") interviewCount--;
      if (previousState === "rejected") rejectedCount--;

      card.remove();
     
      jobCards = jobCards.filter(c => c !== card);
      updateCounts();
    }
  });

 
  filterAllBtn.addEventListener("click", () => {
    activeTab = "all";
    updateFilterButtonStyles(filterAllBtn);
    applyFilter();
  });

  filterInterviewBtn.addEventListener("click", () => {
    activeTab = "interview";
    updateFilterButtonStyles(filterInterviewBtn);
    applyFilter();
  });

  filterRejectedBtn.addEventListener("click", () => {
    activeTab = "rejected";
    updateFilterButtonStyles(filterRejectedBtn);
    applyFilter();
  });

  
  document.querySelectorAll(".application-status-btn").forEach(btn => {
      btn.classList.add("hidden"); 
  });
  
  updateCounts();
});