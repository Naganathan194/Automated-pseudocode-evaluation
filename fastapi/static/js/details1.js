

// // $(document).ready(function() {
// //     var current_fs, next_fs, previous_fs; // Fieldsets
// //     var opacity;

// //     // Next Button Click
// //     $(".next").click(function() {
// //         current_fs = $(this).parent();
// //         next_fs = $(this).parent().next();
    
// //         // Validation: Check if all required fields are filled
// //         var valid = true;
// //         current_fs.find("input[required], select[required]").each(function() {
// //             if ($(this).attr('type') === 'checkbox') {
// //                 // For checkboxes
// //                 if (!$(this).is(':checked')) {
// //                     $(this).css("outline", "2px solid red"); // Highlight if not checked
// //                     valid = false;
// //                 } else {
// //                     $(this).css("outline", ""); // Reset if checked
// //                 }
// //             } else if ($(this).is('input[type="text"]')) {
// //                 // For text inputs
// //                 if ($(this).val() === "") {
// //                     $(this).css("border", "2px solid red"); // Highlight if empty
// //                     valid = false;
// //                 } else {
// //                     $(this).css("border", ""); // Reset if filled
// //                 }
// //             } else if ($(this).is('select')) {
// //                 // For select inputs
// //                 if ($(this).val() === "" || $(this).val() === null) {
// //                     $(this).css("border", "2px solid red"); // Highlight if no option selected
// //                     valid = false;
// //                 } else {
// //                     $(this).css("border", ""); // Reset if option selected
// //                 }
// //             }
// //         });
    
// //         if (!valid) {
// //             return false; // Prevent moving to next step if validation fails
// //         }
    
// //         // Activate Next Step in Progress Bar
// //         $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    
// //         // Show Next Fieldset
// //         next_fs.show();
    
// //         // Hide Current Fieldset with Animation
// //         current_fs.animate({ opacity: 0 }, {
// //             step: function(now) {
// //                 opacity = 1 - now;
// //                 current_fs.css({
// //                     'display': 'none',
// //                     'position': 'relative'
// //                 });
// //                 next_fs.css({ 'opacity': opacity });
// //             },
// //             duration: 600
// //         });
// //     });
  
// //     // Previous Button Click
// //     $(".previous").click(function() {
// //         current_fs = $(this).parent();
// //         previous_fs = $(this).parent().prev();
    
// //         // Deactivate Current Step in Progress Bar
// //         $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
    
// //         // Show Previous Fieldset
// //         previous_fs.show();
    
// //         // Hide Current Fieldset with Animation
// //         current_fs.animate({ opacity: 0 }, {
// //             step: function(now) {
// //                 opacity = 1 - now;
// //                 current_fs.css({
// //                     'display': 'none',
// //                     'position': 'relative'
// //                 });
// //                 previous_fs.css({ 'opacity': opacity });
// //             },
// //             duration: 600
// //         });
// //     });

// //     // Acknowledgment Checkbox Change Event
// //     $("#acknowledge").change(function() {
// //         var submitButton = $("#submitButton");
// //         if ($(this).is(':checked')) {
// //             submitButton.removeClass('disabled');
// //             submitButton.removeAttr('aria-disabled');
// //             submitButton.removeAttr('tabindex'); // Make the button focusable
// //         } else {
// //             submitButton.addClass('disabled');
// //             submitButton.attr('aria-disabled', 'true');
// //             submitButton.attr('tabindex', '-1'); // Make the button not focusable
// //         }
// //     });

// //     // Initial call to set the correct state of the submit button
// //     $("#acknowledge").trigger('change');
// // });



// $(document).ready(function() {
//     var current_fs, next_fs, previous_fs; // Fieldsets
//     var opacity;

