/*  Capitalize Word
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
const capWord = word => {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
};

/*  Capitalize All Words
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
const titleCase = words => {
    return words.split(" ").map(capWord).join(" ");
};

/*  Create Li
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
const createLi = (text) => {
    return $(`
        <li>
            <span>${text}</span>
            <button type="button" class="edit">Edit</button>
            <button type="button" class="remove">Done</button>
        </li>
    `);
};

/*  Assemble Li & Append
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
const assembleLiAppendTo = (input, ul) => {
    const inputText = input.val();

    if (inputText > 0) {
        const text = titleCase();
        const li = createLi(text);

        input.val("");

        ul.append(li);
    }
};

/*  Check To-do List
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
const checkTodoList = (ul) => {
    if (ul.children().length > 0) {
        ul.css("display", "block");
    } else {
        ul.css("display", "none");
    }
};

/*  Enter Edit Mode
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
const enterEditMode = (li) => {
    const span = li.find("span");
    const button = li.find(".edit");
    const spanText = span.text();
    const $input = $(`<input type="text" value="${spanText}">`);

    button.toggleClass("edit");
    button.toggleClass("save");
    button.text("Save");

    span.remove();
    li.prepend($input);
};

/*  Exit Edit Mode
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
const exitEditMode = (li) => {
    const input = li.find("input");
    const button = li.find(".save");

    if (input.val().length > 0) {
        const inputText = titleCase(input.val());
        const $span = $(`<span>${inputText}</span>`);

        button.toggleClass("save");
        button.toggleClass("edit");
        button.text("Edit");

        input.remove();
        li.prepend($span);
    }
};

/*  Remove Li
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
const removeLi = (li, ul) => {
    li.remove();

    checkTodoList(ul);
};

/*  Modify Li
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
const modifyList = (li, ul, button) => {
    if (button.hasClass("edit")) {
        enterEditMode(li);
    } else if (button.hasClass("save")) {
        exitEditMode(li);

        checkTodoList(ul);
    } else if (button.hasClass("remove")) {
        removeLi(li, ul);

        checkTodoList(ul);
    }
};

/*  Main
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function main() {
    const entryDiv = $(".entry");
    const entryInput = entryDiv.find("#enter");
    const entryButton = entryDiv.find("button");
    const todoList = $(".to-do");

    // Event Listeners ~~~~~~~~~~
    // Entry input keyup
    entryInput.on("keyup", function(e) {
        if (e.keyCode === 13) {
            assembleLiAppendTo(entryInput, todoList);
            checkTodoList(todoList);
        }
    });

    // Entry button click
    entryButton.on("click", function(e) {
        assembleLiAppendTo(entryInput, todoList);
        checkTodoList(todoList);
    });

    // To-do List Keyup
    todoList.on("keyup", function(e) {
        const target = e.target;

        if (target.tagName === "INPUT") {
            if (e.keyCode === 13) {
                const li = $(target).closest("li");
                exitEditMode(li);
            }
        }
    });

    // To-do List Click
    todoList.on("click", function(e) {
        const target = e.target;

        if (target.tagName === "BUTTON") {
            const li = $(target).closest("li");
            modifyList(li, todoList, $(target));
        }
    });
}

/*  Document Ready
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
$(document).ready(main);












