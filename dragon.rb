
class String
  def gsub_simult(patterns)
    res = ""
    each_char do |c|
      if patterns.key? c
        res += patterns[c]
      else
        res += c
      end
    end
    res
  end
end

def Dragon(n)
  return '' if not n.is_a? Integer or n<0

  s = "Fa"
  n.times do
    s = s.gsub_simult "a"=>"aRbFR", "b"=>"LFaLb"
  end
  s.gsub(/[ab]/, '')
end

puts Dragon(5)
