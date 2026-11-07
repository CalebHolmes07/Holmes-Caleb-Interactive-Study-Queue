Interactive Study Queue

Purpose
This program allows students to add, prioritize, complete, filter, and remove study tasks.

Setup
1. Create a folder named Interactive-Study-Queue.
2. Add index.html, style.css, and script.js.
3. Open index.html in a web browser.

Operation
Enter a study task and choose its priority.
Click Add Task to add it to the list.
Use Complete to mark a task finished.
Use Undo to reactivate a completed task.
Use Prioritize to change a task to high priority.
Use Normal Priority to remove high priority.
Use Remove to delete a task.
Use the filter to display all, active, or completed tasks.

Known Limitations
Tasks are stored in memory and disappear when the page is refreshed.
Task information is not saved between sessions.

Event Flow: Removing a Task
When a student clicks Remove, the click event travels to the task list. The delegated event listener identifies which button was clicked using closest(). It reads the task ID, finds the matching task in the array, removes it using splice(), and calls renderTasks() to update the page.


The most difficult decision was using event delegation instead of adding separate event listeners to every button. I used one click listener on the task list to handle completing, prioritizing, and removing tasks. I tested this by adding multiple tasks and confirming that each button performed the correct action. This also keeps event listeners outside the render function.