//     // Function to validate required fields
//     function validateFields(fieldset) {
//         var valid = true;
//         fieldset.find("input[required], select[required]").each(function() {
//             if ($(this).attr('type') === 'checkbox') {
//                 // For checkboxes
//                 if (!$(this).is(':checked')) {
//                     $(this).css("outline", "2px solid red"); // Highlight if not checked
//                     valid = false;
//                 } else {
//                     $(this).css("outline", ""); // Reset if checked
//                 }
//             } else if ($(this).is('input[type="text"], input[type="tel"], input[type="email"]')) {
//                 // For text, email, and tel inputs
//                 if ($(this).val() === "") {
//                     $(this).css("border", "2px solid red"); // Highlight if empty
//                     valid = false;
//                 } else {
//                     $(this).css("border", ""); // Reset if filled
//                 }
//                 // Additional validation for email and tel inputs
//                 if ($(this).attr('type') === 'email' && !validateEmail($(this).val())) {
//                     $(this).css("border", "2px solid red"); // Highlight if email is invalid
//                     valid = false;
//                 }
//                 if ($(this).attr('type') === 'tel' && !validateTel($(this).val())) {
//                     $(this).css("border", "2px solid red"); // Highlight if tel is invalid
//                     valid = false;
//                 }
//             } else if ($(this).is('select')) {
//                 // For select inputs
//                 if ($(this).val() === "" || $(this).val() === null) {
//                     $(this).css("border", "2px solid red"); // Highlight if no option selected
//                     valid = false;
//                 } else {
//                     $(this).css("border", ""); // Reset if option selected
//                 }
//             }
//         });
//         return valid;
//     }

//     // Validate email format
//     function validateEmail(email) {
//         var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailPattern.test(email);
//     }

//     // Validate phone number format (basic validation)
//     function validateTel(tel) {
//         var telPattern = /^[0-9]{10}$/; // Assuming 10-digit phone number
//         return telPattern.test(tel);
//     }

//     // Next Button Click
//     $(".next").click(function() {
//         current_fs = $(this).parent();
//         next_fs = $(this).parent().next();

//         // Validate fields in current fieldset
//         var valid = validateFields(current_fs);

//         if (!valid) {
//             return false; // Prevent moving to next step if validation fails
//         }

//         // Activate Next Step in Progress Bar
//         $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

//         // Show Next Fieldset
//         next_fs.show();

//         // Hide Current Fieldset with Animation
//         current_fs.animate({ opacity: 0 }, {
//             step: function(now) {
//                 opacity = 1 - now;
//                 current_fs.css({
//                     'display': 'none',
//                     'position': 'relative'
//                 });
//                 next_fs.css({ 'opacity': opacity });
//             },
//             duration: 600
//         });
//     });
  
//     // Previous Button Click
//     $(".previous").click(function() {
//         current_fs = $(this).parent();
//         previous_fs = $(this).parent().prev();

//         // Deactivate Current Step in Progress Bar
//         $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

//         // Show Previous Fieldset
//         previous_fs.show();

//         // Hide Current Fieldset with Animation
//         current_fs.animate({ opacity: 0 }, {
//             step: function(now) {
//                 opacity = 1 - now;
//                 current_fs.css({
//                     'display': 'none',
//                     'position': 'relative'
//                 });
//                 previous_fs.css({ 'opacity': opacity });
//             },
//             duration: 600
//         });
//     });

//     // Acknowledgment Checkbox Change Event
//     $("#acknowledge").change(function() {
//         var submitButton = $("#submitButton");
//         if ($(this).is(':checked')) {
//             submitButton.removeClass('disabled');
//             submitButton.removeAttr('aria-disabled');
//             submitButton.removeAttr('tabindex'); // Make the button focusable
//         } else {
//             submitButton.addClass('disabled');
//             submitButton.attr('aria-disabled', 'true');
//             submitButton.attr('tabindex', '-1'); // Make the button not focusable
//         }
//     });

//     // Initial call to set the correct state of the submit button
//     $("#acknowledge").trigger('change');
// });
// $("#submitButton").click(function(event) {
//     event.preventDefault(); // Prevent default link behavior

//     var formData = {
//         Name: $("input[name='Name']").val(),
//         email: $("input[name='email']").val(),
//         MobNo: $("input[name='MobNo']").val(),
//         RegNo: $("input[name='RegNo']").val(),
//         year: $("#year").val(),
//         Branch: $("#Branch").val(),
//         Sec: $("#Sec").val()
//     };

