 //////// MODULES
 
 
 ////// DATA MODULE
 //// BUDGET CONTROLLER
 // ADD then new item to data structure, CALCULATE budget
 
 var budgetControler = (function(){
    // code here
    // Function Constructor Capital First Letter of Name to Distinguish
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome) {

        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    // Storage Object DATA Struture properties
    var data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1 //Does not exist at this point
    };

    // Public Method to allow other Modules to add new Items into DATA Structure
    return {

        //ADD ITEM
        addItem: function(type, desc, val) {
            var newItem, ID;

            // Create New ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create new Item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, desc, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, desc, val);
            }

            // Push new Item into Data Structure
            data.allItems[type].push(newItem);

            // Return the New Element
            return newItem;
        },

        //DELETE ITEM METHOD controled by the budget Controler
        deleteItem: function(type, id) {
            var ids, index;
            
            ids = data.allItems[type].map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        //CALCULATE BUDGET
        calculateBudget: function() {
            // Calculate Total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // Calculate the Budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // Calculate the percentage of income spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }else {
                data.percentage = -1;
            }
        },

        //CALCULATE PERCENTAGES
        calculatePercentages: function() {
            data.allItems.exp.forEach(function(cur) {
                cur.calcPercentage(data.totals.inc);
            });
        },

        //GET PERCENTAGES
        getPercentages: function() {
            var allPerc = data.allItems.exp.map(function(cur) {
                return cur.getPercentage();
            });
            return allPerc;
        },

        //GET BUDGET
        getBudget: function(){
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        // TESTING FUNCTION
        testing: function() {
            console.log(data);
        }
    };
 
})();


 ////// UI MODULE
 //// UI CONTROLLER
 // GET inout values, ADD the new item to the UI

 var UIController = (function() {
     // code here

    // Storing all the DOM strings
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer:'.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };

    // METHOD - Format NUmbers 
    var formatNumber = function(num, type) {
            
        var numSplit, int, dec;

        // Absolute number 
        num = Math.abs(num);
        
        // Add decimal numbers rule
        num = num.toFixed(2);

        // Splitting number into integer and decimals and store it in an Array
        numSplit = num.split('.');

        // Add semi colon separator to the thousands with SubString Method
        int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }

        // Add + || - sign before number
        dec = numSplit[1];

        // Operator executed first for sign attribuition)
        return (type === 'exp' ? '-' :  '+') + ' ' + int + '.' + dec;

     };

     var nodeListForEach = function(list, callback) {
        for (var i =0; i< list.length; i++) {
            callback(list[i], i);
        }
    };

     // PUBLIC Method/Function 
    // Method to RETURN all of the input values from the UI
     return {
         //Public method that can be accessed from the Global Method
         getinput: function() {
             return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be either income or expenses
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value) // Parse the string returned into numbers
             }
         },

         // Public Method Add List Item
         addListItem: function(obj, type) {
             // Declare the Varaibles
             var html, newHtml, element;
            // Create HTML String with Placeholder text assigning variables
            if ( type === 'inc') {
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if ( type === 'exp') {
                element = DOMstrings.expensesContainer;

                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Replace placeholder text with actual data
            newHtml = html.replace('%id%', obj.id);
            // Replace description and value on the new html object
            newHtml = newHtml.replace('%description%', obj.description);

            newHtml = newHtml.replace('%value%', formatNumber(obj.value));

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

         },

         // Public Method Delete List Item
         deleteListItem: function(selectorID) {
            var elm = document.getElementById(selectorID);
            elm.parentNode.removeChild(elm);

         },


         // Clear Fields Method
         clearFields: function() {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            // Convert list to array wit Method "slice"
            // Loop through the ARRAY and Clear all the fields selected 
            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });

            // Set Focus to First Elemnt in the ARRAY
            fieldsArr[0].focus();
         },

         // METHOD - Display Budget in user UI
         displayBudget: function(obj) {

            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');

            // ONLY show percentage if value is GREATER than 0
            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            }else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }

         },

          // METHOD - Display Percentages in user UI
         displayPercentages: function(percentages) {
            // ARRAY
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

            nodeListForEach(fields, function(current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }  
            });
         },

         // METHOD - Display Date
        displayMonth: function (){

            // Declare Variables
            var now, months, month, year;
            // Date Object Constructor to assign Variables
            now = new Date();
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();
            year = now.getFullYear();
            // Pass Date Year to UI
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
        },

        // METHOD - Change colors
        changedType: function() {
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue
            );

            nodeListForEach(fields, function(cur) {
                cur.classList.toggle('red-focus');
            });
            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
        },

         // Public Method to expose DOMStrings to the Controller Method
         getDOMstrings: function(){
             return DOMstrings;
         }
     };

 })();

 
 ////// CONTROLLER MODULE
 //// GLOBAL APP CONTROLLER
 // ADD event handler
 var controller = (function(budgetCtrl, UICtrl) {
    
    // EventListeners
    var setupEventListeners = function() {
        // Access DOMstrings element for event listeners
        var DOM = UICtrl.getDOMstrings();
       
        // addEventListener to UI Button and pass ctrlAdditem function()
        // AddEventListener will call function 
        // No need for ()callback method for controlAddItem function
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        // addEventListener to "RETURN" key with keyCode 
        // and which (for fallback for older browsers)
        document.addEventListener('keypress', function(event) {

            if(event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
    };

    // CONTROL UPDATE Budget
    var updateBudget = function() {
        //1. Calculate budget
        budgetCtrl.calculateBudget();

        //2. Return the Budget
        var budget = budgetCtrl.getBudget();
        
        //3. Display budget on UI
        UICtrl.displayBudget(budget);
    };

    // CONTROL UPDATE Percentage
    var updatePercentages = function() {

        // 1. Calculate Percentages
        budgetCtrl.calculatePercentages();

        // 2. Read them from Budget Controller
        var percentages = budgetCtrl.getPercentages();

        // 3. Update User UI with new percentages
        UICtrl.displayPercentages(percentages);
    };

    // CONTROL ADD item Function
    var ctrlAddItem = function() {
        //Declare the variables
        var input, newItem;
        
        //1. Get field input data
        input = UICtrl.getinput();
        
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            //2. Add item to budget Controller
            newItem = budgetControler.addItem(input.type, input.description, input.value);

            //3. Add item to UI
            UICtrl.addListItem(newItem, input.type);
            
            //4. Clear elements from the UI fields
            UICtrl.clearFields();

            //5. Calculate and Update Budget
            updateBudget();

            //6. Calculate and Update Percentages
            updatePercentages();
        }
    };

    // CONTROL DELETE item Function
    var ctrlDeleteItem = function(event) {
        var itemId, splitId, type, ID;

        itemId = (event.target.parentNode.parentNode.parentNode.parentNode.id);

        if(itemId) {

            splitId = itemId.split('-');
            type = splitId[0];
            ID = parseInt(splitId[1]);

            // 1. DELETE Item from data Structure
            budgetCtrl.deleteItem(type, ID);

            // 2. DELETE Item from User UI
            UICtrl.deleteListItem(itemId);

            // 3. UPDATE and display new Budget 
            updateBudget();

            // 4. Calculate and Update Percentages
            updatePercentages();

        }
    };

    // Initial functions when App Starts
    return {
        init: function() {
            console.log('application started');
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    };

 })(budgetControler, UIController);

 controller.init();



