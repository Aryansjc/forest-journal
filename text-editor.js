
document.addEventListener('DOMContentLoaded', function() {
    createGlobalEditorPanel();
    initializeRichTextEditor();
    document.getElementById('add-page').addEventListener('click', function() {
        setTimeout(initializeRichTextEditor, 100);
    });
});
function createGlobalEditorPanel() {
    if (document.getElementById('global-editor-panel')) return;
    const panel = document.createElement('div');
    panel.id = 'global-editor-panel';
    panel.className = 'global-editor-panel';
    const header = document.createElement('div');
    header.className = 'editor-header';
    const title = document.createElement('h2');
    title.textContent = 'Text Formatting';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-editor-btn';
    closeBtn.innerHTML = '×';
    closeBtn.addEventListener('click', function() {
        panel.classList.remove('open');
    });
    header.appendChild(title);
    header.appendChild(closeBtn);
    const toolbar = document.createElement('div');
    toolbar.className = 'editor-toolbar';
    const textStyleGroup = document.createElement('div');
    textStyleGroup.className = 'toolbar-group';
    const textStyleTitle = document.createElement('div');
    textStyleTitle.className = 'toolbar-group-title';
    textStyleTitle.textContent = 'Text Style';
    const textStyleButtons = document.createElement('div');
    textStyleButtons.className = 'toolbar-buttons';
    textStyleButtons.innerHTML = `
        <button class="toolbar-btn" data-command="bold" title="Bold"><b>B</b></button>
        <button class="toolbar-btn" data-command="italic" title="Italic"><i>I</i></button>
        <button class="toolbar-btn" data-command="underline" title="Underline"><u>U</u></button>
    `;
    textStyleGroup.appendChild(textStyleTitle);
    textStyleGroup.appendChild(textStyleButtons);
    const alignmentGroup = document.createElement('div');
    alignmentGroup.className = 'toolbar-group';
    const alignmentTitle = document.createElement('div');
    alignmentTitle.className = 'toolbar-group-title';
    alignmentTitle.textContent = 'Alignment';
    const alignmentButtons = document.createElement('div');
    alignmentButtons.className = 'toolbar-buttons';
    alignmentButtons.innerHTML = `
        <button class="toolbar-btn" data-command="justifyLeft" title="Align Left">⟵</button>
        <button class="toolbar-btn" data-command="justifyCenter" title="Align Center">⟷</button>
        <button class="toolbar-btn" data-command="justifyRight" title="Align Right">⟶</button>
    `;
    alignmentGroup.appendChild(alignmentTitle);
    alignmentGroup.appendChild(alignmentButtons);
    const separator1 = document.createElement('div');
    separator1.className = 'toolbar-separator';
    const fontGroup = document.createElement('div');
    fontGroup.className = 'toolbar-group';
    const fontTitle = document.createElement('div');
    fontTitle.className = 'toolbar-group-title';
    fontTitle.textContent = 'Font Options';
    const fontSizeLabel = document.createElement('div');
    fontSizeLabel.textContent = 'Size:';
    fontSizeLabel.style.color = '#c9e3ac';
    fontSizeLabel.style.fontSize = '14px';
    fontSizeLabel.style.marginBottom = '5px';
    const fontSizeSelect = document.createElement('select');
    fontSizeSelect.className = 'toolbar-select';
    fontSizeSelect.dataset.command = 'fontSize';
    fontSizeSelect.innerHTML = `
        <option value="1">Small</option>
        <option value="2">Medium</option>
        <option value="3" selected>Normal</option>
        <option value="4">Large</option>
        <option value="5">X-Large</option>
    `;
    const fontColorLabel = document.createElement('div');
    fontColorLabel.textContent = 'Color:';
    fontColorLabel.style.color = '#c9e3ac';
    fontColorLabel.style.fontSize = '14px';
    fontColorLabel.style.marginBottom = '5px';
    const fontColorSelect = document.createElement('select');
    fontColorSelect.className = 'toolbar-select';
    fontColorSelect.dataset.command = 'foreColor';
    fontColorSelect.innerHTML = `
        <option value="#0f2417" selected>Default</option>
        <option value="#1a472a">Forest Green</option>
        <option value="#2c5f2d">Medium Green</option>
        <option value="#43a047">Light Green</option>
        <option value="#4b636e">Slate Blue</option>
        <option value="#78909c">Blue Grey</option>
        <option value="#800000">Burgundy</option>
        <option value="#a94442">Rustic Red</option>
    `;
    fontGroup.appendChild(fontTitle);
    fontGroup.appendChild(fontSizeLabel);
    fontGroup.appendChild(fontSizeSelect);
    fontGroup.appendChild(fontColorLabel);
    fontGroup.appendChild(fontColorSelect);
    const separator2 = document.createElement('div');
    separator2.className = 'toolbar-separator';
    const listGroup = document.createElement('div');
    listGroup.className = 'toolbar-group';
    const listTitle = document.createElement('div');
    listTitle.className = 'toolbar-group-title';
    listTitle.textContent = 'Lists & Indentation';
    const listButtons = document.createElement('div');
    listButtons.className = 'toolbar-buttons';
    listButtons.innerHTML = `
        <button class="toolbar-btn" data-command="insertUnorderedList" title="Bullet List">•</button>
        <button class="toolbar-btn" data-command="insertOrderedList" title="Numbered List">1.</button>
        <button class="toolbar-btn" data-command="indent" title="Increase Indent">→</button>
        <button class="toolbar-btn" data-command="outdent" title="Decrease Indent">←</button>
    `;
    listGroup.appendChild(listTitle);
    listGroup.appendChild(listButtons);
    const applyToAllDiv = document.createElement('div');
    applyToAllDiv.className = 'apply-to-all';
    const applyBtn = document.createElement('button');
    applyBtn.textContent = 'Apply To All Pages';
    applyBtn.id = 'apply-to-all-btn';
    applyBtn.addEventListener('click', applyFormattingToAllPages);
    applyToAllDiv.appendChild(applyBtn);
    toolbar.appendChild(textStyleGroup);
    toolbar.appendChild(alignmentGroup);
    toolbar.appendChild(separator1);
    toolbar.appendChild(fontGroup);
    toolbar.appendChild(separator2);
    toolbar.appendChild(listGroup);
    toolbar.appendChild(applyToAllDiv);
    const indicator = document.createElement('div');
    indicator.id = 'global-format-indicator';
    indicator.className = 'global-format-indicator';
    indicator.textContent = 'Formatting applied to all pages';
    panel.appendChild(header);
    panel.appendChild(toolbar);
    const tabButton = document.createElement('button');
    tabButton.className = 'editor-tab-button';
    tabButton.id = 'editor-tab-button';
    tabButton.addEventListener('click', function() {
        panel.classList.add('open');
    });
    document.body.appendChild(panel);
    document.body.appendChild(tabButton);
    document.body.appendChild(indicator);
    setupGlobalFormatting(toolbar);
}
function initializeRichTextEditor() {
    document.querySelectorAll('.journal-page textarea').forEach(function(textarea) {
        if (textarea.getAttribute('data-editor-initialized') === 'true') return;
        console.log('Initializing editor for textarea:', textarea);
        const editorContainer = document.createElement('div');
        editorContainer.className = 'editor-container';
        editorContainer.style.width = '100%';
        editorContainer.style.height = '100%';
        const editor = document.createElement('div');
        editor.className = 'rich-editor';
        editor.setAttribute('contenteditable', 'true');
        if (textarea.getAttribute('data-has-rich-content') === 'true') {
            editor.innerHTML = textarea.value;
        } else {
            editor.innerHTML = textarea.value.replace(/\n/g, '<br>') || '';
        }
        editor.setAttribute('placeholder', textarea.placeholder);
        editorContainer.appendChild(editor);
        const parent = textarea.parentNode;
        parent.insertBefore(editorContainer, textarea);
        textarea.style.display = 'none';
        textarea.setAttribute('data-editor-initialized', 'true');
        setupEditorEvents(editor, textarea);
        setTimeout(() => {
            editor.style.display = 'block';
            console.log('Editor initialized:', editor);
        }, 100);
    });
}
function setupGlobalFormatting(toolbar) {
    toolbar.querySelectorAll('.toolbar-btn').forEach(button => {
        button.addEventListener('click', function() {
            const command = this.dataset.command;
            document.execCommand(command, false, null);
            const activeEditor = getActiveEditor();
            if (activeEditor) {
                activeEditor.focus();
            }
        });
    });
    toolbar.querySelectorAll('.toolbar-select').forEach(select => {
        select.addEventListener('change', function() {
            const command = this.dataset.command;
            document.execCommand(command, false, this.value);
            const activeEditor = getActiveEditor();
            if (activeEditor) {
                activeEditor.focus();
            }
        });
    });
}
function getActiveEditor() {
    const activeSpread = document.querySelector('.page-spread.active');
    if (!activeSpread) return null;
    const editors = activeSpread.querySelectorAll('.rich-editor');
    if (editors.length === 0) return null;
    for (let i = 0; i < editors.length; i++) {
        if (document.activeElement === editors[i]) {
            return editors[i];
        }
    }
    return editors[0]; 
}
function setupEditorEvents(editor, originalTextarea) {
    editor.addEventListener('input', function() {
        updateTextarea(editor, originalTextarea);
    });
    editor.addEventListener('focus', function() {
        if (editor.innerHTML === '') {
            editor.classList.remove('empty');
        }
    });
    editor.addEventListener('blur', function() {
        if (editor.innerHTML === '') {
            editor.classList.add('empty');
        }
    });
    if (editor.innerHTML === '') {
        editor.classList.add('empty');
    }
    editor.addEventListener('paste', function(e) {
        e.preventDefault();
        const text = (e.originalEvent || e).clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
        updateTextarea(editor, originalTextarea);
    });
}
function updateTextarea(editor, textarea) {
    textarea.value = editor.innerHTML;
    if (typeof window.saveJournalToSystem === 'function') {
        clearTimeout(window.editorSaveTimeout);
        window.editorSaveTimeout = setTimeout(function() {
            window.saveJournalToSystem();
            const indicator = document.createElement('div');
            indicator.className = 'autosave-indicator';
            indicator.textContent = '✓';
            document.body.appendChild(indicator);
            setTimeout(() => {
                indicator.addEventListener('animationend', function() {
                    if (indicator.parentNode) {
                        document.body.removeChild(indicator);
                    }
                });
                indicator.classList.add('fade-out');
            }, 500);
        }, 2000); 
    }
}
function applyFormattingToAllPages() {
    const activeEditor = getActiveEditor();
    if (!activeEditor) return;
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(activeEditor);
    selection.removeAllRanges();
    selection.addRange(range);
    const formatting = {
        fontSize: document.querySelector('select[data-command="fontSize"]').value,
        foreColor: document.querySelector('select[data-command="foreColor"]').value
    };
    document.querySelectorAll('.rich-editor').forEach(editor => {
        const savedSelection = saveSelection();
        const editorRange = document.createRange();
        editorRange.selectNodeContents(editor);
        selection.removeAllRanges();
        selection.addRange(editorRange);
        document.execCommand('fontSize', false, formatting.fontSize);
        document.execCommand('foreColor', false, formatting.foreColor);
        if (savedSelection) {
            restoreSelection(savedSelection);
        }
        const textarea = editor.closest('.journal-page').querySelector('textarea');
        if (textarea) {
            updateTextarea(editor, textarea);
        }
    });
    const indicator = document.getElementById('global-format-indicator');
    indicator.classList.add('show');
    setTimeout(() => {
        indicator.classList.remove('show');
    }, 2500);
}
function saveSelection() {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return null;
    return selection.getRangeAt(0);
}
function restoreSelection(range) {
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
}
window.reinitializeEditors = function() {
    setTimeout(initializeRichTextEditor, 200);
};
