// script.js
document.addEventListener('DOMContentLoaded', function() {
    const materialsContainer = document.getElementById('materialsContainer');
    const addMaterialBtn = document.getElementById('addMaterialBtn');
    const materialsHeader = document.querySelector('.materials-header h2');
    const materialCounter = document.querySelector('.material-counter');
    const rentalStartDate = document.getElementById('rentalStartDate');
    const rentalEndDate = document.getElementById('rentalEndDate');
    const sevenDaysBtn = document.getElementById('sevenDaysBtn');
    const daysDisplay = document.getElementById('daysDisplay');
    const daysContainer = document.getElementById('daysContainer');
    let materialCount = 1;
    
    // Day names array
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Add material functionality
    addMaterialBtn.addEventListener('click', function() {
        if (materialCount >= 10) {
            alert('Maximum 10 materials allowed');
            return;
        }
        
        materialCount++;
        const newMaterial = document.createElement('div');
        newMaterial.className = 'material-item';
        newMaterial.setAttribute('data-index', materialCount);
        newMaterial.innerHTML = `
            <div class="form-group">
                <label>Material Name</label>
                <input type="text" placeholder="e.g., Cement, Steel, Ladder" class="material-name" name="material_name" required>
            </div>
            <div class="form-group">
                <label>Quantity</label>
                <input type="number" placeholder="Quantity" class="material-quantity" name="quantity" min="1" required>
            </div>
            <div class="form-group">
                <label>Price per Unit ($)</label>
                <input type="number" placeholder="Price" class="material-price" name="price" min="0" step="0.01" required>
            </div>
            <div class="form-group">
                <label>Rental Period (masyashya)</label>
                <input type="number" placeholder="masyashya" class="material-rent" name="rent_period" min="1" required>
            </div>
            <button type="button" class="remove-btn"><i class="fas fa-times"></i></button>
        `;
        materialsContainer.appendChild(newMaterial);
        materialCounter.textContent = `${materialCount}/10 Materials`;
        
        // Add event listener to the new remove button
        const removeBtn = newMaterial.querySelector('.remove-btn');
        removeBtn.addEventListener('click', removeMaterial);
    });
    
    // Remove material functionality
    function removeMaterial(e) {
        const materialItem = e.target.closest('.material-item');
        if (materialItem) {
            materialItem.remove();
            materialCount = document.querySelectorAll('.material-item').length;
            materialCounter.textContent = `${materialCount}/10 Materials`;
        }
    }
    
    // Add event listeners to existing remove buttons (for dynamically added ones)
    materialsContainer.addEventListener('click', function(e) {
        if (e.target.closest('.remove-btn')) {
            removeMaterial(e);
        }
    });
    
    // Payment method selection
    const paymentOptions = document.querySelectorAll('.payment-option');
    const paymentAmountBox = document.getElementById('paymentAmountBox');
    const paymentMethodValue = document.getElementById('paymentMethodValue');
    const nationalIdField = document.getElementById('nationalIdField');
    
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            paymentOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Store the selected payment method in the hidden field
            const method = this.getAttribute('data-method');
            paymentMethodValue.value = method;
            
            // Show payment amount box when Cash or CBE is selected
            if (method === 'cash' || method === 'cbe') {
                paymentAmountBox.style.display = 'block';
            } else {
                paymentAmountBox.style.display = 'none';
            }
            
            // Show National ID field for both Cash and CBE
            if (method === 'cash' || method === 'cbe') {
                nationalIdField.style.display = 'block';
            } else {
                nationalIdField.style.display = 'none';
            }
        });
    });
    
    // Initialize with Cash selected
    document.querySelector('.payment-option[data-method="cash"]').classList.add('selected');
    paymentMethodValue.value = 'cash'; 
    paymentAmountBox.style.display = 'block';
    nationalIdField.style.display = 'block';
    
    // 7 Days button functionality
    sevenDaysBtn.addEventListener('click', function() {
        if (rentalStartDate.value) {
            const startDate = new Date(rentalStartDate.value);
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 7);
            
            // Format date as YYYY-MM-DD
            const formattedEndDate = endDate.toISOString().split('T')[0];
            rentalEndDate.value = formattedEndDate;
            
            // Generate 7-day schedule
            generateSevenDaySchedule(startDate);
            daysDisplay.style.display = 'block';
        } else {
            alert('Please select a start date first');
        }
    });
    
    // Function to generate 7-day schedule
    function generateSevenDaySchedule(startDate) {
        daysContainer.innerHTML = ''; // Clear previous content
        
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(currentDate.getDate() + i);
            
            // Get day name
            const dayName = dayNames[currentDate.getDay()];
            
            // Format date as MM/DD/YYYY
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const day = currentDate.getDate().toString().padStart(2, '0');
            const year = currentDate.getFullYear();
            const formattedDate = `${month}/${day}/${year}`;
            
            // Create day element
            const dayElement = document.createElement('div');
            dayElement.className = 'day-item';
            dayElement.innerHTML = `
                <span class="day-name">${dayName}</span>
                <span class="day-date">${formattedDate}</span>
            `;
            
            daysContainer.appendChild(dayElement);
        }
    }
});