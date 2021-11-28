import unittest
from As1aModPU import dia_siguiente

class TestDiaSiguiente(unittest.TestCase):

    def test_CP_R3_1(self):
        result = dia_siguiente((103,12,12))
        self.assertEqual(result, (103,12,13))

    def test_CP_R3_2(self):
        result = dia_siguiente((2019,2,5))
        self.assertEqual(result, (2019,2,6))

    def test_CP_R3_3(self):
        result = dia_siguiente((2020,2,28))
        self.assertEqual(result, (2020,2,29))

    def test_CP_R3_4(self):
        result = dia_siguiente((2017,2,28))
        self.assertEqual(result, (2017,3,1))

    def test_CP_R3_5(self):
        result = dia_siguiente((2024,2,29))
        self.assertEqual(result, (2024,3,1))

    def test_CP_R3_6(self):
        result = dia_siguiente((1980,6,28))
        self.assertEqual(result, (1980,6,29))

    def test_CP_R3_7(self):
        result = dia_siguiente((1870,4,30))
        self.assertEqual(result, (1870,5,1))
    
    def test_CP_R3_8(self):
        result = dia_siguiente((2035,1,1))
        self.assertEqual(result, (2035,1,2))

    def test_CP_R3_9(self):
        result = dia_siguiente((2082,8,31))
        self.assertEqual(result, (2082,9,1))

    def test_CP_R3_10(self):
        result = dia_siguiente((1728,12,31))
        self.assertEqual(result, (1729,1,1))

if __name__ == '__main__':
    unittest.main()
