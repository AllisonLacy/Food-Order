document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const output = document.getElementById('output');
  const resetButton = document.getElementById('resetButton');
  const sidesContainer = document.getElementById('sidesContainer');
  const foodOptionDropdown = document.getElementById('inputFoodOption');

  
  const sidesOptions = {
    Mexican: ['Corn', 'Beans', 'Rice', 'Churro'],
    Italian: ['Garlic Bread', 'Salad', 'Mozzarella Sticks', 'Marinara Sauce'],
  };

  
  const foodOptions = {
    Mexican: ['Tacos', 'Burritos', 'Quesadillas'],
    Italian: ['Pizza', 'Pasta', 'Lasagna'],
  };

 
  function updateFoodOptions(foodType) {
    foodOptionDropdown.innerHTML = `<option selected>Options</option>`; // Reset the dropdown
    const options = foodOptions[foodType] || []; // Get food options based on selected type

    options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;
      foodOptionDropdown.appendChild(optionElement); 
    });
  }


  function updateSides(foodType) {
    sidesContainer.innerHTML = `<label class="form-label">Choose Sides</label><br>`; // Clear existing checkboxes

    const sides = sidesOptions[foodType] || []; // Get sides based on selected food type
    sides.forEach(side => {
      const checkbox = `
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="side${side}" name="foodSides" value="${side}">
          <label class="form-check-label" for="side${side}">${side}</label>
        </div>
      `;
      sidesContainer.insertAdjacentHTML('beforeend', checkbox); // Add checkboxes dynamically
    });
  }

  
  const foodRadios = document.querySelectorAll('input[name="food"]');
  foodRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      const selectedFood = document.querySelector('input[name="food"]:checked')?.value; // Get the selected food type
      if (selectedFood) {
        updateFoodOptions(selectedFood); 
        updateSides(selectedFood); 
      }
    });
  });


  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

   
    const userName = document.getElementById('inputUserName').value.trim();
    const foodType = document.querySelector('input[name="food"]:checked')?.value || 'Not selected';
    const foodOption = foodOptionDropdown.value !== 'Options' ? foodOptionDropdown.value : 'Not selected';
    const selectedSides = Array.from(document.querySelectorAll('input[name="foodSides"]:checked'))
      .map(side => side.value); // Get selected sides

    const formData = {
      userName: userName || 'Anonymous',
      foodType: foodType,
      foodOption: foodOption,
      sides: selectedSides.length ? selectedSides : ['No sides selected'],
    };

    output.innerHTML = `
      <div class="card p-3 mt-4">
        <h4 class="text-primary">Order Summary</h4>
        <p><strong>Name:</strong> ${formData.userName}</p>
        <p><strong>Food Type:</strong> ${formData.foodType}</p>
        <p><strong>Food Option:</strong> ${formData.foodOption}</p>
        <p><strong>Sides:</strong> ${formData.sides.join(', ')}</p>
      </div>
    `;

    console.log(JSON.stringify(formData, null, 2));
  });

  resetButton.addEventListener('click', () => {
    form.reset(); 
    output.innerHTML = ''; 

    
    sidesContainer.innerHTML = `<label class="form-label">Choose Sides</label><br>`;
  });
});
