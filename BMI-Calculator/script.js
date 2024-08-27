$(document).ready(function() {
    $('#calculate').click(function() {
        // Get the values from the input fields
        var weight = $('#weight').val();
        var height = $('#height').val();

        // Validate input
        if (weight === '' || height === '') {
            alert('Please enter both weight and height.');
            return;
        }

        // Convert height to meters
        height = height / 100;

        // Calculate BMI
        var bmi = weight / (height * height);

        // Determine the BMI category and apply color coding
        var category = '';
        var categoryClass = '';

        if (bmi < 18.5) {
            category = 'Underweight';
            categoryClass = 'bmi-underweight';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            category = 'Normal weight';
            categoryClass = 'bmi-normal';
        } else if (bmi >= 25 && bmi < 29.9) {
            category = 'Overweight';
            categoryClass = 'bmi-overweight';
        } else {
            category = 'Obesity';
            categoryClass = 'bmi-overweight'; // Assuming same color for Obesity and Overweight
        }

        // Animate and display the BMI result with color coding
        $('#bmi-result').hide().text(bmi.toFixed(2)).fadeIn(1000);

        // Animate and display the BMI category with appropriate class
        $('#bmi-category').hide().text(category)
            .removeClass('bmi-normal bmi-overweight bmi-underweight')
            .addClass(categoryClass)
            .fadeIn(1000);
    });
});
