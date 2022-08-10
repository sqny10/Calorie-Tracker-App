const CalendarData =  (function(){
    const returnDate = {
        day: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    }

    const selection = {
        day: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    }

    return{
        getSelection: function(){
            return selection;
        },

        getReturnDate: function(){
            return returnDate;
        },

        setReturnDate: function(year, month, day){
            returnDate.year = year;
            returnDate.month = month;
            returnDate.day = day;
        },

        setSelection: function(year, month, day){
            selection.year = year;
            selection.month = month;
            selection.day = day;
        },

        getMountNameFromIndex: function(monthIndex){
            let month;
            switch(monthIndex){
                case 0:
                    month = "january";
                    break;
                case 1:
                    month = "february";
                    break;
                case 2:
                    month = "march";
                    break;
                case 3:
                    month = "april";
                    break;
                case 4:
                    month = "may";
                    break;
                case 5:
                    month = "june";
                    break;
                case 6:
                    month = "july";
                    break;
                case 7:
                    month = "august";
                    break;
                case 8:
                    month = "september";
                    break;
                case 9:
                    month = "october";
                    break;
                case 10:
                    month = "november";
                    break;
                case 11:
                    month = "december";
                    break;
            }
            return month;
        },

        getMonthlyCalendarDays: function(){
            const date = new Date(selection.year, selection.month, 1);
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
            return{
                date,
                firstDayIndex,
                lastDayOfPrevMonth,
                lastDayOfMonth,
                nextDays
            }
        },

        getYearlyCalendarDays: function(index){
            const date = new Date(selection.year, selection.month, 1);
            date.setMonth(index);
            const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
            let firstDayIndex = date.getDay();
            let monthText = CalendarData.getMountNameFromIndex(index);
            return{
                date,
                lastDayOfMonth,
                firstDayIndex,
                monthText
            }
        },

        getPrevMonthIndex: function(){
            const date = new Date(selection.year, selection.month - 1, selection.day);
        },

        getCurrentMonthDaysFromMonthlyCalendar: function(){
            let allDays = document.querySelector(CalendarUI.getCalendarUISelectors().monthDays).children;
            allDays = Array.from(allDays);
            let currentMonthDays = [];
            allDays.forEach((day) => {
                if(!day.classList.contains("prev-date") && !day.classList.contains("next-date")){
                    currentMonthDays.push(day);
                }
            });
            return currentMonthDays;
        },

        getMonthIndexFromMonthName: function(monthText){
            let month;
            switch(monthText){
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
            return month;
        },

        getCurrentYearDaysFromYearlyCalendar: function(){
            let allMonthWrappers = document.querySelector(CalendarUI.getCalendarUISelectors().yearlyDays).children;
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
            return currentYearDays;
        }
    }
})();

const CalendarUI =  (function(){
    const calendarUISelectors = {
        mounthHeading: "#monthly-calendar h1",
        dateYear: "#monthly-calendar p", 
        monthDays: "#monthly-calendar .days",
        monthlyPrevArrow: "#monthly-calendar .prev",
        monthlyNextArrow: "#monthly-calendar .next",
        yearlyPrevArrow: "#yearly-calendar .prev",
        yearlyNextArrow: "#yearly-calendar .next",
        shownMonth: ".shown-month",
        shownDay: ".shown-day",
        shownYear: ".shown-year",
        modalContainer: ".modal-container",
        yearlyDays: "#yearly-calendar .days",
        calendarYear: "#yearly-calendar .date h1",
        prevDate: ".prev-date",
        nextDate: ".next-date",
        modalContainer: ".modal-container",
        switchBtn: "#switch",
        yearlyCalendar: "#yearly-calendar",
        monthlyCalendar: "#monthly-calendar",
        shownDay: ".shown-day",
        shownMonth: ".shown-month",
        shownYear: ".shown-year",
    }

    return{
        getCalendarUISelectors: function(){
            return calendarUISelectors;
        },

        populateMonthNameOnMonthlyCalendar: function(monthName){
            document.querySelector(calendarUISelectors.mounthHeading).textContent = monthName;
        },

        populateDaysOnMonthlyCalendar: function(dayIndexesObject){
            let days = "";
            for(let i = dayIndexesObject.firstDayIndex; i > 0; i--){
                days += `<p class="prev-date">${dayIndexesObject.lastDayOfPrevMonth - i + 1}</p>`
            }
            for(let i = 1; i <= dayIndexesObject.lastDayOfMonth; i++){
                if(i === new Date().getDate() && dayIndexesObject.date.getMonth() === new Date().getMonth()){
                    days += `<p class="selected-day">${i}</p>`
                }else{
                    days += `<p>${i}</p>`
                }
            }
            for(let i = 1; i <= dayIndexesObject.nextDays; i++){
                days += `<p class="next-date">${i}</p>`
            }
            document.querySelector(calendarUISelectors.monthDays).innerHTML = days;
        },

        populateYearOnMonthlyCalendar: function(year){
            document.querySelector(calendarUISelectors.dateYear).textContent = year;
        },

        populateDaysOnYearlyCalendar: function(dayIndexesObject){
            const monthWrapper = document.createElement("div");
            monthWrapper.classList.add("mounth-wrapper");
            let iHTML = `<p class="yearly-view-month">${dayIndexesObject.monthText}</p>`;
            for(h = dayIndexesObject.firstDayIndex; h > 0; h--){
                iHTML += "<div> </div>";
            }
            for(let j = 1; j <= dayIndexesObject.lastDayOfMonth; j++){
                if(j === new Date().getDate() && dayIndexesObject.date.getMonth() === new Date().getMonth() && dayIndexesObject.date.getFullYear() === new Date().getFullYear()){
                    iHTML += `<p class="selectable selected-day">${j}</p>`;
                }else{
                    iHTML += `<p class="selectable">${j}</p>`;
                }
            }
            monthWrapper.innerHTML = iHTML;
            document.querySelector(calendarUISelectors.yearlyDays).appendChild(monthWrapper);
        },

        populateYearOnYearlyCalendar: function(year){
            document.querySelector(calendarUISelectors.calendarYear).textContent = year;
        },

        clearYearlyCalendarDays: function(){
            document.querySelector(this.getCalendarUISelectors().yearlyDays).innerHTML = "";

        },

        populateSettedDate: function(date){
            document.querySelector(calendarUISelectors.shownDay).innerText = date.day;
            document.querySelector(calendarUISelectors.shownMonth).innerText = date.month + 1;
            document.querySelector(calendarUISelectors.shownYear).innerText = date.year;
        }
    }
})();

const CalendarApp = (function(CalendarData, CalendarUI){
    const loadEventListeners = function(){
        document.addEventListener("DOMContentLoaded", callFunctions);
        document.querySelector(CalendarUI.getCalendarUISelectors().monthlyPrevArrow).addEventListener("click", displayPrevMonth);
        document.querySelector(CalendarUI.getCalendarUISelectors().monthlyNextArrow).addEventListener("click", displayNextMonth);
        document.querySelector(CalendarUI.getCalendarUISelectors().yearlyPrevArrow).addEventListener("click", displayPrevYear);
        document.querySelector(CalendarUI.getCalendarUISelectors().yearlyNextArrow).addEventListener("click", displayNextYear);
        document.querySelector(CalendarUI.getCalendarUISelectors().switchBtn).addEventListener("click", switchCalendar);
    }

    const callFunctions = function(){
        populateMonthlyCalendarMonth();
        populateMonthlyCalendarDays();
        populateMonthlyCalendarYear();
        populateYearlyCalendarDaysAndMonths();
        populateYearlyCalendarYear();
        displayPrevDatesWithPrevDateClick();
        displayNextDatesWithNextDateClick();
        const currentMonthDays = CalendarData.getCurrentMonthDaysFromMonthlyCalendar();
        getSelectedDayFromMonthlyCalendar(currentMonthDays);
        const currentYearDays = CalendarData.getCurrentYearDaysFromYearlyCalendar();
        getSelectedDayFromYearlyCalendar(currentYearDays);
        const settedDate = CalendarData.getReturnDate();
        CalendarUI.populateSettedDate(settedDate);
    }

    const populateMonthlyCalendarMonth = function(){
        const monthIndex = CalendarData.getSelection().month;
        const monthName = CalendarData.getMountNameFromIndex(monthIndex);
        CalendarUI.populateMonthNameOnMonthlyCalendar(monthName);
    }

    const populateMonthlyCalendarDays = function(){
        const monthlyCalendarDayIndexes = CalendarData.getMonthlyCalendarDays();
        CalendarUI.populateDaysOnMonthlyCalendar(monthlyCalendarDayIndexes);
    }

    const populateMonthlyCalendarYear = function(){
        const yearForMonthlyCalendar = CalendarData.getSelection().year;
        CalendarUI.populateYearOnMonthlyCalendar(yearForMonthlyCalendar);
    }

    const populateYearlyCalendarDaysAndMonths = function(){
        for(let i = 0; i <= 11; i++){
            const yearlyCalendarDayIndexes = CalendarData.getYearlyCalendarDays(i);
            CalendarUI.populateDaysOnYearlyCalendar(yearlyCalendarDayIndexes);
        }
    }

    const populateYearlyCalendarYear = function(){
        const year = CalendarData.getSelection().year
        CalendarUI.populateYearOnYearlyCalendar(year);
    }

    const displayPrevMonth = function(){
        if(CalendarData.getSelection().month > 0){
            CalendarData.setSelection(CalendarData.getSelection().year, CalendarData.getSelection().month - 1, 1);
            populateMonthlyCalendarMonth();
            populateMonthlyCalendarDays();
            populateMonthlyCalendarYear();
            displayPrevDatesWithPrevDateClick();
            displayNextDatesWithNextDateClick();
            const currentMonthDays = CalendarData.getCurrentMonthDaysFromMonthlyCalendar();
            getSelectedDayFromMonthlyCalendar(currentMonthDays);
        }else{
            CalendarData.setSelection(CalendarData.getSelection().year - 1, 12, 1)
            CalendarData.setSelection(CalendarData.getSelection().year, CalendarData.getSelection().month - 1, 1);
            populateMonthlyCalendarMonth();
            populateMonthlyCalendarDays();
            populateMonthlyCalendarYear();
            displayPrevDatesWithPrevDateClick();
            displayNextDatesWithNextDateClick();
            const currentMonthDays = CalendarData.getCurrentMonthDaysFromMonthlyCalendar();
            getSelectedDayFromMonthlyCalendar(currentMonthDays);
        }
    }

    const displayNextMonth = function(){
        if(CalendarData.getSelection().month < 11){
            CalendarData.setSelection(CalendarData.getSelection().year, CalendarData.getSelection().month + 1, 1);
            populateMonthlyCalendarMonth();
            populateMonthlyCalendarDays();
            populateMonthlyCalendarYear();
            displayPrevDatesWithPrevDateClick();
            displayNextDatesWithNextDateClick();
            const currentMonthDays = CalendarData.getCurrentMonthDaysFromMonthlyCalendar();
            getSelectedDayFromMonthlyCalendar(currentMonthDays);
        }else{
            CalendarData.setSelection(CalendarData.getSelection().year + 1, -1, 1)
            CalendarData.setSelection(CalendarData.getSelection().year, CalendarData.getSelection().month + 1, 1);
            populateMonthlyCalendarMonth();
            populateMonthlyCalendarDays();
            populateMonthlyCalendarYear();
            displayPrevDatesWithPrevDateClick();
            displayNextDatesWithNextDateClick();
            const currentMonthDays = CalendarData.getCurrentMonthDaysFromMonthlyCalendar();
            getSelectedDayFromMonthlyCalendar(currentMonthDays);
        }
    }

    const displayPrevDatesWithPrevDateClick = function(){
        const prevDates = document.querySelectorAll(CalendarUI.getCalendarUISelectors().prevDate);
        prevDates.forEach(function(prevDate){
            prevDate.addEventListener("click", displayPrevMonth);
        })
    }

    const displayNextDatesWithNextDateClick = function(){
        const nextDates = document.querySelectorAll(CalendarUI.getCalendarUISelectors().nextDate);
        nextDates.forEach(function(nextDate){
            nextDate.addEventListener("click", displayNextMonth);
        })
    }

    const displayPrevYear = function(){
        CalendarData.setSelection(CalendarData.getSelection().year - 1, 1, 1);
        document.querySelector(CalendarUI.getCalendarUISelectors().yearlyDays).innerHTML = "";
        populateYearlyCalendarDaysAndMonths();
        populateYearlyCalendarYear();
        const currentYearDays = CalendarData.getCurrentYearDaysFromYearlyCalendar();
        getSelectedDayFromYearlyCalendar(currentYearDays);
    }

    const displayNextYear = function(){
        CalendarData.setSelection(CalendarData.getSelection().year + 1, 1, 1);
        document.querySelector(CalendarUI.getCalendarUISelectors().yearlyDays).innerHTML = "";
        populateYearlyCalendarDaysAndMonths();
        populateYearlyCalendarYear();
        const currentYearDays = CalendarData.getCurrentYearDaysFromYearlyCalendar();
        getSelectedDayFromYearlyCalendar(currentYearDays);
    }

    const getSelectedDayFromMonthlyCalendar = function(daysArr){
        let selectedDay = CalendarData.getSelection().day;
        let monthIndex = CalendarData.getSelection().month;
        let year = CalendarData.getSelection().year;
        daysArr.forEach((day) => {
            day.addEventListener("click", () => {
                daysArr.forEach((day) => {
                    if(day.innerText !== selectedDay){
                        day.classList.remove("selected-day");
                    }
                })
                day.classList.add("selected-day");
                selectedDay = parseInt(day.innerText);
                daysArr.forEach((day) => {
                    if(day.classList.contains("selected-day")){
                        monthIndex = CalendarData.getMonthIndexFromMonthName(document.querySelector(CalendarUI.getCalendarUISelectors().mounthHeading).innerText.toLowerCase());
                        year = parseInt(document.querySelector(CalendarUI.getCalendarUISelectors().dateYear).innerText);
                    }
                });
                document.querySelector(CalendarUI.getCalendarUISelectors().modalContainer).classList.add("dpnone");
                CalendarData.setSelection(year, monthIndex, selectedDay);
                CalendarUI.clearYearlyCalendarDays();
                populateYearlyCalendarDaysAndMonths();
                populateYearlyCalendarYear();
                CalendarData.setReturnDate(year, monthIndex, selectedDay);
                const settedDate = CalendarData.getReturnDate();
                CalendarUI.populateSettedDate(settedDate);
            })
        })
    }

    const getSelectedDayFromYearlyCalendar = function(daysArr){
        let selectedDay = CalendarData.getSelection().day;
        let monthIndex = CalendarData.getSelection().month;
        let year = CalendarData.getSelection().year;
        daysArr.forEach((day) => {
            day.addEventListener("click", () => {
                daysArr.forEach((day) => {
                    if(day.classList.contains("selected-day")){
                        day.classList.remove("selected-day");
                    }
                })
                day.classList.add("selected-day");
                selectedDay = parseInt(day.innerText);
                monthIndex = CalendarData.getMonthIndexFromMonthName(day.parentElement.firstChild.textContent.toLowerCase());
                year = parseInt(document.querySelector(CalendarUI.getCalendarUISelectors().calendarYear).textContent);
                document.querySelector(CalendarUI.getCalendarUISelectors().modalContainer).classList.add("dpnone");
                CalendarData.setSelection(year, monthIndex, selectedDay);
                populateMonthlyCalendarMonth();
                populateMonthlyCalendarDays();
                populateMonthlyCalendarYear();
                CalendarData.setReturnDate(year, monthIndex, selectedDay);
                const settedDate = CalendarData.getReturnDate();
                CalendarUI.populateSettedDate(settedDate);
            });
        })
    }
    
    const switchCalendar = function(){
        const yearlyCalendar = document.querySelector(CalendarUI.getCalendarUISelectors().yearlyCalendar);
        const monthlyCalendar = document.querySelector(CalendarUI.getCalendarUISelectors().monthlyCalendar);
        const switchBtn = document.querySelector(CalendarUI.getCalendarUISelectors().switchBtn);
        
        if(switchBtn.innerText.toLowerCase() === "switch to yearly view"){
            CalendarUI.clearYearlyCalendarDays();
            populateYearlyCalendarDaysAndMonths();
            populateYearlyCalendarYear();
            const currentYearDays = CalendarData.getCurrentYearDaysFromYearlyCalendar();
            getSelectedDayFromYearlyCalendar(currentYearDays);
        }

        if(switchBtn.innerText.toLowerCase() === "switch to monthly view"){
            populateMonthlyCalendarMonth();
            populateMonthlyCalendarDays();
            populateMonthlyCalendarYear();
            displayPrevDatesWithPrevDateClick();
            displayNextDatesWithNextDateClick();
            const currentMonthDays = CalendarData.getCurrentMonthDaysFromMonthlyCalendar();
            getSelectedDayFromMonthlyCalendar(currentMonthDays);
        }
        
        if(yearlyCalendar.parentElement.classList.contains("dpnone")){
            yearlyCalendar.parentElement.classList.remove("dpnone");
            monthlyCalendar.parentElement.classList.add("dpnone");
            switchBtn.textContent = "switch to monthly view";
        }else{
            yearlyCalendar.parentElement.classList.add("dpnone");
            monthlyCalendar.parentElement.classList.remove("dpnone");
            switchBtn.textContent = "switch to yearly view";
        }
    }

    return{
        init: function(){
            loadEventListeners();
        }
    }
})(CalendarData, CalendarUI);

CalendarApp.init();