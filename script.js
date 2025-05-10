document.addEventListener('DOMContentLoaded', function() {
    const journalPages = document.getElementById('journal-pages');
    const pageNumber = document.getElementById('page-number');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const addPageBtn = document.getElementById('add-page');
    const saveJournalBtn = document.getElementById('save-journal');
    const currentDateDisplay = document.getElementById('current-date');
    const today = new Date();
    currentDateSetting = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    currentDateDisplay.textContent = currentDateSetting;
    let currentSpreadIndex = 1;
    let totalSpreads = 1;
    prevPageBtn.addEventListener('click', navigateToPrevSpread);
    nextPageBtn.addEventListener('click', navigateToNextSpread);
    addPageBtn.addEventListener('click', addNewSpread);
    saveJournalBtn.addEventListener('click', saveJournal);
    function navigateToPrevSpread() {
        if (currentSpreadIndex > 1) {
            if ($('.page-spread.animating').length) return;
            const currentSpread = $(`.page-spread[data-spread="${currentSpreadIndex}"]`);
            const prevSpread = $(`.page-spread[data-spread="${currentSpreadIndex - 1}"]`);
            if (currentSpread.length && prevSpread.length) {
                currentSpread.addClass('animating');
                prevSpread.addClass('animating');
                prevSpread.css({
                    visibility: 'visible',
                    display: 'flex',
                    transform: 'translateX(-100%)',
                    opacity: 0
                });
                currentSpread.addClass('page-right-out');
                setTimeout(function() {
                    currentSpread.removeClass('active page-right-out animating');
                    prevSpread.removeClass('animating').addClass('active');
                    currentSpread.css({
                        transform: '',
                        opacity: '',
                        visibility: 'hidden',
                        display: 'none'
                    });
                    prevSpread.css({
                        transform: '',
                        opacity: ''
                    });
                    currentSpreadIndex--;
                    updatePageNumber();
                }, 500);
            }
        }
    }
    function navigateToNextSpread() {
        if (currentSpreadIndex < totalSpreads) {
            if ($('.page-spread.animating').length) return;
            const currentSpread = $(`.page-spread[data-spread="${currentSpreadIndex}"]`);
            const nextSpread = $(`.page-spread[data-spread="${currentSpreadIndex + 1}"]`);
            if (currentSpread.length && nextSpread.length) {
                currentSpread.addClass('animating');
                nextSpread.addClass('animating');
                nextSpread.css({
                    visibility: 'visible',
                    display: 'flex',
                    transform: 'translateX(100%)',
                    opacity: 0
                });
                currentSpread.addClass('page-left-out');
                setTimeout(function() {
                    currentSpread.removeClass('active page-left-out animating');
                    nextSpread.removeClass('animating').addClass('active');
                    currentSpread.css({
                        transform: '',
                        opacity: '',
                        visibility: 'hidden',
                        display: 'none'
                    });
                    nextSpread.css({
                        transform: '',
                        opacity: ''
                    });
                    currentSpreadIndex++;
                    updatePageNumber();
                }, 500);
            }
        }
    }
    function updatePageNumber() {
        const leftPageNum = (currentSpreadIndex * 2) - 1;
        const rightPageNum = currentSpreadIndex * 2;
        pageNumber.textContent = `Pages ${leftPageNum}-${rightPageNum}`;
        prevPageBtn.disabled = currentSpreadIndex === 1;
        nextPageBtn.disabled = currentSpreadIndex === totalSpreads;
    }
    function addNewSpread() {
        totalSpreads++;
        const newSpread = document.createElement('div');
        newSpread.className = 'page-spread';
        newSpread.dataset.spread = totalSpreads;
        const leftPageNum = (totalSpreads * 2) - 1;
        const rightPageNum = totalSpreads * 2;
        const leftPage = document.createElement('div');
        leftPage.className = 'journal-page left-page';
        leftPage.dataset.page = leftPageNum;
        const leftTextarea = document.createElement('textarea');
        leftTextarea.placeholder = `Write your thoughts on page ${leftPageNum}...`;
        const leftPageNumber = document.createElement('div');
        leftPageNumber.className = 'page-number';
        leftPageNumber.textContent = leftPageNum;
        leftPage.appendChild(leftTextarea);
        leftPage.appendChild(leftPageNumber);
        const rightPage = document.createElement('div');
        rightPage.className = 'journal-page right-page';
        rightPage.dataset.page = rightPageNum;
        const rightTextarea = document.createElement('textarea');
        rightTextarea.placeholder = `Write your thoughts on page ${rightPageNum}...`;
        const rightPageNumber = document.createElement('div');
        rightPageNumber.className = 'page-number';
        rightPageNumber.textContent = rightPageNum;
        rightPage.appendChild(rightTextarea);
        rightPage.appendChild(rightPageNumber);
        newSpread.appendChild(leftPage);
        newSpread.appendChild(rightPage);
        journalPages.appendChild(newSpread);
        showSpread(totalSpreads);
    }
    function showSpread(spreadIndex) {
        const spreads = document.querySelectorAll('.page-spread');
        spreads.forEach(spread => {
            spread.classList.remove('active');
        });
        const selectedSpread = document.querySelector(`.page-spread[data-spread="${spreadIndex}"]`);
        if (selectedSpread) {
            selectedSpread.classList.add('active');
            currentSpreadIndex = spreadIndex;
            updatePageNumber();
        }
    }
    function saveJournal() {
        const journalData = [];
        document.querySelectorAll('.journal-page textarea').forEach(textarea => {
            const pageNumber = parseInt(textarea.parentElement.dataset.page);
            journalData.push({
                page: pageNumber,
                content: textarea.value
            });
        });
        localStorage.setItem('forest_journal', JSON.stringify(journalData));
        if (typeof window.saveJournalToSystem === 'function') {
            window.saveJournalToSystem();
        }
        const confirmation = document.createElement('div');
        confirmation.className = 'save-confirmation';
        confirmation.textContent = 'Journal saved successfully!';
        document.body.appendChild(confirmation);
        setTimeout(() => {
            confirmation.addEventListener('animationend', function() {
                if (confirmation.parentNode) {
                    document.body.removeChild(confirmation);
                }
            });
        }, 2000);
    }
    function loadJournal() {
        const savedJournal = localStorage.getItem('forest_journal');
        if (savedJournal) {
            try {
                const journalData = JSON.parse(savedJournal);
                loadJournalData(journalData);
            } catch (error) {
                console.error('Failed to load journal:', error);
                updatePageNumber();
                showSpread(1);
            }
        } else {
            updatePageNumber();
            showSpread(1);
        }
    }
    function loadJournalData(journalData) {
        if (!journalData || journalData.length === 0) {
            updatePageNumber();
            showSpread(1);
            return;
        }
        const pageCount = journalData.length;
        const neededSpreads = Math.ceil(pageCount / 2);
        journalPages.innerHTML = '';
        for (let i = 1; i <= neededSpreads; i++) {
            const spreadDiv = document.createElement('div');
            spreadDiv.className = 'page-spread';
            spreadDiv.dataset.spread = i;
            const leftPageNum = (i * 2) - 1;
            const rightPageNum = i * 2;
            const leftPageData = journalData.find(page => page.page === leftPageNum);
            const leftPage = document.createElement('div');
            leftPage.className = 'journal-page left-page';
            leftPage.dataset.page = leftPageNum;
            const leftTextarea = document.createElement('textarea');
            leftTextarea.placeholder = `Write your thoughts on page ${leftPageNum}...`;
            if (leftPageData) {
                leftTextarea.value = leftPageData.content;
                if (leftPageData.content.includes('<') && leftPageData.content.includes('>')) {
                    leftTextarea.setAttribute('data-has-rich-content', 'true');
                }
            }
            const leftPageNumber = document.createElement('div');
            leftPageNumber.className = 'page-number';
            leftPageNumber.textContent = leftPageNum;
            leftPage.appendChild(leftTextarea);
            leftPage.appendChild(leftPageNumber);
            const rightPageData = journalData.find(page => page.page === rightPageNum);
            const rightPage = document.createElement('div');
            rightPage.className = 'journal-page right-page';
            rightPage.dataset.page = rightPageNum;
            const rightTextarea = document.createElement('textarea');
            rightTextarea.placeholder = `Write your thoughts on page ${rightPageNum}...`;
            if (rightPageData) {
                rightTextarea.value = rightPageData.content;
                if (rightPageData.content.includes('<') && rightPageData.content.includes('>')) {
                    rightTextarea.setAttribute('data-has-rich-content', 'true');
                }
            }
            const rightPageNumber = document.createElement('div');
            rightPageNumber.className = 'page-number';
            rightPageNumber.textContent = rightPageNum;
            rightPage.appendChild(rightTextarea);
            rightPage.appendChild(rightPageNumber);
            spreadDiv.appendChild(leftPage);
            spreadDiv.appendChild(rightPage);
            journalPages.appendChild(spreadDiv);
        }
        totalSpreads = neededSpreads;
        currentSpreadIndex = 1;
        showSpread(1);
        updatePageNumber();
    }
    window.loadJournalData = loadJournalData;
});
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .save-confirmation {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border-radius: 4px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            animation: slideIn 0.3s forwards, fadeOut 0.3s 1.7s forwards;
        }
        @keyframes slideIn {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});
