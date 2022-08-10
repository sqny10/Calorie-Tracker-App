const StorageController = (function(){
    return {
        storeItem: function(storageObj){
            let dayItems;
            if(localStorage.getItem("dayItems") === null){
                dayItems = [];
                dayItems.push({
                    day: storageObj.day,
                    month: storageObj.month,
                    year: storageObj.year,
                    storageInputText: storageObj.storageInputText
                });
                localStorage.setItem("dayItems", JSON.stringify(dayItems));
            }else{
                dayItems = JSON.parse(localStorage.getItem("dayItems"));
                dayItems.forEach((dayItem, index) =>{
                    if(dayItem.day === storageObj.day && dayItem.month === storageObj.month && dayItem.year === storageObj.year){
                        dayItems.splice(index, 1, {day: storageObj.day,
                            month: storageObj.month,
                            year: storageObj.year,
                            storageInputText: storageObj.storageInputText})
                    }else{
                        dayItems.push({
                            day: storageObj.day,
                            month: storageObj.month,
                            year: storageObj.year,
                            storageInputText: storageObj.storageInputText
                        });
                    }
                })
                localStorage.setItem("dayItems", JSON.stringify(dayItems));
            }
        },

        getItemsFromStorage: function(){
            let dayItems;
            if(localStorage.getItem("dayItems") === null){
                dayItems = [];
            }else{
                dayItems = JSON.parse(localStorage.getItem("dayItems"));
            }
            return dayItems;
        },
    }
})();

const DataController = (function(){
    return {
        getCalendarDate: function(){
            return CalendarData.getReturnDate();
        },

        getData: function(obj){
            let nutritionsArr = [];
            obj.items.forEach((item) => {
                const nutritionObj = {};
                nutritionObj.name = item.name;
                nutritionObj.servingSize = item.serving_size_g;
                nutritionObj.calories = item.calories;
                nutritionObj.totalFat = item.fat_total_g;
                nutritionObj.carbohydrates = item.carbohydrates_total_g;
                nutritionObj.cholesterol = item.cholesterol_mg;
                nutritionObj.sodium = item.sodium_mg;
                nutritionObj.fiber = item.fiber_g;
                nutritionObj.sugar = item.sugar_g;
                nutritionObj.protein = item.protein_g;
                nutritionsArr.push(nutritionObj)
            });
            return nutritionsArr;
        },

        getTotals: function(elementsArr){
            let total = 0
            elementsArr.forEach(element => {
                let dataValue = element.dataset.value;
                dataValue = Math.ceil(parseFloat(dataValue));
                total += dataValue;
            })
            return total
        },

        getQueryTextForEdit: function(elements){
            const mealName = elements[0].innerText;
            let servingSizeText = elements[1].innerText;
            const servingSizeArr = servingSizeText.split(" ");
            servingSizeArr[0] = Math.ceil(parseFloat(servingSizeArr[0]));
            servingSizeText = `${servingSizeArr[0]} ${servingSizeArr[1]}`;
            const queryTextForEdit = `${servingSizeText} ${mealName}`;
            return queryTextForEdit;
        },

        getAllInput: function(){
            let fullInputText = "";
            let tableElements = document.querySelector(UIController.getSelectors().nutritionTable).children;
            tableElements = Array.from(tableElements);
            for(let i = 2; i < tableElements.length; i++){
                const rowElements = tableElements[i].children;
                const textPart = DataController.getQueryTextForEdit(rowElements);
                fullInputText += textPart;
                fullInputText += " ";
            }
            return fullInputText;
        }
    }
})();

