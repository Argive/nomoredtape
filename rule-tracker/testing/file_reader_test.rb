def final_orders_parser(file)
  lines = File.open(file).to_a
  file_name = File.basename(file, ".txt")

  all_rules = []

  lines.each_with_index do |line, idx|
    if line.include?("is amended.")
      if line.include?("CSR")
        key_line = line
      else
        key_line = lines[idx - 1].gsub("\n", " ") + line
      end

      all_rules.push(create_rule(key_line, "amend", "final_order", file_name))

    elsif line.include?("is rescinded.")
      if line.include?("CSR")
        key_line = line
      else
        key_line = lines[idx - 1].gsub("\n", " ") + line
      end

      all_rules.push(create_rule(key_line, "rescind", "final_order", file_name))
    end
  end

  puts all_rules
end

def proposed_orders_parser(file)
  lines = File.open(file).to_a

  all_rules = []

  lines.each do |line|
    if line.include?("PROPOSED AMENDMENT")
      counter += 1
    elsif line.include?("PROPOSED RECISSION")
    end
  end

  puts all_rules
end

def create_rule(line, action, stage, file_name)
  rule = {}

  if action == "amend"
    rule["code"], rule["desc"] = line.match(/^(?<CODE>\d+\s+CSR\s+[-.\d]+)\s+(?<DESCRIPTION>.*?)(?=\s+is amended.$)/).captures
    rule["proposed_action"] = "amend"
  elsif action == "rescind"
    rule["proposed_action"] = "rescind"
  end

  rule["stage"] = stage
  rule["source"] = file_name

  return rule
end

final_orders_parser('./files/orders_test_excerpt.txt')
# proposed_orders_parser('./files/proposed_test_excerpt_short.txt')