//     $("#submitButton").click(function(event) {
//         event.preventDefault(); // Prevent default link behavior

//         var formData = {
//             Name: $("input[name='Name']").val(),
//             email: $("input[name='email']").val(),
//             MobNo: $("input[name='MobNo']").val(),
//             RegNo: $("input[name='RegNo']").val(),
//             year: $("#year").val(),
//             Branch: $("#Branch").val(),
//             Sec: $("#Sec").val()
//         };

//         $.ajax({
//             url: 'http://localhost:8000/submit',
//             type: 'POST',
//             contentType: 'application/json',
//             data: JSON.stringify(formData),
//             success: function(response) {
//                 alert("Form submitted successfully!");
//                 console.log(response);
//                 window.location.href = "./pseudo.html"; // Redirect after successful submission
//             },
//             error: function(xhr, status, error) {
//                 alert("Error submitting form!");
//                 console.error("Status:", status);
//                 console.error("Error:", error);
//                 console.error("Response:", xhr.responseText);
//             }
//         });
//     });
// });

//---------------------------------------------------------------

// $(document).ready(function() {
//     var current_fs, next_fs, previous_fs; // Fieldsets
//     var opacity;

//     // Function to validate required fields
//     function validateFields(fieldset) {
//         var valid = true;
//         fieldset.find("input[required], select[required]").each(function() {
//             if ($(this).attr('type') === 'checkbox') {
//                 // For checkboxes
//                 if (!$(this).is(':checked')) {
//                     $(this).css("outline", "2px solid red"); // Highlight if not checked
//                     valid = false;
//                 } else {
//                     $(this).css("outline", ""); // Reset if checked
//                 }
//             } else if ($(this).is('input[type="text"], input[type="tel"], input[type="email"]')) {
//                 // For text, email, and tel inputs
//                 if ($(this).val() === "") {
//                     $(this).css("border", "2px solid red"); // Highlight if empty
//                     valid = false;
//                 } else {
//                     $(this).css("border", ""); // Reset if filled
//                 }
//                 // Additional validation for email and tel inputs
//                 if ($(this).attr('type') === 'email' && !validateEmail($(this).val())) {
//                     $(this).css("border", "2px solid red"); // Highlight if email is invalid
//                     valid = false;
//                 }
//                 if ($(this).attr('type') === 'tel' && !validateTel($(this).val())) {
//                     $(this).css("border", "2px solid red"); // Highlight if tel is invalid
//                     valid = false;
//                 }
//             } else if ($(this).is('select')) {
//                 // For select inputs
//                 if ($(this).val() === "" || $(this).val() === null) {
//                     $(this).css("border", "2px solid red"); // Highlight if no option selected
//                     valid = false;
//                 } else {
//                     $(this).css("border", ""); // Reset if option selected
//                 }
//             }
//         });
//         return valid;
//     }

//     // Validate email format
//     function validateEmail(email) {
//         var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailPattern.test(email);
//     }

//     // Validate phone number format (basic validation)
//     function validateTel(tel) {
//         var telPattern = /^[0-9]{10}$/; // Assuming 10-digit phone number
//         return telPattern.test(tel);
//     }

//     // Next Button Click
//     $(".next").click(function() {
//         current_fs = $(this).parent();
//         next_fs = $(this).parent().next();

//         // Validate fields in current fieldset
//         var valid = validateFields(current_fs);

//         if (!valid) {
//             return false; // Prevent moving to next step if validation fails
//         }

//         // Activate Next Step in Progress Bar
//         $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

//         // Show Next Fieldset
//         next_fs.show();

//         // Hide Current Fieldset with Animation
//         current_fs.animate({ opacity: 0 }, {
//             step: function(now) {
//                 opacity = 1 - now;
//                 current_fs.css({
//                     'display': 'none',
//                     'position': 'relative'
//                 });
//                 next_fs.css({ 'opacity': opacity });
//             },
//             duration: 600
//         });
//     });
  