const UIController = (function(){
    const UISelectors = {
        date: ".date-wrapper",
        modalContainer: ".modal-container",
        closeModal: "#close-modal",
        modal: ".modal",
        switch: "#switch",
        submitBtn: "#submit-btn",
        queryInput: "#query-input",
        nutritionTable: ".nutrition-table tbody",
        servingSize: "[data-serving-size]",
        calories: "[data-calories]",
        totalFat: "[data-total-fat]",
        carbohydrates: "[data-carbohydrates]",
        cholesterol: "[data-cholesterol]",
        sodium: "[data-sodium]",
        fiber: "[data-fiber]",
        sugar: "[data-sugar]",
        protein: "[data-protein]",
        mealName: "[data-name]",
        totalServingSize: "[data-total-serving-size]",
        totalCalories: "[data-total-calories]",
        totalTotalFat: "[data-total-total-fat]",
        totalCarbohydrates: "[data-total-carbohydrates]",
        totalCholesterol: "[data-total-cholesterol]",
        totalSodium: "[data-total-sodium]",
        totalFiber: "[data-total-fiber]",
        totalSugar: "[data-total-sugar]",
        totalProtein: "[data-total-protein]",
        newQueryBtn: "#new-query",
        editQueryBtn: "#edit-query",
        submitAllBtn: "#submit-all-btn",
        shownDay: ".shown-day",
        shownMonth: ".shown-month",
        shownYear: ".shown-year",
    }

    return{
        getSelectors: function(){
            return UISelectors;
        },

        toggleDateModal: function(){
            document.querySelector(UISelectors.modalContainer).classList.toggle("dpnone");
        },

        outClickCloseModal: function(target){
            const modal = document.querySelector(UISelectors.modal);
            if(target == modal){
                this.toggleDateModal();
            }
        },

        populateNutritionTable: function(foodObj){
            document.querySelector(UISelectors.nutritionTable).innerHTML += `
                <tr>
                    <td data-name>${foodObj.name}</td>
                    <td data-serving-size data-value=${foodObj.servingSize}>${foodObj.servingSize} g</td>
                    <td data-calories data-value=${foodObj.calories}>${foodObj.calories} g</td>
                    <td data-total-fat data-value=${foodObj.totalFat}>${foodObj.totalFat} g</td>
                    <td data-carbohydrates data-value=${foodObj.carbohydrates}>${foodObj.carbohydrates} g</td>
                    <td data-cholesterol data-value=${foodObj.cholesterol}>${foodObj.cholesterol} mg</td>
                    <td data-sodium data-value=${foodObj.sodium}>${foodObj.sodium} mg</td>
                    <td data-fiber data-value=${foodObj.fiber}>${foodObj.fiber} g</td>
                    <td data-sugar data-value=${foodObj.sugar}>${foodObj.sugar} g</td>
                    <td data-protein data-value=${foodObj.protein}>${foodObj.protein} g</td>
                    <td>
                        <a href="#" aria-label="edit"><i class="edit-btn tc-dark fa-solid fa-pen-to-square"></i></a>
                        <a href="#" aria-label="split"><i class="split-btn tc-dark fa-solid fa-arrows-split-up-and-left"></i></a>
                        <a href="#" aria-label="delete"><i class="delete-btn tc-dark fa-solid fa-trash"></i></a>
                    </td>
                </tr>`
        },

        populateTotalValues: function(totalValuesObj){
            document.querySelector(UISelectors.totalServingSize).innerText = totalValuesObj.totalServingSize;
            document.querySelector(UISelectors.totalCalories).innerText = totalValuesObj.totalCalories;
            document.querySelector(UISelectors.totalTotalFat).innerText = totalValuesObj.totalTotalFat;
            document.querySelector(UISelectors.totalCarbohydrates).innerText = totalValuesObj.totalCarbohydrates;
            document.querySelector(UISelectors.totalCholesterol).innerText = totalValuesObj.totalCholesterol;
            document.querySelector(UISelectors.totalSodium).innerText = totalValuesObj.totalSodium;
            document.querySelector(UISelectors.totalFiber).innerText = totalValuesObj.totalFiber;
            document.querySelector(UISelectors.totalSugar).innerText = totalValuesObj.totalSugar;
            document.querySelector(UISelectors.totalProtein).innerText = totalValuesObj.totalProtein;
        },

        deleteTableRow: function(target){
            target.parentElement.parentElement.parentElement.remove();
        },

        clearTable: function(tableElements){
            for(let i = 2; i < tableElements.length; i++){
                tableElements[i].remove();
            }
        }
    }
})();

