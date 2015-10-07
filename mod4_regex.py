import re

def get_re():
    last = "|".join([str(4*x) for x in range(3,25)])
    last = "00|04|08|" + last
    restr = "\[[\+-]?((0|4|8)|(\d*("+last+")))\]"
    return restr

class Mod:
    mod4 = re.compile(get_re()) #Your regular expression here
