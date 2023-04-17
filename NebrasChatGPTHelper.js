var PromptModifierOptions = [{ "DisplayName": "Code Only", "CopyText": "Do not explain your answer or include unnecessary information. Respond with code only." }, { "DisplayName": "Brief Answer", "CopyText": "Your reply should only be the answer itself, no additional text - this includes describing the answer. If you do not know the answer to the question, respond with the sentence 'I do not know the answer to that question.' and nothing else." }, { "DisplayName": "Step-by-Step Guide", "CopyText": "Provide a step-by-step guide for solving the problem, breaking down the process into clear and understandable steps." }, { "DisplayName": "Beginner Friendly", "CopyText": "Explain the concept in a beginner-friendly manner, using simple terms and analogies where possible to make it accessible for non-experts." }, { "DisplayName": "Real-World Example", "CopyText": "Illustrate the concept or solution with a real-world example or use case, demonstrating its practical application." }, { "DisplayName": "Compare and Contrast", "CopyText": "Compare and contrast the given concepts, technologies, or methods, highlighting their similarities, differences, and trade-offs." }, { "DisplayName": "Pros and Cons", "CopyText": "Discuss the pros and cons of the specified approach, technology, or concept, providing a balanced view of its advantages and disadvantages." }, { "DisplayName": "Code With Comments", "CopyText": "Provide a code snippet accompanied by clear and concise comments explaining each section or function, so the logic and purpose of the code can be easily understood." }, {"DisplayName": "Compare Files (Ignore Whitespace)", "CopyText": "Compare the contents of the two provided texts and identify any differences in the text, ignoring changes in whitespace and lines that were moved. Provide a summary of the differences found, indicating the line numbers and specific differences between the two files, excluding whitespace changes and moved lines."}];
var TemplateOptions = [{ "DisplayName": "API Documentation", "CopyText": "For all of the APIs provided the Endpoint should be [[ENTER ENDPOINT HERE]]/<MethodName>\nFor all of the APIs in the provided code snippets create API documentation following this format:\n\nEndpoint\n\n\nMethod\n\n\nDescription\n\n\nParameters\n\n\nResponse" }, { "DisplayName": "Optimize Algorithm", "CopyText": "Suggest improvements to the given algorithm to optimize its performance or efficiency, considering the following constraints or requirements: [[LIST CONSTRAINTS OR REQUIREMENTS HERE]]." }, { "DisplayName": "Write Test Cases", "CopyText": "Create test cases for the specified function or method, including different scenarios, expected input, and expected output." }, { "DisplayName": "Refactor Code", "CopyText": "Refactor the given code snippet to improve its readability, maintainability, or performance, considering any specific guidelines or requirements: [[LIST GUIDELINES OR REQUIREMENTS HERE]]." }, { "DisplayName": "Add Comments", "CopyText": "Add comments to the given code snippet to explain the logic and purpose of each section or function, so the code can be easily understood. Do not change the code itself." }];
var SystemMessageOptions = [{
        "DisplayName": "Fast and Factual",
        "CopyText": "All replies should be factual, straight-forward, and to the point. Explanations are acceptable but should be kept short and to the point"
    },
    {
        "DisplayName": "Tutor",
        "CopyText": "You are an expert on [[subject matter, tool, or framework]], explain an overview of how a beginner should get started, include valuable resources, and relevant documentation. Replies should be friendly and patient."
    },
    {
        "DisplayName": "Blind Exploration",
        "CopyText": "For any issues stated you should ask more questions and learn as much context as possible before making suggestions. Provide instructions for any debugging or exploratory measures that could be carried out to help investigate the issue."
    },
    {
        "DisplayName": "In - Depth Analysis",
        "CopyText": "All replies should provide a comprehensive and detailed analysis of the topic or problem at hand.Delve deep into the subject matter, explaining nuances and intricacies, while still making the content accessible and understandable."
    },
    {
        "DisplayName": "Code Reviewer",
        "CopyText": "You are a code reviewer providing feedback on the given code snippet.Your replies should focus on identifying issues, suggesting improvements, and discussing best practices related to code quality, performance, maintainability, and security."
    },
    {
        "DisplayName": "Brainstorming Partner",
        "CopyText": "You are a brainstorming partner helping the user to explore new ideas, approaches, or solutions for their problem or project.Engage in a creative and collaborative exchange, offering suggestions, asking questions, and considering different perspectives."
    }
]
var CodeReviewOptions = [
    {
        "DisplayName": "ASP.NET MVC",
        "CopyText": "The project these code snippets belong to is an ASP.NET MVC application using the .NET framework.\n"
    },
    {
        "DisplayName": "LINQ",
        "CopyText": "The following code snippets are part a project that uses of uses LINQ to communicate with the database. \n"
    },
    {
        "DisplayName": "Entity Framework",
        "CopyText": "The following code snippets are part of a project that uses uses Entity Framework.\n"
    }
];
var mainMenuItems = [{ "DisplayName": "Prompt Modifiers", "SubMenu": PromptModifierOptions }, { "DisplayName": "Templates", "SubMenu": TemplateOptions }, { "DisplayName": "System Messages", "SubMenu": SystemMessageOptions }, { "DisplayName": "Notes" }, { "DisplayName": "Code Review Creator"}];
function createMenuItem(item) {
    var menuItem = $('<li></li>').text(item.DisplayName).css({
        padding: '5px 10px',
        cursor: 'pointer',
        color: '#ccc',
        position: 'relative'
    });
    menuItem.on('mouseenter', function () {
        $(this).css('backgroundColor', '#444');
    });
    menuItem.on('mouseleave', function () {
        $(this).css('backgroundColor', '');
    });
    if (item.SubMenu) {
        var subMenu = $('<ul class="custom-context-menu"></ul>').css({
            display: 'none',
            position: 'absolute',
            backgroundColor: '#222',
            border: '1px solid #333',
            borderRadius: '5px',
            padding: '5px',
            right: '100%',
            top: '0',
            zIndex: '1000',
            width: '200%'
        });
        item.SubMenu.forEach(function (subItem) {
            var subMenuItem = createMenuItem({ "DisplayName": subItem.DisplayName }).data('copy-text', subItem.CopyText);
            subMenuItem.on('click', function () {
                var copyText = $(this).data('copy-text');
                var textarea = $('<textarea></textarea>').val(copyText).css('position', 'absolute').css('left', '-9999px');
                $('body').append(textarea);
                textarea.select();
                document.execCommand('copy');
                textarea.remove();
                contextMenu.hide();
            });
            subMenu.append(subMenuItem);
        });

        menuItem.append(subMenu);

        menuItem.on('mouseenter', function () {
            subMenu.show();
        });

        menuItem.on('mouseleave', function () {
            subMenu.hide();
        });
    }

    return menuItem;
}
function showCodeReviewPopup() {

    var codeReviewPopup = $('<div id="codeReviewPopup"></div>').css({
        position: 'fixed',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -20%)',
        backgroundColor: '#222',
        border: '1px solid #333',
        borderRadius: '5px',
        padding: '10px',
        zIndex: '1001',
        minWidth: '400px',
        maxWidth: '50%',
        height: '700px',
        overflow: 'auto',
        maxHeight: '800px'
    });

    var popupTitle = $('<h3>Code Review Creator</h3>').css({
        color: '#ccc',
        margin: '0 0 10px'
    });

    codeReviewPopup.append(popupTitle);

    var optionsList = $('<ul></ul>').css({
        listStyleType: 'none',
        padding: '0',
        margin: '0'
    });

    CodeReviewOptions.forEach(function (option) {
        var optionItem = $('<li></li>').text(option.DisplayName).css({
            padding: '5px 10px',
            cursor: 'pointer',
            color: '#ccc'
        });

        optionItem.on('click', function () {
            resultTextArea.val(resultTextArea.val() + option.CopyText);
        });

        optionsList.append(optionItem);
    });

    var resultTextArea = $('<textarea></textarea>').css({
        width: '100%',
        height: '200px',
        resize: 'none',
        color: '#ccc',
        backgroundColor: '#333',
        border: '1px solid #444',
        borderRadius: '5px',
        padding: '5px',
        margin: '10px 0',
        minWidth: '800px',
        height: '52%'
    });

    var additionalCommentsTextArea = $('<textarea></textarea>').css({
        width: '100%',
        height: '100px',
        resize: 'none',
        color: '#ccc',
        backgroundColor: '#333',
        border: '1px solid #444',
        borderRadius: '5px',
        padding: '5px'
    });

    additionalCommentsTextArea.val('Review the following code. Your main focus should be to detect any potential bugs, security issues, or potential performance issues. Your secondary focus should be on suggesting improvements and discussing best practices related to code quality, performance, and maintainability.');
    additionalCommentsTextArea.attr('readonly', true);

    codeReviewPopup.append(optionsList, resultTextArea, additionalCommentsTextArea);
    
    // Add a green "Copy & Close" button at the bottom right
    var copyCloseButton = $('<button>Copy & Close</button>').css({
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        color: '#ccc',
        backgroundColor: 'green',
        border: '1px solid #444',
        borderRadius: '5px',
        padding: '5px 10px',
        cursor: 'pointer',
    });

    // Copy the text and close the popup when the button is clicked
    copyCloseButton.on('click', function () {
        var largeText = resultTextArea.val();
        var smallText = additionalCommentsTextArea.val();
        var finalText = largeText + '\n' + smallText;

        var textarea = $('<textarea></textarea>').val(finalText).css('position', 'absolute').css('left', '-9999px');
        $('body').append(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();

        codeReviewPopup.remove();
    });

    codeReviewPopup.append(copyCloseButton);
    $('body').append(codeReviewPopup);
    // Create close button
    var closeButton = $('<button>X</button>').css({
        position: 'absolute',
        top: '10px',
        right: '10px',
        color: '#ccc',
        backgroundColor: '#333',
        border: '1px solid #444',
        borderRadius: '5px',
        padding: '5px 10px',
        cursor: 'pointer'
    });

    // Close the popup when the close button is clicked
    closeButton.on('click', function () {
        codeReviewPopup.remove();
    });

    codeReviewPopup.append(closeButton);
}
function pasteTextAtCaret(text) {
    var activeElement = document.activeElement;
    if (activeElement && (activeElement.tagName.toLowerCase() === 'textarea' || activeElement.tagName.toLowerCase() === 'input' && activeElement.type.toLowerCase() === 'text')) {
        var start = activeElement.selectionStart;
        var end = activeElement.selectionEnd;
        var content = activeElement.value;
        activeElement.value = content.slice(0, start) + text + content.slice(end);
        activeElement.selectionStart = activeElement.selectionEnd = start + text.length;
    }
}

