# Form to JSON jQuery Plugin
A jQuery plugin converts the data submitted by a form into a JSON data.

# Usage

Include the files before your HTML `<body/>` tag:
```
<script src="./includes/js/jquery-3.5.1.min.js"></script>
<script src="./includes/js/form-to-json-v1.0.0.js"></script>
<script src="./includes/js/script.js"></script>
```

Replace `script.js` with your own script file.

Add this line into your `script.js` file:
```
$('#myForm').formToJson('.result-json-output');
```
Here `#myForm` is the form `id` and `.result-json-output` is the output container.