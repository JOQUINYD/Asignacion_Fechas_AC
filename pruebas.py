import Asignacion_1b

def getTestYears():
    nonLeapYears = [[],[],[],[],[],[],[]]
    leapYears = [[],[],[],[],[],[],[]]
    for year in range(2050,1584,-1):
        day = Asignacion_1b.dia_primero_enero(year)
        if Asignacion_1b.bisiesto(year):
            leapYears[day].append(year)
        else:
            nonLeapYears[day].append(year)

    for yearDay in nonLeapYears:
        print(yearDay)
    print("-----------------------------")
    for yearDay in leapYears:
        print(yearDay)

getTestYears()