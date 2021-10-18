//E: Un dato cualquiera
//S: Un booleano
//D: Determina si la fecha es una tupla ternaria de enteros positivos
function fecha_es_tupla(date) {
	// Primero es necesario saber si la variable ingresada es de tipo tuple
	if (Array.isArray(date)) {
		// Se necesita conocer si la tupla tiene 3 elementos, de lo contrario no es una fecha
		if (date.length == 3) {
			// si y solo si todos los elementos de la tupla son de tipo int
			if (
				Number.isInteger(date[0]) &&
				Number.isInteger(date[1]) &&
				Number.isInteger(date[2])
			) {
				// devuelve True si y solo si todos los números son positivos
				return date[0] >= 0 && date[1] >= 0 && date[2] >= 0;
			}
		}
	}
	// En caso de que no se "entre" a alguno de los if, la variable ingresada fecha no se considera tupla válida
	return false;
}

//E: Un año en el rango permitido
//S: Un booleano
//D: Determina si un año es bisiesto
function bisiesto(year) {
	//Si el año es divisible uniformemente entre 4 y no entre 100 es bisiesto
	if (year % 4 == 0 && year % 100 != 0) {
		return true;
	}
	//Si el año es divisible uniformemente entre 4 y entre 400 es bisiesto
	else if (year % 4 == 0 && year % 400 == 0) {
		return true;
	}
	//De lo contrario no es bisiesto
	else {
		return false;
	}
}

//E: Un año y un mes valido
//S: Un numero entero
//D: Determina la cantidad de dias de un mes segun el año
function dias_del_mes(year, month) {
	//Se define una lista con los dias de cada mes en base a si el año es bisiesto o no
	let monthDays;
	if (!bisiesto(year))
		monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	else monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	//Se retorna la posicion de la lista respectiva al mes
	return monthDays[month - 1];
}

//E: Una fecha
//S: Un booleano
//D: Determina si una fecha es valida en el calendario gregoriano
function fecha_es_valida(date) {
	//Si el año es menor a la entrada en vigencia del calendario
	if (date[0] < 1582) {
		//La fecha es invalida
		return false;
	}
	//Si es el primer año de vigencia pero el mes es menor a la entrada en vigencia
	if (date[0] == 1582 && date[1] < 10) {
		//La fecha es invalida
		return false;
	}
	//Si es el primer año y mes de vigencia pero el dia es menor a la entrada en vigencia
	if (date[0] == 1582 && date[1] == 10 && date[2] < 15) {
		//La fecha es invalida
		return false;
	}
	//Si el mes esta entre 1 y 12
	if (date[1] > 0 && date[1] <= 12) {
		//Se calcula la cantidad de dias que tiene el mes
		let monthDays = dias_del_mes(date[0], date[1]);
		//Si el dia esta entre 1 y la cantidad maxima de dias para su mes
		if (date[2] > 0 && date[2] <= monthDays) {
			//La fecha es valida
			return true;
		}
	}
	//Si alguna condicion no se cumple la fecha es invalida
	return false;
}

//E: Una fecha valida
//S: Una fecha valida
//D: Determina la fecha del dia siguiente
function dia_siguiente(date) {
	//Si es el ultimo dia del año retornar el primero de enero del siguiente año
	if (date[1] == 12 && date[2] == 31) {
		return [date[0] + 1, 1, 1];
	}
	//Se calcula la cantidad de dias que tiene el mes
	let monthDays = dias_del_mes(date[0], date[1]);
	//Si es el ultimo dia del mes retornar el primero del siguiente mes del mismo año
	if (date[2] == monthDays) {
		return [date[0], date[1] + 1, 1];
	}
	//Sino retornar el siguiente dia del mismo mes y año
	return [date[0], date[1], date[2] + 1];
}

//E: Una fecha valida
//S: Un numero entero
//D: Calcula la cantidad de días transcurridos desde el primero de enero en ese año
function dias_desde_primero_enero(date) {
	//Se define la cantidad de dias de cada mes en base a si el año es bisiesto o no
	let monthDays;
	if (!bisiesto(date[0]))
		monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	else monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	let days = 0;
	//Se suman los meses que están completos
	for (let i = 0; i < date[1] - 1; i++) {
		days += monthDays[i];
	}
	//Se suman los días faltantes menos 1, debido a que el primero de enero no cuenta
	days += date[2] - 1;
	return days;
}

