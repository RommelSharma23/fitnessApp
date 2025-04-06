// Global variables
let waterGlassesFilled = 0;
let exerciseRows = 1;

// Display current date on all sections
document.addEventListener('DOMContentLoaded', function() {
    const currentDate = new Date().toLocaleDateString();
    
    if (document.getElementById('currentDate'))
        document.getElementById('currentDate').textContent = currentDate;
    if (document.getElementById('workoutDate'))
        document.getElementById('workoutDate').textContent = currentDate;
    if (document.getElementById('nutritionDate'))
        document.getElementById('nutritionDate').textContent = currentDate;
        
    // Initialize water glasses click events
    initWaterGlasses();
    
    // Add event listener for adding exercise rows
    if (document.getElementById('addExercise')) {
        document.getElementById('addExercise').addEventListener('click', addExerciseRow);
    }
    
    // Add event listeners for adding food items
    document.querySelectorAll('.add-food-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const mealEntry = e.target.closest('.meal-entry');
            addFoodEntry(mealEntry);
        });
    });
    
    // Initialize input events for nutrition calculations
    initNutritionCalculations();
    
    // Initialize History tab if present
    if (document.getElementById('historyTab')) {
        document.getElementById('historyTab').addEventListener('click', function() {
            showSection('historySection');
        });
    }
    
    // Initialize history date loader if present
    if (document.getElementById('loadHistoryBtn')) {
        document.getElementById('loadHistoryBtn').addEventListener('click', loadHistoryData);
    }
    
    // Initialize history type tabs if present
    if (document.getElementById('historySkincare')) {
        document.getElementById('historySkincare').addEventListener('click', function() {
            setActiveHistoryTab('historySkincare');
            const date = document.getElementById('historyDate').value;
            if (date) {
                loadSkincareHistory(new Date(date).toLocaleDateString());
            }
        });
    }
    
    if (document.getElementById('historyWorkout')) {
        document.getElementById('historyWorkout').addEventListener('click', function() {
            setActiveHistoryTab('historyWorkout');
            const date = document.getElementById('historyDate').value;
            if (date) {
                loadWorkoutHistory(new Date(date).toLocaleDateString());
            }
        });
    }
    
    if (document.getElementById('historyNutrition')) {
        document.getElementById('historyNutrition').addEventListener('click', function() {
            setActiveHistoryTab('historyNutrition');
            const date = document.getElementById('historyDate').value;
            if (date) {
                loadNutritionHistory(new Date(date).toLocaleDateString());
            }
        });
    }
});

// Tab navigation
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('skincareTab')) {
        document.getElementById('skincareTab').addEventListener('click', function() {
            showSection('skincareSection');
        });
    }
    
    if (document.getElementById('workoutTab')) {
        document.getElementById('workoutTab').addEventListener('click', function() {
            showSection('workoutSection');
        });
    }
    
    if (document.getElementById('nutritionTab')) {
        document.getElementById('nutritionTab').addEventListener('click', function() {
            showSection('nutritionSection');
        });
    }
});

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('main > section').forEach(section => {
        section.classList.remove('active-section');
        section.classList.add('hidden-section');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.remove('hidden-section');
    document.getElementById(sectionId).classList.add('active-section');
    
    // Update active tab
    document.querySelectorAll('nav button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Find the button that corresponds to this section
    const buttonId = sectionId.replace('Section', 'Tab');
    document.getElementById(buttonId).classList.add('active');
}

// Morning/Evening routine toggle
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('morningBtn')) {
        document.getElementById('morningBtn').addEventListener('click', function() {
            toggleRoutine('morningRoutine');
            this.classList.add('active');
            document.getElementById('eveningBtn').classList.remove('active');
        });
    }
    
    if (document.getElementById('eveningBtn')) {
        document.getElementById('eveningBtn').addEventListener('click', function() {
            toggleRoutine('eveningRoutine');
            this.classList.add('active');
            document.getElementById('morningBtn').classList.remove('active');
        });
    }
    
    // Initialize range slider displays
    initRangeSliders();
});

