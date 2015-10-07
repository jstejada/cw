
def sum_to_n(n, k=1)
  (k * n * (n+1))/2
end

def limit(n, d)
  if n%d == 0 then (n/d)-1 else n/d end
end

def solution(n)
  sum_3  = sum_to_n limit(n, 3), 3
  sum_5  = sum_to_n limit(n, 5), 5
  sum_35 = sum_to_n limit(n, 15), 15
  sum_3 + sum_5 - sum_35
end

solution 10

# require 'set'

# def range(limit, d, number)
#   if limit*d == number then (1...limit) else (1..limit) end
# end

# def solution(number)
#   s = Set.new
#   limit3 = number/3
#   limit5 = number/5
#   range(limit3, 3, number).each { |e| s.add e*3 }
#   range(limit5, 5, number).each { |e| s.add e*5 }

#   s.inject(:+)
# end

# Slow
# def solution(number)
#   (1...number).inject 0 do |sum, n|
#     if n % 3 == 0 or n % 5 == 0
#       sum + n
#     else
#       sum
#     end
#   end
# end
