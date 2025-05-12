
document.addEventListener('DOMContentLoaded', function() {
    const journalsTab = document.getElementById('journals-tab');
    const openTabBtn = document.getElementById('open-journals-tab');
    const closeTabBtn = document.getElementById('close-tab');
    const journalsList = document.getElementById('journals-list');
    const newJournalInput = document.getElementById('new-journal-name');
    const createJournalBtn = document.getElementById('create-new-journal');
    const journalTitle = document.getElementById('journal-title');
    const journalTitleInput = document.getElementById('journal-title-input');
    const editTitleBtn = document.getElementById('edit-title-btn');
    const exportJournalBtn = document.getElementById('export-journal');
    let allJournals = {};
    let currentJournalId = null;
    openTabBtn.addEventListener('click', () => {
        journalsTab.classList.add('open');
    });
    closeTabBtn.addEventListener('click', () => {
        journalsTab.classList.remove('open');
    });
    createJournalBtn.addEventListener('click', createNewJournal);
    newJournalInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            createNewJournal();
        }
    });
    editTitleBtn.addEventListener('click', function() {
        if (journalTitleInput.classList.contains('hidden')) {
            journalTitleInput.value = journalTitle.textContent;
            journalTitleInput.classList.remove('hidden');
            journalTitle.classList.add('hidden');
            journalTitleInput.focus();
        } else {
            saveJournalTitle();
        }
    });
    journalTitleInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            saveJournalTitle();
        }
        if (event.key === 'Escape') {
            cancelTitleEdit();
        }
    });
    journalTitleInput.addEventListener('blur', saveJournalTitle);
    exportJournalBtn.addEventListener('click', exportCurrentJournal);
    initializeJournals();
    function initializeJournals() {
        const savedJournals = localStorage.getItem('forest_journals');
        if (savedJournals) {
            allJournals = JSON.parse(savedJournals);
            const lastActiveId = localStorage.getItem('forest_current_journal');
            if (lastActiveId && allJournals[lastActiveId]) {
                currentJournalId = lastActiveId;
            } else if (Object.keys(allJournals).length > 0) {
                currentJournalId = Object.keys(allJournals)[0];
            } else {
                createDefaultJournal();
            }
        } else {
            createDefaultJournal();
            createExampleJournal();
        }
        updateJournalsList();
        loadCurrentJournal();
    }
    function createDefaultJournal() {
        const defaultId = 'journal_' + Date.now();
        const examplePages = [
            {
                page: 1,
                content: `<h1 style="text-align: center; color: #1a472a;">The Forests' Secrets</h1>
<h3 style="text-align: center; color: #2c5f2d;">In the Heart of Nature's Wild Life</h3>
<blockquote style="text-align: center; font-style: italic; color: #43a047;">"Let me lose my mind and find my soul, for which I need to step into the forest." — John Muir</blockquote>`
            },
            {
                page: 2,
                content: `<h2 style="color: #1a472a;">📖 Prelude: Toward the Green</h2>
<p>A certain region exists where the world breathes differently — where time slows and breath windows expand. The forest is not simply an amalgamation of trees. It is a timeless cathedral where each tree is ripping of civilization. Untouched where no roof shields the stars. The journey into the forest becomes a new beginning, a renewed sense of calm after the chaos, and a soothing retreat to a realm before maps were drawn and languages were forged. You are part of a inaudible heartbeat before every moment. Part of its meters.</p>`
            },
            {
                page: 3,
                content: `<h2 style="color: #1a472a;">🌳 The Silence Diplomats</h2>
<p>They remain quiet. Everything is poised which is the highest form of patience. The trees remember the savagery of the wildfire, thunder, and war. They are stilled beneath the soil but, in reality, they utilize mycorrhizal networking to communicate.</p>
<p>A solitary tree silently stands tall. Its roots anchor deep, through storms. Each arm stretches towards the sun, not in greed, but longing. Every leaf serves as a solar panel of life, basking in the light while inhaling what we exhale.</p>
<p>In their stillness, trees remind us of patience and resilience. While in their growth, they teach us that strength does not need to be vocal to be powerful.</p>`
            },
            {
                page: 4,
                content: `<h2 style="color: #1a472a;">Sounds of the Wild</h2>
<p>The forest does not wake to an alarm in the morning, rather a song. The birdsong rises above the undergrowth and twines through the trunks. A stream flows over smooth stones, humming its ancient lullaby while the breeze flutes between branches.</p>
<p>This music has no sharp edges. No choruses loudly asking for applause. Something is fulfilled inside of us that cities never can offer. Even silence within the bounds of the forest is not vacant. It is rich, alive layered with the breath of the trees and the slow pulse of life hidden from view.</p>
<p>Part of a larger picture. And the forest, lacking a conductor or audience, performs anew each day without restriction masterpiece.</p>`
            },
            {
                page: 5,
                content: `<h2 style="color: #1a472a;">🍂 A Tainted Leaf's Mourning</h2>
<p>Now I stand among the pieces on the ground. A tapestry of golden color blended with brown. Once I reached my arms towards the sky. When I unfurled in spring, I caught the heat of summer, and drank from the hand of the monsoon. Knowledge trembled within me that my time would arrive soon fall.</p>
<p>My veins returned from plumbing the sun's power, and now they nourish rain back into the soil. No longer in despair do I rot, but in purposeful decay. Of a seedlings born in my shadow. For fungi, for worms.</p>
<p>There is no scarcity in the life cycle. In the cycle of the forest, death is not an end. It is transformation.</p>`
            },
            {
                page: 6,
                content: `<h2 style="color: #1a472a;">🚶 Over the Green Gate</h2>
<p>At first, the trail seems to narrow down, and then it stops completely. Instead, the steps you are taking seem to be in an existence that you can not walk on. Ferns touch your legs and the moist earth makes every step feel as if its worth it. Somewhere, a bird is watching while a fox remains frozen.</p>
<p>The air engracing your lungs is the combination of bark and wet stone. Something is stirring towards the light—a vine curl upwards. While you get to the root, the sound of the road vanishes. A mushroom reveals the cap to the drear while you step over the root.</p>
<p>This is the moment neither found nor lost. This is quite simply.</p>`
            },
            {
                page: 7,
                content: `<h2 style="color: #1a472a;">🐾 Within the Forest's Gaze</h2>
<p>Her ears flick and her breath is a whisper as a deer maneuvers toward shafts of light like a fog -given the shape of reality. She does not hurry or panic. Every step taken with fluency and the forest is her language. Every step taken is fluency.</p>
<p>A mole traverses through a world without sun beneath the soil. In the trees, a squirrel leaps aye daving the joy. Everything individually plays the with an understanding of instinctful elegance. None overpower, however, all do persist.</p>
<p>To be wild goes beyond transcendence. It creates allegiance to a cadence deeper than hours. Here, life does not vanquish; it cohabits.</p>`
            },
            {
                page: 8,
                content: `<h2 style="color: #1a472a;">🌿 The Soft Empire</h2>
<p>For no spices or fury dulls him moss dresses stone and bark. With calm ease soaking troubles where moss softens, it quietly grown through foundation. In places where illumination is scant and roots run deep, moss flourishes.</p>
<p>A single stone shrouded in moss simultaneously nurtures an entire world flourishing with life. Mites, beetles, and even spores along with microbes makes for an empire without visibility. It is a dynamic construction on patience not empire.</p>
<p>Moss teaches us that stillness is not lack of movement and silence, in its own way, is strength. It reminds us that life doesn't have to be rushed to be successful. That softness, when persistent, can endure even where metal and man crumble. Stillness is not weakness.</p>`
            },
            {
                page: 9,
                content: `<h2 style="color: #1a472a;">🌕 When Darkness Falls</h2>
<p>The forest transforms at night and does not sleep. The moon filters through the canopy in silver ribbons. Eyes radiate in the dark. The rustle of the daytime is replaced with the crackle of mysterious paws. Crickets countdown the hours with their legs and owls call.</p>
<p>The boundary between reality and fairy tale is blurred. In this place, fear and wonder blend. The forest has not changed, you have. It strips away distractions and demands reve rence.</p>
<p>In the smallness of our being, awe can be found.</p>`
            },
            {
                page: 10,
                content: `<h2 style="color: #1a472a;">🎨 The Living Palette</h2>
<p>No filter can enhance what the eye already struggles to believe. It is hard to find a painter that masters the chaos of a blooming forest. Emerald lichen on stone grey bark and vibrant violet of a wildflower blossom beneath your feet. Blood-orange fallen pine needles.</p>
<p>The hues in a forest are not in conflict, they are in collusion. Decay also has its charms: the rot's rust, mold's bruise, and the blue-grey fungus caressing a log.</p>
<p>This is not arbitrary enchantment. It is poetry of biology.</p>`
            },
            {
                page: 11,
                content: `<h2 style="color: #1a472a;">🧨 The Old Stories</h2>
<p>Long before we had GPS, we roamed freely based on stories. We narrated of dryads who wept when trees were cut, grove protecting spirits, and paths that moved of their own accord. The realms of gods and monsters, where fleeted time and rules ceased to exist, were domains we frequented.</p>
<p>We trusted these stories. They weren't tales spun to warn us, duress framed as reverence was masked within these rich myths. They implored us to respect: a forest is not a resource, but a being, so treat it alive.</p>
<p>Fear was not what these narratives aimed to evoke. They were meant to engrave a mark in memory.</p>`
        },
        {
            page: 12,
            content: `<h2 style="color: #1a472a;">✉️ A Letter to the Forest</h2>
<p>You kept me cozy during my weary weeks battling concrete jungles. You spoke to me in silence, during the moments where I had nothing to say. Always reminding me how to properly gasp air.</p>
<p>There were no strings attached to your help. The only thing you asked was that I walk carefully, leaving no footprints behind, and do not take you scars that would need my patience. I admit that I have not done that at times. We decapitate your trees, mute your birds, and defile them.</p>
<p>But I stand before you now. I am not only thankful, but owe you my loyalty too. I will plant. I will shield. I will stand out when others chose to hide.</p>
<p>This is not us taking in final sod. It is a vows instead.</p>`
        },
        {
            page: 13,
            content: `<h2 style="color: #1a472a;">🌱 Echoes of Responsibility</h2>
<p>The forest and nature does not have a use to our sympathy. It requires aid. It does not need our attention. It calls for usage.</p>
<p>Being nature friendly is not enough. We must put another processes on our appetite. Spend less. Sow more. Ask higher standards. Change the mindset of others. Stand up for what is right even when it is wrong, because wrong helps cut off trees.</p>
<p>Nature will not face extinction in fire. It will face prudence. If the state of matters allows. We do not need assistance. Every shout raised in defense of nature serves as a future geologist subdivided on the foundation of time.</p>
<p>Become a spirit of augury and pass on your legacy as a living sapling.</p>`
            },
            {
                page: 14,
                content: `<h2 style="color: #1a472a;">🪵 Epilogue: Lessons From the Forest</h2>
<p>My pursuit was peace, but the forest had another path for me. It spoke not in soliloquies, but through the rustling of winds, radiance, cycles of decay and rebirth.</p>
<p>True power can be silence. Complexity isn't synonymous to chaos. Everything is bound to perish, but nothing is wasted. I understood that my identity isn't above nature, but amongst it.</p>
<p>Such a journey doesn't end on the last page. The forest will always be there, growing, whispering, waiting to be explored.</p>
<p>All I need to do is… listen.</p>`
            }
        ];
        allJournals[defaultId] = {
            id: defaultId,
            title: 'Whispers of the Forest',
            dateCreated: new Date().toISOString(),
            lastModified: new Date().toISOString(),
            pages: examplePages
        };
        currentJournalId = defaultId;
        saveJournals();
    }
    function createNewJournal() {
        const newJournalName = newJournalInput.value.trim();
        if (newJournalName) {
            const newId = 'journal_' + Date.now();
            saveCurrentJournalContent();
            allJournals[newId] = {
                id: newId,
                title: newJournalName,
                dateCreated: new Date().toISOString(),
                lastModified: new Date().toISOString(),
                pages: []
            };
            currentJournalId = newId;
            localStorage.setItem('forest_current_journal', newId);
            saveJournals();
            
            // Show brief notification before reload
            const notification = document.createElement('div');
            notification.className = 'save-confirmation';
            notification.textContent = 'New journal created! Loading...';
            document.body.appendChild(notification);
            
            // Reload the page after a short delay
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } else {
            alert('Please enter a journal name');
        }
    }
    function updateJournalsList() {
        journalsList.innerHTML = '';
        const sortedJournals = Object.values(allJournals).sort((a, b) => {
            return new Date(b.lastModified) - new Date(a.lastModified);
        });
        sortedJournals.forEach(journal => {
            const journalItem = document.createElement('div');
            journalItem.className = 'journal-item';
            if (journal.id === currentJournalId) {
                journalItem.classList.add('active');
            }
            journalItem.dataset.id = journal.id;
            const title = document.createElement('div');
            title.className = 'journal-item-title';
            title.textContent = journal.title;
            const actions = document.createElement('div');
            actions.className = 'journal-item-actions';
            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '🗑️';
            deleteBtn.title = 'Delete journal';
            deleteBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                deleteJournal(journal.id);
            });
            actions.appendChild(deleteBtn);
            journalItem.appendChild(title);
            journalItem.appendChild(actions);
            journalItem.addEventListener('click', function() {
                if (journal.id !== currentJournalId) {
                    loadJournal(journal.id);
                }
            });
            journalsList.appendChild(journalItem);
        });
        if (sortedJournals.length === 0) {
            const emptyMsg = document.createElement('div');
            emptyMsg.className = 'empty-journals-message';
            emptyMsg.textContent = 'No journals yet. Create your first one!';
            journalsList.appendChild(emptyMsg);
        }
    }
    function saveJournalTitle() {
        const newTitle = journalTitleInput.value.trim();
        if (newTitle && currentJournalId) {
            journalTitle.textContent = newTitle;
            if (allJournals[currentJournalId]) {
                allJournals[currentJournalId].title = newTitle;
                allJournals[currentJournalId].lastModified = new Date().toISOString();
                saveJournals();
                updateJournalsList();
            }
        }
        journalTitleInput.classList.add('hidden');
        journalTitle.classList.remove('hidden');
    }
    function cancelTitleEdit() {
        journalTitleInput.classList.add('hidden');
        journalTitle.classList.remove('hidden');
    }
    function loadJournal(journalId) {
        saveCurrentJournalContent();
        currentJournalId = journalId;
        localStorage.setItem('forest_current_journal', journalId);
        loadCurrentJournal();
        updateJournalsList();
        journalsTab.classList.remove('open');
    }
    function saveCurrentJournalContent() {
        if (!currentJournalId) return;
        const pages = [];
        const journalPages = document.querySelectorAll('.journal-page');
        journalPages.forEach(journalPage => {
            const pageNumber = parseInt(journalPage.dataset.page);
            let content = '';
            const richEditor = journalPage.querySelector('.rich-editor');
            if (richEditor) {
                content = richEditor.innerHTML;
            } else {
                const textarea = journalPage.querySelector('textarea');
                if (textarea) {
                    content = textarea.value;
                }
            }
            pages.push({
                page: pageNumber,
                content: content
            });
        });
        if (allJournals[currentJournalId]) {
            allJournals[currentJournalId].pages = pages;
            allJournals[currentJournalId].lastModified = new Date().toISOString();
            saveJournals();
            console.log('Journal saved with', pages.length, 'pages');
            showNotification('Journal saved!');
        }
    }
    function loadCurrentJournal() {
        if (!currentJournalId || !allJournals[currentJournalId]) return;
        const journal = allJournals[currentJournalId];
        journalTitle.textContent = journal.title;
        const journalData = journal.pages || [];
        window.loadJournalData(journalData);
        if (typeof window.reinitializeEditors === 'function') {
            window.reinitializeEditors();
        }
    }
    function deleteJournal(journalId) {
        if (!confirm(`Are you sure you want to delete "${allJournals[journalId]?.title || 'this journal'}"?`)) {
            return;
        }
        delete allJournals[journalId];
        saveJournals();
        if (journalId === currentJournalId) {
            if (Object.keys(allJournals).length > 0) {
                currentJournalId = Object.keys(allJournals)[0];
                loadCurrentJournal();
            } else {
                createDefaultJournal();
                resetJournalUI();
                loadCurrentJournal();
            }
        }
        updateJournalsList();
        showNotification('Journal deleted');
    }
    function resetJournalUI() {
        const journalPages = document.getElementById('journal-pages');
        journalPages.innerHTML = '';
        const spreadDiv = document.createElement('div');
        spreadDiv.className = 'page-spread active';
        spreadDiv.dataset.spread = 1;
        const leftPage = document.createElement('div');
        leftPage.className = 'journal-page left-page';
        leftPage.dataset.page = 1;
        const leftTextarea = document.createElement('textarea');
        leftTextarea.placeholder = 'Write your thoughts on page 1...';
        const leftPageNumber = document.createElement('div');
        leftPageNumber.className = 'page-number';
        leftPageNumber.textContent = 1;
        leftPage.appendChild(leftTextarea);
        leftPage.appendChild(leftPageNumber);
        const rightPage = document.createElement('div');
        rightPage.className = 'journal-page right-page';
        rightPage.dataset.page = 2;
        const rightTextarea = document.createElement('textarea');
        rightTextarea.placeholder = 'Write your thoughts on page 2...';
        const rightPageNumber = document.createElement('div');
        rightPageNumber.className = 'page-number';
        rightPageNumber.textContent = 2;
        rightPage.appendChild(rightTextarea);
        rightPage.appendChild(rightPageNumber);
        spreadDiv.appendChild(leftPage);
        spreadDiv.appendChild(rightPage);
        journalPages.appendChild(spreadDiv);
        window.currentSpreadIndex = 1;
        window.totalSpreads = 1;
        window.updatePageNumber();
    }
    function saveJournals() {
        localStorage.setItem('forest_journals', JSON.stringify(allJournals));
    }
    function exportCurrentJournal() {
        if (!currentJournalId || !allJournals[currentJournalId]) return;
        saveCurrentJournalContent();
        const journal = allJournals[currentJournalId];
        let exportText = `# ${journal.title}\n\n`;
        exportText += `Created: ${new Date(journal.dateCreated).toLocaleString()}\n`;
        exportText += `Last Modified: ${new Date(journal.lastModified).toLocaleString()}\n\n`;
        const sortedPages = [...journal.pages].sort((a, b) => a.page - b.page);
        sortedPages.forEach(page => {
            exportText += `## Page ${page.page}\n\n${page.content || 'Empty page'}\n\n`;
        });
        const blob = new Blob([exportText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${journal.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showNotification('Journal exported successfully!');
    }
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'save-confirmation';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.addEventListener('animationend', function() {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            });
        }, 2000);
    }
    document.getElementById('save-journal').addEventListener('click', function() {
        setTimeout(() => {
            saveCurrentJournalContent();
            updateJournalsList();
        }, 100);
    });
    window.saveJournalToSystem = saveCurrentJournalContent;
    document.getElementById('add-page').addEventListener('click', function() {
        setTimeout(saveCurrentJournalContent, 500);
    });
});
