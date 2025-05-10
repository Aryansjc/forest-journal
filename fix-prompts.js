
document.addEventListener('DOMContentLoaded', function() {
    function fixPromptText() {
        console.log("Fixing prompt text in journals...");
        const savedJournals = localStorage.getItem('forest_journals');
        if (!savedJournals) return;
        try {
            const journals = JSON.parse(savedJournals);
            let hasChanges = false;
            Object.keys(journals).forEach(journalId => {
                const journal = journals[journalId];
                if (journal.pages && Array.isArray(journal.pages)) {
                    journal.pages.forEach(page => {
                        if (page.content && typeof page.content === 'string' && page.content.includes('Prompt:')) {
                            page.content = page.content.replace(/Prompt:/g, 'Activity:');
                            hasChanges = true;
                            console.log(`Fixed "Prompt:" in journal "${journal.title}", page ${page.page}`);
                        }
                    });
                }
            });
            if (hasChanges) {
                localStorage.setItem('forest_journals', JSON.stringify(journals));
                console.log("Saved updates to journals!");
                if (window.loadCurrentJournal) {
                    window.loadCurrentJournal();
                }
            }
        } catch (error) {
            console.error("Error fixing journal content:", error);
        }
    }
    setTimeout(fixPromptText, 500);
});