function toggleRoutine(routineId) {
    document.querySelectorAll('.routine').forEach(routine => {
        routine.classList.remove('active-routine');
    });
    document.getElementById(routineId).classList.add('active-routine');
}

// Initialize range slider value displays
function initRangeSliders() {
    const sliders = [
        { id: 'oiliness', valueId: 'oilinessValue' },
        { id: 'dryness', valueId: 'drynessValue' },
        { id: 'redness', valueId: 'rednessValue' },
        { id: 'overall', valueId: 'overallValue' },
        { id: 'cardioIntensity', valueId: 'intensityValue' }
    ];
    
    sliders.forEach(slider => {
        const element = document.getElementById(slider.id);
        if (element) {
            element.addEventListener('input', function() {
                document.getElementById(slider.valueId).textContent = this.value;
            });
        }
    });
}

// Save skincare routine
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('saveSkincare')) {
        document.getElementById('saveSkincare').addEventListener('click', function() {
            const date = new Date().toLocaleDateString();
            const isMorning = document.getElementById('morningRoutine').classList.contains('active-routine');
            const routineType = isMorning ? 'Morning' : 'Evening';
            
            // Collect the data
            const routineData = {
                date: date,
                type: routineType
            };
            
            // Morning routine fields
            if (document.getElementById('amCleanser')) {
                routineData.amCleanser = document.getElementById('amCleanser').checked;
                routineData.amCleanserProduct = document.getElementById('amCleanserProduct').value;
                routineData.amCleanserDone = document.getElementById('amCleanserDone').checked;
            }
            
            if (document.getElementById('amMoisturizer')) {
                routineData.amMoisturizer = document.getElementById('amMoisturizer').checked;
                routineData.amMoisturizerProduct = document.getElementById('amMoisturizerProduct').value;
                routineData.amMoisturizerDone = document.getElementById('amMoisturizerDone').checked;
            }
            
            if (document.getElementById('amSunscreen')) {
                routineData.amSunscreen = document.getElementById('amSunscreen').checked;
                routineData.amSunscreenProduct = document.getElementById('amSunscreenProduct').value;
                routineData.amSunscreenDone = document.getElementById('amSunscreenDone').checked;
            }
            
            // Evening routine fields
            if (document.getElementById('pmCleanser')) {
                routineData.pmCleanser = document.getElementById('pmCleanser').checked;
                routineData.pmCleanserProduct = document.getElementById('pmCleanserProduct').value;
                routineData.pmCleanserDone = document.getElementById('pmCleanserDone').checked;
            }
            
            if (document.getElementById('pmExfoliant')) {
                routineData.pmExfoliant = document.getElementById('pmExfoliant').checked;
                routineData.pmExfoliantProduct = document.getElementById('pmExfoliantProduct').value;
                routineData.pmExfoliantDone = document.getElementById('pmExfoliantDone').checked;
            }
            
            if (document.getElementById('pmSerum')) {
                routineData.pmSerum = document.getElementById('pmSerum').checked;
                routineData.pmSerumProduct = document.getElementById('pmSerumProduct').value;
                routineData.pmSerumDone = document.getElementById('pmSerumDone').checked;
            }
            
            if (document.getElementById('pmMoisturizer')) {
                routineData.pmMoisturizer = document.getElementById('pmMoisturizer').checked;
                routineData.pmMoisturizerProduct = document.getElementById('pmMoisturizerProduct').value;
                routineData.pmMoisturizerDone = document.getElementById('pmMoisturizerDone').checked;
            }
            
            // Skin condition
            if (document.getElementById('oiliness')) {
                routineData.oiliness = document.getElementById('oiliness').value;
            }
            
            if (document.getElementById('dryness')) {
                routineData.dryness = document.getElementById('dryness').value;
            }
            
            if (document.getElementById('redness')) {
                routineData.redness = document.getElementById('redness').value;
            }
            
            if (document.getElementById('overall')) {
                routineData.overall = document.getElementById('overall').value;
            }
            
            // Save to localStorage
            saveSkincareData(routineData);
            
            alert('Skincare routine saved successfully!');
        });
    }
});

