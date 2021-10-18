import math

#E: Un dato cualquiera
#S: Un booleano
#D: Determina si la fecha es una tupla ternaria de enteros positivos
def fecha_es_tupla(date):
    # Primero es necesario saber si la variable ingresada es de tipo tuple
    if type(date) == tuple:
        # Se necesita conocer si la tupla tiene 3 elementos, de lo contrario no es una fecha
        if(len(date) == 3):
            # Devuelve True si y solo si todos los elementos de la tupla son de tipo int
            if type(date[0]) == int and type(date[1]) == int and type(date[2]) == int:
                # devuelve True si y solo si todos los números son positivos
                return date[0] >= 0 and date[1] >= 0 and date[2] >= 0
    # En caso de que no se "entre" a alguno de los if, la variable ingresada fecha no se considera tupla válida
    return False

#E: Un año en el rango permitido
#S: Un booleano
#D: Determina si un año es bisiesto
def bisiesto(year):
    #Si el año es divisible uniformemente entre 4 y no entre 100 es bisiesto
    if (year%4 == 0 and year%100 != 0):
        return True
    #Si el año es divisible uniformemente entre 4 y entre 400 es bisiesto
    elif(year%4 == 0 and year%400 == 0):
        return True
    #De lo contrario no es bisiesto
    else:
        return False
    
#E: Un año y un mes valido
#S: Un numero entero
#D: Determina la cantidad de dias de un mes segun el año
def dias_del_mes(year, month):
    #Se define una lista con los dias de cada mes en base a si el año es bisiesto o no
    if not bisiesto(year):
        monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    else:
        monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    #Se retorna la posicion de la lista respectiva al mes
    return monthDays[month-1]
    
#E: Una fecha
#S: Un booleano
#D: Determina si una fecha es valida en el calendario gregoriano
def fecha_es_valida(date):
    #Si el año es menor a la entrada en vigencia del calendario
    if date[0] < 1582:
        #La fecha es invalida
        return False
    #Si es el primer año de vigencia pero el mes es menor a la entrada en vigencia
    if date[0] == 1582 and date[1] < 10:
        #La fecha es invalida
        return False
    #Si es el primer año y mes de vigencia pero el dia es menor a la entrada en vigencia
    if date[0] == 1582 and date[1] == 10 and date[2] < 15:
        #La fecha es invalida
        return False
    #Si el mes esta entre 1 y 12
    if date[1] > 0 and date[1] <= 12:
        #Se calcula la cantidad de dias que tiene el mes
        monthDays = dias_del_mes(date[0], date[1])
        #Si el dia esta entre 1 y la cantidad maxima de dias para su mes
        if date[2] > 0 and date[2] <= monthDays:
            #La fecha es valida
            return True
    #Si alguna condicion no se cumple la fecha es invalida
    return False

#E: Una fecha valida
#S: Una fecha valida
#D: Determina la fecha del dia siguiente
def dia_siguiente(date):
    #Si es el ultimo dia del año retornar el primero de enero del siguiente año
    if date[1] == 12 and date[2] == 31:
        return (date[0]+1, 1, 1)
    #Se calcula la cantidad de dias que tiene el mes
    monthDays = dias_del_mes(date[0], date[1])
    #Si es el ultimo dia del mes retornar el primero del siguiente mes del mismo año
    if date[2] == monthDays:
        return (date[0], date[1]+1, 1)
    #Sino retornar el siguiente dia del mismo mes y año
    return (date[0], date[1], date[2]+1)

#E: Una fecha valida
#S: Un numero entero
#D: Calcula la cantidad de días transcurridos desde el primero de enero en ese año
def dias_desde_primero_enero(date):
    #Se define la cantidad de dias de cada mes en base a si el año es bisiesto o no
    if not bisiesto(date[0]):
        monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    else:
        monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    days = 0
    #Se suman los meses que están completos 
    for i in range(0,date[1]-1):
        days += monthDays[i]
    #Se suman los días faltantes menos 1, debido a que el primero de enero no cuenta
    days += date[2]-1
    return days   

#E: Un año en el rango permitido
#S: Un numero entero
#D: Calcula el dia de la semana al que corresponde el primero de enero de ese año
def dia_primero_enero(year):
    # Se retorna el resultado de la siguiente fórmula para calcular 
    # el dia de la semana del 1ro de enero del añor ingresado
    # Fórmula basada en el algoritmo de Gauss que establece para el 1ro de enero de un año A:
    # R(1 + 5R(A-1, 4) + 4R(A-1, 100) + 6R(A-1, 400), 7) donde R(x, y) representa "x modulo y"
    return (1 + 5 * ((year-1)%4) + 4 *((year-1)%100) + 6 * ((year-1)%400))%7


#E: Un año en el rango permitido
#S: Ninguna - Solo imprime
#D: Imprime en consola el calendario de un año en formato de 4 filas de 3 meses cada una
def imprimir_4x3(year):
    yearCalendar = calendario_del_año(year)
    print("Calendario del año " + str(year) + " D.C")
    imprimirFila(0,yearCalendar[0:3])
    print()
    imprimirFila(1,yearCalendar[3:6])
    print()
    imprimirFila(2,yearCalendar[6:9])
    print()
    imprimirFila(3,yearCalendar[9:12])