//E: Un año en el rango permitido
//S: Un numero entero
//D: Calcula el dia de la semana al que corresponde el primero de enero de ese año
function dia_primero_enero(year) {
	// Fórmula basada en el algoritmo de Gauss que establece para el 1ro de enero de un año A:
	// R(1 + 5R(A-1, 4) + 4R(A-1, 100) + 6R(A-1, 400), 7) donde R(x, y) representa "x modulo y"
	return (
		(1 +
			5 * ((year - 1) % 4) +
			4 * ((year - 1) % 100) +
			6 * ((year - 1) % 400)) %
		7
	);
}

//E: Una fecha valida
//S: Un numero entero
//D: Calcula el dia de la semana al que corresponde la fecha ingresada
function dia_semana(date) {
	// Si la fecha se ubica en los primeros dos meses del año
	if (date[1] < 3) {
		// Mover el mes de Febrero al final del año previo
		date[1] += 12;
		date[0] -= 1;
	}
	// Formula basada en el algoritmo de la congruencia de Zeller para el calendario Gregoriano
	// Por cada año transcurrido el dia de la semana aumenta en 1, y en los bisiestos aumenta 2
	// Por cada dia transcurrido el dia de la semama aumenta en 1
	// Por cada 5 meses el dia de la semana aumenta en 13
	result =
		((date[2] +
			~~((13 * (date[1] + 1)) / 5) +
			date[0] +
			~~(date[0] / 4) -
			~~(date[0] / 100) +
			~~(date[0] / 400)) %
			7) -
		1;
	// Para compensar la resta de 1 al resultado que cambia el valor 0 de sabado a domingo
	if (result < 0) {
		// Cuando el resultado es -1 debe ser 6
		result = 6;
	}
	return result;
}
function imprimir_4x3(year){
    yearCalendar = calendario_del_año(year)
    console.log("Calendario del año " + year.toString() + " D.C")
    imprimirFila(0,yearCalendar.slice(0,3))
    console.log()
    imprimirFila(1,yearCalendar.slice(3,6))
	console.log()
    imprimirFila(2,yearCalendar.slice(6,9))
    console.log()
    imprimirFila(3,yearCalendar.slice(9,12))
}

function imprimirFila(initMonth, monthCalendars){
    let monthHeader = ["              Enero                          Febrero                          Marzo              ",
                   "              Abril                            Mayo                           Junio              ",
                   "              Julio                           Agosto                        Septiembre           ",
                   "             Octubre                        Noviembre                       Diciembre            "];
    console.log(monthHeader[initMonth])
    console.log("|   D   L   K   M   J   V   S   |   D   L   K   M   J   V   S   |   D   L   K   M   J   V   S   |");

 	let row = "|";
	let strDay = "";
	for (let i = 0; i < 6; i++) {
		for (const month of monthCalendars) {
			for (const day of month[i]) {
				if (day == -1) {
					strDay = " ";
				} else {
					strDay = day.toString();
				}
				if (strDay.length == 1) {
					row += "   " + strDay;
				} else {
					row += "  " + strDay;
				}
			}
			row += "   |";	
		}
		console.log(row);
		row = "|";
	}
}

function calendario_del_año(year){
    let leapYear = bisiesto(year);
    let stWeekDay = dia_primero_enero(year);
    let yearCalendar = []
    for (let month = 0; month < 12; month++){
        let monthCalendarInfo = calendario_del_mes(stWeekDay,month,leapYear);
        yearCalendar.push(monthCalendarInfo[0]); 
        stWeekDay = monthCalendarInfo[1];
	}
    return yearCalendar;
}

function calendario_del_mes(stWeekDay, month, leapYear){
    let monthCalendar = [[-1, -1, -1, -1, -1, -1, -1],
						[-1, -1, -1, -1, -1, -1, -1],
						[-1, -1, -1, -1, -1, -1, -1],
						[-1, -1, -1, -1, -1, -1, -1],
						[-1, -1, -1, -1, -1, -1, -1],
						[-1, -1, -1, -1, -1, -1, -1]];
	let monthDays = []
    if (leapYear == false){
        monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	}
	else{
        monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	}
    let currentWeek = 0
    for (let day = 1; day < monthDays[month]+1; day++){
        monthCalendar[currentWeek][stWeekDay] = day;
        stWeekDay = dia_semana_siguiente(stWeekDay);
        if (stWeekDay == 0){
            currentWeek += 1;
		}
	}
    return [monthCalendar, stWeekDay];
}

function dia_semana_siguiente(weekDay){
    if (weekDay + 1 == 7){
        return 0;
	}
    return weekDay + 1;
}



