
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

      all_rules.push(create_rule(key_line, "amend", "final", file_name))

    elsif line.include?("is rescinded.")
      if line.include?("CSR")
        key_line = line
      else
        key_line = lines[idx - 1].gsub("\n", " ") + line
      end

      all_rules.push(create_rule(key_line, "rescind", "final", file_name))
    end
  end

  puts "Final rules: #{all_rules} \n\n"
end

def proposed_orders_parser(file)
  lines = File.open(file).to_a
  file_name = File.basename(file, ".txt")

  all_rules = []

  lines.each_with_index do |line, idx|
    if line.include?("PROPOSED AMENDMENT")
      jdx = idx + 1
      key_line = lines[jdx]

      until key_line.include?(". ")
        jdx += 1
        key_line = key_line.gsub("\n", " ") + lines[jdx]
      end

      all_rules.push(create_rule(key_line, "amend", "proposed", file_name))
    elsif line.include?("PROPOSED RECISSION")
      jdx = idx + 1
      key_line = lines[jdx]

      until key_line.include?(". ")
        jdx += 1
        key_line = key_line.gsub("\n", " ") + lines[jdx]
      end

      all_rules.push(create_rule(key_line, "rescind", "proposed", file_name))
    end
  end

  puts "Proposed rules: #{all_rules} \n\n"
end

def create_rule(line, action, stage, file_name)
  rule = {}

  if stage == "final"
    if action == "amend"
      rule["code"], rule["desc"] = line.match(/^(?<CODE>\d+\s+CSR\s+[-.\d]+)\s+(?<DESCRIPTION>.*?)(?=\s+is amended.$)/).captures
    elsif action == "rescind"
      rule["code"], rule["desc"] = line.match(/^(?<CODE>\d+\s+CSR\s+[-.\d]+)\s+(?<DESCRIPTION>.*?)(?=\s+is rescinded.$)/).captures
    end

  elsif stage == "proposed"
    rule["code"], rule["desc"] = line.match(/^(?<CHAPTER>\d+\s+CSR\s+[-.\d]+)\s+(?<DESCRIPTION>.*?)(?=\. .+$)/).captures
  end


  if action == "amend"
    rule["proposed_action"] = "amend"
  elsif action =="rescind"
    rule["proposed_action"] = "rescind"
  end

  rule["stage"] = stage
  rule["source"] = file_name

  return rule
end

final_orders_parser('./files/orders_test_excerpt.txt')
proposed_orders_parser('./files/proposed_test_excerpt_short.txt')