def imprimirFila(initMonth, monthCalendars):
    monthHeader = ["              Enero                          Febrero                          Marzo              ",
                   "              Abril                            Mayo                           Junio              ",
                   "              Julio                           Agosto                        Septiembre           ",
                   "             Octubre                        Noviembre                       Diciembre            "]
    print(monthHeader[initMonth])
    print("|   D   L   K   M   J   V   S   |   D   L   K   M   J   V   S   |   D   L   K   M   J   V   S   |")

    row = "|"
    for i in range(0,6):
        for month in monthCalendars:
            for day in month[i]:
                if day == -1:
                    strDay = " "
                else:
                    strDay = str(day)
                if len(strDay) == 1:
                    row += "   " + strDay
                else:
                    row += "  " + strDay
            row += "   |"
        print(row)
        row = "|"

def calendario_del_año(year):
    leapYear = bisiesto(year)
    stWeekDay = dia_primero_enero(year)
    yearCalendar = []
    for month in range(0,12):
        monthCalendarInfo = calendario_del_mes(stWeekDay,month,leapYear)
        yearCalendar += [monthCalendarInfo[0]]
        stWeekDay = monthCalendarInfo[1]
    return yearCalendar

def calendario_del_mes(stWeekDay, month, leapYear):
    monthCalendar = [[-1, -1, -1, -1, -1, -1, -1].copy(),
                     [-1, -1, -1, -1, -1, -1, -1].copy(),
                     [-1, -1, -1, -1, -1, -1, -1].copy(),
                     [-1, -1, -1, -1, -1, -1, -1].copy(),
                     [-1, -1, -1, -1, -1, -1, -1].copy(),
                     [-1, -1, -1, -1, -1, -1, -1].copy()].copy()
    if not leapYear:
        monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    else:
        monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    currentWeek = 0
    for day in range(1,monthDays[month]+1):
        monthCalendar[currentWeek][stWeekDay] = day
        stWeekDay = dia_semana_siguiente(stWeekDay)
        if stWeekDay == 0:
            currentWeek += 1

    return (monthCalendar, stWeekDay)

def dia_semana_siguiente(weekDay):
    if weekDay + 1 == 7:
        return 0
    return weekDay + 1

#E: Una fecha valida
#S: Una fecha valida
#D: Determina la fecha que está N días naturales en el futuro
def fecha_futura (date, days):
    #Calcula el dia siguiente N veces 
    for i in range(days):
        date = dia_siguiente(date)
    return date

#E: Una fecha valida
#S: Un valor booleano
#D: Determina si d1 es una fecha mayor que d2
def fechaMayor(date1,date2):
    #Se compara el año
    if date1[0] > date2[0]:
        return True
    if date1[0] == date2[0]:
        #Si el año es igual, se compara el mes 
        if date1[1] > date2[1]:
            return True
        if date1[1] == date2[1]:
            #Si el mes es igual, se compara el día
            if date1[2] > date2[2]:
                return True
    return False

#E: Una fecha valida
#S: Un numero entero
#D: Calcula la cantidad de días transcurridos desde la fecha 1 hasta la fecha 2, sin importar cual sea mayor
def dias_entre(date1, date2):
    #Se determina si la fecha 1 es mayor que la fecha 2 
    if fechaMayor(date1, date2):
        #Si es mayor se hace el cambio para ordenar las fehcas
        temp = date1
        date1 = date2
        date2 = temp
    #Se inicializa la variable res es 0
    res = 0
    #En caso de que sean el mismo año
    if date1[0] == date2[0]:
        res = dias_desde_primero_enero(date2) - dias_desde_primero_enero(date1)
    #En caso de que sean años diferentes 
    else:
        #Se calcula la cantidad de dias de los años completos que hay entre las fechas
        for year in range(date1[0]+1, date2[0]):
            if bisiesto(year):
                res += 366
            else:
                res += 365
        #Se suman los dias de la fecha 1
        if bisiesto(date1[0]):
            res += 366-dias_desde_primero_enero(date1)
        else:
            res += 365-dias_desde_primero_enero(date1)
        #Se suman los dias de la fecha 2
        res += dias_desde_primero_enero(date2)
    return res



#Pruebas

print("---- Pruebas R0 ----")

# ingresando dato de tipo string
print(fecha_es_tupla("HOLA"))
# ingresando dato de tipo array
print(fecha_es_tupla([1,23,442]))
# ingresando tupla donde no todos los números son enteros positivos
print(fecha_es_tupla((1.23, 32, 323)))
# ingresando tupla con más de 3 elementos
print(fecha_es_tupla((1.23, 32, 323,323)))
# ingresando una tupla que cumple con los requerimientos
print(fecha_es_tupla((2021,9,26)))

print("\n---- Pruebas R1 ----")

