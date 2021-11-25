import unittest
from As1bModPU import dias_entre

class TestDiasEntre(unittest.TestCase):

    def test_CP_R9_1(self):
        self.assertRaises(IndexError, dias_entre, (2021,15,12),(2021,11,12))

    def test_CP_R9_2(self):
        result = dias_entre((2021,11,12), (1420,12,10))
        self.assertNotEqual(result, 219474)

    def test_CP_R9_3(self):
        result = dias_entre((2001,12,15), (2001,12,15))
        self.assertEqual(result, 0)

    def test_CP_R9_4(self):
        result = dias_entre((2021,11,14), (2001,12,15))
        self.assertEqual(result, 7274)

    def test_CP_R9_5(self):
        result = dias_entre((2021, 1,15), (2021, 2,20))
        self.assertEqual(result, 36)

if __name__ == '__main__':
    unittest.main()
