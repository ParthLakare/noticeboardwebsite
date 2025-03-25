document.addEventListener('DOMContentLoaded', () => {
    loadNotices();
    updateCharCount();
});

const noticeInput = document.getElementById('noticeInput');
noticeInput.addEventListener('input', updateCharCount);

function updateCharCount() {
    const charCount = document.getElementById('charCount');
    charCount.textContent = `${noticeInput.value.length}/500`;
}

function addNotice() {
    const noticeText = noticeInput.value.trim();
    if (!noticeText) return;

    const notice = {
        text: noticeText,
        date: new Date().toLocaleString()
    };

    let notices = JSON.parse(localStorage.getItem('notices')) || [];
    notices.unshift(notice);
    localStorage.setItem('notices', JSON.stringify(notices));

    displayNotice(notice);
    noticeInput.value = '';
    updateCharCount();
}

function displayNotice(notice) {
    const noticeList = document.getElementById('noticeList');
    const noticeDiv = document.createElement('div');
    noticeDiv.classList.add('notice');
    
    noticeDiv.innerHTML = `
        <div class="notice-content">${notice.text}</div>
        <span class="notice-date">${notice.date}</span>
        <button class="delete-btn" onclick="deleteNotice(this, '${notice.date}')">✖</button>
    `;
    
    noticeList.insertBefore(noticeDiv, noticeList.firstChild);
}

function loadNotices() {
    const notices = JSON.parse(localStorage.getItem('notices')) || [];
    notices.forEach(displayNotice);
}

function deleteNotice(button, date) {
    let notices = JSON.parse(localStorage.getItem('notices')) || [];
    notices = notices.filter(notice => notice.date !== date);
    localStorage.setItem('notices', JSON.stringify(notices));
    
    const noticeDiv = button.parentElement;
    noticeDiv.style.animation = 'slideOut 0.3s ease-out forwards';
    setTimeout(() => noticeDiv.remove(), 300);
}

// Animation for deletion
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
    }
`;
document.head.appendChild(styleSheet);
