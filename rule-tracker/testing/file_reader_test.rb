# class Rule
#   attr_reader :title, :code
#   attr_accessor :status
#
#   def initialize(title, code, status)
#     @title = title
#     @code = code
#     @status = status
#   end
# end

def final_orders_parser(file)
  lines = File.open(file).to_a
  file_name = File.basename(file, ".txt")

  all_rules = []

  lines.each_with_index do |line, idx|
    if line.include?("is amended.")
      if line.include?("CSR")
        key_line = line.split(" is amended.").first
      else
        combined_lines = lines[idx - 1].gsub("\n", " ") + line
        key_line = combined_lines.split(" is amended.").first
      end

      all_rules.push(create_rule(key_line, "amend", file_name))

    elsif line.include?("is rescinded.")
      if line.include?("CSR")
        key_line = line.split(" is rescinded.").first
      else
        combined_lines = lines[idx - 1].gsub("\n", " ") + line
        key_line = combined_lines.split(" is rescinded.").first
      end

      all_rules.push(create_rule(key_line, "rescind", file_name))
    end
  end

  puts all_rules
end

def proposed_orders_parser(file)
end 

def create_rule(line, action, file_name)
  rule = {}

  split = line.split(" ")

  rule["code"] = split[0..2].join(" ")
  rule["description"] = split[3..-1].join(" ")
  rule["proposed_action"] = action == "amend" ? "amend" : "rescind"
  rule["stage"] = "final_order"
  rule["source"] = file_name

  return rule
end

final_orders_parser('./files/orders_test_excerpt.txt')