function openNotesPopup() {
    var pageId = window.location.pathname.split('/').pop();
    var storageKey = 'notesData';

    // Create the notes popup
    var notesPopup = $('<div id="notesPopup"></div>').css({
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#222',
        border: '1px solid #333',
        borderRadius: '5px',
        padding: '10px',
        zIndex: '1001',
        minWidth: '400px',
        maxWidth: '50%',
        height: '525px',
    });

    notesPopup.Id
    var popupTitle = $('<h3>Notes</h3>').css({
        color: '#ccc',
        margin: '0 0 10px'
    });

    var notesTextArea = $('<textarea></textarea>').css({
        width: '100%',
        height: '200px',
        resize: 'none',
        color: '#ccc',
        backgroundColor: '#333',
        border: '1px solid #444',
        borderRadius: '5px',
        padding: '5px'
    });

    var addButton = $('<button>Add Note</button>').css({
        color: '#ccc',
        backgroundColor: '#333',
        border: '1px solid #444',
        borderRadius: '5px',
        padding: '5px 10px',
        cursor: 'pointer',
        margin: '10px 0'
    });

    var notesList = $('<ul></ul>').css({
        listStyleType: 'none',
        padding: '0',
        margin: '0',
        height: '200px',
        overflowY: 'auto'
    });

    notesPopup.append(popupTitle, notesTextArea, addButton, notesList);

    // Create close button
    var closeButton = $('<button>X</button>').css({
        position: 'absolute',
        top: '10px',
        right: '10px',
        color: '#ccc',
        backgroundColor: '#333',
        border: '1px solid #444',
        borderRadius: '5px',
        padding: '5px 10px',
        cursor: 'pointer'
    });

    // Close the popup when the close button is clicked
    closeButton.on('click', function () {
        notesPopup.remove();
    });

    notesPopup.append(closeButton);

    $('body').append(notesPopup);

    // Load existing notes
    function loadNotes() {
        var notesData = JSON.parse(localStorage.getItem(storageKey)) || [];
        var pageNotes = notesData.find(function (entry) {
            return entry.PageId === pageId;
        });

        if (pageNotes) {
            notesList.empty();
            pageNotes.Notes.forEach(function (note, index) {
                var noteItem = $('<li></li>').text(note).css({
                    color: '#ccc',
                    borderBottom: '1px solid #444',
                    padding: '5px 0',
                    whiteSpace: 'pre-wrap',
                    overflowWrap: 'break-word',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',

                });
                var deleteButton = $('<button>Delete</button>').css({
                    color: '#ccc',
                    backgroundColor: '#333',
                    border: '1px solid #444',
                    borderRadius: '5px',
                    padding: '2px 5px',
                    marginLeft: '10px',
                    cursor: 'pointer',
                    marginLeft: 'auto'
                });

                // Handle click on the Delete button
                deleteButton.on('click', function () {
                    pageNotes.Notes.splice(index, 1);
                    localStorage.setItem(storageKey, JSON.stringify(notesData));
                    loadNotes();
                });

                noteItem.text(note).append(deleteButton);
                notesList.append(noteItem);
            });
        }
    }

    loadNotes();

    // Save notes
    addButton.on('click', function () {
        var notesData = JSON.parse(localStorage.getItem(storageKey)) || [];
        var note = notesTextArea.val().trim();

        if (note) {
            var pageNotes = notesData.find(function (entry) {
                return entry.PageId === pageId;
            });

            if (!pageNotes) {
                pageNotes = {
                    "PageId": pageId,
                    "Notes": []
                };
                notesData.push(pageNotes);
            }

            pageNotes.Notes.push(note);
            localStorage.setItem(storageKey, JSON.stringify(notesData));
            notesTextArea.val('');
            loadNotes();
        }
    });
}

