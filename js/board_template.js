function editTaskHTML(currentTask) {
  return `
  
    <div id="overlayPopUpbg" class="overlay-board-bg" style="padding:21px">
      
      <div class="overlayBoardBg">
        <div class="justify-end">
            <div class="margin-bottom-60">
              <span class="headline-text">Edit Task</span>
            </div>
            
            <div class="inner-content scroll">
        <div>
          <div id="taskAdded" class="taskAdded d-none">
            <img src="./assets/img/add-task.svg" alt="" />
          </div>
        </div>
  
        <form class="column-container" id="column-container-edit" onsubmit="editTaskBoard(currentTaskID) ; return false">
          <div class="column-left">
            <label>Title</label>
  
            <input type="text" id="title" placeholder="${
              currentTask["title"]
            }" value="${currentTask["title"]}" required />
  
            <label>Description</label>
  
            <textarea
              id="description"
              placeholder="${currentTask["description"]}"
            >${currentTask["description"]}</textarea>
  
            <label>Category</label>
  
            <div class="d-none" id = "categoryEdit"></div>
  
            <label id="toggleDrop" for="dropdown" onclick="toggleDropdownCategory()">
            <div class="dropdown-min-cat" id="dropdownMinCategory">
            <div class="select-cat">
                <span>Select category</span>
                <img src="./assets/img/arrow-down.svg" alt="" />
            </div>
            </div>
            <div id="dropdownCategoryContent" class="dropdown-content"></div>
            </label>
  
                <div id="select-color-category" class="select-color-category d-none">
                    <div onclick="selectColor(1)" id="color1" style="background-color: red"></div>
                    <div onclick="selectColor(2)" id="color2" style="background-color: #fc71ff"></div>
                    <div onclick="selectColor(3)" id="color3" style="background-color: #ff7a00"></div>
                    <div onclick="selectColor(4)" id="color4" style="background-color: #1fd7c1"></div>
                    <div onclick="selectColor(5)" id="color5" style="background-color: #2ad300"></div>
                    <div onclick="selectColor(6)" id="color6" style="background-color: #8aa4ff"></div>
                    <div onclick="selectColor(7)" id="color7" style="background-color: blue"></div>
                </div>
                <div id="errorMessage" style="color: red"></div>
                <div id="categoryDisplay" style="display: none"></div>
  
            <label>Assigned to</label>
  
            <label for="dropdown" onclick="toggleDropdown()">
              <div class="dropdown-min" id="dropdownMin">
                <span id="categoryTextField"> Select contacts to assign</span>
                <img src="./assets/img/arrow_down_black.svg" alt="" />
              </div>
            </label>
            <div id="dropdownContent" class="dropdown-content"></div>
          </div>
  
          <div class="column-right">
            <label>Due Date</label>
            <input
              id="datePicker"
              type="date"
              value="${currentTask["dueDate"]}"
              min="${getCurrentDate()}"
              required
            />
          </div>
  
  
            <label>Prio</label>
            <div class="d-none" id="prioValue">${currentTask["prio"]}</div>
  
            <div id="prio" class="prio">
              <div class="prio-btn ${
                currentTask["prio"] === "up" ? "active" : ""
              }" id="prioUrgent" onclick="TaskButtonUrgent(); setPrioStatus('up')">
                Urgent
                <img id="imgUrgent" src="./assets/img/prioUrgent.svg" alt="" />
              </div>
              <div class="prio-btn ${
                currentTask["prio"] === "medium" ? "active" : ""
              }" id="prioMedium" onclick="TaskButtonMedium(); setPrioStatus('medium')">
                Medium
                <img id="imgMedium" src="./assets/img/medium-prio.svg" alt="" />
              </div>
              <div class="prio-btn ${
                currentTask["prio"] === "down" ? "active" : ""
              }" id="prioLow" onclick="TaskButtonLow(); setPrioStatus('down')">
                Low
                <img id="imgLow" src="./assets/img/low-prio.svg" alt="" />
              </div>
            </div>
  
            <label class="subtask">Subtasks</label>
            <div class="subtask-container">
              <input type="text" id="subtask-input-content" placeholder="Enter Subtask..."/>
  
              <div id="subtaskOninput" style="display: flex">
                <img src="./assets/img/close.svg" id="clearSubtaskInput" />
                <div class="border-subtask"></div>
                <img
                  src="./assets/img/check.svg"
                  onclick="addSubtaskFromEdit('${currentTask["id"]}')"
                  id="finishEditingSubtask"
                />
              </div>
            </div>
  
            <div class="subCon" id="subtaskContent">
              
            </div>
            <div class="container-ok-popup">
              <button id="editTask" form="column-container-edit" class="add-task-btn" type="submit">
                OK
              </button>
            </div>
            </div>
          </form>
        </div>
      </div>`;
}