//     // Previous Button Click
//     $(".previous").click(function() {
//         current_fs = $(this).parent();
//         previous_fs = $(this).parent().prev();

//         // Deactivate Current Step in Progress Bar
//         $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

//         // Show Previous Fieldset
//         previous_fs.show();

//         // Hide Current Fieldset with Animation
//         current_fs.animate({ opacity: 0 }, {
//             step: function(now) {
//                 opacity = 1 - now;
//                 current_fs.css({
//                     'display': 'none',
//                     'position': 'relative'
//                 });
//                 previous_fs.css({ 'opacity': opacity });
//             },
//             duration: 600
//         });
//     });

//     // Acknowledgment Checkbox Change Event
//     $("#acknowledge").change(function() {
//         var submitButton = $("#submitButton");
//         if ($(this).is(':checked')) {
//             submitButton.removeClass('disabled');
//             submitButton.removeAttr('aria-disabled');
//             submitButton.removeAttr('tabindex'); // Make the button focusable
//         } else {
//             submitButton.addClass('disabled');
//             submitButton.attr('aria-disabled', 'true');
//             submitButton.attr('tabindex', '-1'); // Make the button not focusable
//         }
//     });

//     // Initial call to set the correct state of the submit button
//     $("#acknowledge").trigger('change');

//     // Submit Button Click
//     $("#submitButton").click(function(event) {
//         event.preventDefault(); // Prevent default link behavior

//         var formData = {
//             Name: $("input[name='Name']").val(),
//             email: $("input[name='email']").val(),
//             MobNo: $("input[name='MobNo']").val(),
//             RegNo: $("input[name='RegNo']").val(),
//             year: $("#year").val(),
//             Branch: $("#Branch").val(),
//             Sec: $("#Sec").val()
//         };

//         // Store the form data in local storage
//         localStorage.setItem('formData', JSON.stringify(formData));

//         $.ajax({
//             url: 'http://localhost:8000/submit',
//             type: 'POST',
//             contentType: 'application/json',
//             data: JSON.stringify(formData),
//             success: function(response) {
//                 alert("Form submitted successfully!");
//                 console.log(response);
//                 window.location.href = "./pseudo.html"; // Redirect after successful submission
//             },
//             error: function(xhr, status, error) {
//                 alert("Error submitting form!");
//                 console.error("Status:", status);
//                 console.error("Error:", error);
//                 console.error("Response:", xhr.responseText);
//             }
//         });
//     });

//     // Retrieve data from localStorage if available and populate fields
//     var storedData = localStorage.getItem('formData');
//     if (storedData) {
//         var formData = JSON.parse(storedData);
//         $("input[name='Name']").val(formData.Name);
//         $("input[name='email']").val(formData.email);
//         $("input[name='MobNo']").val(formData.MobNo);
//         $("input[name='RegNo']").val(formData.RegNo);
//         $("#year").val(formData.year);
//         $("#Branch").val(formData.Branch);
//         $("#Sec").val(formData.Sec);
//     }
// });

//--------------------------------------------------------------------------------------------------------

