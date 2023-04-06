var ClipboardOptions=[{"DisplayName":"Code only","CopyText":"Do not explain your answer or include unnecessary information. Respond with code only."},{"DisplayName":"Brief answer","CopyText":"Your reply should only be the answer itself, no additional text - this includes describing the answer. If you do not know the answer to the question, respond with the sentence 'I do not know the answer to that question.' and nothing else."},{"DisplayName":"Code Only","CopyText":"Do not explain your answer or include unnecessary information. Respond with code only."},{"DisplayName":"Brief Answer","CopyText":"Your reply should only be the answer itself, no additional text - this includes describing the answer. If you do not know the answer to the question, respond with the sentence 'I do not know the answer to that question.' and nothing else."},{"DisplayName":"Step-by-Step Guide","CopyText":"Provide a step-by-step guide for solving the problem, breaking down the process into clear and understandable steps."},{"DisplayName":"Beginner Friendly","CopyText":"Explain the concept in a beginner-friendly manner, using simple terms and analogies where possible to make it accessible for non-experts."},{"DisplayName":"Real-World Example","CopyText":"Illustrate the concept or solution with a real-world example or use case, demonstrating its practical application."},{"DisplayName":"Compare and Contrast","CopyText":"Compare and contrast the given concepts, technologies, or methods, highlighting their similarities, differences, and trade-offs."},{"DisplayName":"Pros and Cons","CopyText":"Discuss the pros and cons of the specified approach, technology, or concept, providing a balanced view of its advantages and disadvantages."},{"DisplayName":"Code With Comments","CopyText":"Provide a code snippet accompanied by clear and concise comments explaining each section or function, so the logic and purpose of the code can be easily understood."}];
var TemplateOptions=[{"DisplayName":"API Documentation","CopyText":"For all of the APIs provided the Endpoint should be [[ENTER ENDPOINT HERE]]/<MethodName>\nFor all of the APIs in the provided code snippets create API documentation following this format:\n\nEndpoint\n\n\nMethod\n\n\nDescription\n\n\nParameters\n\n\nResponse"},{"DisplayName":"Optimize Algorithm","CopyText":"Suggest improvements to the given algorithm to optimize its performance or efficiency, considering the following constraints or requirements: [[LIST CONSTRAINTS OR REQUIREMENTS HERE]]."},{"DisplayName":"Write Test Cases","CopyText":"Create test cases for the specified function or method, including different scenarios, expected input, and expected output."},{"DisplayName":"Refactor Code","CopyText":"Refactor the given code snippet to improve its readability, maintainability, or performance, considering any specific guidelines or requirements: [[LIST GUIDELINES OR REQUIREMENTS HERE]]."},{"DisplayName":"Add Comments","CopyText":"Add comments to the given code snippet to explain the logic and purpose of each section or function, so the code can be easily understood. Do not change the code itself."}];
var mainMenuItems=[{"DisplayName":"Prompt Modifiers","SubMenu":ClipboardOptions},{"DisplayName":"Templates","SubMenu":TemplateOptions},{"DisplayName":"System Messages"}];
function createMenuItem(item) {
var menuItem = $('<li></li>').text(item.DisplayName).css({
padding: '5px 10px',
cursor: 'pointer',
color: '#ccc',
position: 'relative'
});
menuItem.on('mouseenter', function() {
$(this).css('backgroundColor', '#444');
});
menuItem.on('mouseleave', function() {
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
item.SubMenu.forEach(function(subItem) {
  var subMenuItem = createMenuItem({ "DisplayName": subItem.DisplayName }).data('copy-text', subItem.CopyText);
  subMenuItem.on('click', function() {
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

menuItem.on('mouseenter', function() {
  subMenu.show();
});

menuItem.on('mouseleave', function() {
  subMenu.hide();
});
}

return menuItem;
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
var contextMenu = $('<ul class="custom-context-menu"></ul>').css({
  display: 'none',
  position: 'absolute',
  backgroundColor: '#222',
  border: '1px solid #333',
  borderRadius: '5px',
  padding: '5px',
  zIndex: '1000'
});
$(document).ready(function() {
mainMenuItems.forEach(function(item) {
var menuItem = createMenuItem(item);
contextMenu.append(menuItem);
});
$('body').append(contextMenu);
});
// Create circular black icon
var icon = $('<div>Util</div>').css({
position: 'fixed',
top: '10px',
right: '20px',
width: '60px',
height: '60px',
backgroundColor: 'black',
borderRadius: '50%',
zIndex: '999',
cursor: 'pointer',
display: 'flex',
justifyContent: 'center',
alignItems: 'center',
fontSize: '18px',
color: 'white',
fontWeight: 'bold'
});
icon.on('click', function(e) {
console.log("Clicked")
contextMenu.css({top: e.pageY + 10, left: e.pageX - contextMenu.width()}).show();
});
$('body').append(icon);
$(document).on('click', function(e) {
if (!icon.is(e.target)) {
contextMenu.hide();
}
});});
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