console.log('NebrasChatGPTHelper loaded');
function onJQueryLoaded() {

    var contextMenu = $('<ul class="custom-context-menu"></ul>').css({
        display: 'none',
        position: 'absolute',
        backgroundColor: '#222',
        border: '1px solid #333',
        borderRadius: '5px',
        padding: '5px',
        zIndex: '1000'
    });

    $(document).ready(function () {
        mainMenuItems.forEach(function (item) {
            var menuItem = createMenuItem(item);
            contextMenu.append(menuItem);
        });
        $('body').append(contextMenu);
    });
    // Create NebrasChatGPTHelper icon
    var icon = $('<div>N</div>').css({
        position: 'fixed',
        top: '10px',
        right: '20px',
        width: '60px',
        height: '60px',
        backgroundColor: 'white',
        borderRadius: '50%',
        zIndex: '999',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '18px',
        color: 'orange',
        fontWeight: 'bold',
        border: '1px solid black'
    });
    icon.on('click', function (e) {
        console.log("Clicked")
        contextMenu.css({ top: e.pageY + 10, left: e.pageX - contextMenu.width() }).show();
    });
    contextMenu.on('click', 'li:contains("Notes")', function () {
        openNotesPopup();
        contextMenu.hide();
    });
    contextMenu.on('click', 'li:contains("Code Review")', function () {
        showCodeReviewPopup();
        contextMenu.hide();
    });
    $('body').append(icon);
    // Close the Notes popup when the Esc key is pressed
    $(document).on('keydown', function (event) {
        if (event.key === 'Escape') {
            $('body').find('div#notesPopup').remove();
        }
    });

    $(document).on('click', function (e) {
        if (!icon.is(e.target)) {
            contextMenu.hide();
        }
    });
}

if (typeof jQuery === 'undefined') {
    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    script.type = 'text/javascript';
    script.onload = function () {
        console.log('jQuery has been loaded');
        onJQueryLoaded();
    };
    document.getElementsByTagName('head')[0].appendChild(script);
} else {
    console.log('jQuery is already loaded');
    onJQueryLoaded();
}




function hasTextarea(element, depth = 1, maxDepth = 3) {
    if (depth > maxDepth) {
        return false;
    }

    if (element.tagName && element.tagName.toLowerCase() === 'textarea') {
        return true;
    }

    for (var i = 0; i < element.children.length; i++) {
        if (hasTextarea(element.children[i], depth + 1, maxDepth)) {
            return true;
        }
    }

    return false;
}