// Save workout data
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('saveWorkout')) {
        document.getElementById('saveWorkout').addEventListener('click', function() {
            const date = new Date().toLocaleDateString();
            const workoutType = document.getElementById('workoutTypeSelect').value;
            const weight = document.getElementById('dailyWeight').value; // Get weight value
            
            // Collect exercises
            const exercises = [];
            const exerciseRows = document.querySelectorAll('.exercise-row:not(.header-row)');
            
            exerciseRows.forEach(row => {
                const exerciseName = row.querySelector('.exercise-name input').value;
                if (exerciseName.trim() !== '') {  // Only save if exercise name exists
                    const sets = [];
                    const weightInputs = row.querySelectorAll('.weight-input');
                    const repInputs = row.querySelectorAll('.rep-input');
                    
                    for (let i = 0; i < weightInputs.length; i++) {
                        const weight = weightInputs[i].value;
                        const reps = repInputs[i].value;
                        if (weight || reps) {  // Only save if at least one field has data
                            sets.push({
                                weight: weight,
                                reps: reps
                            });
                        }
                    }
                    
                    exercises.push({
                        name: exerciseName,
                        sets: sets
                    });
                }
            });
            
            // Collect cardio data
            const cardioData = {
                type: document.getElementById('cardioType').value,
                duration: document.getElementById('cardioDuration').value,
                intensity: document.getElementById('cardioIntensity').value
            };
            
            // Complete workout data
            const workoutData = {
                date: date,
                weight: weight, // Add weight to the saved data
                type: workoutType,
                exercises: exercises,
                cardio: cardioData
            };
            
            // Save to localStorage
            saveWorkoutData(workoutData);
            
            alert('Workout saved successfully!');
        });
    }
});

// Save nutrition data
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('saveNutrition')) {
        document.getElementById('saveNutrition').addEventListener('click', function() {
            const date = new Date().toLocaleDateString();
            
            // Collect meals
            const meals = [];
            const mealEntries = document.querySelectorAll('.meal-entry');
            
            mealEntries.forEach(mealEntry => {
                const mealType = mealEntry.querySelector('h4').textContent;
                const foodEntries = mealEntry.querySelectorAll('.food-entry');
                const foods = [];
                
                foodEntries.forEach(foodEntry => {
                    const foodName = foodEntry.querySelector('.food-name').value;
                    if (foodName.trim() !== '') {  // Only save if food name exists
                        foods.push({
                            name: foodName,
                            protein: foodEntry.querySelector('.protein-input').value,
                            carbs: foodEntry.querySelector('.carb-input').value,
                            fat: foodEntry.querySelector('.fat-input').value,
                            calories: foodEntry.querySelector('.calorie-input').value
                        });
                    }
                });
                
                meals.push({
                    type: mealType,
                    foods: foods
                });
            });
            
            // Collect water data
            const waterData = {
                glasses: waterGlassesFilled,
                liters: (waterGlassesFilled * 0.25).toFixed(1)
            };
            
            // Complete nutrition data
            const nutritionData = {
                date: date,
                meals: meals,
                water: waterData,
                totals: {
                    calories: document.getElementById('calorieTotal').textContent,
                    protein: document.getElementById('proteinTotal').textContent,
                    carbs: document.getElementById('carbTotal').textContent,
                    fat: document.getElementById('fatTotal').textContent
                }
            };
            
            // Save to localStorage
            saveNutritionData(nutritionData);
            
            alert('Nutrition data saved successfully!');
        });
    }
});

// Initialize water glass tracking
function initWaterGlasses() {
    document.querySelectorAll('.water-glass').forEach(glass => {
        glass.addEventListener('click', function() {
            const value = parseInt(this.getAttribute('data-value'));
            
            // Update filled glasses
            document.querySelectorAll('.water-glass').forEach(g => {
                const gValue = parseInt(g.getAttribute('data-value'));
                if (gValue <= value) {
                    g.classList.add('filled');
                } else {
                    g.classList.remove('filled');
                }
            });
            
            waterGlassesFilled = value;
            const liters = (value * 0.25).toFixed(1);
            
            if (document.querySelector('.water-amount')) {
                document.querySelector('.water-amount').textContent = liters + 'L / 3L';
            }
        });
    });
}

