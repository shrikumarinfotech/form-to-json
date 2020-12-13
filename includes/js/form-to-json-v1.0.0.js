/**
 * Name: Form to JSON
 * Description: Create JSON object from a form submission using jQuery
 * Version: 1.0.0
 * Author: Shrikumar Infotech
 * Author URI: dev@shrikumarinfotech.com
 * License: MIT
 * Lincense URI: https://opensource.org/licenses/MIT
 */

'use strict';

jQuery(function( $ ){
    // plugin function
    $.fn.formToJson = function( resultContainer ){
        // console.log('this is from plugin');

        // define form
        const form = this;
        // define display target from parameter
        // if(resultContainer != undefined){
        //     const displayResultTarget = resultContainer;
        // }
        // console.log(resultContainer);

        // define submitted data
        let submittedData = [];

        // define form data structure
        let formData = {
            id: Number,
            firstname: String,
            lastname: String,
            email: String,
            phone: Number,
            subject: String,
            comments: String,
            createdDate: String
        };
        // define json data for output
        let jsonOutputData = Object.create(formData);

        // form submission function
        $(form).submit(function( event ){
            event.preventDefault();

            // console.log($(form).serialize());
            // run sort data function
            sortData( $(form).serialize() );

            // run json data function
            jsonData();

            // display json data
            outputData();

            // reset data
            resetData();

        });

        // sort data function
        function sortData( data ){
            // sanity check
            if(data != undefined){
                // regular expessions
                const regxSpace = /(?:%20)/gi;
                const regxEmail = /(?:%40)/gi;
                const regxLineBreak = /(?:%0D%0A)/gi;
                // save data by replacing with regx and split with '&' as parts
                let sortedData = data.replace(regxSpace, ' ').replace(regxEmail, '@').replace(regxLineBreak, '\n').split('&');
                // iterate through sortedData and save as array into submittedData
                $(sortedData).each(function(index, element){
                    submittedData.push(element.split('='));
                });

                // console.log(submittedData);
            }
        };

        // json data function
        function jsonData(){
            // sanity check
            if(submittedData != undefined || submittedData != null){
                // create JSON data
                $(submittedData).promise().done(function(){
                    // save json data
                    jsonOutputData.id = Math.random();
                    jsonOutputData.firstname = submittedData[0][1];
                    jsonOutputData.lastname = submittedData[1][1];
                    jsonOutputData.email = submittedData[2][1];
                    jsonOutputData.phone = submittedData[3][1];
                    jsonOutputData.subject = submittedData[4][1];
                    jsonOutputData.comments = submittedData[5][1],
                    jsonOutputData.createdDate = Date.now()
                });
            }
        };

        // output data
        function outputData(){
            // stingify jsonOutputData for output
            let stringifyJsonData = JSON.stringify(jsonOutputData);

            // check if output target is provided
            if(resultContainer !== undefined || resultContainer !== null){
                $(jsonOutputData).promise().done(function(){
                    $(resultContainer).html( stringifyJsonData );
                    // return stringifyJsonData;
                    console.log(stringifyJsonData); // log the JSON data
                });
            }
            else{
                // else just return the JSON data
                console.log('resultContainer undefined');
                return stringifyJsonData;
            }
        }

        // reset data
        function resetData(){
            // reset all data
            submittedData = [];
            jsonOutputData = {};
        }
        
    }
}(jQuery));