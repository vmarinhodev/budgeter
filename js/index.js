/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval(" //////// MODULES\n \n ////// DATA MODULE\n //// BUDGET CONTROLLER\n // ADD then new item to data structure, CALCULATE budget\n \n var budgetControler = (function(){\n    // code here\n    // Function Constructor Capital First Letter of Name to Distinguish\n    var Expense = function (id, description, value) {\n        this.id = id;\n        this.description = description;\n        this.value = value;\n        this.percentage = -1;\n    };\n\n    Expense.prototype.calcPercentage = function(totalIncome) {\n\n        if (totalIncome > 0) {\n            this.percentage = Math.round((this.value / totalIncome) * 100);\n        } else {\n            this.percentage = -1;\n        }\n    };\n\n    Expense.prototype.getPercentage = function() {\n        return this.percentage;\n    };\n\n    var Income = function (id, description, value) {\n        this.id = id;\n        this.description = description;\n        this.value = value;\n    };\n\n    var calculateTotal = function(type) {\n        var sum = 0;\n        data.allItems[type].forEach(function(cur) {\n            sum += cur.value;\n        });\n        data.totals[type] = sum;\n    };\n\n    // Storage Object DATA Struture properties\n    var data = {\n        allItems: {\n            exp: [],\n            inc: [],\n        },\n        totals: {\n            exp: 0,\n            inc: 0\n        },\n        budget: 0,\n        percentage: -1 //Does not exist at this point\n    };\n\n    // Public Method to allow other Modules to add new Items into DATA Structure\n    return {\n\n        //ADD ITEM\n        addItem: function(type, desc, val) {\n            var newItem, ID;\n\n            // Create New ID\n            if (data.allItems[type].length > 0) {\n                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;\n            } else {\n                ID = 0;\n            }\n\n            // Create new Item based on 'inc' or 'exp' type\n            if (type === 'exp') {\n                newItem = new Expense(ID, desc, val);\n            } else if (type === 'inc') {\n                newItem = new Income(ID, desc, val);\n            }\n\n            // Push new Item into Data Structure\n            data.allItems[type].push(newItem);\n\n            // Return the New Element\n            return newItem;\n        },\n\n        //DELETE ITEM METHOD controled by the budget Controler\n        deleteItem: function(type, id) {\n            var ids, index;\n            \n            ids = data.allItems[type].map(function(current) {\n                return current.id;\n            });\n\n            index = ids.indexOf(id);\n\n            if (index !== -1) {\n                data.allItems[type].splice(index, 1);\n            }\n        },\n\n        //CALCULATE BUDGET\n        calculateBudget: function() {\n            // Calculate Total income and expenses\n            calculateTotal('exp');\n            calculateTotal('inc');\n\n            // Calculate the Budget: income - expenses\n            data.budget = data.totals.inc - data.totals.exp;\n\n            // Calculate the percentage of income spent\n            if (data.totals.inc > 0) {\n                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);\n            }else {\n                data.percentage = -1;\n            }\n        },\n\n        //CALCULATE PERCENTAGES\n        calculatePercentages: function() {\n            data.allItems.exp.forEach(function(cur) {\n                cur.calcPercentage(data.totals.inc);\n            });\n        },\n\n        //GET PERCENTAGES\n        getPercentages: function() {\n            var allPerc = data.allItems.exp.map(function(cur) {\n                return cur.getPercentage();\n            });\n            return allPerc;\n        },\n\n        //GET BUDGET\n        getBudget: function(){\n            return {\n                budget: data.budget,\n                totalInc: data.totals.inc,\n                totalExp: data.totals.exp,\n                percentage: data.percentage\n            }\n        },\n\n        // TESTING FUNCTION\n        testing: function() {\n            console.log(data);\n        }\n    };\n \n})();\n\n\n ////// UI MODULE\n //// UI CONTROLLER\n // GET inout values, ADD the new item to the UI\n\n var UIController = (function() {\n     // code here\n\n    // Storing all the DOM strings\n    var DOMstrings = {\n        inputType: '#checkbox',\n        inputDescription: '.add__description',\n        inputValue: '.add__value',\n        inputBtn: '.add__btn',\n        //incomeContainer: '.income__list',\n        //expensesContainer:'.expenses__list',\n        budgetLabel: '.summary__value',\n        incomeLabel: '.lower-panel__income--value',\n        expensesLabel: '.lower-panel__expenses--value',\n        percentageLabel: '.lower-panel__expenses--percentage',\n        container: '.panel',\n        expensesPercLabel: '.panel__item__value-percentage',\n        dateLabel: '.summary__label--month'\n    };\n\n    // METHOD - Format NUmbers \n    var formatNumber = function(num, type) {\n            \n        var numSplit, int, dec;\n\n        // Absolute number \n        num = Math.abs(num);\n        \n        // Add decimal numbers rule\n        num = num.toFixed(2);\n\n        // Splitting number into integer and decimals and store it in an Array\n        numSplit = num.split('.');\n\n        // Add semi colon separator to the thousands with SubString Method\n        int = numSplit[0];\n        if (int.length > 3) {\n            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);\n        }\n\n        // Add + || - sign before number\n        dec = numSplit[1];\n\n        // Operator executed first for sign attribuition)\n        return (type === 'exp' ? '-' :  '+') + ' ' + int + '.' + dec;\n\n     };\n\n     var nodeListForEach = function(list, callback) {\n        for (var i =0; i< list.length; i++) {\n            callback(list[i], i);\n        }\n    };\n\n     // PUBLIC Method/Function \n    // Method to RETURN all of the input values from the UI\n     return {\n         //Public method that can be accessed from the Global Method\n         getinput: function() {\n             return {\n                type: document.querySelector(DOMstrings.inputType).checked ? 'exp' : 'inc', // Will be either income or expenses\n                description: document.querySelector(DOMstrings.inputDescription).value,\n                value: parseFloat(document.querySelector(DOMstrings.inputValue).value) // Parse the string returned into numbers\n             }\n         },\n\n         // Public Method Add List Item\n         addListItem: function(obj, type) {\n             // Declare the Variables\n             var html, newHtml, element;\n            // Create HTML String with Placeholder text assigning variables\n            if ( type === 'inc') {\n                element = DOMstrings.container;\n\n                html = '<div class=\"panel__item panel__item-income\" id=\"inc-%id%\"><div class=\"panel__item__details\"><div class=\"panel__item__details-name\">%description%</div></div><div class=\"panel__item__value\"><div class=\"panel__item__value-number\">%value%</div></div><button class=\"item__delete--btn\"><svg class=\"icon icon-cross\"><use xlink:href=\"#icon-cross\"></use></svg></button></div>';\n            } else if ( type === 'exp') {\n                element = DOMstrings.container;\n\n                html = '<div class=\"panel__item panel__item-expense\" id=\"exp-%id%\"><div class=\"panel__item__details\"><div class=\"panel__item__details-name\">%description%</div></div><div class=\"panel__item__value\"><div class=\"panel__item__value-number\">%value%</div><div class=\"panel__item__value-percentage\">5%</div></div><button class=\"item__delete--btn\"> <svg class=\"icon icon-cross\"><use xlink:href=\"#icon-cross\"></use></svg></button></div>';\n            }\n\n            // Replace placeholder text with actual data\n            newHtml = html.replace('%id%', obj.id);\n            // Replace description and value on the new html object\n            newHtml = newHtml.replace('%description%', obj.description);\n\n            newHtml = newHtml.replace('%value%', formatNumber(obj.value));\n\n            // Insert the HTML into the DOM\n            document.querySelector(element).insertAdjacentHTML('afterbegin', newHtml);\n\n         },\n\n         // Public Method Delete List Item\n         deleteListItem: function(selectorID) {\n            var elm = document.getElementById(selectorID);\n            elm.parentNode.removeChild(elm);\n\n         },\n\n\n         // Clear Fields Method\n         clearFields: function() {\n            var fields, fieldsArr;\n\n            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);\n\n            // Convert list to array wit Method \"slice\"\n            // Loop through the ARRAY and Clear all the fields selected \n            fieldsArr = Array.prototype.slice.call(fields);\n\n            fieldsArr.forEach(function(current, index, array) {\n                current.value = \"\";\n            });\n\n            // Set Focus to First Elemnt in the ARRAY\n            fieldsArr[0].focus();\n         },\n\n         // METHOD - Display Budget in user UI\n         displayBudget: function(obj) {\n\n            var type;\n            obj.budget > 0 ? type = 'inc' : type = 'exp';\n            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);\n            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');\n            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');\n\n            // ONLY show percentage if value is GREATER than 0\n            if (obj.percentage > 0) {\n                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';\n            }else {\n                document.querySelector(DOMstrings.percentageLabel).textContent = '---';\n            }\n\n         },\n\n          // METHOD - Display Percentages in user UI\n         displayPercentages: function(percentages) {\n            // ARRAY\n            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);\n\n            nodeListForEach(fields, function(current, index) {\n                if (percentages[index] > 0) {\n                    current.textContent = percentages[index] + '%';\n                } else {\n                    current.textContent = '---';\n                }  \n            });\n         },\n\n         // METHOD - Display Date\n        displayMonth: function (){\n\n            // Declare Variables\n            var now, months, month, year;\n            // Date Object Constructor to assign Variables\n            now = new Date();\n            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];\n            month = now.getMonth();\n            year = now.getFullYear();\n            // Pass Date Year to UI\n            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;\n        },\n\n        // METHOD - Change colors\n        changedType: function() {\n            var fields = document.querySelectorAll(\n                DOMstrings.inputType + ',' +\n                DOMstrings.inputDescription + ',' +\n                DOMstrings.inputValue\n            );\n\n            nodeListForEach(fields, function(cur) {\n                cur.classList.toggle('red');\n                cur.classList.toggle('red-border');\n            });\n            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');\n        },\n\n         // Public Method to expose DOMStrings to the Controller Method\n         getDOMstrings: function(){\n             return DOMstrings;\n         }\n     };\n\n })();\n\n \n ////// CONTROLLER MODULE\n //// GLOBAL APP CONTROLLER\n // ADD event handler\n var controller = (function(budgetCtrl, UICtrl) {\n    \n    // EventListeners\n    var setupEventListeners = function() {\n        // Access DOMstrings element for event listeners\n        var DOM = UICtrl.getDOMstrings();\n       \n        // addEventListener to UI Button and pass ctrlAdditem function()\n        // AddEventListener will call function \n        // No need for ()callback method for controlAddItem function\n        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);\n\n        // addEventListener to \"RETURN\" key with keyCode \n        // and which (for fallback for older browsers)\n        document.addEventListener('keypress', function(event) {\n\n            if(event.keyCode === 13 || event.which === 13) {\n                ctrlAddItem();\n            }\n        });\n\n        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);\n\n        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);\n    };\n\n    // CONTROL UPDATE Budget\n    var updateBudget = function() {\n        //1. Calculate budget\n        budgetCtrl.calculateBudget();\n\n        //2. Return the Budget\n        var budget = budgetCtrl.getBudget();\n        \n        //3. Display budget on UI\n        UICtrl.displayBudget(budget);\n    };\n\n    // CONTROL UPDATE Percentage\n    var updatePercentages = function() {\n\n        // 1. Calculate Percentages\n        budgetCtrl.calculatePercentages();\n\n        // 2. Read them from Budget Controller\n        var percentages = budgetCtrl.getPercentages();\n\n        // 3. Update User UI with new percentages\n        UICtrl.displayPercentages(percentages);\n    };\n\n    // CONTROL ADD item Function\n    var ctrlAddItem = function() {\n        //Declare the variables\n        var input, newItem;\n        \n        //1. Get field input data\n        input = UICtrl.getinput();\n        \n        if (input.description !== \"\" && !isNaN(input.value) && input.value > 0) {\n            //2. Add item to budget Controller\n            newItem = budgetControler.addItem(input.type, input.description, input.value);\n\n            //3. Add item to UI\n            UICtrl.addListItem(newItem, input.type);\n            \n            //4. Clear elements from the UI fields\n            UICtrl.clearFields();\n\n            //5. Calculate and Update Budget\n            updateBudget();\n\n            //6. Calculate and Update Percentages\n            updatePercentages();\n        }\n    };\n\n    // CONTROL DELETE item Function\n    var ctrlDeleteItem = function(event) {\n        var itemId, splitId, type, ID;\n\n        itemId = (event.target.parentNode.id);\n\n        if(itemId) {\n\n            splitId = itemId.split('-');\n            type = splitId[0];\n            ID = parseInt(splitId[1]);\n\n            // 1. DELETE Item from data Structure\n            budgetCtrl.deleteItem(type, ID);\n\n            // 2. DELETE Item from User UI\n            UICtrl.deleteListItem(itemId);\n\n            // 3. UPDATE and display new Budget \n            updateBudget();\n\n            // 4. Calculate and Update Percentages\n            updatePercentages();\n\n        }\n    };\n\n    // Initial functions when App Starts\n    return {\n        init: function() {\n            console.log('application started');\n            UICtrl.displayMonth();\n            UICtrl.displayBudget({\n                budget: 0,\n                totalInc: 0,\n                totalExp: 0,\n                percentage: -1\n            });\n            setupEventListeners();\n        }\n    };\n\n })(budgetControler, UIController);\n\n controller.init();\n\n\n\n\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ })

/******/ });