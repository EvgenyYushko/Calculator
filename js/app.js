(function calculator() {
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        //Объявляем глобальные пепременные и читаем узлы DOM
        let work = true;    
        let allValues = [];
        let allOperation = [];
        let lastOperation = false;
        let currentValue = '0';                
        let value_field = document.getElementById('main_value');
        
        //Вешаем обработчики
        document.getElementById('power').addEventListener('click', energy);
        for (let i = 0; i <= 9; i++) {
            let el = document.getElementById(`num${i}`);
            el.addEventListener('click', function() {changeValue(`${i}`);});
        }
        document.getElementById('point').addEventListener('click', checkPoint);
        document.getElementById('delete').addEventListener('click', deleteValue);
        document.getElementById('division').addEventListener('click', function() {operations('divs');});
        document.getElementById('pow').addEventListener('click', function() {operations('pow');});
        document.getElementById('square').addEventListener('click', square);
        document.getElementById('multiple').addEventListener('click', function() {operations('multiple');});
        document.getElementById('subtraction').addEventListener('click', function() {operations('substraction');});
        document.getElementById('addition').addEventListener('click', function() {operations('addition');});
        document.getElementById('result').addEventListener('click', rezult);

        //Квадратный корень
        function square() {
            if (!work) return;
            currentValue = Math.sqrt(currentValue).toFixed(1);
            showValue(currentValue);
        }

        //Рассчет и вывод результата
        function rezult() {
            let rez = 0.0;
            if (lastOperation) return;
            if (value_field.innerHTML.indexOf('.') != '-1') allValues.push(parseFloat(value_field.innerHTML));
            else allValues.push(parseInt(value_field.innerHTML));  

            for (let i = 0; i < allOperation.length; i++) {
                if (allOperation[i] == 'divs') {
                    if (i == 0) rez = allValues[0] / allValues[1];
                    else rez /= allValues[i + 1];
                }
                if (allOperation[i] == 'pow') {
                    if (i == 0) rez = Math.pow(allValues[0], allValues[1]);
                    else rez = Math.pow(rez, allValues[i + 1]);
                }
                if (allOperation[i] == 'multiple') {
                    if (i == 0) rez = allValues[0] * allValues[1];
                    else rez *= allValues[i + 1];
                }                                            
                if (allOperation[i] == 'substraction') {
                    if (i == 0) rez = allValues[0] - allValues[1];
                    else rez -= allValues[i + 1];                        
                }
                if (allOperation[i] == 'addition') {
                    if (i == 0) rez = allValues[0] + allValues[1];
                    else rez += allValues[i + 1];                        
                }
            }

            if ((rez ^ 0) !== rez) currentValue = (rez).toFixed(1);                
            else currentValue = Math.floor(rez);
            currentValue = currentValue.toString();
            allOperation.length = 0;
            allValues.length = 0;            
            lastOperation = false;
            showValue(currentValue);
        }

        //Запоминаем в массивы уже введенное числовое значение и операцию, которую необходимо с ним выполнить 
        function operations(val) {
            if (!work) return;
            if (lastOperation || currentValue == '0') return;
            lastOperation = true;
            if (value_field.innerHTML.indexOf('.') != '-1') allValues.push(parseFloat(value_field.innerHTML));
            else allValues.push(parseInt(value_field.innerHTML));            
            allOperation.push(val);
            currentValue = '0'; 
            showValue(currentValue);
        }

        //Удаляет последнее введенное число
        function deleteValue() {
            if (!work) return;
            if (currentValue == '0' || lastOperation) return;
            if (currentValue.length == 1) currentValue = '0';
            else currentValue = currentValue.substring(0, currentValue.length - 1);
            showValue(currentValue);
        }

        //Добавляет точку в вводимое значение
        function checkPoint() {
            if (!work) return;
            if (currentValue.indexOf('.') != -1) return;
            else changeValue('.');
        }

        //В зависимости от нажатой клавишы меняет текущее значение в поле ввода
        function changeValue(value) {
            if (!work) return;
            if (value_field.innerHTML.length == 12) return;
            if (currentValue == '0' && value != '.') currentValue = value;
            else currentValue += value;
            showValue(currentValue);
            lastOperation = false;
        }

        //Включает/выключает калькулятор
        function energy() {
            work = !work;
            currentValue = (work) ? '0' : '';            
            showValue(currentValue);
            allOperation.length = 0;
            allValues.length = 0;
        }
    
        //Вывод значения в окно калькулятора
        function showValue(value) {
            value_field.innerHTML = value;            
        }
    }    
})()