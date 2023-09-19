"use strict";

$(document).ready(() => {
	// Email pattern for validation rules
	const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;

	// Phone number pattern for validation (format: 999-999-9999)
	const phonePattern = /^\d{3}-\d{3}-\d{4}$/;

	// Function to validate a field and display an error message if needed
	function validateField(input, pattern, errorMessage) {
		const value = input.val().trim();
		const nextElement = input.next();

		if (!value) {
			nextElement.text("This field is required.");
			return false;
		}

		if (pattern && !pattern.test(value)) {
			nextElement.text(errorMessage);
			return false;
		}

		nextElement.text("");
		return true;
	}

	// Step 1: Move focus to the "Pickup Date" text box
	$('#pickup_date').focus();

	// Event handler for form submission
	$('#reservation_form').submit(event => {
		// Get the form elements in respective variables
		const pickupDateInput = $('#pickup_date');
		const daysInput = $('#days');
		const nameInput = $('#name');
		const emailInput = $('#email');
		const phoneInput = $('#phone');

		// Validate each field
		const isValidPickupDate = validateField(pickupDateInput, null, null);
		const isValidDays = validateField(daysInput, /^\d+$/, "Must be numeric.");
		const isValidName = validateField(nameInput, null, null);
		const isValidEmail = validateField(emailInput, emailPattern, "Must be a valid email address.");
		const isValidPhone = validateField(phoneInput, phonePattern, "Must be a valid phone number (format: 999-999-9999).");

		// Check if any field is invalid
		if (!isValidPickupDate || !isValidDays || !isValidName || !isValidEmail || !isValidPhone) {
			// Prevent form submission
			event.preventDefault();
			Swal.fire({
				icon: "warning",
				title: "Please check the form details properly.",
			});
		}
	});
});