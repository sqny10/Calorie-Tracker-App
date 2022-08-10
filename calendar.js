const selection = {
    day: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear()
};
const date = new Date(selection.year, selection.month, selection.day);
const mounthHeading = document.querySelector("#monthly-calendar h1"); 
const dateYear = document.querySelector("#monthly-calendar p"); 
const monthDays = document.querySelector("#monthly-calendar .days");
const shownMonth = document.querySelector(".shown-month");
const shownDay = document.querySelector(".shown-day");
const shownYear = document.querySelector(".shown-year");
const modalContainer = document.querySelector(".modal-container");
document.querySelector("#monthly-calendar .prev").addEventListener("click", displayPrevMonth);
document.querySelector("#monthly-calendar .next").addEventListener("click", displayNextMonth);

function functionCaller(){
    populateDays();
    populateMonth();
    populateYear();
    displayPrevDatesWithPrevDateClick();
    displayNextDatesWithNextDateClick();
    getCurrentMonthDays();
    setSelectedDay(selection);
    populateYearlyCalendarDays();
    getCurrentYearDays();
};

// done 
function getCurrentMonthDays(){
    let allDays = monthDays.children;
    allDays = Array.from(allDays);
    let currentMonthDays = [];
    allDays.forEach((day) => {
        if(!day.classList.contains("prev-date") && !day.classList.contains("next-date")){
            currentMonthDays.push(day);
        }
    });
    getSelectedDay(currentMonthDays);
    return currentMonthDays;
}

// done
function getSelectedDay(daysArr){
    let selectedDay = null;
    let month = null;
    let year = null;
    daysArr.forEach((day) => {
        day.addEventListener("click", () => {
            day.classList.add("selected-day");
            selectedDay = day.innerText;
            daysArr.forEach((day) => {
                if(day.innerText !== selectedDay){
                    day.classList.remove("selected-day");
                }
            })
            daysArr.forEach((day) => {
                if(day.classList.contains("selected-day")){
                    selectedDay = parseInt(day.innerText);
                    selection.day = selectedDay;
                    switch(mounthHeading.innerText.toLowerCase()){
                        case "january":
                            month = 0;
                            break;
                        case "february":
                            month = 1;
                            break;
                        case "march":
                            month = 2;
                            break;
                        case "april":
                            month = 3;
                            break;
                        case "may":
                            month = 4;
                            break;
                        case "june":
                            month = 5;
                            break;
                        case "july":
                            month = 6;
                            break;
                        case "august":
                            month = 7;
                            break;
                        case "september":
                            month = 8;
                            break;
                        case "october":
                            month = 9;
                            break;
                        case "november":
                            month = 10;
                            break;
                        case "december":
                            month = 11;
                            break;
                    }
                    year = parseInt(dateYear.innerText);
                    selection.month = month;
                    selection.year = year;
                }
            })
            setSelectedDay(selection);
            modalContainer.classList.add("dpnone");
        });
    })
}

// not done yet
function setSelectedDay(selection){
    // let month;
    // switch(selection.month){
    //     case 0:
    //         month = "January";
    //         break;
    //     case 1:
    //         month = "February";
    //         break;
    //     case 2:
    //         month = "March";
    //         break;
    //     case 3:
    //         month = "April";
    //         break;
    //     case 4:
    //         month = "May";
    //         break;
    //     case 5:
    //         month = "June";
    //         break;
    //     case 6:
    //         month = "July";
    //         break;
    //     case 7:
    //         month = "August";
    //         break;
    //     case 8:
    //         month = "September";
    //         break;
    //     case 9:
    //         month = "October";
    //         break;
    //     case 10:
    //         month = "November";
    //         break;
    //     case 11:
    //         month = "December";
    //         break;
    // }
    shownMonth.textContent = populateMonth();
    shownDay.textContent = selection.day;
    shownYear.textContent = selection.year;
}

// done
function displayPrevDatesWithPrevDateClick(){
    const prevDates = document.querySelectorAll(".prev-date");
    prevDates.forEach(function(prevDate){
        prevDate.addEventListener("click", displayPrevMonth);
    })
};

// done
function displayNextDatesWithNextDateClick(){
    const nextDates = document.querySelectorAll(".next-date");
    nextDates.forEach(function(nextDate){
        nextDate.addEventListener("click", displayNextMonth);
    })
};