const App = (function(UIController, DataController, StorageController){
    const UIselectors = UIController.getSelectors();
    const loadEventListeners = function(){
        document.querySelector(UIselectors.date).addEventListener("click", openAndCloseDateModal);
        document.querySelector(UIselectors.closeModal).addEventListener("click", openAndCloseDateModal);
        document.querySelector(UIselectors.modalContainer).addEventListener("click", outClickModal);
        document.querySelector(UIselectors.submitBtn).addEventListener("click", getNutritionData);
        document.querySelector(UIselectors.nutritionTable).addEventListener("click", actions);
        document.querySelector(UIselectors.newQueryBtn).addEventListener("click", newQuerySubmit);
        document.querySelector(UIselectors.editQueryBtn).addEventListener("click", editQuerySubmit);
        document.querySelector(UIselectors.submitAllBtn).addEventListener("click", submitAll);
    }

    const getNutritionData = function(){
        const inputValue = document.querySelector(UIselectors.queryInput).value;
        const ninja = new Ninja(inputValue);
        ninja.getResponse().then((data) => {
            const nutritionsArr = DataController.getData(data);
            displayDataOnUI(nutritionsArr);
            getTotalValues();
            document.querySelector(UIselectors.queryInput).value = ""
        })
    }

    const displayDataOnUI = function(nutritionsArr){
        nutritionsArr.forEach((foodObj) => {
            UIController.populateNutritionTable(foodObj);
        });
    }

    const getTotalValues = function(){
        const servingSizeElements = document.querySelectorAll(UIselectors.servingSize);
        const totalServingSize = DataController.getTotals(servingSizeElements);
        const caloriesElements = document.querySelectorAll(UIselectors.calories);
        const totalCalories = DataController.getTotals(caloriesElements);
        const totalFatElements = document.querySelectorAll(UIselectors.totalFat);
        const totalTotalFat = DataController.getTotals(totalFatElements);
        const carbohydratesElements = document.querySelectorAll(UIselectors.carbohydrates);
        const totalCarbohydrates = DataController.getTotals(carbohydratesElements);
        const cholesterolElements = document.querySelectorAll(UIselectors.cholesterol);
        const totalCholesterol = DataController.getTotals(cholesterolElements);
        const sodiumElements = document.querySelectorAll(UIselectors.sodium);
        const totalSodium = DataController.getTotals(sodiumElements);
        const fiberElements = document.querySelectorAll(UIselectors.fiber);
        const totalFiber = DataController.getTotals(fiberElements);
        const sugarElements = document.querySelectorAll(UIselectors.sugar);
        const totalSugar = DataController.getTotals(sugarElements);
        const proteinElements = document.querySelectorAll(UIselectors.protein);
        const totalProtein = DataController.getTotals(proteinElements);

        const totalValues = {
            totalServingSize,
            totalCalories,
            totalTotalFat,
            totalCarbohydrates,
            totalCholesterol,
            totalSodium,
            totalFiber,
            totalSugar,
            totalProtein
        }
        UIController.populateTotalValues(totalValues);
    }

    const actions = function(e){
        if(e.target.classList.contains("delete-btn")){
            UIController.deleteTableRow(e.target);
            getTotalValues();
        }

        if(e.target.classList.contains("edit-btn")){
            const rowElements = e.target.parentElement.parentElement.parentElement.children;
            const queryTextForEdit = DataController.getQueryTextForEdit(rowElements);
            UIController.deleteTableRow(e.target);
            document.querySelector(UIselectors.queryInput).value = queryTextForEdit;
            getTotalValues();
        }

        if(e.target.classList.contains("split-btn")){
            const rowElements = e.target.parentElement.parentElement.parentElement.children;
            const queryTextForSplit = DataController.getQueryTextForEdit(rowElements);
            UIController.deleteTableRow(e.target);
            let queryArr = queryTextForSplit.split(" ");
            queryArr = queryArr.splice(2, queryArr.length);
            for(let i = 0; i < queryArr.length; i++){
                document.querySelector(UIselectors.queryInput).value = queryArr[i];
                document.querySelector(UIselectors.submitBtn).click();
            }
            getTotalValues();
            document.querySelector(UIselectors.queryInput).value = ""
        }
        e.preventDefault();
    }

    const newQuerySubmit = function(e){
        let tableElements = document.querySelector(UIselectors.nutritionTable).children;
        tableElements = Array.from(tableElements);
        UIController.clearTable(tableElements);
        getTotalValues();
        document.querySelector(UIselectors.queryInput).focus();
        e.preventDefault();
    }

    const editQuerySubmit = function(e){
        const newEditInput = DataController.getAllInput();
        let tableElements = document.querySelector(UIselectors.nutritionTable).children;
        tableElements = Array.from(tableElements);
        UIController.clearTable(tableElements);
        getTotalValues();
        document.querySelector(UIselectors.queryInput).value = newEditInput;
        e.preventDefault();
    }

    const submitAll = function(e){
        const storageInputText = DataController.getAllInput();
        const date = DataController.getCalendarDate();
        storageObj = {
            day: date.day,
            month: date.month,
            year: date.year,
            storageInputText
        };
        StorageController.storeItem(storageObj);
        e.preventDefault();
    }

    const openAndCloseDateModal = function(){
        UIController.toggleDateModal();
    }

    const outClickModal = function(e){
        UIController.outClickCloseModal(e.target);
    }

    const checkMutation = function(){
        const dateDiv = document.querySelector(UIselectors.date);
        const observer = new MutationObserver(() => {
            let tableElements = document.querySelector(UIselectors.nutritionTable).children;
            tableElements = Array.from(tableElements);
            UIController.clearTable(tableElements);
            getTotalValues();
            const returnedDateFromCalendar = DataController.getCalendarDate();
            const dayItems = StorageController.getItemsFromStorage();
            dayItems.forEach(dayItem => {
                if(dayItem.day === returnedDateFromCalendar.day && dayItem.month === returnedDateFromCalendar.month && dayItem.year === returnedDateFromCalendar.year){
                    document.querySelector(UIselectors.queryInput).value = dayItem.storageInputText;
                    UIController.clearTable(tableElements);
                    document.querySelector(UIselectors.submitBtn).click();
                    getTotalValues();
                }
            })
        });

        observer.observe(dateDiv, {
            childList: true,
            subtree: true
        });
    }

    return{
        init: function(){
            loadEventListeners();
            checkMutation();
        }        
    }
})(UIController, DataController, StorageController);

App.init();