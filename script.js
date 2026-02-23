
let totalInterviews = 0;
let totalRejections = 0;
let activeFilter = "all";

const statTotal = document.getElementById("stat-total-count");
const statInterviews = document.getElementById("stat-interview-count");
const statRejections = document.getElementById("stat-rejected-count");
const jobsBadge = document.getElementById("active-jobs-badge");
const jobGrid = document.getElementById("job-list-grid");
const emptyState = document.getElementById("empty-state-container");


function refreshTrackerState() {
    const cards = Array.from(document.querySelectorAll(".job-card"));
    let visibleCount = 0;

    cards.forEach(card => {
        const state = card.dataset.state || "none";
        const isVisible = (activeFilter === "all") || (activeFilter === state);
        
        card.classList.toggle("hidden", !isVisible);
        if (isVisible) visibleCount++;
    });

    
    if (statTotal) statTotal.innerText = cards.length;
    if (statInterviews) statInterviews.innerText = totalInterviews;
    if (statRejections) statRejections.innerText = totalRejections;
    if (jobsBadge) jobsBadge.innerText = visibleCount;

    
    if (visibleCount === 0) {
        emptyState.classList.remove("hidden");
        jobGrid.classList.add("hidden");
    } else {
        emptyState.classList.add("hidden");
        jobGrid.classList.remove("hidden");
    }
}


jobGrid.addEventListener("click", (e) => {
    const interviewBtn = e.target.closest(".mark-interview-btn");
    const rejectedBtn = e.target.closest(".mark-rejected-btn");
    const deleteBtn = e.target.closest(".delete-job-btn");

    const card = e.target.closest(".job-card");
    if (!card) return;

    const statusBtn = card.querySelector(".application-status-btn");
    const prevState = card.dataset.state;

    
    if (interviewBtn) {
        if (prevState === "interview") return;
        if (prevState === "rejected") totalRejections--;

        totalInterviews++;
        card.dataset.state = "interview";
        
        statusBtn.innerText = "Status: Interviewing";
        statusBtn.className = "application-status-btn btn btn-sm mb-3 bg-emerald-500 text-white border-none cursor-default";
        refreshTrackerState();
    }

    
    if (rejectedBtn) {
        if (prevState === "rejected") return;
        if (prevState === "interview") totalInterviews--;

        totalRejections++;
        card.dataset.state = "rejected";

        statusBtn.innerText = "Status: Rejected";
        statusBtn.className = "application-status-btn btn btn-sm mb-3 bg-red-500 text-white border-none cursor-default";
        refreshTrackerState();
    }

    if (deleteBtn) {
        if (prevState === "interview") totalInterviews--;
        if (prevState === "rejected") totalRejections--;
        card.remove();
        refreshTrackerState();
    }
});


const filterBtns = {
    all: document.getElementById("filter-all-btn"),
    interview: document.getElementById("filter-interview-btn"),
    rejected: document.getElementById("filter-rejected-btn")
};

function updateFilterStyles(activeKey) {
    Object.values(filterBtns).forEach(btn => {
        if (btn) {
            btn.classList.add("btn-outline");
            btn.classList.remove("bg-[#3B82F6]", "text-white");
        }
    });
    
    const activeBtn = filterBtns[activeKey];
    if (activeBtn) {
        activeBtn.classList.remove("btn-outline");
        activeBtn.classList.add("bg-[#3B82F6]", "text-white");
    }
}

if (filterBtns.all) {
    filterBtns.all.addEventListener("click", () => {
        activeFilter = "all";
        updateFilterStyles("all");
        refreshTrackerState();
    });
}

if (filterBtns.interview) {
    filterBtns.interview.addEventListener("click", () => {
        activeFilter = "interview";
        updateFilterStyles("interview");
        refreshTrackerState();
    });
}

if (filterBtns.rejected) {
    filterBtns.rejected.addEventListener("click", () => {
        activeFilter = "rejected";
        updateFilterStyles("rejected");
        refreshTrackerState();
    });
}


refreshTrackerState();