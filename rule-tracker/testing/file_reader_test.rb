require_relative 'config'

def final_orders_parser(file)
  lines = File.open(file).to_a
  file_name = File.basename(file, ".txt")

  lines.each_with_index do |line, idx|
    if line.include?("is amended.")
      key_line = line
      jdx = idx

      until key_line.include?("CSR")
        jdx -= 1
        key_line = lines[jdx].gsub("\n", " ") + key_line
      end

      add_to_airtable(create_rule(key_line, "Amend", "Final Order", file_name))

    elsif line.include?("is rescinded.")
      key_line = line
      jdx = idx

      until key_line.include?("CSR")
        jdx -= 1
        key_line = lines[jdx].gsub("\n", " ") + key_line
      end

      add_to_airtable(create_rule(key_line, "Rescind", "Final Order", file_name))
    end
  end

  puts "Final rules uploaded to Airtable."
end

def proposed_orders_parser(file)
  lines = File.open(file).to_a
  file_name = File.basename(file, ".txt")

  lines.each_with_index do |line, idx|
    if line.include?("PROPOSED AMENDMENT")
      jdx = idx + 1
      key_line = lines[jdx]

      until key_line.include?(". ")
        jdx += 1
        key_line = key_line.gsub("\n", " ") + lines[jdx]
      end

      add_to_airtable(create_rule(key_line, "Amend", "Proposed (Formal)", file_name))
    elsif line.include?("PROPOSED RECISSION")
      jdx = idx + 1
      key_line = lines[jdx]

      until key_line.include?(". ")
        jdx += 1
        key_line = key_line.gsub("\n", " ") + lines[jdx]
      end

      add_to_airtable(create_rule(key_line, "Rescind", "Proposed (Formal)", file_name))
    end
  end

  puts "Proposed rules uploaded to Airtable."
end

def create_rule(line, action, stage, file_name)
  rule = {}

  if stage == "Final Order"
    if action == "Amend"
      rule[:rule_citation], rule[:rule_description] = line.match(/^(?<CODE>\d+\s+CSR\s+[-.\d]+)\s+(?<DESCRIPTION>.*?)(?=\s+is amended.$)/).captures
    elsif action == "Rescind"
      rule[:rule_citation], rule[:rule_description] = line.match(/^(?<CODE>\d+\s+CSR\s+[-.\d]+)\s+(?<DESCRIPTION>.*?)(?=\s+is rescinded.$)/).captures
    end

  elsif stage == "Proposed (Formal)"
    rule[:rule_citation], rule[:rule_description] = line.match(/^(?<CHAPTER>\d+\s+CSR\s+[-.\d]+)\s+(?<DESCRIPTION>.*?)(?=\. .+$)/).captures
  end

  rule[:proposed_action] = action
  rule[:stage] = stage
  rule[:source] = file_name

  return rule
end

def add_to_airtable(rule)
  airtableRule = AllSoSData.new(
    "Rule Citation" => rule[:rule_citation],
    "Rule Description" => rule[:rule_description],
    "Proposed Action" => rule[:proposed_action],
    "Stage" => rule[:stage],
    "Source" => rule[:source],
    "date_added" => Time.now
  )

  airtableRule.create
end

final_orders_parser('./files/orders_test_excerpt.txt')
# proposed_orders_parser('./files/proposed_test_excerpt_short.txt')