#Año no divisible entre 4 
print(bisiesto(2019))
#Año divisible uniformemente entre 4 y no entre 100
print(bisiesto(2020))
#Año divisible uniformemente entre 4 y entre 400 es bisiesto
print(bisiesto(2000))
#Año divisible uniformemente entre 4 y entre 100 y no entre 400
print(bisiesto(1900))

print("\n---- Pruebas R2 ----")

#Caso con año menor a la entrada en vigencia
print(fecha_es_valida((1410,5,5)))
#Caso en primero año pero mes menor a la entrada en vigencia
print(fecha_es_valida((1582,5,5)))
#Caso en primer año y mes pero dia menor a la entrada en vigencia
print(fecha_es_valida((1582,10,5)))
#Caso del primer dia de entrada en vigencia
print(fecha_es_valida((1582,10,15)))
#Caso del 29 de Feb en año bisiesto
print(fecha_es_valida((2020,2,29)))
#Caso del 29 de Feb en año no bisiesto
print(fecha_es_valida((2019,2,29)))
#Caso con mes 0
print(fecha_es_valida((2020,0,5)))
#Caso con dia 0
print(fecha_es_valida((2020,5,0)))
#Caso con mes 13
print(fecha_es_valida((2020,13,5)))
#Caso con dia 31 en mes de 30 dias
print(fecha_es_valida((2020,9,31)))
#Caso con dia 32 en mes de 31 dias
print(fecha_es_valida((2020,10,32)))
#Caso de cualquier dia diferente a los anteriores
print(fecha_es_valida((2000,5,5)))

print("\n---- Pruebas R3 ----")

#Cambio de año
print(dia_siguiente((2020,12,31)))
#Cambio de mes en Feb de un año bisiesto
print(dia_siguiente((2020,2,29)))
#Cambio de mes en Feb de un año no bisiesto
print(dia_siguiente((2019,2,28)))
#Cambio de mes en un mes de 31 dias
print(dia_siguiente((2000,9,30)))
#Cambio de mes en un mes de 30 dias
print(dia_siguiente((2000,10,31)))
#Cambio de dia en cualquier caso diferente a los anteriores
print(dia_siguiente((2000,5,5)))

print("\n---- Pruebas R4 ----")

#Pimero de enero a primero de enero
print(dias_desde_primero_enero((2019,1,1)))
#Hasta el 4 de Marzo en año NO bisiesto
print(dias_desde_primero_enero((2019,3,4)))
#Hasta el 4 de Marzo en año bisiesto
print(dias_desde_primero_enero((2020,3,4)))
#Hasta el 31 de diciembre en año NO bisiesto
print(dias_desde_primero_enero((2019,12,31)))
#Hasta el 31 de diciembre en año bisiesto
print(dias_desde_primero_enero((2020,12,31)))

print("\n---- Pruebas R5 ----")

# Todos los años a ingresar son válidos
print("2006", dia_primero_enero(2006))
print("3520", dia_primero_enero(3520))
print("2020", dia_primero_enero(2020))
print("2021", dia_primero_enero(2021))
print("2022", dia_primero_enero(2022))
print("2023", dia_primero_enero(2023))
print("2024", dia_primero_enero(2024))
print("2025", dia_primero_enero(2025))
print("1697", dia_primero_enero(1697))
print("1583", dia_primero_enero(1583))
print("2119", dia_primero_enero(2119))

print("\n---- Pruebas R6 ----")

imprimir_4x3(2021)
print()
imprimir_4x3(2000)
print()
imprimir_4x3(2010)
print()
imprimir_4x3(1945)
print()
imprimir_4x3(2031)
print()

print("\n---- Pruebas R8 ----")

#Caso 0 días 
print(fecha_futura((2019,1,1),0))
#Caso 15 días mismo año
print(fecha_futura((2019,1,1),15))
#Caso 15 días diferente año
print(fecha_futura((2019,12,20),15))
#Caso año bisiesto
print(fecha_futura((2020,2,28),1))
#Caso año no bisiesto 
print(fecha_futura((2019,2,28),1))
#Caso 1 año exacto 
print(fecha_futura((2018,1,1),365))
#Caso 1 año exacto bisiesto 
print(fecha_futura((2020,1,1),366))
#Caso 2 años exactos 
print(fecha_futura((2018,1,1),730))

print("\n---- Pruebas R9 ----")

#Caso 0 dias 
print(dias_entre((2019,1,1),(2019,1,1)))
#Caso 15 días mismo año
print(dias_entre((2019,1,1),(2019,1,16)))
#Caso 15 días diferente año
print(dias_entre((2019,12,20),(2020,1,4)))
#Caso año bisiesto
print(dias_entre((2020,2,28),(2020,2,29)))
#Caso año no bisiesto 
print(dias_entre((2019,2,28),(2019,3,1)))
#Caso 1 año exacto 
print(dias_entre((2018,1,1),(2019,1,1)))
#Caso 1 año exacto bisiesto 
print(dias_entre((2020,1,1),(2021,1,1)))
#Caso 2 años exactos 
print(dias_entre((2018,1,1),(2020,1,1)))