function getTaskDetailCardHTML(task) {
  return /*html*/ `
      
        <div class="Task-Content" id="taskContent">
  
          <div class="Task-Content-Top">
            <div class="flex-row justify-space-between">
              <div class="task-card-category" style="background-color:${task["color"]}">${task["category"]}</div>
              <button class="close-btn" onclick="closePopup()">X</button>
            </div>
            <span class="headline-text-popup">${task["title"]}</span>
            <div class="inner-content2">
            <span>${task["description"]}</span>
            <span class="font-weight-700">Due date: ${task["dueDate"]}</span>
            <div class="flex-row align-center gap-15" id="prioDetail">  
              <span class="font-weight-700">Priority: </span>
              
            </div>
            <span class="font-weight-700">Assigned To:</span>
  
            <div class="User-Area" id="assignDetail"></div>
            <div>
              <span class="font-weight-700">Subtasks:</span>
              <ul class="subtasks-container" id="subtasksContainer"></ul>
            </div>
          </div>
        </div>
          
          <div class="Task-Bottom-Content">
            
            <svg onclick="deleteTask(${task.id})" class="trash-popUp" width="55" height="50" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_57121_3508" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
                <rect width="32" height="32" fill="#D9D9D9"/>
              </mask>
              <g mask="url(#mask0_57121_3508)">
                <path d="M9.33289 28C8.59955 28 7.97177 27.7389 7.44955 27.2167C6.92733 26.6944 6.66622 26.0667 6.66622 25.3333V8H5.33289V5.33333H11.9996V4H19.9996V5.33333H26.6662V8H25.3329V25.3333C25.3329 26.0667 25.0718 26.6944 24.5496 27.2167C24.0273 27.7389 23.3996 28 22.6662 28H9.33289ZM22.6662 8H9.33289V25.3333H22.6662V8ZM11.9996 22.6667H14.6662V10.6667H11.9996V22.6667ZM17.3329 22.6667H19.9996V10.6667H17.3329V22.6667Z" fill="#2A3647"/>
              </g>
          </svg>  
            <svg  onclick="editTask(${task.id})" width="55" height="54" viewBox="0 0 50 50" fill="none" id="editTask" xmlns="http://www.w3.org/2000/svg">
              <rect width="50" height="50" rx="10" fill="#2A3647"/>
              <path d="M17.4445 32.0155L22.2638 34.9404L34.907 14.1083C35.1935 13.6362 35.043 13.0211 34.5709 12.7346L31.4613 10.8474C30.9892 10.5608 30.3742 10.7113 30.0876 11.1834L17.4445 32.0155Z" fill="white"/>
              <path d="M16.8604 32.9794L21.6797 35.9043L16.9511 38.1892L16.8604 32.9794Z" fill="white"/>
            </svg>
            
            
          </div>
        </div>
      `;
}

function getTaskCardHTML(currentTask, status) {
  const hasSubtasks = currentTask["taskSub"].length > 0;
  const subtasksBorderStyle = hasSubtasks ? "" : "d-none";
  const subtasksCounterStyle = hasSubtasks ? "" : "d-none";

  return /*html*/ `
    <div draggable="true" class="board-task-card draggable" onclick="event.stopPropagation(); showDetailCard(${
      currentTask["id"]
    })" id="${currentTask["id"]}">
      <div class="task-card-top-div">
        <div class="task-card-category" id="taskCategoryContainer" style="background-color:${
          currentTask["color"]
        }">${currentTask["category"]}</div>
        <div class="dropdown-position" onclick="event.stopPropagation();">
          <select class="dropdown-style" onchange="event.stopPropagation(); listChanged(event)">
            <option data-mobile-id="1"  id="mobile-toDo" ${
              status === "toDo" ? "selected" : ""
            }>To Do</option>
            <option data-mobile-id="2" id="mobile-inProgress" ${
              status === "inProgress" ? "selected" : ""
            }>In progress</option>
            <option data-mobile-id="3" id="mobile-feedback" ${
              status === "feedback" ? "selected" : ""
            }>Awaiting feedback</option>
            <option data-mobile-id="1" id="mobile-done" ${
              status === "done" ? "selected" : ""
            }>Done</option>
          </select>
        </div>
      </div>
      <span class="task-card-title" id="taskTitleContainer">${
        currentTask["title"]
      }</span>
      <div class="task-card-description" id="taskDescriptionContainer">${
        currentTask["description"]
      }</div>
      <div class="task-card-bottom-container align-center margin-bottom-10">
        <div class="subtasks-border ${subtasksBorderStyle}">
          <div id="subtasksStatus" style="width:${
            hasSubtasks
              ? (currentTask["subtasksClosed"].length /
                  currentTask["taskSub"].length) *
                100
              : 0
          }%" class="subtasks-status"></div>
        </div>
        <span id="subtasksCounter" class="${subtasksCounterStyle}">${
    currentTask["subtasksClosed"].length
  }/${currentTask["taskSub"].length} done</span>
      </div>
      <div class="task-card-bottom-container">
        <div class="avatar-Box" id="avatarBox${currentTask["id"]}"></div>
        <div class="task-card-prio">
          <img id="imgUrgentTask" src="./assets/img/${
            currentTask["prio"]
          }-prio.svg" alt="" />
        </div>
      </div>
    </div>`;
}