//E: Una fecha valida
//S: Una fecha valida
//D: Determina la fecha que está N días naturales en el futuro
function fecha_futura (date, days){
    //Calcula el dia siguiente N veces 
	for (let i = 0; i < days; i++) {
		date = dia_siguiente(date)
	}
    return date
}

//E: Una fecha valida
//S: Un valor booleano
//D: Determina si d1 es una fecha mayor que d2
function fechaMayor(date1,date2){
	//Se compara el año
    if (date1[0] > date2[0]){
        return True
	}
    if (date1[0] == date2[0]){
		//Si el año es igual, se compara el mes 
        if (date1[1] > date2[1]){
            return True
		}
        if (date1[1] == date2[1]){
			//Si el mes es igual, se compara el día
            if (date1[2] > date2[2]){
				return true
			}
		}
	}
    return false
}

//E: Una fecha valida
//S: Un numero entero
//D: Calcula la cantidad de días transcurridos desde la fecha 1 hasta la fecha 2, sin importar cual sea mayor
function dias_entre(date1, date2){
    //Se determina si la fecha 1 es mayor que la fecha 2 
    if (fechaMayor(date1, date2)){
        //Si es mayor se hace el cambio para ordenar las fehcas
        temp = date1
        date1 = date2
        date2 = temp
	}
    //Se inicializa la variable res es 0
    res = 0
    //En caso de que sean el mismo año
    if (date1[0] == date2[0]){
        res = dias_desde_primero_enero(date2) - dias_desde_primero_enero(date1)
	}
	//En caso de que sean años diferentes 
    else{
        //Se calcula la cantidad de dias de los años completos que hay entre las fechas
        for (let year = date1[0]+1; year < date2[0]; year++) {
            if (bisiesto(year))
                res += 366
            else
                res += 365
		}
        //Se suman los dias de la fecha 1
        if (bisiesto(date1[0]))
            res += 366-dias_desde_primero_enero(date1)
		else
            res += 365-dias_desde_primero_enero(date1)
        //Se suman los dias de la fecha 2
        res += dias_desde_primero_enero(date2)
	}
	return res
}


//Pruebas
console.log('---- Pruebas R0 ----');

console.log("---- Pruebas R0 ----");

//Ingresando dato de tipo string
console.log(fecha_es_tupla("HOLA"));
//Ingresando dato de tipo array (JS maneja tuplas como arrays)
console.log(fecha_es_tupla([1, 23, 442]));
//Ingresando tupla donde no todos los números son enteros positivos
console.log(fecha_es_tupla([1.23, 32, 323]));
//Ingresando tupla con más de 3 elementos
console.log(fecha_es_tupla([1.23, 32, 323, 323]));
//Ingresando una tupla que cumple con los requerimientos
console.log(fecha_es_tupla([2021, 9, 26]));

console.log("\n---- Pruebas R1 ----");

//Año no divisible entre 4
console.log(bisiesto(2019));
//Año divisible uniformemente entre 4 y no entre 100
console.log(bisiesto(2020));
//Año divisible uniformemente entre 4 y entre 400 es bisiesto
console.log(bisiesto(2000));
//Año divisible uniformemente entre 4 y entre 100 y no entre 400
console.log(bisiesto(1900));

console.log("\n---- Pruebas R2 ----");

//Caso con año menor a la entrada en vigencia
console.log(fecha_es_valida([1410, 5, 5]));
//Caso en primero año pero mes menor a la entrada en vigencia
console.log(fecha_es_valida([1582, 5, 5]));
//Caso en primer año y mes pero dia menor a la entrada en vigencia
console.log(fecha_es_valida([1582, 10, 5]));
//Caso del primer dia de entrada en vigencia
console.log(fecha_es_valida([1582, 10, 15]));
//Caso del 29 de Feb en año bisiesto
console.log(fecha_es_valida([2020, 2, 29]));
//Caso del 29 de Feb en año no bisiesto
console.log(fecha_es_valida([2019, 2, 29]));
//Caso con mes 0
console.log(fecha_es_valida([2020, 0, 5]));
//Caso con dia 0
console.log(fecha_es_valida([2020, 5, 0]));
//Caso con mes 13
console.log(fecha_es_valida([2020, 13, 5]));
//Caso con dia 31 en mes de 30 dias
console.log(fecha_es_valida([2020, 9, 31]));
//Caso con dia 32 en mes de 31 dias
console.log(fecha_es_valida([2020, 10, 32]));
//Caso de cualquier dia diferente a los anteriores
console.log(fecha_es_valida([2000, 5, 5]));

console.log("\n---- Pruebas R3 ----");