// Add a new exercise row
function addExerciseRow() {
    const container = document.getElementById('exerciseContainer');
    const newRow = document.createElement('div');
    newRow.className = 'exercise-row';
    newRow.innerHTML = `
        <div class="exercise-name">
            <input type="text" placeholder="Exercise name">
        </div>
        <div class="set">
            <input type="text" placeholder="W" class="weight-input">
            <input type="text" placeholder="R" class="rep-input">
        </div>
        <div class="set">
            <input type="text" placeholder="W" class="weight-input">
            <input type="text" placeholder="R" class="rep-input">
        </div>
        <div class="set">
            <input type="text" placeholder="W" class="weight-input">
            <input type="text" placeholder="R" class="rep-input">
        </div>
        <div class="set">
            <input type="text" placeholder="W" class="weight-input">
            <input type="text" placeholder="R" class="rep-input">
        </div>
    `;
    
    container.appendChild(newRow);
    exerciseRows++;
}

// Add a new food entry to a meal
function addFoodEntry(mealEntry) {
    const newFoodEntry = document.createElement('div');
    newFoodEntry.className = 'food-entry';
    newFoodEntry.innerHTML = `
        <input type="text" placeholder="Food item" class="food-name">
        <input type="number" placeholder="Protein (g)" class="protein-input">
        <input type="number" placeholder="Carbs (g)" class="carb-input">
        <input type="number" placeholder="Fat (g)" class="fat-input">
        <input type="number" placeholder="Calories" class="calorie-input">
    `;
    
    // Insert before the add button
    mealEntry.insertBefore(newFoodEntry, mealEntry.querySelector('.add-food-btn'));
    
    // Initialize calculations for this new food entry
    initNutritionInputEvents(newFoodEntry);
}

// Initialize nutrition calculations
function initNutritionCalculations() {
    document.querySelectorAll('.food-entry').forEach(foodEntry => {
        initNutritionInputEvents(foodEntry);
    });
}

// Initialize nutrition input events for a food entry
function initNutritionInputEvents(foodEntry) {
    const inputs = foodEntry.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', updateNutritionTotals);
    });
}

// Update nutrition totals
function updateNutritionTotals() {
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let totalCalories = 0;
    
    document.querySelectorAll('.food-entry').forEach(foodEntry => {
        const protein = parseFloat(foodEntry.querySelector('.protein-input').value) || 0;
        const carbs = parseFloat(foodEntry.querySelector('.carb-input').value) || 0;
        const fat = parseFloat(foodEntry.querySelector('.fat-input').value) || 0;
        const calories = parseFloat(foodEntry.querySelector('.calorie-input').value) || 0;
        
        totalProtein += protein;
        totalCarbs += carbs;
        totalFat += fat;
        totalCalories += calories;
    });
    
    // Update the display
    if (document.getElementById('proteinTotal'))
        document.getElementById('proteinTotal').textContent = totalProtein.toFixed(1);
    if (document.getElementById('carbTotal'))
        document.getElementById('carbTotal').textContent = totalCarbs.toFixed(1);
    if (document.getElementById('fatTotal'))
        document.getElementById('fatTotal').textContent = totalFat.toFixed(1);
    if (document.getElementById('calorieTotal'))
        document.getElementById('calorieTotal').textContent = totalCalories.toFixed(0);
}

// Load history data based on the selected tab
function loadHistoryData() {
    const selectedDate = document.getElementById('historyDate').value;
    if (!selectedDate) {
        alert('Please select a date');
        return;
    }
    
    // Format date to match how we stored it (MM/DD/YYYY)
    const date = new Date(selectedDate);
    const formattedDate = date.toLocaleDateString();
    
    // Load data based on active history tab
    if (document.getElementById('historySkincare').classList.contains('active')) {
        loadSkincareHistory(formattedDate);
    } else if (document.getElementById('historyWorkout').classList.contains('active')) {
        loadWorkoutHistory(formattedDate);
    } else if (document.getElementById('historyNutrition').classList.contains('active')) {
        loadNutritionHistory(formattedDate);
    }
}