function addTaskPopupHTML(status = "toDo") {
  return `
  <div class="body-popup">

  <div class="popup-task">
  <div class="task-card-popup task-card-scroll">
      <div class="header-container">
          <span class="headline-text">Add Task</span>
          <div  onclick="closePopupTask()" id="closePopup">
            <img src="./assets/img/close.svg">
          </div>
      </div>

      <div>
          <div id="taskAdded" class="taskAdded d-none">
              <img src="./assets/img/add-task.svg" alt="" />
          </div>
      </div>

      <div class="task-Alert" id="taskAlert"></div>

      <form class="column-container-popup" id="column-container-popup-task" onsubmit="addNewTask('${status}') ; return false">
          <div class="column-left">
              <label>Title</label>

              <input type="text" id="title" placeholder="Enter a title..." required />

              <label>Description</label>

              <textarea id="description" placeholder="Enter a description..."></textarea>

              <label>Category</label>

              <div class="d-none" id="categoryEdit"></div>

              <label id="toggleDrop" for="dropdown" onclick="toggleDropdownCategory()">
          <div class="dropdown-min-cat" id="dropdownMinCategory">
          <div class="select-cat">
              <span>Select category</span>
              <img src="./assets/img/arrow-down.svg" alt="" />
          </div>
          </div>
          <div id="dropdownCategoryContent" class="dropdown-content"></div>
          </label>

              <div id="select-color-category" class="select-color-category d-none">
                  <div onclick="selectColor(1)" id="color1" style="background-color: red"></div>
                  <div onclick="selectColor(2)" id="color2" style="background-color: #fc71ff"></div>
                  <div onclick="selectColor(3)" id="color3" style="background-color: #ff7a00"></div>
                  <div onclick="selectColor(4)" id="color4" style="background-color: #1fd7c1"></div>
                  <div onclick="selectColor(5)" id="color5" style="background-color: #2ad300"></div>
                  <div onclick="selectColor(6)" id="color6" style="background-color: #8aa4ff"></div>
                  <div onclick="selectColor(7)" id="color7" style="background-color: blue"></div>
              </div>
              <div id="errorMessage" style="color: red"></div>
              <div id="categoryDisplay" style="display: none"></div>

              <label>Assigned to</label>

              <label for="dropdown" class="dropdown-assigned" onclick="toggleDropdown()">
          <div class="dropdown-min" id="dropdownMin">
              <span id="categoryTextField"> Select contacts to assign</span>
              <img src="./assets/img/arrow-down.svg" alt="" />
          </div>
          </label>
              <div id="dropdownContent" class="dropdown-content"></div>
          </div>

          <div class="border"></div>

          <div class="column-right">
              <label>Due Date</label>

              <input id="datePicker" type="date" placeholder="Enter a description" name="input-date"
              onclick="disableDateinput()"required /><br /><br />

              <label>Prio</label>

              <div id="prio" class="prio-popup">
                  <div class="prio-btn" id="prioUrgent" onclick="TaskButtonUrgent();getPrioStatus('up')">
                      Urgent
                      <img id="imgUrgent" src="./assets/img/prioUrgent.svg" alt="" />
                  </div>
                  <div class="prio-btn" id="prioMedium" onclick="TaskButtonMedium();getPrioStatus('medium')">
                      Medium
                      <img id="imgMedium" src="./assets/img/medium-prio.svg" alt="" />
                  </div>
                  <div class="prio-btn" id="prioLow" onclick="TaskButtonLow();getPrioStatus('down')">
                      Low
                      <img id="imgLow" src="./assets/img/low-prio.svg" alt="" />
                  </div>
              </div>

              <label class="subtask">Subtasks</label>
              <div class="subtask-container">
                  <input type="text" id="subtask-input-content" placeholder="Enter Subtask..." />

                  <div id="subtaskOninput" style="display: flex">
                      <img src="./assets/img/close.svg" id="clearSubtaskInput" />
                      <div class="border-subtask"></div>
                      <img src="./assets/img/check.svg" onclick="subTaskAddToJson()" id="finishEditingSubtask" />
                  </div>
              </div>

              <div id="subtaskContent"></div>

              <div class="action-button-container">

                  <button class="clear-task-btn" id="clearTask" onclick="reloadPage()">
                      Clear
                      <img src="./assets/img/close.svg" />
                  </button>
                  
                  <button id="addTask" form="column-container-popup-task" class="add-task-btn" type="submit">
                      Create Task
                  </button>
              </div>
          </div>
      </form>
  </div>
</div>
  </div>
  `;
}