//Cambio de año
console.log(dia_siguiente([2020, 12, 31]));
//Cambio de mes en Feb de un año bisiesto
console.log(dia_siguiente([2020, 2, 29]));
//Cambio de mes en Feb de un año no bisiesto
console.log(dia_siguiente([2019, 2, 28]));
//Cambio de mes en un mes de 31 dias
console.log(dia_siguiente([2000, 9, 30]));
//Cambio de mes en un mes de 30 dias
console.log(dia_siguiente([2000, 10, 31]));
//Cambio de dia en cualquier caso diferente a los anteriores
console.log(dia_siguiente([2000, 5, 5]));

console.log("\n---- Pruebas R4 ----");

//Pimero de enero a primero de enero
console.log(dias_desde_primero_enero([2019, 1, 1]));
//Hasta el 4 de Marzo en año NO bisiesto
console.log(dias_desde_primero_enero([2019, 3, 4]));
//Hasta el 4 de Marzo en año bisiesto
console.log(dias_desde_primero_enero([2020, 3, 4]));
//Hasta el 31 de diciembre en año NO bisiesto
console.log(dias_desde_primero_enero([2019, 12, 31]));
//Hasta el 31 de diciembre en año bisiesto
console.log(dias_desde_primero_enero([2020, 12, 31]));

console.log("\n---- Pruebas R5 ----");

//Todos los años a ingresar son válidos
console.log("2006", dia_primero_enero(2006));
console.log("3520", dia_primero_enero(3520));
console.log("2020", dia_primero_enero(2020));
console.log("2021", dia_primero_enero(2021));
console.log("2022", dia_primero_enero(2022));
console.log("2023", dia_primero_enero(2023));
console.log("2024", dia_primero_enero(2024));
console.log("2025", dia_primero_enero(2025));
console.log("1697", dia_primero_enero(1697));
console.log("1583", dia_primero_enero(1583));
console.log("2119", dia_primero_enero(2119));

console.log("\n---- Pruebas R7 ----");

//24/7/2020 = viernes
console.log("24/7/2020", dia_semana([2020, 7, 24]));
//6/2/2018 = martes
console.log("6/2/2018", dia_semana([2018, 2, 6]));
//16/9/1754 = lunes
console.log("16/9/1754", dia_semana([1754, 9, 16]));
//20/12/1980 = sabado
console.log("20/12/1980", dia_semana([1980, 12, 20]));
//31/12/2030 = martes
console.log("31/12/2030", dia_semana([2030, 12, 31]));
//19/12/2080 = jueves
console.log("19/12/2080", dia_semana([2080, 12, 19]));
//29/2/2020 = sabado
console.log("29/2/2020", dia_semana([2020, 2, 29]));
//15/8/2010 = domingo
console.log("15/8/2010", dia_semana([2010, 8, 15]));

console.log('\n---- Pruebas R6 ----');

imprimir_4x3(2021)
console.log("")
imprimir_4x3(2000)
console.log("")
imprimir_4x3(2010)
console.log("")
imprimir_4x3(1945)
console.log("")
imprimir_4x3(2031)
console.log("")

console.log("\n---- Pruebas R8 ----")

//Caso 0 días 
console.log(fecha_futura([2019,1,1],0))
//Caso 15 días mismo año
console.log(fecha_futura([2019,1,1],15))
//Caso 15 días diferente año
console.log(fecha_futura([2019,12,20],15))
//Caso año bisiesto
console.log(fecha_futura([2020,2,28],1))
//Caso año no bisiesto 
console.log(fecha_futura([2019,2,28],1))
//Caso 1 año exacto 
console.log(fecha_futura([2018,1,1],365))
//Caso 1 año exacto bisiesto 
console.log(fecha_futura([2020,1,1],366))
//Caso 2 años exactos 
console.log(fecha_futura([2018,1,1],730))

console.log("\n---- Pruebas R9 ----")

//Caso 0 dias 
console.log(dias_entre([2019,1,1],[2019,1,1]))
//Caso 15 días mismo año
console.log(dias_entre([2019,1,1],[2019,1,16]))
//Caso 15 días diferente año
console.log(dias_entre([2019,12,20],[2020,1,4]))
//Caso año bisiesto
console.log(dias_entre([2020,2,28],[2020,2,29]))
//Caso año no bisiesto 
console.log(dias_entre([2019,2,28],[2019,3,1]))
//Caso 1 año exacto 
console.log(dias_entre([2018,1,1],[2019,1,1]))
//Caso 1 año exacto bisiesto 
console.log(dias_entre([2020,1,1],[2021,1,1]))
//Caso 2 años exactos 
console.log(dias_entre([2018,1,1],[2020,1,1]))