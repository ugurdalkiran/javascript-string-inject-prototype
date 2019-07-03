String.prototype.inject = function(variables){

	let string = this;

	let result = string.match(/{{(.*?)}}/gi);

	if ( result === null || variables === undefined ) return string;

	result.forEach((template) => {

		let temp = template;

		if ( template.indexOf('(') !== -1 && template.indexOf(')') !== -1 ){

			let funcName = template.split('(');
			funcName = funcName[0].replace(/{{/gi, '');
			funcName = funcName.replace(/}}/gi, '');
			funcName = funcName.trim();

			let result = template.match(/(\(.*?)\)/gi);

			result.forEach((templateFunc) => {

				templateFunc = templateFunc.replace(/\(/gi, '');
				templateFunc = templateFunc.replace(/\)/gi, '');

				let templateFuncSplit = templateFunc.split(',');

				templateFuncSplit.forEach((word) => {

					word = word.trim();

					templateFunc = templateFunc.replace(word, variables[word]);

				});

				let numbers = templateFunc.split(',').map(item => parseInt(item));

				template = template.replace(temp, variables[funcName](...numbers));

			});

		}else{

			let result = template.match(/\b(\w*.\w*)\b/gi);

			result.forEach((word) => {

				template = template.replace(word, variables[word]);

			});

		}

		string = string.replace(temp, template);

	});

	let evalResult = string.match(/{{(.*?)}}/gi);

	evalResult.forEach((item) => {

		let result = item;

		if ( item.indexOf('+') !== -1 || item.indexOf('-') !== -1 || item.indexOf('*') !== -1 || item.indexOf('/') !== -1 ){

			result = eval(item).toString();

		}

		result = result.replace(/{{/gi, '');
		result = result.replace(/}}/gi, '');
		result = result.replace(/\s\s+/gi, ' ');
		result = result.trim();

		string = string.replace(item, result);

	});

	return string;

}

'Merhaba {{ name }}'.inject({ name: 'Yusuf' });
'Google için url: <a href="{{ url }}>{{ title }}</a>'.inject({ url:'google.com', title: 'Google' });
'Toplam: {{ cost + profit }}'.inject({ cost: 10, profit: 3 });
'İsim: {{ firstName }}, Soyisim: {{ lastName }}'.inject({ firstName: 'Yusuf', lastName: 'Oğuz' });
'Toplam: {{ a }} + {{ b }}'.inject({ a: 1, b: 2 });
'Toplam: {{ a }} + {{ b }} = {{ sum(a, b) }}'.inject({ a: 1, b: 2, sum: (a, b) => a + b });
'Çarpım: {{ num1 }} * {{ num2 }} = {{ carpim(num1, num2) }}'.inject({ num1: 5, num2: 6, carpim: (num1, num2) => num1 * num2 });