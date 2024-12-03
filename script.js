$(document).ready(function () {
  console.log("Ready!");

  const sidesOptions = {
    Mexican: ["Corn", "Beans", "Rice", "Churro"],
    Italian: ["Garlic Bread", "Salad", "Mozzarella Sticks", "Marinara Sauce"]
  };

  const foodOptions = {
    Mexican: ["Tacos", "Burritos", "Quesadillas"],
    Italian: ["Pizza", "Pasta", "Lasagna"]
  };

  // Handle change event for the food radio buttons
  $('input[name="food"]').on("change", function () {
    const selectedFood = $('input[name="food"]:checked').val();
    console.log("Selected Food Type: ", selectedFood);

    if (selectedFood) {
      // Update food options dropdown
      const options = foodOptions[selectedFood] || [];
      $("#inputFoodOption").empty().append("<option selected>Options</option>");
      options.forEach((option) => {
        $("#inputFoodOption").append(
          `<option value="${option}">${option}</option>`
        );
      });

      // Update sides checkboxes
      const sides = sidesOptions[selectedFood] || [];
      $("#sidesContainer").html(
        '<label class="form-label">Choose Sides</label><br>'
      );
      sides.forEach((side) => {
        $("#sidesContainer").append(`
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="side${side}" name="foodSides" value="${side}">
            <label class="form-check-label" for="side${side}">${side}</label>
          </div>
        `);
      });
    }
  });

  // Handle form submission
  $("#foodForm").on("submit", function (event) {
    event.preventDefault();

    const userName = $("#inputUserName").val().trim();
    const foodType = $('input[name="food"]:checked').val() || "Not selected";
    const foodOption =
      $("#inputFoodOption").val() !== "Options"
        ? $("#inputFoodOption").val()
        : "Not selected";
    const selectedSides = $('input[name="foodSides"]:checked')
      .map(function () {
        return this.value;
      })
      .get() || ["No sides selected"];

    const formData = {
      userName: userName || "Anonymous",
      foodType: foodType,
      foodOption: foodOption,
      sides: selectedSides
    };

    // Display the order summary
    $("#output").html(`
      <div class="card p-3 mt-4">
        <h4 class="text-primary">Order Summary</h4>
        <p><strong>Name:</strong> ${formData.userName}</p>
        <p><strong>Food Type:</strong> ${formData.foodType}</p>
        <p><strong>Food Option:</strong> ${formData.foodOption}</p>
        <p><strong>Sides:</strong> ${formData.sides.join(", ")}</p>
      </div>
    `);

    console.log(JSON.stringify(formData, null, 2));
  });

  // Reset form
  $("#resetButton").on("click", () => {
    $("form")[0].reset();
    $("#output").html("");
    $("#sidesContainer").html(
      '<label class="form-label">Choose Sides</label><br>'
    );
  });
});