$(document).ready(function() {
    var current_fs, next_fs, previous_fs; // Fieldsets
    var opacity;

    // Function to validate required fields
    function validateFields(fieldset) {
        var valid = true;
        fieldset.find("input[required], select[required]").each(function() {
            if ($(this).attr('type') === 'checkbox') {
                // For checkboxes
                if (!$(this).is(':checked')) {
                    $(this).css("outline", "2px solid red"); // Highlight if not checked
                    valid = false;
                } else {
                    $(this).css("outline", ""); // Reset if checked
                }
            } else if ($(this).is('input[type="text"], input[type="tel"], input[type="email"]')) {
                // For text, email, and tel inputs
                if ($(this).val() === "") {
                    $(this).css("border", "2px solid red"); // Highlight if empty
                    valid = false;
                } else {
                    $(this).css("border", ""); // Reset if filled
                }
                // Additional validation for email and tel inputs
                if ($(this).attr('type') === 'email' && !validateEmail($(this).val())) {
                    $(this).css("border", "2px solid red"); // Highlight if email is invalid
                    valid = false;
                }
                if ($(this).attr('type') === 'tel' && !validateTel($(this).val())) {
                    $(this).css("border", "2px solid red"); // Highlight if tel is invalid
                    valid = false;
                }
            } else if ($(this).is('select')) {
                // For select inputs
                if ($(this).val() === "" || $(this).val() === null) {
                    $(this).css("border", "2px solid red"); // Highlight if no option selected
                    valid = false;
                } else {
                    $(this).css("border", ""); // Reset if option selected
                }
            }
        });
        return valid;
    }

    // Validate email format
    function validateEmail(email) {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Validate phone number format (basic validation)
    function validateTel(tel) {
        var telPattern = /^[0-9]{10}$/; // Assuming 10-digit phone number
        return telPattern.test(tel);
    }

    // Next Button Click
    $(".next").click(function() {
        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        // Validate fields in current fieldset
        var valid = validateFields(current_fs);

        if (!valid) {
            return false; // Prevent moving to next step if validation fails
        }

        // Activate Next Step in Progress Bar
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        // Show Next Fieldset
        next_fs.show();

        // Hide Current Fieldset with Animation
        current_fs.animate({ opacity: 0 }, {
            step: function(now) {
                opacity = 1 - now;
                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                next_fs.css({ 'opacity': opacity });
            },
            duration: 600
        });
    });
  
    // Previous Button Click
    $(".previous").click(function() {
        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        // Deactivate Current Step in Progress Bar
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        // Show Previous Fieldset
        previous_fs.show();

        // Hide Current Fieldset with Animation
        current_fs.animate({ opacity: 0 }, {
            step: function(now) {
                opacity = 1 - now;
                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                previous_fs.css({ 'opacity': opacity });
            },
            duration: 600
        });
    });

    // Acknowledgment Checkbox Change Event
    $("#acknowledge").change(function() {
        var submitButton = $("#submitButton");
        if ($(this).is(':checked')) {
            submitButton.removeClass('disabled');
            submitButton.removeAttr('aria-disabled');
            submitButton.removeAttr('tabindex'); // Make the button focusable
        } else {
            submitButton.addClass('disabled');
            submitButton.attr('aria-disabled', 'true');
            submitButton.attr('tabindex', '-1'); // Make the button not focusable
        }
    });

    // Initial call to set the correct state of the submit button
    $("#acknowledge").trigger('change');

    // Submit Button Click
    $("#submitButton").click(function(event) {
        event.preventDefault(); // Prevent default link behavior

        var formData = {
            Name: $("input[name='Name']").val(),
            email: $("input[name='email']").val(),
            MobNo: $("input[name='MobNo']").val(),
            RegNo: $("input[name='RegNo']").val(),
            year: $("#year").val(),
            Branch: $("#Branch").val(),
            Sec: $("#Sec").val()
        };

        // Store the form data in local storage
        localStorage.setItem('formData', JSON.stringify(formData));
        localStorage.setItem('register_no', formData.RegNo); // Store register_no in localStorage

        $.ajax({
            url: 'https://172.16.172.168:8000/submit',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                alert("Form submitted successfully!");
                console.log(response);
                window.location.href = "/pseudo"; // Redirect after successful submission
            },
            error: function(xhr, status, error) {
                alert("Error submitting form!");
                console.error("Status:", status);
                console.error("Error:", error);
                console.error("Response:", xhr.responseText);
            }
        });
    });
    

    // Retrieve data from localStorage if available and populate fields
    var storedData = localStorage.getItem('formData');
    if (storedData) {
        var formData = JSON.parse(storedData);
        $("input[name='Name']").val(formData.Name);
        $("input[name='email']").val(formData.email);
        $("input[name='MobNo']").val(formData.MobNo);
        $("input[name='RegNo']").val(formData.RegNo);
        $("#year").val(formData.year);
        $("#Branch").val(formData.Branch);
        $("#Sec").val(formData.Sec);
    }
});