// done
function populateMonth(){
    const currentMonthIndex = date.getMonth();
    let month;
    switch(currentMonthIndex){
        case 0:
            month = "January";
            break;
        case 1:
            month = "February";
            break;
        case 2:
            month = "March";
            break;
        case 3:
            month = "April";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "June";
            break;
        case 6:
            month = "July";
            break;
        case 7:
            month = "August";
            break;
        case 8:
            month = "September";
            break;
        case 9:
            month = "October";
            break;
        case 10:
            month = "November";
            break;
        case 11:
            month = "December";
            break;
    }
    mounthHeading.textContent = month;
    return month;
};

// done
function populateYear(){
    dateYear.textContent = date.getFullYear();
}

// function displayDateDetail(){
//     let day;
    
//     switch (date.getDay()){
//         case 0:
//             day = "Sunday";
//             break;
//         case 1:
//             day = "Monday";
//             break;
//         case 2:
//             day = "Tuesday";
//             break;
//         case 3:
//             day = "Wednesday";
//             break;
//         case 4:
//             day = "Thursday";
//             break;
//         case 5:
//             day = "Friday";
//             break;
//         case 6:
//             day = "Saturday";
//             break;
//     }

//     dateDetails.textContent = `${day.slice(0,3)} ${populateMonth().slice(0,3)} ${date.getDate()}, ${date.getFullYear()}`;
// };

