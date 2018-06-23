require 'PDF-Reader'

Dir.entries('../../data/testing').each do |file|
  if file.include?('pdf')
    reader = PDF::Reader.new("../../data/testing/#{file}")
    puts reader.page_count
  end
end