// Set active history tab
function setActiveHistoryTab(tabId) {
    document.querySelectorAll('.history-tabs button').forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
}

// Load skincare history
function loadSkincareHistory(date) {
    const allRoutines = JSON.parse(localStorage.getItem('skincareRoutines')) || [];
    const routinesForDate = allRoutines.filter(routine => routine.date === date);
    
    const display = document.getElementById('historyDisplay');
    
    if (routinesForDate.length === 0) {
        display.innerHTML = `<p>No skincare data found for ${date}</p>`;
        return;
    }
    
    let html = `<h3>Skincare Routine - ${date}</h3>`;
    
    routinesForDate.forEach(routine => {
        html += `<div class="history-card">`;
        html += `<h4>${routine.type} Routine</h4>`;
        
        if (routine.type === 'Morning') {
            html += `<p>Cleanser: ${routine.amCleanser ? '✅' : '❌'} (${routine.amCleanserProduct}) ${routine.amCleanserDone ? '- Completed' : ''}</p>`;
            html += `<p>Moisturizer: ${routine.amMoisturizer ? '✅' : '❌'} (${routine.amMoisturizerProduct}) ${routine.amMoisturizerDone ? '- Completed' : ''}</p>`;
            html += `<p>Sunscreen: ${routine.amSunscreen ? '✅' : '❌'} (${routine.amSunscreenProduct}) ${routine.amSunscreenDone ? '- Completed' : ''}</p>`;
        } else {
            html += `<p>Cleanser: ${routine.pmCleanser ? '✅' : '❌'} (${routine.pmCleanserProduct}) ${routine.pmCleanserDone ? '- Completed' : ''}</p>`;
            html += `<p>Exfoliant: ${routine.pmExfoliant ? '✅' : '❌'} (${routine.pmExfoliantProduct}) ${routine.pmExfoliantDone ? '- Completed' : ''}</p>`;
            html += `<p>Serum: ${routine.pmSerum ? '✅' : '❌'} (${routine.pmSerumProduct}) ${routine.pmSerumDone ? '- Completed' : ''}</p>`;
            html += `<p>Moisturizer: ${routine.pmMoisturizer ? '✅' : '❌'} (${routine.pmMoisturizerProduct}) ${routine.pmMoisturizerDone ? '- Completed' : ''}</p>`;
        }
        
        html += `<div class="skin-ratings">`;
        html += `<p>Oiliness: ${routine.oiliness}/5</p>`;
        html += `<p>Dryness: ${routine.dryness}/5</p>`;
        html += `<p>Redness: ${routine.redness}/5</p>`;
        html += `<p>Overall: ${routine.overall}/5</p>`;
        html += `</div>`;
        
        html += `</div>`;
    });
    
    display.innerHTML = html;
}

// Load workout history
function loadWorkoutHistory(date) {
    const allWorkouts = JSON.parse(localStorage.getItem('workoutData')) || [];
    const workoutsForDate = allWorkouts.filter(workout => workout.date === date);
    
    const display = document.getElementById('historyDisplay');
    
    if (workoutsForDate.length === 0) {
        display.innerHTML = `<p>No workout data found for ${date}</p>`;
        return;
    }
    
    let html = `<h3>Workout - ${date}</h3>`;
    
    workoutsForDate.forEach(workout => {
        html += `<div class="history-card">`;
        
        // Add weight display if available
        if (workout.weight) {
            html += `<p class="weight-display"><strong>Weight:</strong> ${workout.weight} kg</p>`;
        }
        
        html += `<h4>${workout.type}</h4>`;
        
        if (workout.exercises && workout.exercises.length > 0) {
            html += `<table class="history-table">`;
            html += `<tr><th>Exercise</th><th>Set 1</th><th>Set 2</th><th>Set 3</th><th>Set 4</th></tr>`;
            
            workout.exercises.forEach(exercise => {
                html += `<tr>`;
                html += `<td>${exercise.name}</td>`;
                
                // Display sets (up to 4)
                for (let i = 0; i < 4; i++) {
                    if (exercise.sets[i]) {
                        html += `<td>${exercise.sets[i].weight || '-'} x ${exercise.sets[i].reps || '-'}</td>`;
                    } else {
                        html += `<td>-</td>`;
                    }
                }
                
                html += `</tr>`;
            });
            
            html += `</table>`;
        }
        
        // Cardio info
        if (workout.cardio && workout.cardio.type) {
            html += `<div class="cardio-history">`;
            html += `<h5>Cardio</h5>`;
            html += `<p>Type: ${workout.cardio.type}</p>`;
            html += `<p>Duration: ${workout.cardio.duration} minutes</p>`;
            html += `<p>Intensity: ${workout.cardio.intensity}/10</p>`;
            html += `</div>`;
        }
        
        html += `</div>`;
    });
    
    display.innerHTML = html;
}