// done
function populateDays(){
    date.setDate(1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const lastDayOfPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    let firstDayIndex = date.getDay();
    if(firstDayIndex === 0){
        firstDayIndex = 7;
    }
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    let nextDays = 7 - lastDayIndex - 1;
    if(nextDays === 0){
        nextDays = 7;
    }
    let days = "";
    
    for(let i = firstDayIndex; i > 0; i--){
        days += `<p class="prev-date">${lastDayOfPrevMonth - i + 1}</p>`
    }

    for(let i = 1; i <= lastDayOfMonth; i++){
        if(i === new Date().getDate() && date.getMonth() === new Date().getMonth()){
            days += `<p class="selected-day">${i}</p>`
        }else{
            days += `<p>${i}</p>`
        }
    }

    for(let i = 1; i <= nextDays; i++){
        days += `<p class="next-date">${i}</p>`
    }

    monthDays.innerHTML = days;
};

// done
function displayPrevMonth(){
    date.setMonth(date.getMonth() - 1);
    populateDays();
    populateMonth();
    populateYear();
    const currentMonthDays = getCurrentMonthDays();
    getSelectedDay(currentMonthDays);
    displayPrevDatesWithPrevDateClick();
    displayNextDatesWithNextDateClick();
};

// done 
function displayNextMonth(){
    date.setMonth(date.getMonth() + 1);
    populateDays();
    populateMonth();
    populateYear();
    const currentMonthDays = getCurrentMonthDays();
    getSelectedDay(currentMonthDays);
    displayNextDatesWithNextDateClick();
    displayPrevDatesWithPrevDateClick();
};


// Yearly view codes starts from here
const yearlyDays = document.querySelector("#yearly-calendar .days");
const calendarYear = document.querySelector("#yearly-calendar .date h1");
const date2 = new Date(selection.year, selection.month, selection.day);
document.querySelector("#yearly-calendar .prev").addEventListener("click", displayPrevYear);
document.querySelector("#yearly-calendar .next").addEventListener("click", displayNextYear);

// not done yet
function getCurrentYearDays(){
    let allMonthWrappers = yearlyDays.children;
    allMonthWrappers = Array.from(allMonthWrappers);
    let allMonthWrapperChildren = [];
    let currentYearDays = [];
    allMonthWrappers.forEach((monthWrapper) => {
        let children = monthWrapper.children;
        children = Array.from(children);
        children.forEach((child) => {
            allMonthWrapperChildren.push(child);
        })
    })
    allMonthWrapperChildren.forEach((item) => {
        if(item.classList.contains("selectable")){
            currentYearDays.push(item);
        }
    })
    getSelectedDayFromYearlyCalendar(currentYearDays);
    return currentYearDays;
}

// done
function getSelectedDayFromYearlyCalendar(daysArr){
    let selectedDay = null;
    let month = null;
    let year = null;
    daysArr.forEach((day) => {
        day.addEventListener("click", () => {
            daysArr.forEach((day) => {
                if(day.classList.contains("selected-day")){
                    day.classList.remove("selected-day");
                }
            })
            day.classList.add("selected-day");
            selectedDay = parseInt(day.innerText);
            const selectedDayMonth = day.parentElement.firstChild.textContent;
            switch(selectedDayMonth.toLowerCase()){
                case "january":
                    month = 0;
                    break;
                case "february":
                    month = 1;
                    break;
                case "march":
                    month = 2;
                    break;
                case "april":
                    month = 3;
                    break;
                case "may":
                    month = 4;
                    break;
                case "june":
                    month = 5;
                    break;
                case "july":
                    month = 6;
                    break;
                case "august":
                    month = 7;
                    break;
                case "september":
                    month = 8;
                    break;
                case "october":
                    month = 9;
                    break;
                case "november":
                    month = 10;
                    break;
                case "december":
                    month = 11;
                    break;
            }
            year = parseInt(calendarYear.textContent);
            selection.day = selectedDay;
            selection.month = month;
            selection.year = year;
            setSelectedDay(selection);
            modalContainer.classList.add("dpnone");
        });
    })
}

// done
function populateYearlyCalendarDays(){
    for(let i = 0; i <= 11; i++){
        date2.setMonth(i);
        date2.setDate(1);
        // date2.setFullYear(parseInt(calendarYear.innerText));
        const lastDayOfMonth = new Date(date2.getFullYear(), date2.getMonth() + 1, 0).getDate();
        let firstDayIndex = date2.getDay();
        const monthWrapper = document.createElement("div");
        monthWrapper.classList.add("mounth-wrapper");
        let monthText = "";
        switch(i){
            case 0:
                monthText = "January";
                break;
            case 1:
                monthText = "February";
                break;
            case 2:
                monthText = "March";
                break;
            case 3:
                monthText = "April";
                break;
            case 4:
                monthText = "May";
                break;
            case 5:
                monthText = "June";
                break;
            case 6:
                monthText = "July";
                break;
            case 7:
                monthText = "August";
                break;
            case 8:
                monthText = "September";
                break;
            case 9:
                monthText = "October";
                break;
            case 10:
                monthText = "November";
                break;
            case 11:
                monthText = "December";
                break;
        }
        let iHTML = `<p class="yearly-view-month">${monthText}</p>`;
        for(h = firstDayIndex; h > 0; h--){
            iHTML += "<div> </div>"
        }
        for(let j = 1; j <= lastDayOfMonth; j++){
            if(j === new Date().getDate() && date2.getMonth() === new Date().getMonth() && date2.getFullYear() === new Date().getFullYear()){
                iHTML += `<p class="selectable selected-day">${j}</p>`
            }else{
                iHTML += `<p class="selectable">${j}</p>`
            }
        }
        monthWrapper.innerHTML = iHTML;
        yearlyDays.appendChild(monthWrapper)
    }
};

// not done yet
function setSelectedDayFromYearlySelection(selection){
    shownMonth.textContent = populateMonthFromYearly();
    shownDay.textContent = selection.day;
    shownYear.textContent = selection.year;
}

// done
function populateMonthFromYearly(){
    const currentMonthIndex = date2.getMonth();
    let month;
    switch(currentMonthIndex){
        case 0:
            month = "January";
            break;
        case 1:
            month = "February";
            break;
        case 2:
            month = "March";
            break;
        case 3:
            month = "April";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "June";
            break;
        case 6:
            month = "July";
            break;
        case 7:
            month = "August";
            break;
        case 8:
            month = "September";
            break;
        case 9:
            month = "October";
            break;
        case 10:
            month = "November";
            break;
        case 11:
            month = "December";
            break;
    }
    return month;
};

// done
function populateYearlyCalendarYear(){
    calendarYear.textContent = date2.getFullYear();
}

// done
function displayPrevYear(){
    date2.setFullYear(date2.getFullYear() - 1);
    yearlyDays.innerHTML = "";
    populateYearlyCalendarDays();
    populateYearlyCalendarYear();
    const currentYearDays = getCurrentYearDays();
    getSelectedDayFromYearlyCalendar(currentYearDays);
};

// done
function displayNextYear(){
    date2.setFullYear(date2.getFullYear() + 1);
    yearlyDays.innerHTML = "";
    populateYearlyCalendarDays();
    populateYearlyCalendarYear();
    const currentYearDays = getCurrentYearDays();
    getSelectedDayFromYearlyCalendar(currentYearDays);
};

functionCaller();