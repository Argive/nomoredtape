require 'PDF-Reader'
reader = PDF::Reader.new("../../data/proposed_test_excerpt.pdf")

paragraph = ""
paragraphs = []
reader.pages.each do |page|
  lines = page.text.scan(/^.+/)
  lines.each do |line|
    if line.length > 55
      paragraph += " #{line}"
    else
      paragraph += " #{line}"
      paragraphs << paragraph
      paragraph = ""
    end
  end
end

puts paragraphs

# require 'origami'
# include Origami
#
# pdf = PDF.read("../../data/proposed_test_excerpt.pdf")
# puts "This document has #{pdf.pages.size} page(s)"
#
# pdf.each_page do |page|
#   puts page
# end
