
def to_camel_case(str)
  parts = str.split(/[-_]/).map do |part|
    "#{part[0].upcase}#{part[1..-1]}"
  end
  res = parts.join ""
  res[0] = res[0].downcase if !res.empty? and str[0] == str[0].downcase
  res
end

def much_cleverer(str)
  str.gsub(/[_-](.)/) {"#{$1.upcase}"}
  # head, *tail = str.split(/[-_]/)
  # head.to_s + tail.map(&:capitalize).join
end


if __FILE__ == $0
  puts to_camel_case "some-thing"
  puts to_camel_case "Some_thing"
end