// Load nutrition history
function loadNutritionHistory(date) {
    const allNutrition = JSON.parse(localStorage.getItem('nutritionData')) || [];
    const nutritionForDate = allNutrition.filter(entry => entry.date === date);
    
    const display = document.getElementById('historyDisplay');
    
    if (nutritionForDate.length === 0) {
        display.innerHTML = `<p>No nutrition data found for ${date}</p>`;
        return;
    }
    
    let html = `<h3>Nutrition Log - ${date}</h3>`;
    
    nutritionForDate.forEach(entry => {
        html += `<div class="history-card">`;
        
        // Display totals
        html += `<div class="nutrition-totals">`;
        html += `<p><strong>Calories:</strong> ${entry.totals.calories}</p>`;
        html += `<p><strong>Protein:</strong> ${entry.totals.protein}g</p>`;
        html += `<p><strong>Carbs:</strong> ${entry.totals.carbs}g</p>`;
        html += `<p><strong>Fat:</strong> ${entry.totals.fat}g</p>`;
        html += `<p><strong>Water:</strong> ${entry.water.liters}L</p>`;
        html += `</div>`;
        
        // Display meals
        if (entry.meals && entry.meals.length > 0) {
            entry.meals.forEach(meal => {
                if (meal.foods && meal.foods.length > 0) {
                    html += `<div class="meal-history">`;
                    html += `<h5>${meal.type}</h5>`;
                    
                    html += `<table class="history-table">`;
                    html += `<tr><th>Food</th><th>Protein</th><th>Carbs</th><th>Fat</th><th>Calories</th></tr>`;
                    
                    meal.foods.forEach(food => {
                        html += `<tr>`;
                        html += `<td>${food.name}</td>`;
                        html += `<td>${food.protein || 0}g</td>`;
                        html += `<td>${food.carbs || 0}g</td>`;
                        html += `<td>${food.fat || 0}g</td>`;
                        html += `<td>${food.calories || 0}</td>`;
                        html += `</tr>`;
                    });
                    
                    html += `</table>`;
                    html += `</div>`;
                }
            });
        }
        
        html += `</div>`;
    });
    
    display.innerHTML = html;
}

// Save data to localStorage
function saveSkincareData(data) {
    // Get existing data
    let allRoutines = JSON.parse(localStorage.getItem('skincareRoutines')) || [];
    
    // Add new data
    allRoutines.push(data);
    
    // Save back to localStorage
    localStorage.setItem('skincareRoutines', JSON.stringify(allRoutines));
}

function saveWorkoutData(data) {
    // Get existing data
    let allWorkouts = JSON.parse(localStorage.getItem('workoutData')) || [];
    
    // Add new data
    allWorkouts.push(data);
    
    // Save back to localStorage
    localStorage.setItem('workoutData', JSON.stringify(allWorkouts));
}

function saveNutritionData(data) {
    // Get existing data
    let allNutritionData = JSON.parse(localStorage.getItem('nutritionData')) || [];
    
    // Add new data
    allNutritionData.push(data);
    
    // Save back to localStorage
    localStorage.setItem('nutritionData', JSON.stringify(allNutritionData));
}